/* ==========================================================================
   Interactive AI Supply-Chain Diagram Engine (HTML Nodes + SVG Bezier Flow)
   ========================================================================== */
window.AIChainGraph = (function () {
  let state = {
    selectedId: null,
    hoveredId: null,
    showAllEdges: true,
    marketFilter: "ALL",
    sortMetric: "marketCap",
    searchQuery: ""
  };

  let callbacks = {
    onSelectCompany: null
  };

  const els = {};

  function init(opts) {
    callbacks = { ...callbacks, ...opts };
    els.stage = document.getElementById("chainStage");
    els.svg = document.getElementById("chainEdgesSvg");
    els.upstream = document.getElementById("nodes-upstream");
    els.midstream = document.getElementById("nodes-midstream");
    els.downstream = document.getElementById("nodes-downstream");
    els.metaUp = document.getElementById("meta-upstream");
    els.metaMid = document.getElementById("meta-midstream");
    els.metaDown = document.getElementById("meta-downstream");
    els.summary = document.getElementById("chainSummaryStrip");
    els.hintText = document.getElementById("chainHintText");
    els.clearBtn = document.getElementById("clearSelectionBtn");

    window.addEventListener("resize", () => requestAnimationFrame(drawEdges));
  }

  function setState(patch) {
    state = { ...state, ...patch };
    render();
  }

  function getState() {
    return { ...state };
  }

  function formatCap(billionUsd) {
    if (billionUsd >= 10000) return `$${(billionUsd / 10000).toFixed(2)}万亿`;
    return `$${billionUsd.toLocaleString()}亿`;
  }

  function getFilteredCompanies() {
    const q = state.searchQuery.trim().toLowerCase();
    return window.AIChainData.companies.filter((c) => {
      if (state.marketFilter !== "ALL" && c.market !== state.marketFilter) return false;
      if (!q) return true;
      const hay = [
        c.name, c.ticker, c.marketLabel, c.subSegment, c.role,
        ...c.tags,
        ...c.applications,
        ...c.products.map((p) => p.name + " " + p.category)
      ].join(" ").toLowerCase();
      return hay.includes(q);
    });
  }

  function sortCompanies(list) {
    const metric = state.sortMetric;
    const quotes = (window.AIChainLive && window.AIChainLive.quotes) || {};
    return [...list].sort((a, b) => {
      if (metric === "liveChange") {
        const qa = quotes[a.id] ? quotes[a.id].changePercent : -999;
        const qb = quotes[b.id] ? quotes[b.id].changePercent : -999;
        return qb - qa;
      }
      if (metric === "revGrowth") return b.financials.quarterly.revYoY - a.financials.quarterly.revYoY;
      if (metric === "grossMargin") return b.financials.quarterly.grossMargin - a.financials.quarterly.grossMargin;
      if (metric === "rdRatio") return b.financials.quarterly.rdRatio - a.financials.quarterly.rdRatio;
      return b.marketCap - a.marketCap;
    });
  }

  function formatCurrencyPrice(quote) {
    if (!quote) return "";
    const symMap = { USD: "$", CNY: "¥", HKD: "HK$", TWD: "NT$", EUR: "€", KRW: "₩", JPY: "JP¥" };
    const sym = symMap[quote.currency] || (quote.currency + " ");
    const val = quote.currency === "KRW" || quote.currency === "JPY"
      ? Math.round(quote.price).toLocaleString()
      : quote.price.toFixed(2);
    return `${sym}${val}`;
  }

  function renderSummary(visibleCompanies) {
    const totalCap = visibleCompanies.reduce((s, c) => s + c.marketCap, 0);
    const avgYoY = visibleCompanies.reduce((s, c) => s + c.financials.quarterly.revYoY, 0) / (visibleCompanies.length || 1);
    const avgGM = visibleCompanies.reduce((s, c) => s + c.financials.quarterly.grossMargin, 0) / (visibleCompanies.length || 1);
    const markets = new Set(visibleCompanies.map((c) => c.marketLabel));

    els.summary.innerHTML = `
      <div class="summary-card">
        <div class="summary-card-label"><span>当前视图覆盖企业</span><span>上/中/下游</span></div>
        <div class="summary-card-value">${visibleCompanies.length} 家</div>
        <div class="summary-card-sub">覆盖市场：${Array.from(markets).join(" / ") || "无匹配"}</div>
      </div>
      <div class="summary-card">
        <div class="summary-card-label"><span>合计总市值</span><span>USD 口径</span></div>
        <div class="summary-card-value">${formatCap(totalCap)}</div>
        <div class="summary-card-sub">全球 AI 核心产业链大市值龙头聚合</div>
      </div>
      <div class="summary-card">
        <div class="summary-card-label"><span>最新季报平均营收增速</span><span>2026Q3 YoY</span></div>
        <div class="summary-card-value val-up">+${avgYoY.toFixed(1)}%</div>
        <div class="summary-card-sub">算力硬件与 AI 软件增速领跑大盘</div>
      </div>
      <div class="summary-card">
        <div class="summary-card-label"><span>全链平均毛利率</span><span>盈利质量</span></div>
        <div class="summary-card-value">${avgGM.toFixed(1)}%</div>
        <div class="summary-card-sub">点击节点查看季报/半年报/年报拆解</div>
      </div>`;
  }

  function createNodeHtml(c) {
    const q = c.financials.quarterly;
    const isHit = state.searchQuery.trim().length > 0;
    const leftPort = c.tier !== "upstream" ? `<span class="node-port port-left"></span>` : "";
    const rightPort = c.tier !== "downstream" ? `<span class="node-port port-right"></span>` : "";
    const liveQ = window.AIChainLive && window.AIChainLive.quotes && window.AIChainLive.quotes[c.id];
    let liveBarHtml = "";
    if (liveQ) {
      const chg = liveQ.changePercent;
      const cls = chg > 0 ? "up" : chg < 0 ? "down" : "flat";
      const sign = chg > 0 ? "+" : "";
      liveBarHtml = `
        <div class="node-live-bar">
          <span class="live-price-val">${formatCurrencyPrice(liveQ)}</span>
          <span class="live-chg-badge ${cls}">${sign}${chg.toFixed(2)}%</span>
        </div>`;
    }

    return `
      <article class="company-node ${isHit ? "search-hit" : ""}" data-id="${c.id}" data-tier="${c.tier}" tabindex="0" role="button" aria-label="${c.name} ${c.ticker}">
        ${leftPort}
        ${rightPort}
        <div class="node-top">
          <div class="node-identity">
            <div class="node-name-row">
              <span class="node-name">${c.name}</span>
              <span class="node-ticker">${c.ticker}</span>
            </div>
            <div class="node-role" title="${c.role}">${c.subSegment} · ${c.role}</div>
          </div>
          <span class="market-badge mkt-${c.market}">${c.marketLabel}</span>
        </div>
        ${liveBarHtml}
        <div class="node-metrics">
          <div class="nm-item">
            <span class="nm-label">总市值</span>
            <span class="nm-val">${formatCap(c.marketCap)}</span>
          </div>
          <div class="nm-item">
            <span class="nm-label">Q3营收同比</span>
            <span class="nm-val ${q.revYoY >= 0 ? "val-up" : "val-down"}">${q.revYoY >= 0 ? "+" : ""}${q.revYoY.toFixed(1)}%</span>
          </div>
          <div class="nm-item">
            <span class="nm-label">毛利率</span>
            <span class="nm-val">${q.grossMargin.toFixed(1)}%</span>
          </div>
        </div>
        <div class="node-tags">
          ${c.tags.slice(0, 3).map((t) => `<span class="mini-pill">${t}</span>`).join("")}
        </div>
      </article>`;
  }

  function renderColumn(container, metaEl, list) {
    const cap = list.reduce((s, c) => s + c.marketCap, 0);
    const avgGrowth = list.reduce((s, c) => s + c.financials.quarterly.revYoY, 0) / (list.length || 1);
    metaEl.innerHTML = `<span>${list.length} 家企业</span><span>·</span><span>市值 ${formatCap(cap)}</span><span>·</span><span>均速 +${avgGrowth.toFixed(1)}%</span>`;

    if (!list.length) {
      container.innerHTML = `<div class="empty-state">当前筛选条件下暂无该环节公司</div>`;
      return;
    }
    container.innerHTML = list.map(createNodeHtml).join("");
  }

  function bindNodeEvents() {
    els.stage.querySelectorAll(".company-node").forEach((node) => {
      const id = node.dataset.id;
      node.addEventListener("mouseenter", () => {
        if (!state.selectedId) {
          state.hoveredId = id;
          applyHighlight();
          drawEdges();
        }
      });
      node.addEventListener("mouseleave", () => {
        if (!state.selectedId && state.hoveredId === id) {
          state.hoveredId = null;
          applyHighlight();
          drawEdges();
        }
      });
      node.addEventListener("click", () => {
        state.selectedId = id;
        state.hoveredId = null;
        applyHighlight();
        drawEdges();
        if (callbacks.onSelectCompany) callbacks.onSelectCompany(id);
      });
      node.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          node.click();
        }
      });
    });
  }

  function getActiveFocusId() {
    return state.selectedId || state.hoveredId;
  }

  function getRelatedSets(focusId) {
    const upIds = new Set();
    const downIds = new Set();
    if (!focusId) return { upIds, downIds };

    window.AIChainData.links.forEach((lk) => {
      if (lk.to === focusId) upIds.add(lk.from);
      if (lk.from === focusId) downIds.add(lk.to);
    });
    return { upIds, downIds };
  }

  function applyHighlight() {
    const focusId = getActiveFocusId();
    const { upIds, downIds } = getRelatedSets(focusId);

    if (els.clearBtn) {
      els.clearBtn.hidden = !state.selectedId;
    }

    const nodes = els.stage.querySelectorAll(".company-node");
    nodes.forEach((n) => {
      const id = n.dataset.id;
      n.classList.remove("selected", "connected-up", "connected-down", "dimmed");
      if (!focusId) return;
      if (id === focusId) {
        n.classList.add("selected");
      } else if (upIds.has(id)) {
        n.classList.add("connected-up");
      } else if (downIds.has(id)) {
        n.classList.add("connected-down");
      } else {
        n.classList.add("dimmed");
      }
    });

    if (focusId) {
      const comp = window.AIChainData.companies.find((c) => c.id === focusId);
      if (comp) {
        els.hintText.innerHTML = `已聚焦 <strong>${comp.name} (${comp.ticker})</strong>：蓝线为直接上游供应/技术支撑（${upIds.size} 家），绿线为直接下游客户/生态赋能（${downIds.size} 家）。`;
      }
    } else {
      els.hintText.textContent = "悬停节点可预览上下游传导链；点击任意上市公司节点，可锁定路径并打开 5 维投研详情面板（定期报告 · 政策 · 产品 · 研报 · 资讯）。";
    }
  }

  function drawEdges() {
    if (!els.stage || !els.svg) return;
    const stageRect = els.stage.getBoundingClientRect();
    const scrollW = els.stage.scrollWidth;
    const scrollH = els.stage.scrollHeight;
    els.svg.setAttribute("width", scrollW);
    els.svg.setAttribute("height", scrollH);
    els.svg.style.width = scrollW + "px";
    els.svg.style.height = scrollH + "px";
    els.svg.setAttribute("viewBox", `0 0 ${scrollW} ${scrollH}`);

    const nodeMap = {};
    els.stage.querySelectorAll(".company-node").forEach((el) => {
      const r = el.getBoundingClientRect();
      nodeMap[el.dataset.id] = {
        left: r.left - stageRect.left + els.stage.scrollLeft,
        right: r.right - stageRect.left + els.stage.scrollLeft,
        cy: r.top - stageRect.top + els.stage.scrollTop + r.height / 2,
        tier: el.dataset.tier
      };
    });

    const focusId = getActiveFocusId();
    const paths = [];
    const labels = [];

    window.AIChainData.links.forEach((lk) => {
      const src = nodeMap[lk.from];
      const dst = nodeMap[lk.to];
      if (!src || !dst) return;

      const isUpEdge = focusId && lk.to === focusId;
      const isDownEdge = focusId && lk.from === focusId;
      const isActive = isUpEdge || isDownEdge;

      // Skip same-column curves unless active to keep visual super clean
      const sameCol = src.tier === dst.tier;
      if (sameCol && !isActive) return;

      let d;
      let labelX;
      let labelY;

      if (sameCol) {
        const x = src.left;
        const dx = 36;
        d = `M ${x} ${src.cy} C ${x - dx} ${src.cy}, ${x - dx} ${dst.cy}, ${x} ${dst.cy}`;
        labelX = x - dx;
        labelY = (src.cy + dst.cy) / 2;
      } else {
        const x1 = src.right;
        const y1 = src.cy;
        const x2 = dst.left;
        const y2 = dst.cy;
        const cpOffset = Math.max(46, Math.abs(x2 - x1) * 0.48);
        d = `M ${x1} ${y1} C ${x1 + cpOffset} ${y1}, ${x2 - cpOffset} ${y2}, ${x2} ${y2}`;
        labelX = (x1 + x2) / 2;
        labelY = (y1 + y2) / 2;
      }

      let cls = "edge-path";
      if (isUpEdge) cls += " edge-upstream";
      else if (isDownEdge) cls += " edge-downstream";
      else if (focusId) cls += " edge-dimmed";
      else if (!state.showAllEdges) cls += " ambient-hidden";

      paths.push(`<path class="${cls}" d="${d}" />`);

      if (isActive && lk.label) {
        const textLen = lk.label.length * 10 + 16;
        labels.push(`
          <g transform="translate(${labelX - textLen / 2}, ${labelY - 10})">
            <rect class="edge-label-bg" width="${textLen}" height="20" rx="6" />
            <text class="edge-label-text" x="${textLen / 2}" y="13.5" text-anchor="middle">${lk.label}</text>
          </g>`);
      }
    });

    // Render inactive edges first, then active edges, then labels on top
    els.svg.innerHTML = paths.join("") + labels.join("");
  }

  function render() {
    const visible = getFilteredCompanies();
    renderSummary(visible);

    const up = sortCompanies(visible.filter((c) => c.tier === "upstream"));
    const mid = sortCompanies(visible.filter((c) => c.tier === "midstream"));
    const down = sortCompanies(visible.filter((c) => c.tier === "downstream"));

    renderColumn(els.upstream, els.metaUp, up);
    renderColumn(els.midstream, els.metaMid, mid);
    renderColumn(els.downstream, els.metaDown, down);

    bindNodeEvents();
    applyHighlight();
    requestAnimationFrame(() => requestAnimationFrame(drawEdges));
  }

  function clearSelection() {
    state.selectedId = null;
    state.hoveredId = null;
    applyHighlight();
    drawEdges();
  }

  return {
    init,
    render,
    setState,
    getState,
    drawEdges,
    clearSelection
  };
})();
