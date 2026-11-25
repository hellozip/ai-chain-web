/* ==========================================================================
   Tailored High-Tech Visual Illustrations for Product & Application Cards (P3)
   Generates crisp, zero-dependency, theme-aware retina SVG technical graphics
   ========================================================================== */
window.AIProductVisuals = (function () {
  function detectVisualType(product, company) {
    const text = `${product.name} ${product.category} ${product.desc} ${company.subSegment}`.toLowerCase();
    if (/光刻|euv|涂胶|刻蚀|沉积|薄膜|设备|装备|检测|量测/.test(text)) return "lithography";
    if (/晶圆|代工|cowos|封装|chiplet|硅片|abf|载板|封测/.test(text)) return "wafer";
    if (/hbm|显存|存储|ssd|dram|nand|内存/.test(text)) return "hbm";
    if (/光模块|dsp|交换|以太网|网络|互联|cpo/.test(text)) return "optics";
    if (/液冷|机柜|服务器|电力|变压器|配电|储能|ups|cdu/.test(text)) return "rack";
    if (/eda|ip|架构|指令集|仿真|软件验证/.test(text)) return "eda";
    if (/gpu|asic|xpu|tpu|trainium|dcu|cpu|加速卡|芯片/.test(text)) return "chip";
    if (/自动驾驶|fsd|智驾|汽车|机器人|optimus|无人机|低空/.test(text)) return "auto_robot";
    if (/手机|终端|眼镜|传感器|视觉|iot|智能家居|apple|hyperos/.test(text)) return "edge_device";
    if (/大模型|llm|gemini|llama|qwen|混元|九天|bedrock|云|azure|aws|oci|数据库/.test(text)) return "cloud_llm";
    if (/agent|copilot|工作流|crm|erp|firefly|创意|工业|数字孪生/.test(text)) return "agent_app";
    return "chip";
  }

  function renderProductBannerSvg(product, company, idx) {
    const type = detectVisualType(product, company);
    const gid = `pv_${company.id}_${idx}_${type}`;

    const palettes = {
      lithography: ["#38bdf8", "#818cf8", "#0c1932"],
      wafer: ["#60a5fa", "#34d399", "#0a1c2e"],
      hbm: ["#f472b6", "#a78bfa", "#1f102b"],
      optics: ["#2dd4bf", "#38bdf8", "#071f29"],
      rack: ["#34d399", "#fbbf24", "#081f1b"],
      eda: ["#38bdf8", "#a78bfa", "#0d1630"],
      chip: ["#38bdf8", "#a78bfa", "#0b142a"],
      auto_robot: ["#34d399", "#38bdf8", "#071c22"],
      edge_device: ["#a78bfa", "#f472b6", "#17112b"],
      cloud_llm: ["#818cf8", "#38bdf8", "#0e1532"],
      agent_app: ["#34d399", "#818cf8", "#0c1d24"]
    };
    const [c1, c2, bg] = palettes[type] || palettes.chip;

    let artwork = "";
    if (type === "chip") {
      artwork = `
        <g stroke="${c1}" stroke-width="1.3" opacity="0.55">
          <line x1="62" y1="30" x2="105" y2="30"/><line x1="62" y1="45" x2="105" y2="45"/><line x1="62" y1="60" x2="105" y2="60"/><line x1="62" y1="75" x2="105" y2="75"/>
          <line x1="215" y1="30" x2="258" y2="30"/><line x1="215" y1="45" x2="258" y2="45"/><line x1="215" y1="60" x2="258" y2="60"/><line x1="215" y1="75" x2="258" y2="75"/>
          <line x1="130" y1="6" x2="130" y2="20"/><line x1="160" y1="6" x2="160" y2="20"/><line x1="190" y1="6" x2="190" y2="20"/>
          <line x1="130" y1="86" x2="130" y2="100"/><line x1="160" y1="86" x2="160" y2="100"/><line x1="190" y1="86" x2="190" y2="100"/>
        </g>
        <rect x="105" y="18" width="110" height="70" rx="10" fill="url(#${gid}_g)" fill-opacity="0.22" stroke="${c1}" stroke-width="1.8"/>
        <rect x="122" y="30" width="76" height="46" rx="5" fill="${bg}" stroke="${c2}" stroke-width="1.3"/>
        <g fill="${c1}" opacity="0.85">
          <rect x="130" y="37" width="18" height="13" rx="2"/><rect x="152" y="37" width="18" height="13" rx="2"/><rect x="174" y="37" width="16" height="13" rx="2"/>
          <rect x="130" y="55" width="18" height="13" rx="2" fill="${c2}"/><rect x="152" y="55" width="18" height="13" rx="2"/><rect x="174" y="55" width="16" height="13" rx="2" fill="${c2}"/>
        </g>`;
    } else if (type === "lithography") {
      artwork = `
        <polygon points="160,10 120,88 200,88" fill="url(#${gid}_g)" fill-opacity="0.22"/>
        <line x1="160" y1="10" x2="160" y2="88" stroke="${c1}" stroke-width="2" stroke-dasharray="4 3"/>
        <ellipse cx="160" cy="24" rx="46" ry="10" fill="none" stroke="${c2}" stroke-width="1.6"/>
        <ellipse cx="160" cy="52" rx="34" ry="8" fill="none" stroke="${c1}" stroke-width="1.6"/>
        <ellipse cx="160" cy="88" rx="64" ry="11" fill="url(#${gid}_g)" fill-opacity="0.3" stroke="${c1}" stroke-width="1.8"/>
        <circle cx="160" cy="12" r="5" fill="#fff"/>`;
    } else if (type === "wafer") {
      artwork = `
        <circle cx="160" cy="53" r="40" fill="url(#${gid}_g)" fill-opacity="0.18" stroke="${c1}" stroke-width="1.8"/>
        <g stroke="${c2}" stroke-width="0.9" opacity="0.55">
          <line x1="126" y1="35" x2="194" y2="35"/><line x1="121" y1="47" x2="199" y2="47"/><line x1="121" y1="59" x2="199" y2="59"/><line x1="126" y1="71" x2="194" y2="71"/>
          <line x1="140" y1="17" x2="140" y2="89"/><line x1="153" y1="14" x2="153" y2="92"/><line x1="167" y1="14" x2="167" y2="92"/><line x1="180" y1="17" x2="180" y2="89"/>
        </g>
        <rect x="148" y="42" width="24" height="22" rx="3" fill="${c1}" fill-opacity="0.45" stroke="#fff" stroke-width="1.2"/>`;
    } else if (type === "hbm") {
      artwork = `
        <g transform="translate(95, 16)">
          <polygon points="65,4 125,22 65,40 5,22" fill="${c1}" fill-opacity="0.28" stroke="${c1}" stroke-width="1.4"/>
          <polygon points="65,18 125,36 65,54 5,36" fill="${c2}" fill-opacity="0.24" stroke="${c2}" stroke-width="1.4"/>
          <polygon points="65,32 125,50 65,68 5,50" fill="${c1}" fill-opacity="0.28" stroke="${c1}" stroke-width="1.4"/>
          <polygon points="65,46 125,64 65,82 5,64" fill="${c2}" fill-opacity="0.34" stroke="#fff" stroke-width="1.2"/>
          <line x1="65" y1="14" x2="65" y2="76" stroke="#fff" stroke-width="1.5" stroke-dasharray="3 2"/>
        </g>`;
    } else if (type === "optics") {
      artwork = `
        <path d="M24 53 Q95 16 160 53 T296 53" fill="none" stroke="${c1}" stroke-width="2.4"/>
        <path d="M24 62 Q95 92 160 53 T296 42" fill="none" stroke="${c2}" stroke-width="1.8" stroke-dasharray="6 4"/>
        <rect x="128" y="34" width="64" height="38" rx="7" fill="${bg}" stroke="${c1}" stroke-width="1.8"/>
        <circle cx="148" cy="53" r="6" fill="${c1}"/><circle cx="172" cy="53" r="6" fill="${c2}"/>
        <circle cx="88" cy="36" r="3" fill="#fff"/><circle cx="232" cy="68" r="3" fill="#fff"/>`;
    } else if (type === "rack") {
      artwork = `
        <g transform="translate(104, 10)">
          <rect x="0" y="0" width="50" height="86" rx="6" fill="${bg}" stroke="${c1}" stroke-width="1.6"/>
          <rect x="62" y="0" width="50" height="86" rx="6" fill="${bg}" stroke="${c2}" stroke-width="1.6"/>
          <g fill="${c1}" opacity="0.75">
            <rect x="7" y="10" width="36" height="8" rx="2"/><rect x="7" y="24" width="36" height="8" rx="2"/>
            <rect x="7" y="38" width="36" height="8" rx="2"/><rect x="7" y="52" width="36" height="8" rx="2"/><rect x="7" y="66" width="36" height="8" rx="2"/>
          </g>
          <g fill="${c2}" opacity="0.75">
            <rect x="69" y="10" width="36" height="8" rx="2"/><rect x="69" y="24" width="36" height="8" rx="2"/>
            <rect x="69" y="38" width="36" height="8" rx="2"/><rect x="69" y="52" width="36" height="8" rx="2"/><rect x="69" y="66" width="36" height="8" rx="2"/>
          </g>
          <path d="M50 28 C56 28 56 58 62 58" fill="none" stroke="#38bdf8" stroke-width="2"/>
        </g>`;
    } else if (type === "cloud_llm") {
      artwork = `
        <g stroke="${c1}" stroke-width="1.2" opacity="0.55">
          <line x1="90" y1="30" x2="160" y2="24"/><line x1="90" y1="30" x2="160" y2="54"/><line x1="90" y1="74" x2="160" y2="54"/>
          <line x1="90" y1="74" x2="160" y2="82"/><line x1="160" y1="24" x2="230" y2="40"/><line x1="160" y1="54" x2="230" y2="40"/>
          <line x1="160" y1="54" x2="230" y2="70"/><line x1="160" y1="82" x2="230" y2="70"/>
        </g>
        <circle cx="90" cy="30" r="8" fill="${c1}"/><circle cx="90" cy="74" r="8" fill="${c2}"/>
        <circle cx="160" cy="24" r="9" fill="${c2}"/><circle cx="160" cy="54" r="12" fill="url(#${gid}_g)" stroke="#fff" stroke-width="1.5"/>
        <circle cx="160" cy="82" r="9" fill="${c1}"/><circle cx="230" cy="40" r="8" fill="${c1}"/><circle cx="230" cy="70" r="8" fill="${c2}"/>`;
    } else if (type === "auto_robot") {
      artwork = `
        <path d="M40 86 L122 50 L198 50 L280 86" fill="none" stroke="${c1}" stroke-width="1.4" stroke-dasharray="5 4" opacity="0.65"/>
        <ellipse cx="160" cy="54" rx="68" ry="26" fill="none" stroke="${c2}" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.6"/>
        <rect x="116" y="42" width="88" height="28" rx="12" fill="url(#${gid}_g)" fill-opacity="0.28" stroke="${c1}" stroke-width="1.8"/>
        <circle cx="134" cy="72" r="8" fill="${bg}" stroke="${c1}" stroke-width="2"/><circle cx="186" cy="72" r="8" fill="${bg}" stroke="${c1}" stroke-width="2"/>
        <path d="M160 22 L144 40 M160 22 L176 40" stroke="#fff" stroke-width="1.5"/><circle cx="160" cy="20" r="5" fill="${c1}"/>`;
    } else if (type === "edge_device") {
      artwork = `
        <rect x="128" y="14" width="64" height="78" rx="11" fill="${bg}" stroke="${c1}" stroke-width="1.8"/>
        <rect x="135" y="24" width="50" height="54" rx="5" fill="url(#${gid}_g)" fill-opacity="0.25"/>
        <circle cx="160" cy="51" r="14" fill="none" stroke="#fff" stroke-width="1.5"/>
        <circle cx="160" cy="51" r="6" fill="${c2}"/>
        <path d="M98 40 A26 26 0 0 0 98 64 M222 40 A26 26 0 0 1 222 64" fill="none" stroke="${c1}" stroke-width="1.8" stroke-linecap="round"/>`;
    } else {
      // eda / agent_app
      artwork = `
        <rect x="78" y="18" width="164" height="70" rx="10" fill="${bg}" stroke="${c1}" stroke-width="1.6"/>
        <line x1="78" y1="34" x2="242" y2="34" stroke="${c1}" stroke-opacity="0.35"/>
        <circle cx="92" cy="26" r="3" fill="${c1}"/><circle cx="103" cy="26" r="3" fill="${c2}"/><circle cx="114" cy="26" r="3" fill="#34d399"/>
        <rect x="92" y="44" width="42" height="32" rx="5" fill="${c1}" fill-opacity="0.24" stroke="${c1}"/>
        <rect x="148" y="44" width="42" height="14" rx="4" fill="${c2}" fill-opacity="0.3"/>
        <rect x="148" y="62" width="78" height="14" rx="4" fill="${c1}" fill-opacity="0.18"/>
        <path d="M134 60 L148 51 M134 60 L148 69" stroke="#fff" stroke-width="1.4"/>`;
    }

    return `
      <svg class="product-banner-svg" viewBox="0 0 320 106" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${product.name}">
        <defs>
          <linearGradient id="${gid}_g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${c1}"/>
            <stop offset="100%" stop-color="${c2}"/>
          </linearGradient>
          <pattern id="${gid}_grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="${c1}" stroke-opacity="0.09" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="320" height="106" fill="${bg}"/>
        <rect width="320" height="106" fill="url(#${gid}_grid)"/>
        ${artwork}
        <text x="12" y="96" fill="${c1}" font-size="9" font-family="ui-monospace, monospace" opacity="0.75">${company.ticker} · ${product.category}</text>
      </svg>`;
  }

  function renderApplicationCardVisual(appName, idx) {
    const icons = [
      `<path d="M4 14h16M6 10h12M8 6h8M10 18h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>`,
      `<rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="3" fill="currentColor"/>`,
      `<circle cx="6" cy="12" r="2.5" fill="currentColor"/><circle cx="18" cy="6" r="2.5" fill="currentColor"/><circle cx="18" cy="18" r="2.5" fill="currentColor"/><path d="M8.5 11L15.5 7M8.5 13L15.5 17" stroke="currentColor" stroke-width="1.6"/>`,
      `<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" stroke="currentColor" stroke-width="1.7"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" stroke="currentColor" stroke-width="1.4"/>`
    ];
    const colors = ["#38bdf8", "#a78bfa", "#34d399", "#f472b6"];
    const color = colors[idx % colors.length];
    return `
      <div class="app-visual-card" style="--app-color:${color};">
        <div class="app-visual-icon">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none">${icons[idx % icons.length]}</svg>
        </div>
        <div class="app-visual-text">
          <strong>${appName}</strong>
          <span>核心商业化落地赛道</span>
        </div>
      </div>`;
  }

  return {
    renderProductBannerSvg,
    renderApplicationCardVisual
  };
})();
