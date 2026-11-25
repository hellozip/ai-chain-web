/* ==========================================================================
   Lightweight Crisp SVG Chart Library (Zero External Dependency)
   ========================================================================== */
window.AICharts = (function () {
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (m) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[m]));
  }

  /**
   * Renders a multi-period Revenue & Net Income dual-bar SVG chart for a company
   */
  function renderCompanyTrendChart(container, series, unitLabel) {
    if (!container || !series || !series.length) return;
    const width = 620;
    const height = 215;
    const pad = { top: 28, right: 20, bottom: 32, left: 48 };
    const chartW = width - pad.left - pad.right;
    const chartH = height - pad.top - pad.bottom;

    const maxVal = Math.max(
      ...series.map((d) => Math.max(Number(d.rev) || 0, Number(d.ni) || 0)),
      1
    ) * 1.15;
    const minVal = Math.min(0, ...series.map((d) => Number(d.ni) || 0));
    const range = maxVal - minVal || 1;
    const yScale = (val) => pad.top + ((maxVal - val) / range) * chartH;
    const zeroY = yScale(0);

    const groupW = chartW / series.length;
    const barW = Math.min(34, groupW * 0.28);

    let gridSvg = "";
    for (let i = 0; i <= 4; i++) {
      const val = minVal + (range * i) / 4;
      const y = yScale(val);
      gridSvg += `
        <line x1="${pad.left}" y1="${y}" x2="${width - pad.right}" y2="${y}"
              stroke="var(--border-subtle)" stroke-dasharray="3 3" />
        <text x="${pad.left - 8}" y="${y + 4}" text-anchor="end"
              fill="var(--text-muted)" font-size="10.5" font-family="var(--font-mono)">
          ${val >= 100 ? Math.round(val) : val.toFixed(1)}
        </text>`;
    }

    let barsSvg = "";
    series.forEach((d, idx) => {
      const cx = pad.left + groupW * idx + groupW / 2;
      const revY = yScale(d.rev);
      const revH = Math.max(2, Math.abs(zeroY - revY));

      const niVal = Number(d.ni) || 0;
      const niY = niVal >= 0 ? yScale(niVal) : zeroY;
      const niH = Math.max(2, Math.abs(yScale(niVal) - zeroY));
      const niColor = niVal >= 0 ? "var(--downstream)" : "var(--negative)";

      barsSvg += `
        <g class="chart-bar-group">
          <rect x="${cx - barW - 3}" y="${revY}" width="${barW}" height="${revH}"
                rx="4" fill="var(--upstream)" opacity="0.9">
            <title>${escapeHtml(d.label)} 营收: ${d.rev} ${unitLabel}</title>
          </rect>
          <text x="${cx - barW / 2 - 3}" y="${revY - 5}" text-anchor="middle"
                fill="var(--upstream)" font-size="10" font-family="var(--font-mono)" font-weight="600">
            ${d.rev}
          </text>

          <rect x="${cx + 3}" y="${niY}" width="${barW}" height="${niH}"
                rx="4" fill="${niColor}" opacity="0.9">
            <title>${escapeHtml(d.label)} 净利润: ${d.ni} ${unitLabel}</title>
          </rect>
          <text x="${cx + barW / 2 + 3}" y="${niVal >= 0 ? niY - 5 : niY + niH + 11}" text-anchor="middle"
                fill="${niColor}" font-size="10" font-family="var(--font-mono)" font-weight="600">
            ${d.ni}
          </text>

          <text x="${cx}" y="${height - 10}" text-anchor="middle"
                fill="var(--text-secondary)" font-size="11.5" font-weight="600">
            ${escapeHtml(d.label)}
          </text>
        </g>`;
    });

    container.innerHTML = `
      <svg class="svg-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="营收与净利润趋势图">
        ${gridSvg}
        <line x1="${pad.left}" y1="${zeroY}" x2="${width - pad.right}" y2="${zeroY}" stroke="var(--border-strong)" />
        ${barsSvg}
        <g transform="translate(${pad.left}, 12)">
          <rect width="10" height="10" rx="2" fill="var(--upstream)"></rect>
          <text x="15" y="9" fill="var(--text-secondary)" font-size="11">营收 (${escapeHtml(unitLabel)})</text>
          <rect x="125" width="10" height="10" rx="2" fill="var(--downstream)"></rect>
          <text x="140" y="9" fill="var(--text-secondary)" font-size="11">净利润 (${escapeHtml(unitLabel)})</text>
        </g>
      </svg>`;
  }

  /**
   * Renders tier comparison grouped bar chart (Avg YoY Growth vs Avg Gross Margin)
   */
  function renderTierComparisonChart(container, companies, periodKey) {
    if (!container) return;
    const tiers = [
      { key: "upstream", label: "上游 · 算力硬件", color: "var(--upstream)" },
      { key: "midstream", label: "中游 · 模型与云", color: "var(--midstream)" },
      { key: "downstream", label: "下游 · 行业应用", color: "var(--downstream)" }
    ];

    const stats = tiers.map((t) => {
      const list = companies.filter((c) => c.tier === t.key);
      const avgRevYoY = list.reduce((s, c) => s + c.financials[periodKey].revYoY, 0) / (list.length || 1);
      const avgGM = list.reduce((s, c) => s + c.financials[periodKey].grossMargin, 0) / (list.length || 1);
      return { ...t, avgRevYoY, avgGM };
    });

    const width = 560;
    const height = 225;
    const pad = { top: 30, right: 20, bottom: 34, left: 42 };
    const chartW = width - pad.left - pad.right;
    const chartH = height - pad.top - pad.bottom;
    const maxVal = Math.max(80, ...stats.map((s) => Math.max(s.avgRevYoY, s.avgGM))) * 1.1;
    const yScale = (v) => pad.top + ((maxVal - v) / maxVal) * chartH;

    let grid = "";
    for (let i = 0; i <= 4; i++) {
      const v = (maxVal * i) / 4;
      const y = yScale(v);
      grid += `
        <line x1="${pad.left}" y1="${y}" x2="${width - pad.right}" y2="${y}" stroke="var(--border-subtle)" stroke-dasharray="3 3"/>
        <text x="${pad.left - 8}" y="${y + 4}" text-anchor="end" fill="var(--text-muted)" font-size="10.5" font-family="var(--font-mono)">${Math.round(v)}%</text>`;
    }

    const groupW = chartW / stats.length;
    const barW = 34;
    let bars = "";
    stats.forEach((s, i) => {
      const cx = pad.left + groupW * i + groupW / 2;
      const y1 = yScale(s.avgRevYoY);
      const h1 = pad.top + chartH - y1;
      const y2 = yScale(s.avgGM);
      const h2 = pad.top + chartH - y2;

      bars += `
        <rect x="${cx - barW - 4}" y="${y1}" width="${barW}" height="${h1}" rx="5" fill="${s.color}" opacity="0.95"/>
        <text x="${cx - barW / 2 - 4}" y="${y1 - 6}" text-anchor="middle" fill="${s.color}" font-size="11" font-family="var(--font-mono)" font-weight="700">${s.avgRevYoY.toFixed(1)}%</text>
        <rect x="${cx + 4}" y="${y2}" width="${barW}" height="${h2}" rx="5" fill="var(--warning)" opacity="0.82"/>
        <text x="${cx + barW / 2 + 4}" y="${y2 - 6}" text-anchor="middle" fill="var(--warning)" font-size="11" font-family="var(--font-mono)" font-weight="700">${s.avgGM.toFixed(1)}%</text>
        <text x="${cx}" y="${height - 10}" text-anchor="middle" fill="var(--text-secondary)" font-size="12" font-weight="600">${s.label}</text>`;
    });

    container.innerHTML = `
      <svg class="svg-chart" viewBox="0 0 ${width} ${height}">
        ${grid}
        ${bars}
        <g transform="translate(${pad.left}, 10)">
          <rect width="10" height="10" rx="2" fill="var(--upstream)"></rect>
          <text x="15" y="9" fill="var(--text-secondary)" font-size="11">平均营收同比增速 (左柱)</text>
          <rect x="168" width="10" height="10" rx="2" fill="var(--warning)"></rect>
          <text x="183" y="9" fill="var(--text-secondary)" font-size="11">平均毛利率 (右柱)</text>
        </g>
      </svg>`;
  }

  /**
   * Renders Top 10 horizontal growth leaderboard
   */
  function renderTopGrowthChart(container, companies, periodKey, onClickCompany) {
    if (!container) return;
    const top10 = [...companies]
      .sort((a, b) => b.financials[periodKey].revYoY - a.financials[periodKey].revYoY)
      .slice(0, 10);

    const maxVal = Math.max(...top10.map((c) => c.financials[periodKey].revYoY), 10);
    const tierColor = {
      upstream: "var(--upstream)",
      midstream: "var(--midstream)",
      downstream: "var(--downstream)"
    };

    const rowsHtml = top10.map((c) => {
      const val = c.financials[periodKey].revYoY;
      const pct = Math.max(4, Math.min(100, (val / maxVal) * 100));
      return `
        <div class="hbar-row" data-company-id="${c.id}" style="display:grid;grid-template-columns:126px 1fr 56px;align-items:center;gap:10px;margin-bottom:7px;cursor:pointer;">
          <div style="font-size:12px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
            ${escapeHtml(c.name.split(" ")[0])} <span style="color:var(--text-muted);font-family:var(--font-mono);font-size:10.5px;">${escapeHtml(c.ticker)}</span>
          </div>
          <div style="height:10px;background:var(--bg-surface-2);border-radius:99px;overflow:hidden;">
            <div style="height:100%;width:${pct}%;background:${tierColor[c.tier]};border-radius:99px;transition:width 0.35s ease;"></div>
          </div>
          <div style="text-align:right;font-family:var(--font-mono);font-size:12px;font-weight:700;color:var(--positive);">+${val.toFixed(1)}%</div>
        </div>`;
    }).join("");

    container.innerHTML = `<div style="padding-top:4px;">${rowsHtml}</div>`;
    if (onClickCompany) {
      container.querySelectorAll(".hbar-row").forEach((el) => {
        el.addEventListener("click", () => onClickCompany(el.dataset.companyId));
      });
    }
  }

  return {
    renderCompanyTrendChart,
    renderTierComparisonChart,
    renderTopGrowthChart
  };
})();
