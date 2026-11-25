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
      <div class="drawer-top-row">
        <div class="drawer-title-group">
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
            <span class="tier-pill ${c.tier}">${TIER_LABELS[c.tier]}</span>
            <span class="market-badge mkt-${c.market}">${c.marketLabel} · ${escapeHtml(c.exchange)}</span>
            <span class="mini-pill">${escapeHtml(c.subSegment)}</span>
          </div>
          <h2>
            ${escapeHtml(c.name)}
            <span class="node-ticker" style="font-size:14px;">${escapeHtml(c.ticker)}</span>
          </h2>
          <div style="font-size:12.5px;color:var(--text-secondary);">${escapeHtml(c.role)}</div>
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
      </div>`;

    document.getElementById("closeDrawerBtn").addEventListener("click", closeCompanyDrawer);
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
      const unitLabel = "亿美元口径";
      body.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:14px;">
          <div class="segmented-control" id="drawerPeriodSwitch">
            <button class="seg-btn ${pKey === "quarterly" ? "active" : ""}" data-period="quarterly">季报 (Q)</button>
            <button class="seg-btn ${pKey === "semiannual" ? "active" : ""}" data-period="semiannual">半年报 (H1)</button>
            <button class="seg-btn ${pKey === "annual" ? "active" : ""}" data-period="annual">年报 (FY)</button>
          </div>
          <span class="panel-badge">报告期：${escapeHtml(fin.period)}</span>
        </div>

        <div class="drawer-section">
          <h4>核心财务指标快照 <span>${escapeHtml(fin.period)}</span></h4>
          <div class="drawer-kpi-row" style="margin-top:4px;">
            <div class="dkpi"><span>营业收入</span><strong>${escapeHtml(fin.revenue)}</strong></div>
            <div class="dkpi"><span>营收同比</span><strong class="${fin.revYoY >= 0 ? "val-up" : "val-down"}">${fin.revYoY >= 0 ? "+" : ""}${fin.revYoY.toFixed(1)}%</strong></div>
            <div class="dkpi"><span>净利润 (${fin.niYoY >= 0 ? "+" : ""}${fin.niYoY.toFixed(1)}%)</span><strong>${escapeHtml(fin.netIncome)}</strong></div>
            <div class="dkpi"><span>毛利率 / 研发率</span><strong>${fin.grossMargin.toFixed(1)}% / ${fin.rdRatio.toFixed(1)}%</strong></div>
          </div>
          <div class="policy-impact-box" style="margin-top:12px;">
            <strong>业绩核心亮点：</strong>${escapeHtml(fin.highlight)}
          </div>
        </div>

        <div class="drawer-section">
          <h4>历史周期营收与净利润趋势图</h4>
          <div id="drawerTrendChart"></div>
        </div>

        <div class="drawer-section">
          <h4>定期报告深度拆解</h4>
          <ul class="bullet-list">
            ${fin.takeaways.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}
          </ul>
        </div>`;

      window.AICharts.renderCompanyTrendChart(
        document.getElementById("drawerTrendChart"),
        fin.series,
        unitLabel
      );

      document.querySelectorAll("#drawerPeriodSwitch .seg-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          appState.drawerPeriod = btn.dataset.period;
          renderDrawerBody(c);
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
        <div class="drawer-section">
          <h4>核心护城河与产业链定位</h4>
          <div class="policy-impact-box">${escapeHtml(c.moat)}</div>
        </div>

        <div class="drawer-section">
          <h4>主要 AI 产品与技术平台</h4>
          <div class="product-grid">
            ${c.products.map((p) => `
              <div class="product-card">
                <span class="product-cat">${escapeHtml(p.category)}</span>
                <h5>${escapeHtml(p.name)}</h5>
                <p>${escapeHtml(p.desc)}</p>
              </div>`).join("")}
          </div>
        </div>

        <div class="drawer-section">
          <h4>核心应用领域与商业场景</h4>
          <div class="chip-group">
            ${c.applications.map((a) => `<span class="chip active">${escapeHtml(a)}</span>`).join("")}
          </div>
        </div>

        <div class="drawer-section">
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

        <div class="drawer-section">
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
        </div>`;

      body.querySelectorAll("[data-jump-id]").forEach((btn) => {
        btn.addEventListener("click", () => openCompanyDrawer(btn.dataset.jumpId, "products"));
      });
    } else if (tab === "policy") {
      const matched = window.AIChainData.policies.filter(
        (p) => p.companies.includes(c.id) || p.tiers.includes(c.tier)
      );
      body.innerHTML = matched.length ? matched.map((p) => `
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
        </div>`).join("") : `<div class="empty-state">暂无直接关联政策记录</div>`;
    } else if (tab === "research") {
      const relatedReports = window.AIChainData.researchReports.filter(
        (r) => r.companies.includes(c.id) || r.tier === c.tier
      );
      body.innerHTML = `
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
          </div>`).join("")}`;
    } else if (tab === "news") {
      const related = appState.newsItems.filter(
        (n) => (n.companies && n.companies.includes(c.id)) || n.tier === c.tier
      );
      body.innerHTML = related.length ? related.map((n) => `
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
        </div>`).join("") : `<div class="empty-state">暂无相关资讯</div>`;
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
