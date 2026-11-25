/* ==========================================================================
   Sci-Fi 3D Upstream AI Supply-Chain Topology Engine (30 Companies × 6 Stages)
   Zero-dependency True 3D Perspective Projection + Canvas Energy Beams +
   GPU-Composited Clickable Holographic Nodes
   ========================================================================== */
window.AIUpstream3D = (function () {
  let stageEl, canvas, ctx, nodesLayer, hudEl;
  let rafId = null;
  let width = 1100;
  let height = 680;
  let dpr = 1;
  let time = 0;

  // 3D Camera state with smooth lerp targets
  const cam = {
    yaw: -0.34,
    pitch: 0.24,
    zoom: 1.0,
    targetYaw: -0.34,
    targetPitch: 0.24,
    targetZoom: 1.0,
    panX: 0,
    panY: 0,
    targetPanX: 0,
    targetPanY: 0,
    autoRotate: true,
    dragging: false,
    lastX: 0,
    lastY: 0,
    dragDistance: 0
  };

  let state = {
    layout: "helix",       // 'helix' | 'rings' | 'cascade'
    activeStage: "ALL",    // 'ALL' or stage id
    marketFilter: "ALL",
    selectedId: null,
    hoveredId: null,
    searchQuery: ""
  };

  let callbacks = {
    onSelectCompany: null
  };

  let nodeMeta = [];       // { company, stage, x, y, z, el }
  let stars = [];
  let activeLinks = [];
  let stageCenters = [];   // 3D centers for rings/labels

  function getUpstreamCompanies() {
    return window.AIChainData.companies.filter((c) => c.tier === "upstream");
  }

  function getStages() {
    return window.AIChainData.upstreamStages || [];
  }

  function getAllUpstreamLinks() {
    const upIds = new Set(getUpstreamCompanies().map((c) => c.id));
    const merged = [...(window.AIChainData.upstream3DLinks || [])];
    // Include any intra-upstream links from main links list without duplication
    const seen = new Set(merged.map((l) => `${l.from}->${l.to}`));
    (window.AIChainData.links || []).forEach((l) => {
      if (upIds.has(l.from) && upIds.has(l.to)) {
        const key = `${l.from}->${l.to}`;
        if (!seen.has(key)) {
          seen.add(key);
          merged.push(l);
        }
      }
    });
    return merged;
  }

  function formatCap(billionUsd) {
    if (billionUsd >= 10000) return `$${(billionUsd / 10000).toFixed(2)}万亿`;
    return `$${billionUsd.toLocaleString()}亿`;
  }

  function formatLivePrice(q) {
    if (!q) return "";
    const symMap = { USD: "$", CNY: "¥", HKD: "HK$", TWD: "NT$", EUR: "€", KRW: "₩", JPY: "JP¥" };
    const sym = symMap[q.currency] || (q.currency + " ");
    const val = q.currency === "KRW" || q.currency === "JPY"
      ? Math.round(q.price).toLocaleString()
      : q.price.toFixed(2);
    return `${sym}${val}`;
  }

  function initStars() {
    stars = [];
    for (let i = 0; i < 110; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 2200,
        y: (Math.random() - 0.5) * 1400,
        z: (Math.random() - 0.5) * 1600,
        r: Math.random() * 1.6 + 0.4,
        a: Math.random() * 0.55 + 0.2
      });
    }
  }

  /**
   * Computes 3D (x, y, z) coordinates for each of the 30 upstream companies
   * according to the chosen 3D topology preset.
   */
  function computeLayoutPositions() {
    const stages = getStages();
    const companies = getUpstreamCompanies();
    stageCenters = [];

    const posMap = {};

    stages.forEach((st, sIdx) => {
      const list = companies
        .filter((c) => c.upstreamStage === st.id)
        .sort((a, b) => b.marketCap - a.marketCap);
      const count = list.length || 1;
      const t = (sIdx / (stages.length - 1)) - 0.5; // -0.5 .. +0.5

      if (state.layout === "helix") {
        // Dramatic flowing 3D cybernetic helix spine along X with gentle S-wave in Y/Z
        const spineX = t * 880;
        const spineY = Math.sin(t * Math.PI * 1.4) * 58;
        const spineZ = Math.cos(t * Math.PI * 1.4) * 70;
        const radius = 158;
        stageCenters.push({ stage: st, x: spineX, y: spineY, z: spineZ, radius });

        list.forEach((c, i) => {
          const angle = (i / count) * Math.PI * 2 + sIdx * 0.62;
          posMap[c.id] = {
            x: spineX + Math.cos(angle) * 26,
            y: spineY + Math.sin(angle) * radius,
            z: spineZ + Math.cos(angle) * radius
          };
        });
      } else if (state.layout === "rings") {
        // 6 coaxial orbital rings along Z depth (tunnel / portal perspective)
        const ringZ = -t * 780;
        const radius = 250;
        stageCenters.push({ stage: st, x: 0, y: 0, z: ringZ, radius });

        list.forEach((c, i) => {
          const angle = (i / count) * Math.PI * 2 - Math.PI / 2 + sIdx * 0.35;
          posMap[c.id] = {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * (radius * 0.72),
            z: ringZ
          };
        });
      } else {
        // 3D Cascade: 6 angled perspective columns for ultra-crisp comparison
        const colX = t * 940;
        const colZ = Math.abs(t) * 140 - 40;
        stageCenters.push({ stage: st, x: colX, y: -235, z: colZ, radius: 75 });

        list.forEach((c, i) => {
          const rowT = (i / (count - 1 || 1)) - 0.5;
          posMap[c.id] = {
            x: colX,
            y: rowT * 370,
            z: colZ + Math.sin(rowT * Math.PI) * 55
          };
        });
      }
    });

    nodeMeta.forEach((n) => {
      const target = posMap[n.company.id] || { x: 0, y: 0, z: 0 };
      n.tx = target.x;
      n.ty = target.y;
      n.tz = target.z;
      if (typeof n.x !== "number") {
        n.x = target.x;
        n.y = target.y;
        n.z = target.z;
      }
    });
  }

  function project3D(x, y, z) {
    // Translate by pan
    const px = x + cam.panX;
    const py = y + cam.panY;
    const pz = z;

    // Rotate around Y (yaw)
    const cosY = Math.cos(cam.yaw);
    const sinY = Math.sin(cam.yaw);
    const x1 = px * cosY - pz * sinY;
    const z1 = px * sinY + pz * cosY;

    // Rotate around X (pitch)
    const cosP = Math.cos(cam.pitch);
    const sinP = Math.sin(cam.pitch);
    const y2 = py * cosP - z1 * sinP;
    const z2 = py * sinP + z1 * cosP;

    const fov = 980 * cam.zoom;
    const viewerDist = 1120;
    const depth = viewerDist + z2;
    if (depth < 80) return null;

    const scale = fov / depth;
    return {
      sx: width / 2 + x1 * scale,
      sy: height / 2 + y2 * scale,
      scale,
      z: z2
    };
  }

  function buildNodesDOM() {
    if (!nodesLayer) return;
    const stages = getStages();
    const stageMap = Object.fromEntries(stages.map((s) => [s.id, s]));
    const companies = getUpstreamCompanies();

    nodesLayer.innerHTML = "";
    nodeMeta = companies.map((c) => {
      const stage = stageMap[c.upstreamStage] || stages[0];
      const el = document.createElement("button");
      el.type = "button";
      el.className = "holo-node";
      el.dataset.id = c.id;
      el.dataset.stage = stage.id;
      el.style.setProperty("--stage-color", stage.color);

      el.addEventListener("mouseenter", () => {
        state.hoveredId = c.id;
        updateHud();
      });
      el.addEventListener("mouseleave", () => {
        if (state.hoveredId === c.id) {
          state.hoveredId = null;
          updateHud();
        }
      });
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        if (cam.dragDistance > 6) return;
        state.selectedId = c.id;
        cam.autoRotate = false;
        syncAutoRotateBtn();
        updateHud();
        if (callbacks.onSelectCompany) callbacks.onSelectCompany(c.id);
      });

      nodesLayer.appendChild(el);
      return { company: c, stage, el };
    });

    refreshNodeContents();
    computeLayoutPositions();
  }

  function refreshNodeContents() {
    const quotes = (window.AIChainLive && window.AIChainLive.quotes) || {};
    nodeMeta.forEach((n) => {
      const c = n.company;
      const liveQ = quotes[c.id];
      let liveHtml = `<span class="hn-cap">${formatCap(c.marketCap)}</span>`;
      if (liveQ) {
        const chg = liveQ.changePercent;
        const sign = chg > 0 ? "+" : "";
        const cls = chg >= 0 ? "up" : "down";
        liveHtml = `
          <span class="hn-price">${formatLivePrice(liveQ)}</span>
          <span class="hn-chg ${cls}">${sign}${chg.toFixed(2)}%</span>`;
      }

      n.el.innerHTML = `
        <div class="hn-top">
          <span class="hn-dot"></span>
          <span class="hn-name">${c.name.split(" ")[0]}</span>
          <span class="hn-mkt mkt-${c.market}">${c.marketLabel}</span>
        </div>
        <div class="hn-sub">
          <span class="hn-ticker">${c.ticker}</span>
          <span class="hn-stage">${n.stage.shortName}</span>
        </div>
        <div class="hn-bottom">${liveHtml}</div>`;
    });
  }

  function getFocusId() {
    return state.hoveredId || state.selectedId;
  }

  function isNodeMatchingFilter(n) {
    const c = n.company;
    if (state.activeStage !== "ALL" && c.upstreamStage !== state.activeStage) return false;
    if (state.marketFilter !== "ALL" && c.market !== state.marketFilter) return false;
    const q = state.searchQuery.trim().toLowerCase();
    if (q) {
      const hay = `${c.name} ${c.ticker} ${c.subSegment} ${c.role} ${c.tags.join(" ")}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  }

  function updateHud() {
    if (!hudEl) return;
    const focusId = getFocusId();
    if (!focusId) {
      hudEl.innerHTML = `
        <div class="hud-idle">
          <span class="hud-badge">3D 量子链路雷达</span>
          <span>拖拽 360° 旋转 · 滚轮缩放 · 悬停预览传导光束 · 点击任意节点打开 5 维深度投研面板</span>
        </div>`;
      return;
    }

    const meta = nodeMeta.find((n) => n.company.id === focusId);
    if (!meta) return;
    const c = meta.company;
    const inLinks = activeLinks.filter((l) => l.to === focusId);
    const outLinks = activeLinks.filter((l) => l.from === focusId);
    const quotes = (window.AIChainLive && window.AIChainLive.quotes) || {};
    const liveQ = quotes[focusId];

    hudEl.innerHTML = `
      <div class="hud-active">
        <div class="hud-head">
          <span class="hud-stage-pill" style="border-color:${meta.stage.color};color:${meta.stage.color};">${meta.stage.code} · ${meta.stage.shortName}</span>
          <strong>${c.name}</strong>
          <span class="node-ticker">${c.ticker}</span>
          ${liveQ ? `<span class="hn-price">${formatLivePrice(liveQ)}</span><span class="hn-chg ${liveQ.changePercent >= 0 ? "up" : "down"}">${liveQ.changePercent > 0 ? "+" : ""}${liveQ.changePercent.toFixed(2)}%</span>` : ""}
          <span class="hud-stat">总市值 ${formatCap(c.marketCap)}</span>
          <span class="hud-stat">上游供应 ${inLinks.length} 路 · 下游去向 ${outLinks.length} 路</span>
        </div>
        <div class="hud-desc">${c.role}</div>
      </div>`;
  }

  function drawCyberGrid() {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = isLight ? "rgba(2, 132, 199, 0.11)" : "rgba(56, 189, 248, 0.10)";
    const floorY = 275;
    const step = 120;
    const half = 720;

    for (let x = -half; x <= half; x += step) {
      const p1 = project3D(x, floorY, -half);
      const p2 = project3D(x, floorY, half);
      if (p1 && p2) {
        ctx.beginPath();
        ctx.moveTo(p1.sx, p1.sy);
        ctx.lineTo(p2.sx, p2.sy);
        ctx.stroke();
      }
    }
    for (let z = -half; z <= half; z += step) {
      const p1 = project3D(-half, floorY, z);
      const p2 = project3D(half, floorY, z);
      if (p1 && p2) {
        ctx.beginPath();
        ctx.moveTo(p1.sx, p1.sy);
        ctx.lineTo(p2.sx, p2.sy);
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  function drawStageRingsAndSpine() {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    ctx.save();

    // Central luminous energy spine connecting stage centers
    if (stageCenters.length > 1) {
      const projectedCenters = stageCenters.map((sc) => project3D(sc.x, sc.y, sc.z));
      ctx.beginPath();
      let started = false;
      projectedCenters.forEach((p) => {
        if (!p) return;
        if (!started) { ctx.moveTo(p.sx, p.sy); started = true; }
        else ctx.lineTo(p.sx, p.sy);
      });
      ctx.strokeStyle = isLight ? "rgba(99, 102, 241, 0.25)" : "rgba(56, 189, 248, 0.28)";
      ctx.lineWidth = 2.5;
      ctx.setLineDash([8, 8]);
      ctx.lineDashOffset = -time * 28;
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Glowing orbital rings + stage holographic titles
    stageCenters.forEach((sc) => {
      const isFocusedStage = state.activeStage === "ALL" || state.activeStage === sc.stage.id;
      const segments = 36;
      ctx.beginPath();
      let first = true;
      for (let i = 0; i <= segments; i++) {
        const a = (i / segments) * Math.PI * 2;
        let rx, ry, rz;
        if (state.layout === "helix") {
          rx = sc.x + Math.cos(a) * 20;
          ry = sc.y + Math.sin(a) * sc.radius;
          rz = sc.z + Math.cos(a) * sc.radius;
        } else if (state.layout === "rings") {
          rx = sc.x + Math.cos(a) * sc.radius;
          ry = sc.y + Math.sin(a) * (sc.radius * 0.72);
          rz = sc.z;
        } else {
          rx = sc.x + Math.cos(a) * 58;
          ry = sc.y + Math.sin(a) * 18;
          rz = sc.z + Math.sin(a) * 26;
        }
        const p = project3D(rx, ry, rz);
        if (!p) continue;
        if (first) { ctx.moveTo(p.sx, p.sy); first = true; first = false; }
        else ctx.lineTo(p.sx, p.sy);
      }
      ctx.strokeStyle = sc.stage.color;
      ctx.globalAlpha = isFocusedStage ? (isLight ? 0.32 : 0.38) : 0.08;
      ctx.lineWidth = isFocusedStage ? 1.6 : 1;
      ctx.stroke();

      // Stage floating hologram label
      const labelPos = project3D(sc.x, sc.y - (state.layout === "cascade" ? 26 : sc.radius + 26), sc.z);
      if (labelPos) {
        ctx.globalAlpha = isFocusedStage ? 0.92 : 0.25;
        ctx.font = `700 ${Math.max(10, Math.min(13, 11.5 * labelPos.scale))}px var(--font-sans), sans-serif`;
        ctx.textAlign = "center";
        ctx.fillStyle = sc.stage.color;
        ctx.fillText(`${sc.stage.code} · ${sc.stage.shortName}`, labelPos.sx, labelPos.sy);
      }
    });

    ctx.restore();
  }

  function renderFrame() {
    time += 0.016;

    // Smooth camera interpolation
    if (cam.autoRotate && !cam.dragging) {
      cam.targetYaw += 0.0022;
    }
    cam.yaw += (cam.targetYaw - cam.yaw) * 0.09;
    cam.pitch += (cam.targetPitch - cam.pitch) * 0.09;
    cam.zoom += (cam.targetZoom - cam.zoom) * 0.10;
    cam.panX += (cam.targetPanX - cam.panX) * 0.09;
    cam.panY += (cam.targetPanY - cam.panY) * 0.09;

    // Smooth node layout morphing
    nodeMeta.forEach((n) => {
      n.x += (n.tx - n.x) * 0.10;
      n.y += (n.ty - n.y) * 0.10;
      n.z += (n.tz - n.z) * 0.10;
    });

    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    const isLight = document.documentElement.getAttribute("data-theme") === "light";

    // Starfield
    ctx.save();
    stars.forEach((st) => {
      const p = project3D(st.x, st.y, st.z);
      if (!p) return;
      ctx.fillStyle = isLight ? `rgba(15, 23, 42, ${st.a * 0.22})` : `rgba(186, 230, 253, ${st.a})`;
      ctx.beginPath();
      ctx.arc(p.sx, p.sy, Math.max(0.5, st.r * p.scale), 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    drawCyberGrid();
    drawStageRingsAndSpine();

    // Project all 30 nodes
    const projMap = {};
    const focusId = getFocusId();
    const relatedIn = new Set();
    const relatedOut = new Set();
    if (focusId) {
      activeLinks.forEach((l) => {
        if (l.to === focusId) relatedIn.add(l.from);
        if (l.from === focusId) relatedOut.add(l.to);
      });
    }

    nodeMeta.forEach((n) => {
      const p = project3D(n.x, n.y, n.z);
      projMap[n.company.id] = p;
      const matches = isNodeMatchingFilter(n);

      if (!p) {
        n.el.style.display = "none";
        return;
      }

      n.el.style.display = "block";
      const clampedScale = Math.max(0.56, Math.min(1.22, p.scale * 0.94));
      const zIdx = Math.round(5000 - p.z);
      const depthAlpha = Math.max(0.36, Math.min(1, 1.18 - (p.z + 450) / 1400));

      let alpha = matches ? depthAlpha : 0.10;
      n.el.classList.remove("is-focus", "is-in", "is-out", "is-dim");

      if (focusId) {
        if (n.company.id === focusId) {
          n.el.classList.add("is-focus");
          alpha = 1;
        } else if (relatedIn.has(n.company.id)) {
          n.el.classList.add("is-in");
          alpha = 0.98;
        } else if (relatedOut.has(n.company.id)) {
          n.el.classList.add("is-out");
          alpha = 0.98;
        } else {
          n.el.classList.add("is-dim");
          alpha = 0.16;
        }
      }

      n.el.style.zIndex = n.company.id === focusId ? 9999 : zIdx;
      n.el.style.opacity = alpha.toFixed(2);
      n.el.style.transform = `translate3d(${p.sx.toFixed(1)}px, ${p.sy.toFixed(1)}px, 0) translate(-50%, -50%) scale(${clampedScale.toFixed(3)})`;
    });

    // Draw 3D Supply-Chain Energy Beams & Photon Particles
    const activeLabels = [];
    ctx.save();
    activeLinks.forEach((lk, idx) => {
      const p1 = projMap[lk.from];
      const p2 = projMap[lk.to];
      if (!p1 || !p2) return;

      const isIn = focusId && lk.to === focusId;
      const isOut = focusId && lk.from === focusId;
      const isActive = isIn || isOut;

      const mx = (p1.sx + p2.sx) / 2;
      const my = (p1.sy + p2.sy) / 2 - Math.min(54, Math.hypot(p2.sx - p1.sx, p2.sy - p1.sy) * 0.18);

      ctx.beginPath();
      ctx.moveTo(p1.sx, p1.sy);
      ctx.quadraticCurveTo(mx, my, p2.sx, p2.sy);

      if (isActive) {
        const beamColor = isIn ? "#38bdf8" : "#34d399";
        ctx.strokeStyle = beamColor;
        ctx.lineWidth = 2.4;
        ctx.globalAlpha = 0.92;
        ctx.shadowColor = beamColor;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Animated dual photon pulses streaming from supplier -> buyer
        for (let k = 0; k < 2; k++) {
          const u = (time * 0.55 + idx * 0.13 + k * 0.5) % 1;
          const inv = 1 - u;
          const bx = inv * inv * p1.sx + 2 * inv * u * mx + u * u * p2.sx;
          const by = inv * inv * p1.sy + 2 * inv * u * my + u * u * p2.sy;
          ctx.beginPath();
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = beamColor;
          ctx.shadowBlur = 12;
          ctx.arc(bx, by, 3.3, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        if (lk.label) {
          const lx = 0.25 * p1.sx + 0.5 * mx + 0.25 * p2.sx;
          const ly = 0.25 * p1.sy + 0.5 * my + 0.25 * p2.sy;
          activeLabels.push({ x: lx, y: ly, text: lk.label, color: beamColor });
        }
      } else {
        ctx.strokeStyle = isLight ? "rgba(56, 189, 248, 0.22)" : "rgba(129, 140, 248, 0.22)";
        ctx.lineWidth = 1;
        ctx.globalAlpha = focusId ? 0.05 : 0.34;
        ctx.stroke();

        // Ambient flowing photon on every 3rd link when idle
        if (!focusId && idx % 2 === 0) {
          const u = (time * 0.28 + idx * 0.19) % 1;
          const inv = 1 - u;
          const bx = inv * inv * p1.sx + 2 * inv * u * mx + u * u * p2.sx;
          const by = inv * inv * p1.sy + 2 * inv * u * my + u * u * p2.sy;
          ctx.beginPath();
          ctx.fillStyle = "#38bdf8";
          ctx.globalAlpha = 0.65;
          ctx.arc(bx, by, 2.0, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    });

    // Draw floating 3D relation labels on top
    activeLabels.forEach((lb) => {
      ctx.globalAlpha = 0.96;
      ctx.font = "600 11px -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif";
      const tw = ctx.measureText(lb.text).width;
      const bw = tw + 14;
      const bh = 20;
      ctx.fillStyle = isLight ? "rgba(255,255,255,0.92)" : "rgba(7, 11, 20, 0.90)";
      ctx.strokeStyle = lb.color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(lb.x - bw / 2, lb.y - bh / 2, bw, bh, 6);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = lb.color;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(lb.text, lb.x, lb.y + 0.5);
    });
    ctx.restore();

    rafId = requestAnimationFrame(renderFrame);
  }

  function resize() {
    if (!stageEl || !canvas) return;
    const rect = stageEl.getBoundingClientRect();
    if (rect.width < 100) return;
    width = rect.width;
    height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function focusStage(stageId) {
    state.activeStage = stageId;
    if (stageId === "ALL") {
      cam.targetPanX = 0;
      cam.targetPanY = 0;
      cam.targetZoom = 1.0;
      cam.targetPitch = 0.22;
    } else {
      const sc = stageCenters.find((s) => s.stage.id === stageId);
      if (sc) {
        cam.autoRotate = false;
        syncAutoRotateBtn();
        cam.targetPanX = -sc.x * 0.72;
        cam.targetPanY = -sc.y * 0.55;
        cam.targetZoom = 1.24;
        cam.targetYaw = state.layout === "rings" ? 0.15 : -0.18;
        cam.targetPitch = 0.16;
      }
    }
    updateHud();
  }

  function resetCamera() {
    state.selectedId = null;
    state.hoveredId = null;
    state.activeStage = "ALL";
    cam.targetYaw = state.layout === "cascade" ? 0 : -0.34;
    cam.targetPitch = state.layout === "cascade" ? 0.10 : 0.24;
    cam.targetZoom = 1.0;
    cam.targetPanX = 0;
    cam.targetPanY = 0;
    cam.autoRotate = state.layout !== "cascade";
    syncAutoRotateBtn();
    document.querySelectorAll("#u3dStageFilter .chip").forEach((b) => {
      b.classList.toggle("active", b.dataset.stage === "ALL");
    });
    updateHud();
  }

  function syncAutoRotateBtn() {
    const btn = document.getElementById("u3dAutoRotateBtn");
    if (btn) btn.classList.toggle("active", cam.autoRotate);
  }

  function bindInteractions() {
    stageEl.addEventListener("pointerdown", (e) => {
      if (e.target.closest(".holo-node")) return;
      cam.dragging = true;
      cam.lastX = e.clientX;
      cam.lastY = e.clientY;
      cam.dragDistance = 0;
      cam.autoRotate = false;
      syncAutoRotateBtn();
      stageEl.setPointerCapture(e.pointerId);
    });

    stageEl.addEventListener("pointermove", (e) => {
      if (!cam.dragging) return;
      const dx = e.clientX - cam.lastX;
      const dy = e.clientY - cam.lastY;
      cam.dragDistance += Math.hypot(dx, dy);
      cam.lastX = e.clientX;
      cam.lastY = e.clientY;
      cam.targetYaw += dx * 0.0065;
      cam.targetPitch = Math.max(-0.85, Math.min(0.85, cam.targetPitch + dy * 0.0055));
    });

    const endDrag = () => { cam.dragging = false; };
    stageEl.addEventListener("pointerup", endDrag);
    stageEl.addEventListener("pointercancel", endDrag);

    stageEl.addEventListener("wheel", (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.08 : 0.08;
      cam.targetZoom = Math.max(0.62, Math.min(1.85, cam.targetZoom + delta));
    }, { passive: false });

    stageEl.addEventListener("click", (e) => {
      if (!e.target.closest(".holo-node") && cam.dragDistance < 6) {
        state.selectedId = null;
        updateHud();
      }
    });

    window.addEventListener("resize", resize);
  }

  function init(opts) {
    callbacks = { ...callbacks, ...opts };
    stageEl = document.getElementById("upstream3dStage");
    canvas = document.getElementById("upstream3dCanvas");
    nodesLayer = document.getElementById("upstream3dNodes");
    hudEl = document.getElementById("upstream3dHud");
    if (!stageEl || !canvas) return;

    ctx = canvas.getContext("2d");
    activeLinks = getAllUpstreamLinks();
    initStars();
    buildNodesDOM();
    bindInteractions();
    updateHud();
    resize();
  }

  function start() {
    resize();
    refreshNodeContents();
    if (!rafId) rafId = requestAnimationFrame(renderFrame);
  }

  function stop() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function setLayout(layoutName) {
    state.layout = layoutName;
    computeLayoutPositions();
    if (layoutName === "cascade") {
      cam.autoRotate = false;
      cam.targetYaw = 0;
      cam.targetPitch = 0.08;
      cam.targetZoom = 0.96;
      cam.targetPanX = 0;
      cam.targetPanY = 0;
    } else if (layoutName === "rings") {
      cam.autoRotate = true;
      cam.targetYaw = 0.42;
      cam.targetPitch = 0.16;
      cam.targetZoom = 1.02;
      cam.targetPanX = 0;
      cam.targetPanY = 0;
    } else {
      cam.autoRotate = true;
      cam.targetYaw = -0.34;
      cam.targetPitch = 0.24;
      cam.targetZoom = 1.0;
      cam.targetPanX = 0;
      cam.targetPanY = 0;
    }
    syncAutoRotateBtn();
  }

  function setMarketFilter(mkt) {
    state.marketFilter = mkt;
  }

  function setSearchQuery(q) {
    state.searchQuery = q || "";
  }

  function toggleAutoRotate() {
    cam.autoRotate = !cam.autoRotate;
    syncAutoRotateBtn();
  }

  return {
    init,
    start,
    stop,
    resize,
    setLayout,
    focusStage,
    resetCamera,
    setMarketFilter,
    setSearchQuery,
    toggleAutoRotate,
    refreshNodeContents
  };
})();
