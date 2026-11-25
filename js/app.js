/* ==========================================================================
   AI Global Value Chain Research Terminal — Main Application Controller
   ========================================================================== */
(function () {
  const STORAGE_KEYS = {
    THEME: "aichain_theme_v1",
    CUSTOM_NEWS: "aichain_custom_news_v1"
  };

  const TIER_LABELS = {
    upstream: "上游 · 算力硬件",
    midstream: "中游 · 模型与云",
    downstream: "下游 · 行业应用",
    macro: "宏观政策"
  };

  const SENTIMENT_LABELS = {
    bullish: "利好",
    neutral: "中性",
    bearish: "利空/风险"
  };

  const PERIOD_LABELS = {
    quarterly: "最新季报 (2026Q3)",
    semiannual: "半年报 (2026H1)",
    annual: "年报 (2025FY)"
  };

  const appState = {
    currentView: "chain",
    searchQuery: "",
    activeCompanyId: null,
    drawerTab: "financials",
    drawerPeriod: "quarterly",
    p4SeriesMode: "cumulative12", // 'cumulative12' | 'singleQ12' | 'annual5'
    p4MetricMode: "dual",         // 'dual' | 'ni' | 'nonGaap' | 'ocf'

    // Financials matrix state
    finPeriod: "quarterly",
    finTier: "ALL",
    finSortKey: "marketCap",
    finSortAsc: false,

    // Policy state
    policyRegion: "ALL",
    policyImpact: "ALL",

    // Research state
    researchTier: "ALL",

    // News state
    newsTier: "ALL",
    newsSentiment: "ALL",
    newsItems: []
  };

  window.AIChainLive = {
    quotes: {},
    news: [],
    quotesUpdatedAt: null,
    newsUpdatedAt: null,
    online: false
  };

  function formatLivePrice(q) {
    if (!q) return "--";
    const symMap = { USD: "$", CNY: "¥", HKD: "HK$", TWD: "NT$", EUR: "€", KRW: "₩", JPY: "JP¥" };
    const sym = symMap[q.currency] || (q.currency + " ");
    const val = q.currency === "KRW" || q.currency === "JPY"
      ? Math.round(q.price).toLocaleString()
      : q.price.toFixed(2);
    return `${sym}${val}`;
  }

  function updateLiveStatusPill(mode, text) {
    const btn = document.getElementById("liveSyncBtn");
    const label = document.getElementById("liveSyncText");
    if (!btn || !label) return;
    btn.classList.remove("online", "syncing");
    if (mode === "online") btn.classList.add("online");
    if (mode === "syncing") btn.classList.add("syncing");
    label.textContent = text;
  }

  async function syncLiveQuotes(force = false) {
    if (window.location.protocol === "file:") {
      updateLiveStatusPill("offline", "本地快照模式");
      return;
    }
    try {
      const url = force ? "/api/quotes?refresh=1" : "/api/quotes";
      const res = await fetch(url);
      if (!res.ok) throw new Error("quotes fetch failed");
      const data = await res.json();
      if (data && data.quotes) {
        window.AIChainLive.quotes = data.quotes;
        window.AIChainLive.quotesUpdatedAt = data.updatedAt;
        window.AIChainLive.online = true;
        const t = new Date(data.updatedAt || Date.now());
        const hhmmss = t.toTimeString().slice(0, 8);
        const totalCos = window.AIChainData.companies.length;
        updateLiveStatusPill("online", `实时同步 · ${data.count || 0}/${totalCos} · ${hhmmss}`);
        window.AIChainGraph.render();
        if (window.AIUpstream3D) window.AIUpstream3D.refreshNodeContents();
        if (appState.currentView === "upstream3d") renderUpstreamBreakdown();
        if (appState.currentView === "financials") renderFinancialsView();
        if (appState.activeCompanyId) {
          const comp = getCompanyById(appState.activeCompanyId);
          if (comp) renderDrawerHeader(comp);
        }
      }
    } catch (_) {
      if (!window.AIChainLive.online) {
        updateLiveStatusPill("offline", "快照模式 (离线)");
      }
    }
  }

  async function syncLiveNews(force = false) {
    if (window.location.protocol === "file:") return;
    try {
      const url = force ? "/api/news?refresh=1" : "/api/news";
      const res = await fetch(url);
      if (!res.ok) throw new Error("news fetch failed");
      const data = await res.json();
      if (data && Array.isArray(data.items) && data.items.length) {
        window.AIChainLive.news = data.items;
        window.AIChainLive.newsUpdatedAt = data.updatedAt;
        loadNews();
        renderTicker();
        if (appState.currentView === "news") renderNewsView();
        if (appState.activeCompanyId && appState.drawerTab === "news") {
          const comp = getCompanyById(appState.activeCompanyId);
          if (comp) renderDrawerBody(comp);
        }
      }
    } catch (_) {
      // keep curated baseline news
    }
  }

  function escapeHtml(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, (m) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[m]));
  }

  function getCompanyById(id) {
    return window.AIChainData.companies.find((c) => c.id === id) || null;
  }

  function formatCap(billionUsd) {
    if (billionUsd >= 10000) return `$${(billionUsd / 10000).toFixed(2)}万亿`;
    return `$${billionUsd.toLocaleString()}亿`;
  }

  function loadNews() {
    let custom = [];
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_NEWS);
      if (raw) custom = JSON.parse(raw);
    } catch (_) {
      custom = [];
    }
    const live = (window.AIChainLive && window.AIChainLive.news) || [];
    appState.newsItems = [...custom, ...live, ...window.AIChainData.dailyNews];
    const badge = document.getElementById("newsCountBadge");
    if (badge) badge.textContent = String(appState.newsItems.length);
  }

  function saveCustomNews(item) {
    let custom = [];
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_NEWS);
      if (raw) custom = JSON.parse(raw);
    } catch (_) {
      custom = [];
    }
    custom.unshift(item);
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_NEWS, JSON.stringify(custom));
    } catch (_) {
      // ignore storage quota errors
    }
    loadNews();
  }

  /* ==================== Theme Management ==================== */
  function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved === "light" || saved === "dark") {
      document.documentElement.setAttribute("data-theme", saved);
    }
    document.getElementById("themeToggle").addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem(STORAGE_KEYS.THEME, next);
      } catch (_) {}
      if (appState.currentView === "chain") {
        requestAnimationFrame(() => window.AIChainGraph.drawEdges());
      }
    });
  }

  /* ==================== Navigation & Global Search ==================== */
  function switchView(viewName) {
    appState.currentView = viewName;
    document.querySelectorAll(".nav-tab").forEach((btn) => {
      const isActive = btn.dataset.view === viewName;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", String(isActive));
    });
    document.querySelectorAll(".view-section").forEach((sec) => {
      sec.classList.toggle("active", sec.id === `view-${viewName}`);
    });

    if (viewName !== "upstream3d" && window.AIUpstream3D) {
      window.AIUpstream3D.stop();
    }
    if (viewName === "chain") {
      requestAnimationFrame(() => window.AIChainGraph.drawEdges());
    } else if (viewName === "upstream3d") {
      renderUpstreamBreakdown();
      if (window.AIUpstream3D) {
        requestAnimationFrame(() => window.AIUpstream3D.start());
      }
    } else if (viewName === "financials") {
      renderFinancialsView();
    } else if (viewName === "policy") {
      renderPolicyView();
    } else if (viewName === "research") {
      renderResearchView();
    } else if (viewName === "news") {
      renderNewsView();
    }
  }

  function bindNavigation() {
    document.querySelectorAll(".nav-tab").forEach((btn) => {
      btn.addEventListener("click", () => switchView(btn.dataset.view));
    });
    document.getElementById("brandReset").addEventListener("click", () => {
      switchView("chain");
      window.AIChainGraph.clearSelection();
    });
    document.getElementById("tickerMoreBtn").addEventListener("click", () => switchView("news"));

    const searchInput = document.getElementById("globalSearch");
    const clearBtn = document.getElementById("searchClear");
    const applySearch = (val) => {
      appState.searchQuery = val;
      clearBtn.hidden = !val;
      window.AIChainGraph.setState({ searchQuery: val });
      if (window.AIUpstream3D) window.AIUpstream3D.setSearchQuery(val);
      if (appState.currentView === "financials") renderFinancialsView();
      if (appState.currentView === "policy") renderPolicyView();
      if (appState.currentView === "research") renderResearchView();
      if (appState.currentView === "news") renderNewsView();
    };

    searchInput.addEventListener("input", (e) => applySearch(e.target.value));
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      applySearch("");
      searchInput.focus();
    });
  }

  /* ==================== Daily Ticker Strip ==================== */
  function renderTicker() {
    const container = document.getElementById("tickerContainer");
    if (!container) return;
    const latest = appState.newsItems.slice(0, 6);
    const dateLabel = document.getElementById("tickerDateLabel");
    if (dateLabel && latest.length && latest[0].date) {
      dateLabel.textContent = `每日速递 · ${latest[0].date}`;
    }
    container.innerHTML = latest.map((n) => `
      <span class="ticker-item" data-news-id="${escapeHtml(n.id)}" title="${escapeHtml(n.summary)}">
        <span class="ticker-tag ${escapeHtml(n.sentiment)}">${SENTIMENT_LABELS[n.sentiment] || "资讯"}</span>
        <span>${escapeHtml(n.title)}</span>
      </span>
    `).join("");

    container.querySelectorAll(".ticker-item").forEach((el) => {
      el.addEventListener("click", () => {
        const item = appState.newsItems.find((n) => n.id === el.dataset.newsId);
        if (item && item.companies && item.companies.length) {
          openCompanyDrawer(item.companies[0], "news");
        } else {
          switchView("news");
        }
      });
    });
  }

  /* ==================== Chain View Controls ==================== */
  function bindChainControls() {
    document.querySelectorAll("#marketFilterGroup .chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#marketFilterGroup .chip").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        window.AIChainGraph.setState({ marketFilter: btn.dataset.market });
      });
    });

    document.getElementById("sortMetric").addEventListener("change", (e) => {
      window.AIChainGraph.setState({ sortMetric: e.target.value });
    });

    const toggleEdgesBtn = document.getElementById("toggleAllEdgesBtn");
    toggleEdgesBtn.addEventListener("click", () => {
      const next = !window.AIChainGraph.getState().showAllEdges;
      toggleEdgesBtn.classList.toggle("active", next);
      window.AIChainGraph.setState({ showAllEdges: next });
    });

    document.getElementById("clearSelectionBtn").addEventListener("click", () => {
      window.AIChainGraph.clearSelection();
      closeCompanyDrawer();
    });
  }

  /* ==================== Slide-Over Company Deep-Dive Drawer ==================== */
  function openCompanyDrawer(companyId, initialTab) {
    const comp = getCompanyById(companyId);
    if (!comp) return;
    appState.activeCompanyId = companyId;
    if (initialTab) appState.drawerTab = initialTab;

    renderDrawerHeader(comp);
    renderDrawerTabs();
    renderDrawerBody(comp);

    const drawer = document.getElementById("companyDrawer");
    const backdrop = document.getElementById("drawerBackdrop");
    backdrop.hidden = false;
    drawer.setAttribute("aria-hidden", "false");
    requestAnimationFrame(() => drawer.classList.add("open"));
  }

  function closeCompanyDrawer() {
    const drawer = document.getElementById("companyDrawer");
    const backdrop = document.getElementById("drawerBackdrop");
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    setTimeout(() => {
      if (!drawer.classList.contains("open")) backdrop.hidden = true;
    }, 260);
  }

  function renderDrawerHeader(c) {
    const q = c.financials.quarterly;
    const liveQ = window.AIChainLive && window.AIChainLive.quotes[c.id];
    let liveKpiHtml = `<div class="dkpi"><span>总市值</span><strong>${formatCap(c.marketCap)}</strong></div>`;
    if (liveQ) {
      const chg = liveQ.changePercent;
      const sign = chg > 0 ? "+" : "";
      liveKpiHtml = `
        <div class="dkpi">
          <span>实时股价 (${escapeHtml(liveQ.source)})</span>
          <strong>
            ${formatLivePrice(liveQ)}
            <small class="${chg >= 0 ? "val-up" : "val-down"}" style="font-size:12px;">${sign}${chg.toFixed(2)}%</small>
          </strong>
        </div>`;
    }
    const header = document.getElementById("drawerHeader");
    header.innerHTML = `
      <div class="drawer-header-inner">
        <div class="drawer-top-row">
          <div class="drawer-title-group">
            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
              <button class="btn-subtle" id="backFromPageBtn" style="padding:4px 10px;font-weight:700;">← 返回产业链视图</button>
              <span class="tier-pill ${c.tier}">${TIER_LABELS[c.tier]}</span>
              <span class="market-badge mkt-${c.market}">${c.marketLabel} · ${escapeHtml(c.exchange)}</span>
              <span class="mini-pill">${escapeHtml(c.subSegment)}</span>
            </div>
            <h2>
              ${escapeHtml(c.name)}
              <span class="node-ticker" style="font-size:15px;">${escapeHtml(c.ticker)}</span>
            </h2>
            <div style="font-size:13px;color:var(--text-secondary);">${escapeHtml(c.role)}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <button class="btn-subtle" id="locateOnChainBtn" title="在产业链图谱中聚焦该公司">链式图定位</button>
            <button class="drawer-close" id="closeDrawerBtn" aria-label="关闭">&times;</button>
          </div>
        </div>
        <div class="drawer-kpi-row">
          ${liveKpiHtml}
          <div class="dkpi"><span>总市值 / PE</span><strong>${formatCap(c.marketCap)} · ${c.pe}x</strong></div>
          <div class="dkpi"><span>最新季报营收同比</span><strong class="${q.revYoY >= 0 ? "val-up" : "val-down"}">${q.revYoY >= 0 ? "+" : ""}${q.revYoY.toFixed(1)}%</strong></div>
          <div class="dkpi"><span>毛利率 / 一致评级</span><strong style="color:var(--positive);">${q.grossMargin.toFixed(1)}% · ${escapeHtml(c.research.consensus)}</strong></div>
        </div>
      </div>`;

    document.getElementById("closeDrawerBtn").addEventListener("click", closeCompanyDrawer);
    document.getElementById("backFromPageBtn").addEventListener("click", closeCompanyDrawer);
    document.getElementById("locateOnChainBtn").addEventListener("click", () => {
      closeCompanyDrawer();
      switchView("chain");
      window.AIChainGraph.setState({ marketFilter: "ALL", searchQuery: "", selectedId: c.id });
      document.querySelectorAll("#marketFilterGroup .chip").forEach((b) => {
        b.classList.toggle("active", b.dataset.market === "ALL");
      });
      setTimeout(() => {
        const node = document.querySelector(`.company-node[data-id="${c.id}"]`);
        if (node) node.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 120);
    });
  }

  function renderDrawerTabs() {
    document.querySelectorAll(".drawer-tab").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === appState.drawerTab);
    });
  }

  function renderDrawerBody(c) {
    const body = document.getElementById("drawerBody");
    const tab = appState.drawerTab;

    if (tab === "financials") {
      const pKey = appState.drawerPeriod;
      const fin = c.financials[pKey];
      const prof = window.AIFinancialEngine.analyzeCompany(c, pKey);
      const inc = prof.income;
      const bal = prof.balance;
      const cf = prof.cashflow;
      const turn = prof.turnover;
      const ret = prof.returns;
      const sum = prof.summary;
      const unitLabel = "亿美元口径";
      const sMode = appState.p4SeriesMode;
      const mMode = appState.p4MetricMode;

      body.innerHTML = `
        <div class="drawer-body-inner">
          <!-- ==================== 模块 1: 年度/报告期营收与利润趋势图 (P4横坐标风格) ==================== -->
          <section class="fin-module-block">
            <div class="fin-module-head">
              <div class="fin-module-title">
                <span class="fin-module-num">01</span>
                <h3>年度 / 报告期营收与利润趋势图</h3>
              </div>
              <div class="fin-chart-controls">
                <div class="segmented-control" id="p4SeriesSwitch">
                  <button class="seg-btn ${sMode === "cumulative12" ? "active" : ""}" data-smode="cumulative12">报告期累计 (12期)</button>
                  <button class="seg-btn ${sMode === "singleQ12" ? "active" : ""}" data-smode="singleQ12">单季趋势 (12期)</button>
                  <button class="seg-btn ${sMode === "annual5" ? "active" : ""}" data-smode="annual5">年度对比</button>
                </div>
                <div class="segmented-control" id="p4MetricSwitch">
                  <button class="seg-btn ${mMode === "dual" ? "active" : ""}" data-mmode="dual">营收 + 归母净利</button>
                  <button class="seg-btn ${mMode === "ni" ? "active" : ""}" data-mmode="ni">归属净利润</button>
                  <button class="seg-btn ${mMode === "nonGaap" ? "active" : ""}" data-mmode="nonGaap">扣非净利润</button>
                  <button class="seg-btn ${mMode === "ocf" ? "active" : ""}" data-mmode="ocf">经营现金流 vs 净利</button>
                </div>
              </div>
            </div>

            <div id="p4TrendChartBox" style="width:100%;overflow-x:auto;"></div>
            <div class="policy-impact-box" style="margin-top:12px;">
              <strong>当期业绩核心亮点（${escapeHtml(fin.period)}）：</strong>${escapeHtml(fin.highlight)}
              <ul class="bullet-list" style="margin-top:6px;">
                ${fin.takeaways.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}
              </ul>
            </div>
          </section>

          <!-- ==================== 模块 2: 六大专业财报维度指标示列与简要分析 ==================== -->
          <section class="fin-module-block">
            <div class="fin-module-head">
              <div class="fin-module-title">
                <span class="fin-module-num">02</span>
                <h3>六大专业财报维度 · 核心指标示列与深度拆解</h3>
              </div>
              <div class="fin-chart-controls">
                <div class="segmented-control" id="drawerPeriodSwitch">
                  <button class="seg-btn ${pKey === "quarterly" ? "active" : ""}" data-period="quarterly">季报 (2026Q3)</button>
                  <button class="seg-btn ${pKey === "semiannual" ? "active" : ""}" data-period="semiannual">半年报 (2026H1)</button>
                  <button class="seg-btn ${pKey === "annual" ? "active" : ""}" data-period="annual">年报 (2025FY)</button>
                </div>
              </div>
            </div>

            <div class="fin-sub-nav">
              <button class="chip active" data-fin-jump="fin-p1">一、利润表</button>
              <button class="chip" data-fin-jump="fin-p2">二、资产负债表</button>
              <button class="chip" data-fin-jump="fin-p3">三、现金流量表</button>
              <button class="chip" data-fin-jump="fin-p4">四、核心周转指标</button>
              <button class="chip" data-fin-jump="fin-p5">五、盈利回报(杜邦ROE)</button>
              <button class="chip" data-fin-jump="fin-p6">六、三张表联动检验</button>
            </div>

            <!-- 一、利润表 -->
            <div class="fin-part-card" id="fin-p1">
              <div class="fin-part-head">
                <h4>一、利润表（营收量价结构 · 毛利率 · 四费 · 利润五层穿透）</h4>
                <span class="panel-badge">报告期 ${escapeHtml(fin.period)}</span>
              </div>

              <div class="fin-grid-4">
                <div class="fin-kpi-box">
                  <span class="fk-lbl">1. 营业收入 & 同比 / 环比</span>
                  <span class="fk-val">${escapeHtml(inc.revenue)}</span>
                  <span class="fk-sub"><span class="${inc.revYoY >= 0 ? "val-up" : "val-down"}">同比 ${inc.revYoY >= 0 ? "+" : ""}${inc.revYoY}%</span> · 环比 ${inc.revQoQ >= 0 ? "+" : ""}${inc.revQoQ}%</span>
                </div>
                <div class="fin-kpi-box">
                  <span class="fk-lbl">2. 毛利率 vs 同行均值</span>
                  <span class="fk-val">${inc.gm}%</span>
                  <span class="fk-sub">同行参考 ${inc.peerAvgGm}%（<span class="${inc.gmDelta >= 0 ? "val-up" : "val-down"}">${inc.gmDelta >= 0 ? "+" : ""}${inc.gmDelta} pct</span>）</span>
                </div>
                <div class="fin-kpi-box">
                  <span class="fk-lbl">3. 四费结构 (研/销/管/财)</span>
                  <span class="fk-val">${inc.rd}% / ${inc.salesExp}%</span>
                  <span class="fk-sub">管理 ${inc.adminExp}% (SBC ${inc.sbcRatio}%) · 财务 ${inc.finExp}% · 研发资本化 ${inc.rdCapPct}%</span>
                </div>
                <div class="fin-kpi-box">
                  <span class="fk-lbl">前五大客户集中度</span>
                  <span class="fk-val">${inc.top5Pct}%</span>
                  <span class="fk-sub">主业 ${inc.mainBizPct}% / 其他 ${inc.otherBizPct}% / 投资收益占比 ${inc.invIncomePct}%</span>
                </div>
              </div>

              <div class="fin-grid-5">
                <div class="fin-kpi-box">
                  <span class="fk-lbl">① 营业利润 (主业真实利润)</span>
                  <span class="fk-val">$${inc.opProfit}亿</span>
                  <span class="fk-sub">优先观察核心盈利能力</span>
                </div>
                <div class="fin-kpi-box">
                  <span class="fk-lbl">② 利润总额 (含营业外)</span>
                  <span class="fk-val">$${inc.totalProfit}亿</span>
                  <span class="fk-sub">含补贴/投资收益变动</span>
                </div>
                <div class="fin-kpi-box">
                  <span class="fk-lbl">③ 归母净利润 (市场常用)</span>
                  <span class="fk-val">$${inc.netProfitParent}亿</span>
                  <span class="fk-sub">销售净利率 ${inc.netMarginPct}%</span>
                </div>
                <div class="fin-kpi-box" style="border-color:var(--accent);">
                  <span class="fk-lbl" style="color:var(--accent);font-weight:700;">④ 扣非净利润 ★重中之重</span>
                  <span class="fk-val" style="color:var(--accent);">$${inc.deductNonNetProfit}亿</span>
                  <span class="fk-sub">剔除非经常性损益真实造血</span>
                </div>
                <div class="fin-kpi-box">
                  <span class="fk-lbl">⑤ 少数股东损益</span>
                  <span class="fk-val">$${inc.minorityProfit}亿</span>
                  <span class="fk-sub">子公司非上市权益占比低</span>
                </div>
              </div>

              <div class="fin-analysis-list">
                <div class="fin-analysis-item">
                  <strong>收入结构（分产品 & 分区域）</strong>
                  产品拆分：${escapeHtml(inc.revMix)}；区域结构：${escapeHtml(inc.geoMix)}。
                </div>
                <div class="fin-analysis-item">
                  <strong>量价拆解 & 收入确认质量</strong>
                  ${escapeHtml(inc.volPrice)} ${escapeHtml(inc.recognition)}
                </div>
                <div class="fin-analysis-item" style="grid-column:1 / -1;">
                  <strong>毛利率驱动因素拆解</strong>
                  ${escapeHtml(inc.gmDriver)}
                </div>
              </div>
            </div>

            <!-- 二、资产负债表 -->
            <div class="fin-part-card" id="fin-p2">
              <div class="fin-part-head">
                <h4>二、资产负债表（流动/非流动资产 · 有息/无息负债 · 偿债杠杆 · 股东权益）</h4>
                <span class="panel-badge">总资产 $${bal.totalAssets}亿 · 净资产 $${bal.equity}亿</span>
              </div>

              <div class="fin-grid-4">
                <div class="fin-kpi-box">
                  <span class="fk-lbl">资产负债率 / 有息负债率</span>
                  <span class="fk-val">${bal.debtRatio}% / ${bal.interestDebtRatio}%</span>
                  <span class="fk-sub">有息负债 $${bal.interestDebt}亿 · 经营占款 $${bal.operatingLiab}亿</span>
                </div>
                <div class="fin-kpi-box">
                  <span class="fk-lbl">流动比率 / 速动比率</span>
                  <span class="fk-val">${bal.currentRatio}x / ${bal.quickRatio}x</span>
                  <span class="fk-sub">短期偿债覆盖度（剔除存货检验）</span>
                </div>
                <div class="fin-kpi-box">
                  <span class="fk-lbl">净负债 (有息负债 − 货币资金)</span>
                  <span class="fk-val ${bal.netDebt <= 0 ? "val-up" : ""}">${bal.netDebt <= 0 ? "净现金 $" + Math.abs(bal.netDebt) + "亿" : "$" + bal.netDebt + "亿"}</span>
                  <span class="fk-sub">账面货币资金 $${bal.cash}亿</span>
                </div>
                <div class="fin-kpi-box">
                  <span class="fk-lbl">合同负债 (预收款景气度)</span>
                  <span class="fk-val">$${bal.contractLiab}亿</span>
                  <span class="fk-sub">客户预付款项与未来订单能见度</span>
                </div>
              </div>

              <div class="fin-analysis-list">
                <div class="fin-analysis-item">
                  <strong>流动资产 · 应收账款/票据与存货结构</strong>
                  应收账款 $${bal.arAmount}亿（占年营收 ${bal.arRatio}%，同比 +${bal.arYoY}%），${escapeHtml(bal.billNote)} 存货 $${bal.inventory}亿（${escapeHtml(bal.invStructure)}），${escapeHtml(bal.invNote)}
                </div>
                <div class="fin-analysis-item">
                  <strong>非流动资产 · 固定资产/在建工程/无形与商誉</strong>
                  固定资产 $${bal.fixedAssets}亿，在建工程 $${bal.cip}亿（需紧盯转固折旧节点）；商誉 $${bal.goodwill}亿（占净资产 ${bal.goodwillToEquity}%，${bal.goodwillToEquity > 35 ? "体量偏高需防并购减值雷" : "商誉减值风险较低"}）。
                </div>
                <div class="fin-analysis-item" style="grid-column:1 / -1;">
                  <strong>股东权益（留存收益 · 库存股回购 · 资本公积）</strong>
                  ${escapeHtml(bal.equityNote)}
                </div>
              </div>
            </div>

            <!-- 三、现金流量表 -->
            <div class="fin-part-card" id="fin-p3">
              <div class="fin-part-head">
                <h4>三、现金流量表（验证“账面利润”是否为“真金白银”）</h4>
                <span class="panel-badge">净现比 ${cf.ocfToNi}x · 收现比 ${cf.cashReceiveRatio}%</span>
              </div>

              <div class="fin-grid-4">
                <div class="fin-kpi-box">
                  <span class="fk-lbl">1. 经营活动现金流净额</span>
                  <span class="fk-val val-up">$${cf.ocf}亿</span>
                  <span class="fk-sub">经营现金流 / 归母净利 = ${cf.ocfToNi}x</span>
                </div>
                <div class="fin-kpi-box">
                  <span class="fk-lbl">销售收现比 (收现 / 营收)</span>
                  <span class="fk-val">${cf.cashReceiveRatio}%</span>
                  <span class="fk-sub">${cf.cashReceiveRatio >= 98 ? "回款质量优异" : "扩张期应收略占用现金"}</span>
                </div>
                <div class="fin-kpi-box">
                  <span class="fk-lbl">2. 投资活动 CAPEX 流出</span>
                  <span class="fk-val">$${cf.capex}亿</span>
                  <span class="fk-sub">资本开支占营收 ${cf.capexPctRev}%</span>
                </div>
                <div class="fin-kpi-box">
                  <span class="fk-lbl">自由现金流 (OCF − CAPEX)</span>
                  <span class="fk-val ${cf.fcf >= 0 ? "val-up" : "val-down"}">$${cf.fcf}亿</span>
                  <span class="fk-sub">3. 筹资分红率约 ${cf.dividendRate}%</span>
                </div>
              </div>
              <div class="fin-analysis-item">
                <strong>经营 · 投资 · 筹资三流拆解简评</strong>
                经营端销售商品收现覆盖采购、职工薪酬与税费支出，净现比 ${cf.ocfToNi}x；投资端资本开支重点投向下一代 AI 产线/算力基建扩产；筹资端：${escapeHtml(cf.financingNote)}
              </div>
            </div>

            <!-- 四、核心周转指标 & 五、盈利回报(杜邦ROE) 并排 -->
            <div class="fin-grid-2">
              <div class="fin-part-card" id="fin-p4" style="margin-bottom:14px;">
                <div class="fin-part-head">
                  <h4>四、核心周转指标（产业链议价与运营效率）</h4>
                  <span class="panel-badge">现金循环周期 ${turn.ccc} 天</span>
                </div>
                <div class="fin-grid-2">
                  <div class="fin-kpi-box">
                    <span class="fk-lbl">1. 应收账款周转天数 (DSO)</span>
                    <span class="fk-val">${turn.dso} 天</span>
                    <span class="fk-sub">越短说明对下游客户议价权越强</span>
                  </div>
                  <div class="fin-kpi-box">
                    <span class="fk-lbl">2. 存货周转天数 (DIO)</span>
                    <span class="fk-val">${turn.dio} 天</span>
                    <span class="fk-sub">科技硬件迭代快，紧盯防跌价</span>
                  </div>
                  <div class="fin-kpi-box">
                    <span class="fk-lbl">3. 应付账款周转天数 (DPO)</span>
                    <span class="fk-val">${turn.dpo} 天</span>
                    <span class="fk-sub">越长说明占用上游供应商资金越强势</span>
                  </div>
                  <div class="fin-kpi-box">
                    <span class="fk-lbl">4. 固定资产周转率</span>
                    <span class="fk-val">${turn.fixedAssetTurnover}x</span>
                    <span class="fk-sub">反映厂房/算力机房产能利用率</span>
                  </div>
                </div>
              </div>

              <div class="fin-part-card" id="fin-p5" style="margin-bottom:14px;">
                <div class="fin-part-head">
                  <h4>五、盈利回报指标（股东视角 · 杜邦 ROE 拆解）</h4>
                  <span class="panel-badge">ROA ${ret.roa}% · 分红率 ${ret.dividendRate}%</span>
                </div>
                <div class="dupont-eq">
                  <div class="dupont-term">
                    <span>ROE 净资产收益率</span>
                    <strong style="color:var(--positive);">${ret.roe}%</strong>
                  </div>
                  <span class="dupont-op">=</span>
                  <div class="dupont-term">
                    <span>销售净利率</span>
                    <strong>${ret.netMarginPct}%</strong>
                  </div>
                  <span class="dupont-op">×</span>
                  <div class="dupont-term">
                    <span>资产周转率</span>
                    <strong>${ret.assetTurnover}x</strong>
                  </div>
                  <span class="dupont-op">×</span>
                  <div class="dupont-term">
                    <span>权益乘数(杠杆)</span>
                    <strong>${ret.equityMultiplier}x</strong>
                  </div>
                </div>
                <div class="fin-analysis-item">
                  <strong>杜邦质量诊断</strong>
                  ${ret.netMarginPct >= 18 ? "属于典型【高净利率盈利驱动型】优质 ROE，并非靠激进财务杠杆堆砌" : ret.assetTurnover >= 0.95 ? "属于【高周转规模效率驱动型】ROE，靠供应链快转与规模摊薄创造股东回报" : "ROE 由盈利与适度资本杠杆共同驱动，随新产能释放净利率与周转率具备进一步上行空间"}；剔除杠杆后 ROA 达 ${ret.roa}%。
                </div>
              </div>
            </div>

            <!-- 六、三张表联动交叉检验 -->
            <div class="fin-part-card" id="fin-p6" style="margin-bottom:0;">
              <div class="fin-part-head">
                <h4>六、三张表联动交叉验证（投研排雷与含金量核查）</h4>
                <span class="panel-badge">6 项自动交叉检验</span>
              </div>
              <div class="crosscheck-grid">
                ${prof.crossChecks.map((cc) => `
                  <div class="cc-card ${cc.status === "warn" ? "warn" : ""}">
                    <div class="cc-head">
                      <strong>${escapeHtml(cc.title)}</strong>
                      <span class="cc-tag">${escapeHtml(cc.tag)}</span>
                    </div>
                    <p>${escapeHtml(cc.detail)}</p>
                  </div>`).join("")}
              </div>
            </div>
          </section>

          <!-- ==================== 模块 3: 综合上述指标 · 企业经营优劣势总结 ==================== -->
          <section class="fin-module-block">
            <div class="fin-module-head">
              <div class="fin-module-title">
                <span class="fin-module-num">03</span>
                <h3>综合财务诊断 · 企业经营优势与劣势总结</h3>
              </div>
              <span class="panel-badge">基于三表联动与杜邦框架自动生成</span>
            </div>

            <div class="verdict-banner">
              <div style="display:flex;align-items:center;gap:16px;flex:1;min-width:260px;">
                <div class="score-circle">${sum.totalScore}</div>
                <div>
                  <div style="font-size:12px;color:var(--text-muted);margin-bottom:2px;">AI 投研综合财务健康评分（满分 100）</div>
                  <div style="font-size:14.5px;font-weight:700;color:var(--text-primary);">${escapeHtml(sum.verdict)}</div>
                </div>
              </div>
            </div>

            <div class="score-bars">
              <div class="score-bar-item">
                <div class="sb-top"><span>盈利护城河与成长</span><strong>${sum.scores.profit}</strong></div>
                <div class="sb-track"><div class="sb-fill" style="width:${sum.scores.profit}%;"></div></div>
              </div>
              <div class="score-bar-item">
                <div class="sb-top"><span>现金流含金量</span><strong>${sum.scores.cash}</strong></div>
                <div class="sb-track"><div class="sb-fill" style="width:${sum.scores.cash}%;"></div></div>
              </div>
              <div class="score-bar-item">
                <div class="sb-top"><span>资产安全与杠杆</span><strong>${sum.scores.safety}</strong></div>
                <div class="sb-track"><div class="sb-fill" style="width:${sum.scores.safety}%;"></div></div>
              </div>
              <div class="score-bar-item">
                <div class="sb-top"><span>股东回报 (ROE/分红)</span><strong>${sum.scores.ret}</strong></div>
                <div class="sb-track"><div class="sb-fill" style="width:${sum.scores.ret}%;"></div></div>
              </div>
            </div>

            <div class="sw-grid">
              <div class="sw-box pros">
                <h4>▲ 核心经营优势（Strengths）</h4>
                <ul>
                  ${sum.strengths.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}
                </ul>
              </div>
              <div class="sw-box cons">
                <h4>▼ 核心经营劣势与潜在风险（Weaknesses & Watchlist）</h4>
                <ul>
                  ${sum.weaknesses.map((w) => `<li>${escapeHtml(w)}</li>`).join("")}
                </ul>
              </div>
            </div>
          </section>
        </div>`;

      // Render P4-style chart
      window.AICharts.renderP4FinancialTrendChart(
        document.getElementById("p4TrendChartBox"),
        prof.p4Series[sMode],
        mMode,
        unitLabel
      );

      // Bind controls
      document.querySelectorAll("#p4SeriesSwitch .seg-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          appState.p4SeriesMode = btn.dataset.smode;
          renderDrawerBody(c);
        });
      });
      document.querySelectorAll("#p4MetricSwitch .seg-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          appState.p4MetricMode = btn.dataset.mmode;
          renderDrawerBody(c);
        });
      });
      document.querySelectorAll("#drawerPeriodSwitch .seg-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          appState.drawerPeriod = btn.dataset.period;
          renderDrawerBody(c);
        });
      });
      body.querySelectorAll("[data-fin-jump]").forEach((btn) => {
        btn.addEventListener("click", () => {
          body.querySelectorAll("[data-fin-jump]").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          const target = document.getElementById(btn.dataset.finJump);
          if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
    } else if (tab === "products") {
      const allLinks = [...(window.AIChainData.links || []), ...(window.AIChainData.upstream3DLinks || [])];
      const dedupeLinks = (arr) => {
        const seen = new Set();
        return arr.filter((l) => {
          const k = `${l.from}->${l.to}`;
          if (seen.has(k)) return false;
          seen.add(k);
          return true;
        });
      };
      const upLinks = dedupeLinks(allLinks.filter((l) => l.to === c.id));
      const downLinks = dedupeLinks(allLinks.filter((l) => l.from === c.id));

      body.innerHTML = `
        <div class="drawer-body-inner">
          <div class="drawer-section">
            <h4>核心护城河与产业链定位</h4>
            <div class="policy-impact-box">${escapeHtml(c.moat)}</div>
          </div>

          <div class="drawer-section">
            <h4>主要 AI 产品与技术平台（图示化产品矩阵）</h4>
            <div class="product-grid">
              ${c.products.map((p, idx) => `
                <div class="product-card">
                  ${window.AIProductVisuals ? window.AIProductVisuals.renderProductBannerSvg(p, c, idx) : ""}
                  <div class="product-card-body">
                    <span class="product-cat">${escapeHtml(p.category)}</span>
                    <h5>${escapeHtml(p.name)}</h5>
                    <p>${escapeHtml(p.desc)}</p>
                  </div>
                </div>`).join("")}
            </div>
          </div>

          <div class="drawer-section">
            <h4>核心应用领域与商业落地场景</h4>
            <div class="app-visual-grid">
              ${c.applications.map((a, idx) => window.AIProductVisuals
                ? window.AIProductVisuals.renderApplicationCardVisual(escapeHtml(a), idx)
                : `<span class="chip active">${escapeHtml(a)}</span>`).join("")}
            </div>
          </div>

          <div class="fin-grid-2">
            <div class="drawer-section" style="margin-bottom:0;">
              <h4>直接上游供应 / 技术支撑 (${upLinks.length})</h4>
              <div class="relation-chips">
                ${upLinks.length ? upLinks.map((lk) => {
                  const partner = getCompanyById(lk.from);
                  if (!partner) return "";
                  return `<button class="rel-chip" data-jump-id="${partner.id}">
                    <strong>${escapeHtml(partner.name)}</strong>
                    <small>· ${escapeHtml(lk.label)}</small>
                  </button>`;
                }).join("") : `<span style="color:var(--text-muted);font-size:12.5px;">位于产业链最上游设备/材料源头</span>`}
              </div>
            </div>

            <div class="drawer-section" style="margin-bottom:0;">
              <h4>直接下游客户 / 生态赋能 (${downLinks.length})</h4>
              <div class="relation-chips">
                ${downLinks.length ? downLinks.map((lk) => {
                  const partner = getCompanyById(lk.to);
                  if (!partner) return "";
                  return `<button class="rel-chip" data-jump-id="${partner.id}">
                    <strong>${escapeHtml(partner.name)}</strong>
                    <small>· ${escapeHtml(lk.label)}</small>
                  </button>`;
                }).join("") : `<span style="color:var(--text-muted);font-size:12.5px;">直接面向全球终端消费者及行业企业客户</span>`}
              </div>
            </div>
          </div>
        </div>`;

      body.querySelectorAll("[data-jump-id]").forEach((btn) => {
        btn.addEventListener("click", () => openCompanyDrawer(btn.dataset.jumpId, "products"));
      });
    } else if (tab === "policy") {
      const matched = window.AIChainData.policies.filter(
        (p) => p.companies.includes(c.id) || p.tiers.includes(c.tier)
      );
      body.innerHTML = `<div class="drawer-body-inner">${matched.length ? matched.map((p) => `
        <div class="drawer-section">
          <div class="policy-meta" style="margin-bottom:8px;">
            <div class="policy-badges">
              <span class="mini-pill">${escapeHtml(p.region)}</span>
              <span class="impact-badge impact-${p.impact}">${escapeHtml(p.impactLabel)}</span>
              ${p.companies.includes(c.id) ? `<span class="hint-badge">直接关联</span>` : ""}
            </div>
            <span class="policy-date">${escapeHtml(p.date)}</span>
          </div>
          <h4>${escapeHtml(p.title)}</h4>
          <p style="margin:0 0 10px;font-size:13px;color:var(--text-secondary);">${escapeHtml(p.summary)}</p>
          <div class="policy-impact-box"><strong>产业链影响评估：</strong>${escapeHtml(p.chainImpact)}</div>
        </div>`).join("") : `<div class="empty-state">暂无直接关联政策记录</div>`}</div>`;
    } else if (tab === "research") {
      const relatedReports = window.AIChainData.researchReports.filter(
        (r) => r.companies.includes(c.id) || r.tier === c.tier
      );
      body.innerHTML = `
        <div class="drawer-body-inner">
          <div class="drawer-section">
            <h4>机构一致性观点摘要 <span class="rating-pill">${escapeHtml(c.research.consensus)}</span></h4>
            <p style="margin:0 0 10px;font-size:13px;color:var(--text-secondary);">
              <strong>代表覆盖机构：</strong>${escapeHtml(c.research.broker)}
            </p>
            <div class="policy-impact-box" style="margin-bottom:12px;">
              <strong>核心投资逻辑：</strong>${escapeHtml(c.research.thesis)}
            </div>
            <div class="catalyst-row">
              <div class="cat-box cat-bull">
                <span>▲ 关键上行催化</span>
                ${escapeHtml(c.research.catalysts)}
              </div>
              <div class="cat-box cat-risk">
                <span>▼ 核心风险提示</span>
                ${escapeHtml(c.research.risks)}
              </div>
            </div>
          </div>

          <h4 style="margin:14px 0 10px;font-size:14px;">关联行业深度研报 (${relatedReports.length})</h4>
          ${relatedReports.map((r) => `
            <div class="drawer-section">
              <div class="research-head" style="margin-bottom:6px;">
                <span class="broker-name">${escapeHtml(r.broker)}</span>
                <span class="policy-date">${escapeHtml(r.date)}</span>
              </div>
              <h4 style="margin-bottom:6px;">${escapeHtml(r.title)}</h4>
              <p style="margin:0;font-size:12.8px;color:var(--text-secondary);">${escapeHtml(r.summary)}</p>
            </div>`).join("")}
        </div>`;
    } else if (tab === "news") {
      const related = appState.newsItems.filter(
        (n) => (n.companies && n.companies.includes(c.id)) || n.tier === c.tier
      );
      body.innerHTML = `<div class="drawer-body-inner">${related.length ? related.map((n) => `
        <div class="drawer-section">
          <div class="news-meta">
            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
              ${n.isLive ? `<span class="live-news-badge">实时抓取</span>` : ""}
              <span class="ticker-tag ${escapeHtml(n.sentiment)}">${SENTIMENT_LABELS[n.sentiment] || "资讯"}</span>
              <span>${escapeHtml(n.source)}</span>
              ${n.companies && n.companies.includes(c.id) ? `<span class="hint-badge">直接提及</span>` : ""}
            </div>
            <span class="policy-date">${escapeHtml(n.date)} ${escapeHtml(n.time || "")}</span>
          </div>
          <h4 style="margin-bottom:6px;">${escapeHtml(n.title)}</h4>
          <p style="margin:0 0 8px;font-size:13px;color:var(--text-secondary);">${escapeHtml(n.summary)}</p>
          ${n.link ? `<a class="news-ext-link" href="${escapeHtml(n.link)}" target="_blank" rel="noopener noreferrer">查看原文 ↗</a>` : ""}
        </div>`).join("") : `<div class="empty-state">暂无相关资讯</div>`}</div>`;
    }
  }

  function bindDrawerEvents() {
    document.getElementById("drawerBackdrop").addEventListener("click", closeCompanyDrawer);
    document.querySelectorAll(".drawer-tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        appState.drawerTab = btn.dataset.tab;
        renderDrawerTabs();
        const comp = getCompanyById(appState.activeCompanyId);
        if (comp) renderDrawerBody(comp);
      });
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeCompanyDrawer();
        closeComposerModal();
      }
    });
  }

  /* ==================== VIEW 2: FINANCIALS MATRIX ==================== */
  function bindFinancialControls() {
    document.querySelectorAll("#matrixPeriodSwitch .seg-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#matrixPeriodSwitch .seg-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        appState.finPeriod = btn.dataset.period;
        renderFinancialsView();
      });
    });

    document.querySelectorAll("#finTierFilter .chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#finTierFilter .chip").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        appState.finTier = btn.dataset.tier;
        renderFinancialsView();
      });
    });

    document.querySelectorAll("#financialTable th.sortable").forEach((th) => {
      th.addEventListener("click", () => {
        const key = th.dataset.sort;
        if (appState.finSortKey === key) {
          appState.finSortAsc = !appState.finSortAsc;
        } else {
          appState.finSortKey = key;
          appState.finSortAsc = false;
        }
        renderFinancialsView();
      });
    });
  }

  function renderFinancialsView() {
    const pKey = appState.finPeriod;
    const q = appState.searchQuery.trim().toLowerCase();

    document.getElementById("finChartPeriodLabel").textContent = PERIOD_LABELS[pKey];

    let list = window.AIChainData.companies.filter((c) => {
      if (appState.finTier !== "ALL" && c.tier !== appState.finTier) return false;
      if (!q) return true;
      return (c.name + " " + c.ticker + " " + c.subSegment + " " + c.marketLabel).toLowerCase().includes(q);
    });

    window.AICharts.renderTierComparisonChart(
      document.getElementById("tierComparisonChart"),
      window.AIChainData.companies,
      pKey
    );
    window.AICharts.renderTopGrowthChart(
      document.getElementById("topGrowthChart"),
      list.length ? list : window.AIChainData.companies,
      pKey,
      (id) => {
        appState.drawerPeriod = pKey;
        openCompanyDrawer(id, "financials");
      }
    );

    const k = appState.finSortKey;
    const dir = appState.finSortAsc ? 1 : -1;
    const liveQuotes = (window.AIChainLive && window.AIChainLive.quotes) || {};
    list.sort((a, b) => {
      const fa = a.financials[pKey];
      const fb = b.financials[pKey];
      let va = 0;
      let vb = 0;
      if (k === "liveChange") {
        va = liveQuotes[a.id] ? liveQuotes[a.id].changePercent : -999;
        vb = liveQuotes[b.id] ? liveQuotes[b.id].changePercent : -999;
      }
      else if (k === "marketCap") { va = a.marketCap; vb = b.marketCap; }
      else if (k === "revenue") { va = fa.revenueNum; vb = fb.revenueNum; }
      else if (k === "revYoY") { va = fa.revYoY; vb = fb.revYoY; }
      else if (k === "netIncome") {
        va = fa.series && fa.series.length ? fa.series[fa.series.length - 1].ni : 0;
        vb = fb.series && fb.series.length ? fb.series[fb.series.length - 1].ni : 0;
      }
      else if (k === "niYoY") { va = fa.niYoY; vb = fb.niYoY; }
      else if (k === "grossMargin") { va = fa.grossMargin; vb = fb.grossMargin; }
      else if (k === "rdRatio") { va = fa.rdRatio; vb = fb.rdRatio; }
      return (va - vb) * dir;
    });

    const tbody = document.getElementById("financialTableBody");
    tbody.innerHTML = list.map((c) => {
      const f = c.financials[pKey];
      const lq = liveQuotes[c.id];
      const liveCell = lq
        ? `<div style="font-weight:700;">${formatLivePrice(lq)}</div>
           <div class="${lq.changePercent >= 0 ? "val-up" : "val-down"}" style="font-size:11.5px;font-weight:700;">${lq.changePercent > 0 ? "+" : ""}${lq.changePercent.toFixed(2)}%</div>`
        : `<span style="color:var(--text-muted);">--</span>`;
      return `
        <tr data-company-id="${c.id}">
          <td>
            <div style="font-weight:700;">${escapeHtml(c.name)}</div>
            <div class="node-ticker">${escapeHtml(c.ticker)}</div>
          </td>
          <td><span class="tier-pill ${c.tier}">${TIER_LABELS[c.tier]}</span></td>
          <td><span class="market-badge mkt-${c.market}">${c.marketLabel}</span></td>
          <td class="num">${liveCell}</td>
          <td class="num" style="font-weight:700;">${c.marketCap.toLocaleString()}</td>
          <td class="num">${escapeHtml(f.revenue)}</td>
          <td class="num ${f.revYoY >= 0 ? "val-up" : "val-down"}" style="font-weight:700;">${f.revYoY >= 0 ? "+" : ""}${f.revYoY.toFixed(1)}%</td>
          <td class="num">${escapeHtml(f.netIncome)}</td>
          <td class="num ${f.niYoY >= 0 ? "val-up" : "val-down"}">${f.niYoY >= 0 ? "+" : ""}${f.niYoY.toFixed(1)}%</td>
          <td class="num">${f.grossMargin.toFixed(1)}%</td>
          <td class="num">${f.rdRatio.toFixed(1)}%</td>
          <td style="max-width:300px;font-size:12px;color:var(--text-secondary);">${escapeHtml(f.highlight)}</td>
        </tr>`;
    }).join("");

    tbody.querySelectorAll("tr").forEach((tr) => {
      tr.addEventListener("click", () => {
        appState.drawerPeriod = pKey;
        openCompanyDrawer(tr.dataset.companyId, "financials");
      });
    });
  }

  /* ==================== VIEW 3: POLICY TRACKER ==================== */
  function bindPolicyControls() {
    document.querySelectorAll("#policyRegionFilter .chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#policyRegionFilter .chip").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        appState.policyRegion = btn.dataset.region;
        renderPolicyView();
      });
    });

    document.querySelectorAll("#policyImpactFilter .chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#policyImpactFilter .chip").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        appState.policyImpact = btn.dataset.impact;
        renderPolicyView();
      });
    });
  }

  function renderPolicyView() {
    const q = appState.searchQuery.trim().toLowerCase();
    const list = window.AIChainData.policies.filter((p) => {
      if (appState.policyRegion !== "ALL" && p.region !== appState.policyRegion) return false;
      if (appState.policyImpact !== "ALL" && p.impact !== appState.policyImpact) return false;
      if (!q) return true;
      return (p.title + " " + p.summary + " " + p.chainImpact + " " + p.region).toLowerCase().includes(q);
    });

    const grid = document.getElementById("policyGrid");
    if (!list.length) {
      grid.innerHTML = `<div class="empty-state">当前筛选条件下暂无匹配政策条目</div>`;
      return;
    }

    grid.innerHTML = list.map((p) => `
      <article class="policy-card">
        <div class="policy-meta">
          <div class="policy-badges">
            <span class="mini-pill">${escapeHtml(p.region)}</span>
            <span class="impact-badge impact-${p.impact}">${escapeHtml(p.impactLabel)}</span>
            ${p.tiers.map((t) => `<span class="tier-pill ${t}">${TIER_LABELS[t].split(" · ")[0]}</span>`).join("")}
          </div>
          <span class="policy-date">${escapeHtml(p.date)}</span>
        </div>
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.summary)}</p>
        <div class="policy-impact-box">
          <strong>产业链传导影响：</strong>${escapeHtml(p.chainImpact)}
        </div>
        <div class="relation-chips">
          ${p.companies.map((id) => {
            const c = getCompanyById(id);
            return c ? `<button class="rel-chip" data-open-company="${c.id}" data-open-tab="policy">${escapeHtml(c.name.split(" ")[0])} <small>${escapeHtml(c.ticker)}</small></button>` : "";
          }).join("")}
        </div>
      </article>`).join("");

    bindCompanyJumpButtons(grid);
  }

  /* ==================== VIEW 4: RESEARCH HIGHLIGHTS ==================== */
  function bindResearchControls() {
    document.querySelectorAll("#researchTierFilter .chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#researchTierFilter .chip").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        appState.researchTier = btn.dataset.tier;
        renderResearchView();
      });
    });
  }

  function renderResearchView() {
    const q = appState.searchQuery.trim().toLowerCase();
    const list = window.AIChainData.researchReports.filter((r) => {
      if (appState.researchTier !== "ALL" && r.tier !== appState.researchTier) return false;
      if (!q) return true;
      return (r.title + " " + r.broker + " " + r.summary + " " + r.catalysts).toLowerCase().includes(q);
    });

    const grid = document.getElementById("researchGrid");
    if (!list.length) {
      grid.innerHTML = `<div class="empty-state">当前筛选条件下暂无研报记录</div>`;
      return;
    }

    grid.innerHTML = list.map((r) => `
      <article class="research-card">
        <div class="research-head">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
            <span class="tier-pill ${r.tier}">${TIER_LABELS[r.tier]}</span>
            <span class="broker-name">${escapeHtml(r.broker)}</span>
          </div>
          <span class="rating-pill">${escapeHtml(r.rating)}</span>
        </div>
        <h3>${escapeHtml(r.title)}</h3>
        <p class="research-thesis">${escapeHtml(r.summary)}</p>
        <div class="catalyst-row">
          <div class="cat-box cat-bull">
            <span>▲ 核心催化</span>
            ${escapeHtml(r.catalysts)}
          </div>
          <div class="cat-box cat-risk">
            <span>▼ 风险提示</span>
            ${escapeHtml(r.risks)}
          </div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-top:auto;">
          <div class="relation-chips">
            ${r.companies.map((id) => {
              const c = getCompanyById(id);
              return c ? `<button class="rel-chip" data-open-company="${c.id}" data-open-tab="research">${escapeHtml(c.name.split(" ")[0])} <small>${escapeHtml(c.ticker)}</small></button>` : "";
            }).join("")}
          </div>
          <span class="policy-date">${escapeHtml(r.date)}</span>
        </div>
      </article>`).join("");

    bindCompanyJumpButtons(grid);
  }

  /* ==================== VIEW 5: DAILY NEWS & COMPOSER ==================== */
  function bindNewsControls() {
    document.querySelectorAll("#newsTierFilter .chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#newsTierFilter .chip").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        appState.newsTier = btn.dataset.tier;
        renderNewsView();
      });
    });

    document.querySelectorAll("#newsSentimentFilter .chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#newsSentimentFilter .chip").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        appState.newsSentiment = btn.dataset.sentiment;
        renderNewsView();
      });
    });

    document.getElementById("openComposerBtn").addEventListener("click", openComposerModal);
    document.getElementById("newsAddBtn").addEventListener("click", openComposerModal);
    document.getElementById("closeComposerBtn").addEventListener("click", closeComposerModal);
    document.getElementById("cancelComposerBtn").addEventListener("click", closeComposerModal);
    document.getElementById("composerBackdrop").addEventListener("click", closeComposerModal);

    document.getElementById("newsComposerForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("newsTitleInput").value.trim();
      const tier = document.getElementById("newsTierInput").value;
      const sentiment = document.getElementById("newsSentimentInput").value;
      const source = document.getElementById("newsSourceInput").value.trim() || "自选投研笔记";
      const summary = document.getElementById("newsSummaryInput").value.trim();
      const rawCodes = document.getElementById("newsCompaniesInput").value.trim();

      const matchedIds = [];
      if (rawCodes) {
        rawCodes.split(/[,，\s]+/).forEach((tok) => {
          const t = tok.toUpperCase();
          const hit = window.AIChainData.companies.find(
            (c) => c.ticker.toUpperCase() === t || c.id.toUpperCase() === t || c.name.toUpperCase().includes(t)
          );
          if (hit && !matchedIds.includes(hit.id)) matchedIds.push(hit.id);
        });
      }

      const now = new Date();
      const dateStr = now.toISOString().slice(0, 10);
      const timeStr = now.toTimeString().slice(0, 5);

      saveCustomNews({
        id: "custom-" + Date.now(),
        date: dateStr,
        time: timeStr,
        tier,
        sentiment,
        source,
        title,
        summary,
        companies: matchedIds
      });

      e.target.reset();
      document.getElementById("newsSourceInput").value = "自选投研笔记";
      closeComposerModal();
      renderTicker();
      renderNewsView();
      switchView("news");
    });

    document.getElementById("exportDataBtn").addEventListener("click", () => {
      const payload = {
        exportedAt: new Date().toISOString(),
        companies: window.AIChainData.companies,
        policies: window.AIChainData.policies,
        researchReports: window.AIChainData.researchReports,
        dailyNews: appState.newsItems
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ai-chain-research-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  function openComposerModal() {
    document.getElementById("composerBackdrop").hidden = false;
    document.getElementById("composerModal").hidden = false;
    document.getElementById("newsTitleInput").focus();
  }

  function closeComposerModal() {
    document.getElementById("composerBackdrop").hidden = true;
    document.getElementById("composerModal").hidden = true;
  }

  function renderNewsView() {
    const q = appState.searchQuery.trim().toLowerCase();
    const list = appState.newsItems.filter((n) => {
      if (appState.newsTier !== "ALL" && n.tier !== appState.newsTier) return false;
      if (appState.newsSentiment !== "ALL" && n.sentiment !== appState.newsSentiment) return false;
      if (!q) return true;
      return (n.title + " " + n.summary + " " + n.source).toLowerCase().includes(q);
    });

    const feed = document.getElementById("newsFeed");
    if (!list.length) {
      feed.innerHTML = `<div class="empty-state">当前筛选条件下暂无匹配资讯</div>`;
    } else {
      feed.innerHTML = list.map((n) => `
        <article class="news-card">
          <div class="news-meta">
            <div style="display:flex;align-items:center;gap:7px;flex-wrap:wrap;">
              ${n.isLive ? `<span class="live-news-badge">实时抓取</span>` : ""}
              <span class="ticker-tag ${escapeHtml(n.sentiment)}">${SENTIMENT_LABELS[n.sentiment] || "资讯"}</span>
              <span class="tier-pill ${n.tier === "macro" ? "midstream" : n.tier}">${TIER_LABELS[n.tier] || "综合"}</span>
              <span>${escapeHtml(n.source)}</span>
            </div>
            <span class="policy-date">${escapeHtml(n.date)} ${escapeHtml(n.time || "")}</span>
          </div>
          <h3>${escapeHtml(n.title)}</h3>
          <p>${escapeHtml(n.summary)}</p>
          <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;">
            <div class="relation-chips">
              ${(n.companies || []).map((id) => {
                const c = getCompanyById(id);
                return c ? `<button class="rel-chip" data-open-company="${c.id}" data-open-tab="news">${escapeHtml(c.name.split(" ")[0])} <small>${escapeHtml(c.ticker)}</small></button>` : "";
              }).join("")}
            </div>
            ${n.link ? `<a class="news-ext-link" href="${escapeHtml(n.link)}" target="_blank" rel="noopener noreferrer">查看原文 ↗</a>` : ""}
          </div>
        </article>`).join("");

      bindCompanyJumpButtons(feed);
    }

    // Hot companies frequency sidebar
    const counts = {};
    appState.newsItems.forEach((n) => {
      (n.companies || []).forEach((id) => {
        counts[id] = (counts[id] || 0) + 1;
      });
    });
    const topHot = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);

    const hotList = document.getElementById("hotTopicsList");
    hotList.innerHTML = topHot.map(([id, cnt]) => {
      const c = getCompanyById(id);
      if (!c) return "";
      return `
        <div class="hot-topic-row" data-open-company="${c.id}" data-open-tab="news">
          <span><strong>${escapeHtml(c.name.split(" ")[0])}</strong> <small style="color:var(--text-muted);font-family:var(--font-mono);">${escapeHtml(c.ticker)}</small></span>
          <span class="panel-badge">${cnt} 条提及</span>
        </div>`;
    }).join("");
    bindCompanyJumpButtons(hotList);
  }

  function bindCompanyJumpButtons(root) {
    root.querySelectorAll("[data-open-company]").forEach((el) => {
      el.addEventListener("click", () => {
        openCompanyDrawer(el.dataset.openCompany, el.dataset.openTab || "financials");
      });
    });
  }

  /* ==================== VIEW 1.5: 3D UPSTREAM CHAIN ==================== */
  function bindUpstream3DControls() {
    const jumpBtn = document.getElementById("jumpUpstream3dBtn");
    if (jumpBtn) {
      jumpBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        switchView("upstream3d");
      });
    }

    document.querySelectorAll("#u3dLayoutSwitch .seg-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#u3dLayoutSwitch .seg-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        if (window.AIUpstream3D) window.AIUpstream3D.setLayout(btn.dataset.layout);
      });
    });

    document.querySelectorAll("#u3dStageFilter .chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("#u3dStageFilter .chip").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        if (window.AIUpstream3D) window.AIUpstream3D.focusStage(btn.dataset.stage);
      });
    });

    const mktSel = document.getElementById("u3dMarketSelect");
    if (mktSel) {
      mktSel.addEventListener("change", (e) => {
        if (window.AIUpstream3D) window.AIUpstream3D.setMarketFilter(e.target.value);
      });
    }

    const autoBtn = document.getElementById("u3dAutoRotateBtn");
    if (autoBtn) {
      autoBtn.addEventListener("click", () => {
        if (window.AIUpstream3D) window.AIUpstream3D.toggleAutoRotate();
      });
    }

    const resetBtn = document.getElementById("u3dResetBtn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (window.AIUpstream3D) window.AIUpstream3D.resetCamera();
      });
    }
  }

  function renderUpstreamBreakdown() {
    const grid = document.getElementById("u3dStageBreakdown");
    if (!grid) return;
    const stages = window.AIChainData.upstreamStages || [];
    const quotes = (window.AIChainLive && window.AIChainLive.quotes) || {};

    grid.innerHTML = stages.map((st) => {
      const list = window.AIChainData.companies
        .filter((c) => c.tier === "upstream" && c.upstreamStage === st.id)
        .sort((a, b) => b.marketCap - a.marketCap);

      return `
        <div class="u3d-stage-card" style="--stage-color:${st.color};">
          <span class="tier-tag" style="color:${st.color};">${st.code}</span>
          <h4>${escapeHtml(st.name)}</h4>
          <p>${escapeHtml(st.desc)}</p>
          <div class="u3d-mini-list">
            ${list.map((c) => {
              const lq = quotes[c.id];
              const rightMetric = lq
                ? `<span style="font-family:var(--font-mono);font-size:11.5px;"><strong>${formatLivePrice(lq)}</strong> <span class="${lq.changePercent >= 0 ? "val-up" : "val-down"}">${lq.changePercent > 0 ? "+" : ""}${lq.changePercent.toFixed(2)}%</span></span>`
                : `<span style="font-family:var(--font-mono);font-size:11.5px;color:var(--text-secondary);">${formatCap(c.marketCap)}</span>`;
              return `
                <div class="u3d-mini-row" data-open-company="${c.id}" data-open-tab="financials">
                  <div style="display:flex;align-items:center;gap:6px;min-width:0;">
                    <span class="market-badge mkt-${c.market}" style="font-size:9.5px;padding:1px 5px;">${c.marketLabel}</span>
                    <strong style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(c.name.split(" ")[0])}</strong>
                    <span class="node-ticker">${escapeHtml(c.ticker)}</span>
                  </div>
                  ${rightMetric}
                </div>`;
            }).join("")}
          </div>
        </div>`;
    }).join("");

    bindCompanyJumpButtons(grid);
  }

  /* ==================== Bootstrap ==================== */
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    loadNews();
    renderTicker();
    bindNavigation();
    bindChainControls();
    bindUpstream3DControls();
    bindDrawerEvents();
    bindFinancialControls();
    bindPolicyControls();
    bindResearchControls();
    bindNewsControls();

    window.AIChainGraph.init({
      onSelectCompany: (id) => openCompanyDrawer(id, "financials")
    });
    window.AIChainGraph.render();

    if (window.AIUpstream3D) {
      window.AIUpstream3D.init({
        onSelectCompany: (id) => openCompanyDrawer(id, "financials")
      });
    }

    // Live sync controls & auto-polling
    const liveBtn = document.getElementById("liveSyncBtn");
    if (liveBtn) {
      liveBtn.addEventListener("click", async () => {
        updateLiveStatusPill("syncing", "正在刷新股价与资讯...");
        await Promise.all([syncLiveQuotes(true), syncLiveNews(true)]);
      });
    }
    const refreshNewsBtn = document.getElementById("refreshLiveNewsBtn");
    if (refreshNewsBtn) {
      refreshNewsBtn.addEventListener("click", async () => {
        refreshNewsBtn.disabled = true;
        refreshNewsBtn.textContent = "正在抓取全网资讯...";
        await syncLiveNews(true);
        refreshNewsBtn.disabled = false;
        refreshNewsBtn.textContent = "↻ 实时抓取资讯";
      });
    }

    syncLiveQuotes(false);
    syncLiveNews(false);
    setInterval(() => syncLiveQuotes(false), 60 * 1000);
    setInterval(() => syncLiveNews(false), 5 * 60 * 1000);
  });
})();
