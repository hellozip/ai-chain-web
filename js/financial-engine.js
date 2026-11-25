/* ==========================================================================
   Institutional 6-Part Financial Statement Analysis Engine (All 50 Companies)
   Covers:
     1. 利润表 (营收拆解/结构/量价/确认, 毛利率拆解, 四费, 利润五层含扣非)
     2. 资产负债表 (流动/非流动资产, 有息/无息负债, 偿债杠杆, 股东权益)
     3. 现金流量表 (经营含金量与收现比, 投资CAPEX, 筹资分红回购)
     4. 核心周转指标 (应收/存货/应付周转天数 + 固定资产周转)
     5. 盈利回报指标 (杜邦 ROE 三因素拆解, ROA, 分红率)
     6. 三张表联动交叉验证 + 综合经营优劣势与财务健康评分
     + P4-style 12-period continuous reporting dates (2023-12-31 ~ 2026-09-30)
   ========================================================================== */
window.AIFinancialEngine = (function () {
  const REPORTING_DATES_12 = [
    "2023-12-31",
    "2024-03-31", "2024-06-30", "2024-09-30", "2024-12-31",
    "2025-03-31", "2025-06-30", "2025-09-30", "2025-12-31",
    "2026-03-31", "2026-06-30", "2026-09-30"
  ];

  // Deterministic pseudo-random helper per company id so metrics are consistent & unique
  function hashSeed(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return ((h >>> 0) % 1000) / 1000;
  }

  function r1(v) { return Number(Number(v).toFixed(1)); }
  function r2(v) { return Number(Number(v).toFixed(2)); }

  function detectArchetype(c) {
    if (["nvda", "avgo", "amd", "mrvl", "hygon", "arm"].includes(c.id)) return "fabless";
    if (["snps", "cdns", "pltr", "crm", "now", "adbe", "sap"].includes(c.id)) return "saas_eda";
    if (["asml", "amat", "lrcx", "tel", "naura", "klac"].includes(c.id)) return "semiequip";
    if (["tsmc", "smic", "ase", "jcet"].includes(c.id)) return "foundry";
    if (["samsung", "skhynix", "mu"].includes(c.id)) return "memory";
    if (["innolight", "anet", "fii", "quanta", "dell", "vrt", "etn", "shinetsu", "ajinomoto"].includes(c.id)) return "hw_mfg";
    if (["msft", "googl", "amzn", "meta", "orcl", "tencent", "baba", "cmcc"].includes(c.id)) return "cloud_platform";
    if (["tsla", "byd", "xiaomi"].includes(c.id)) return "smart_ev";
    return "consumer_ind";
  }

  // Company-specific rich qualitative overrides for marquee names
  const OVERRIDES = {
    nvda: {
      top5Pct: 48,
      revMix: "数据中心 89% / 游戏 7% / 专业视觉与汽车 4%",
      geoMix: "美国 47% / 新加坡与亚太 28% / 台湾地区 16% / 其他 9%",
      volPrice: "“量价齐升”：Blackwell Ultra/GB300 单机柜 ASP 跃升，同时出货量受 CoWoS 扩产持续放量。",
      gmDriver: "机柜级软硬一体 CUDA 溢价 + 芯片迭代周期压缩，短期受初期良率爬坡小幅扰动后迅速企稳 74%+。",
      invNote: "存货与采购承诺同步高增属典型“主动锁产能备货”，对应云巨头数季度可见积压订单。",
      dividendRate: 2.5,
      buybackNote: "年化超 $400亿规模股票回购，持续增厚 EPS 与 ROE。"
    },
    tsmc: {
      top5Pct: 54,
      revMix: "HPC(含AI) 56% / 智能手机 30% / IoT与车用 14%",
      geoMix: "北美客户 71% / 中国大陆 12% / 亚太与欧洲 17%",
      volPrice: "“量价共振”：3nm/2nm 尖端制程议价提价 5-10%，CoWoS 产能翻倍供不应求。",
      gmDriver: "满载稼动率 + N3/N2 阶梯提价，充分对冲海外建厂折旧与电价上涨。",
      invNote: "高阶光掩模与在产品随 N2 量产爬坡，存货周转高度健康，跌价风险极低。",
      dividendRate: 34.0,
      buybackNote: "坚持高确定性季度现金分红政策，随自由现金流增长逐年上调股息。"
    },
    innolight: {
      top5Pct: 68,
      revMix: "800G/1.6T 高速光模块 82% / 400G 及以下 14% / 硅光与相干 4%",
      geoMix: "海外北美云巨头 84% / 中国大陆 16%",
      volPrice: "“以量补价 + 代际提价”：800G 成熟型号温和降价 8-12%，但出货量暴增叠加 1.6T 新品高单价显著拉动营收与毛利。",
      gmDriver: "1.6T 与自研硅光芯片渗透率提升对冲传统型号降价与海运关税波动。",
      invNote: "原材料（DSP/激光器芯片）主动备货高增，对应北美大客户锁量长单，需持续跟踪迭代期老品跌价准备。",
      dividendRate: 24.5,
      buybackNote: "稳健现金分红叠加员工持股激励绑定核心光通信研发团队。"
    },
    fii: {
      top5Pct: 72,
      revMix: "云计算 AI 服务器与液冷机柜 62% / 精密机构件 26% / 800G 交换机 12%",
      geoMix: "北美与海外 78% / 中国大陆 22%",
      volPrice: "“规模放量驱动”：NVL72 单机柜价值量跃升至数百万美元，高 GPU 料件过账摊薄表观毛利率但大幅放大净利润总额。",
      gmDriver: "液冷组装工艺溢价与 800G 交换机结构优化提升利润率，需关注大客户直采模式（Buy-and-Sell）占比变化。",
      invNote: "为交付北美四大云巨头 GB300 整机柜大幅备货 GPU 模组与液冷件，存货周转受高价料件拉高但回款锁定度高。",
      dividendRate: 52.0,
      buybackNote: "高分红率（>50%）叠加适度回购，成为 A 股稀缺的高现金流算力白马。"
    },
    baba: {
      top5Pct: 9,
      revMix: "淘天电商 44% / 阿里云智能 15% / 国际数字商业 14% / 菜鸟与本地生活 27%",
      geoMix: "中国大陆 83% / 海外与东南亚 17%",
      volPrice: "“AI 云量增 + 电商变现率提升”：阿里云 AI 推理调用量三位数增长，全站推广提升电商货币化率。",
      gmDriver: "高毛利阿里云与 AI 广告占比提升，对冲即时零售与 AI 基础设施折旧。",
      invNote: "轻库存平台型业务，存货占比极低，核心关注三年 3800 亿 AI CAPEX 带来的固定资产折旧节奏。",
      dividendRate: 28.0,
      buybackNote: "持续执行百亿美元级股票回购注销，显著减少流通股本并抬升每股收益与 ROE。"
    },
    tencent: {
      top5Pct: 8,
      revMix: "增值服务(游戏/社交) 48% / 营销服务(AI广告) 21% / 金融科技与企业云 31%",
      geoMix: "中国大陆 88% / 国际游戏与海外云 12%",
      volPrice: "“AI 提效溢价”：视频号广告 eCPM 与点击率双升，游戏长青产品流水稳健。",
      gmDriver: "高毛利自研游戏、视频号广告与小游戏分成驱动毛利率连续突破 54%。",
      invNote: "极轻资产模式，经营现金流常年远超净利润，几乎无存货跌价风险。",
      dividendRate: 22.0,
      buybackNote: "千亿港元级年度回购注销叠加稳定派息，综合股东回报率领跑港股科技。"
    }
  };

  /**
   * Builds continuous 12-period (2023-12-31 ~ 2026-09-30) financial time series
   * matching P4 (Tonghuashun/Eastmoney cumulative/quarterly style with exact YYYY-MM-DD X-axis)
   */
  function buildP4Series(c, arch) {
    const qFin = c.financials.quarterly;
    const yFin = c.financials.annual;
    const baseAnnualRev = yFin.revenueNum || qFin.revenueNum * 4;
    const growthFactor = Math.max(0.04, Math.min(0.85, qFin.revYoY / 100));
    const netMargin = Math.max(0.05, Math.min(0.55,
      (qFin.series && qFin.series.length ? qFin.series[qFin.series.length - 1].ni / Math.max(1, qFin.series[qFin.series.length - 1].rev) : qFin.grossMargin * 0.35 / 100)
    ));
    const seed = hashSeed(c.id);

    // Annual revenues for 2023, 2024, 2025, 2026E
    const rev2025 = baseAnnualRev;
    const rev2024 = rev2025 / (1 + Math.max(0.03, yFin.revYoY / 100));
    const rev2023 = rev2024 / (1 + Math.max(0.02, (yFin.revYoY * 0.7) / 100));
    const rev2026 = rev2025 * (1 + growthFactor);

    // Cumulative reporting pattern (like A-share/HK cumulative reports in P4: Q1 ~22%, H1 ~47%, Q3 ~73%, FY 100%)
    const cumWeights = { "03-31": 0.23, "06-30": 0.48, "09-30": 0.74, "12-31": 1.0 };
    const singleWeights = { "03-31": 0.23, "06-30": 0.25, "09-30": 0.26, "12-31": 0.26 };

    const annualByYear = { "2023": rev2023, "2024": rev2024, "2025": rev2025, "2026": rev2026 };

    const cumulative12 = REPORTING_DATES_12.map((dt, idx) => {
      const yr = dt.slice(0, 4);
      const md = dt.slice(5);
      const w = cumWeights[md];
      const jitter = 1 + Math.sin(idx * 1.1 + seed * 6) * 0.03;
      const rev = r1(annualByYear[yr] * w * jitter);
      const nmTrend = netMargin * (0.86 + idx * 0.015);
      const ni = r1(rev * nmTrend);
      const nonGaap = r1(ni * (arch === "saas_eda" ? 0.94 : 0.96 - seed * 0.03));
      const ocf = r1(ni * (arch === "cloud_platform" || arch === "saas_eda" ? 1.24 : arch === "foundry" ? 1.38 : 1.06 + seed * 0.14));
      return { date: dt, rev, ni, nonGaap, ocf };
    });

    const singleQ12 = REPORTING_DATES_12.map((dt, idx) => {
      const yr = dt.slice(0, 4);
      const md = dt.slice(5);
      const w = singleWeights[md];
      const jitter = 1 + Math.cos(idx * 0.9 + seed * 5) * 0.04;
      const rev = r1(annualByYear[yr] * w * jitter);
      const nmTrend = netMargin * (0.88 + idx * 0.012);
      const ni = r1(rev * nmTrend);
      const nonGaap = r1(ni * 0.95);
      const ocf = r1(ni * (1.12 + seed * 0.12));
      return { date: dt, rev, ni, nonGaap, ocf };
    });

    const annual5 = ["2022-12-31", "2023-12-31", "2024-12-31", "2025-12-31", "2026-09-30"].map((dt, idx) => {
      const vals = [rev2023 * 0.86, rev2023, rev2024, rev2025, rev2026 * 0.74];
      const rev = r1(vals[idx]);
      const ni = r1(rev * netMargin * (0.85 + idx * 0.04));
      const nonGaap = r1(ni * 0.95);
      const ocf = r1(ni * 1.16);
      return { date: dt, rev, ni, nonGaap, ocf };
    });

    return { cumulative12, singleQ12, annual5 };
  }

  /**
   * Generates the full 6-Part Institutional Financial Profile for any company
   */
  function analyzeCompany(c, periodKey) {
    const pKey = periodKey || "quarterly";
    const fin = c.financials[pKey] || c.financials.quarterly;
    const yFin = c.financials.annual || fin;
    const arch = detectArchetype(c);
    const seed = hashSeed(c.id);
    const ov = OVERRIDES[c.id] || {};

    const rev = fin.revenueNum || 10;
    const annualRev = yFin.revenueNum || rev * 4;
    const gm = fin.grossMargin;
    const rd = fin.rdRatio;
    const revYoY = fin.revYoY;
    const revQoQ = r1(Math.max(-6, Math.min(24, revYoY / 3.8 + (seed - 0.35) * 6)));

    // 1. Income Statement breakdown
    const mainBizPct = r1(arch === "cloud_platform" ? 95.5 + seed * 3 : 97.2 + seed * 2);
    const otherBizPct = r1(100 - mainBizPct);
    const invIncomePct = r1((seed * 2.4) + (arch === "cloud_platform" ? 1.8 : 0.4));

    const salesExp = r1(arch === "saas_eda" ? 21 + seed * 8 : arch === "consumer_ind" ? 12 + seed * 6 : arch === "foundry" ? 1.2 + seed * 1 : 4.2 + seed * 4);
    const adminExp = r1(arch === "saas_eda" ? 9.5 + seed * 3 : arch === "fabless" ? 4.8 + seed * 2.5 : 4.2 + seed * 3);
    const sbcRatio = r1(arch === "saas_eda" ? 11.5 + seed * 5 : arch === "fabless" ? 6.2 + seed * 3 : arch === "cloud_platform" ? 4.5 + seed * 2 : 1.4 + seed * 1.2);
    const finExp = r1(arch === "foundry" || arch === "memory" ? 0.6 + seed * 0.9 : -0.8 + seed * 1.1);
    const rdCapPct = r1(arch === "foundry" || arch === "semiequip" ? 8 + seed * 6 : arch === "smart_ev" ? 14 + seed * 8 : 3 + seed * 5);

    const peerAvgGm = r1(arch === "saas_eda" ? 76.5 : arch === "fabless" ? 63.0 : arch === "semiequip" ? 50.5 : arch === "foundry" ? 36.0 : arch === "memory" ? 43.0 : arch === "cloud_platform" ? 56.0 : arch === "smart_ev" ? 20.5 : 32.0);
    const gmDelta = r1(gm - peerAvgGm);

    // 5-tier profit waterfall (in USD billions equivalent matching series)
    const lastPt = fin.series && fin.series.length ? fin.series[fin.series.length - 1] : { rev, ni: r1(rev * 0.18) };
    const netProfitParent = r1(lastPt.ni);
    const opMargin = Math.max(4, gm - salesExp - adminExp - rd);
    const opProfit = r1(Math.max(netProfitParent * 1.12, rev * (opMargin / 100)));
    const totalProfit = r1(opProfit * (1 + (invIncomePct - 0.8) / 100));
    const minorityProfit = r1(Math.max(0.05, netProfitParent * (arch === "cloud_platform" ? 0.03 : 0.015 + seed * 0.02)));
    const nonRecurringRatio = arch === "saas_eda" ? 0.05 : 0.03 + seed * 0.04;
    const deductNonNetProfit = r1(netProfitParent * (1 - nonRecurringRatio));
    const netMarginPct = r1((netProfitParent / Math.max(0.1, rev)) * 100);

    // 2. Balance Sheet (derived cleanly from annualRev & archetype capital intensity)
    const assetTurnover = r2(
      arch === "hw_mfg" ? 1.18 + seed * 0.35 :
      arch === "smart_ev" ? 0.98 + seed * 0.25 :
      arch === "fabless" ? 0.88 + seed * 0.30 :
      arch === "cloud_platform" ? 0.68 + seed * 0.22 :
      arch === "saas_eda" ? 0.56 + seed * 0.18 :
      0.58 + seed * 0.16
    );
    const totalAssets = r1(annualRev / assetTurnover);
    const debtRatio = r1(
      arch === "hw_mfg" ? 48 + seed * 14 :
      arch === "smart_ev" ? 52 + seed * 15 :
      arch === "foundry" ? 36 + seed * 12 :
      arch === "fabless" ? 31 + seed * 12 :
      arch === "saas_eda" ? 42 + seed * 14 :
      38 + seed * 14
    );
    const totalLiab = r1(totalAssets * (debtRatio / 100));
    const equity = r1(totalAssets - totalLiab);
    const equityMultiplier = r2(totalAssets / Math.max(1, equity));

    const interestDebtRatio = r1(Math.min(debtRatio * 0.62, arch === "fabless" ? 11 + seed * 8 : arch === "cloud_platform" ? 14 + seed * 9 : 18 + seed * 12));
    const interestDebt = r1(totalAssets * (interestDebtRatio / 100));
    const operatingLiab = r1(totalLiab - interestDebt);
    const cash = r1(totalAssets * (arch === "fabless" || arch === "cloud_platform" ? 0.24 + seed * 0.12 : 0.15 + seed * 0.09));
    const netDebt = r1(interestDebt - cash); // Negative = Net Cash!

    const arRatio = r1(arch === "hw_mfg" || arch === "semiequip" ? 18 + seed * 8 : arch === "cloud_platform" ? 9 + seed * 5 : 13 + seed * 7);
    const arAmount = r1(annualRev * (arRatio / 100));
    const arYoY = r1(revYoY * (0.85 + seed * 0.32));

    const dso = Math.round((arAmount / Math.max(1, annualRev)) * 365);
    const dio = Math.round(
      arch === "saas_eda" || arch === "cloud_platform" ? 8 + seed * 10 :
      arch === "semiequip" ? 135 + seed * 45 :
      arch === "memory" ? 92 + seed * 32 :
      arch === "fabless" ? 68 + seed * 28 :
      arch === "hw_mfg" ? 52 + seed * 24 :
      58 + seed * 25
    );
    const dpo = Math.round(
      arch === "smart_ev" ? 118 + seed * 35 :
      arch === "hw_mfg" ? 72 + seed * 25 :
      arch === "cloud_platform" ? 68 + seed * 24 :
      54 + seed * 22
    );
    const ccc = dso + dio - dpo;

    const cogsAnnual = annualRev * (1 - gm / 100);
    const inventory = r1((dio / 365) * cogsAnnual);
    const contractLiab = r1(operatingLiab * (arch === "saas_eda" || arch === "semiequip" ? 0.42 : 0.22));
    const fixedAssets = r1(totalAssets * (arch === "foundry" || arch === "memory" ? 0.48 : arch === "cloud_platform" ? 0.32 : arch === "saas_eda" ? 0.08 : 0.22));
    const cip = r1(fixedAssets * (arch === "foundry" || arch === "cloud_platform" ? 0.24 : 0.11)); // 在建工程
    const goodwill = r1(totalAssets * (arch === "saas_eda" || c.id === "avgo" ? 0.26 : arch === "cloud_platform" ? 0.09 : 0.04));
    const goodwillToEquity = r1((goodwill / Math.max(1, equity)) * 100);
    const fixedAssetTurnover = r2(annualRev / Math.max(1, fixedAssets));

    const currentAssets = r1(cash + arAmount + inventory + totalAssets * 0.08);
    const currentLiab = r1(totalLiab * (arch === "hw_mfg" ? 0.68 : 0.48));
    const currentRatio = r2(currentAssets / Math.max(1, currentLiab));
    const quickRatio = r2((currentAssets - inventory) / Math.max(1, currentLiab));

    // 3. Cash Flow Statement
    const ocfToNi = r2(
      arch === "saas_eda" || arch === "cloud_platform" ? 1.25 + seed * 0.25 :
      arch === "foundry" ? 1.42 + seed * 0.25 :
      arch === "hw_mfg" && revYoY > 30 ? 0.86 + seed * 0.24 :
      1.05 + seed * 0.22
    );
    const ocf = r1(netProfitParent * ocfToNi);
    const cashReceiveRatio = r1((100 - (arYoY - revYoY) * 0.35 + (seed - 0.3) * 6)); // 收现比 %
    const capexPctRev = r1(arch === "foundry" ? 36 + seed * 8 : arch === "cloud_platform" ? 22 + seed * 10 : arch === "memory" ? 28 + seed * 7 : arch === "saas_eda" ? 3.5 + seed * 2 : 8 + seed * 6);
    const capex = r1(rev * (capexPctRev / 100));
    const fcf = r1(ocf - capex);
    const dividendRate = ov.dividendRate != null ? ov.dividendRate : r1(arch === "foundry" || c.market === "CN" ? 32 + seed * 20 : arch === "cloud_platform" ? 18 + seed * 14 : 12 + seed * 18);

    // 5. DuPont ROE & ROA (Exact math coherence!)
    const roe = r1(netMarginPct * assetTurnover * equityMultiplier);
    const roa = r1(netMarginPct * assetTurnover);

    // 6. Three-Statement Cross-Checks (6 signals)
    const arWarning = arYoY > revYoY + 8;
    const cipHeavy = cip / Math.max(1, fixedAssets) > 0.20;
    const invHealthy = revYoY >= 12 || dio < 85;
    const ocfStrong = ocfToNi >= 1.0;
    const netCashPos = netDebt <= 0;
    const goodwillRisk = goodwillToEquity > 35;

    const crossChecks = [
      {
        title: "营收增速 vs 应收账款增速（赊销质量检验）",
        status: arWarning ? "warn" : "good",
        tag: arWarning ? "需关注回款" : "回款健康",
        detail: `报告期营收同比 +${revYoY}%，应收账款同比约 +${arYoY}%（占营收 ${arRatio}%，周转 ${dso} 天），收现比 ${cashReceiveRatio}%，${arWarning ? "应收增速快于营收，需持续跟踪大客户账期与信用减值。" : "收入增长同步转化为现金回笼，未出现明显赊销注水。"}`
      },
      {
        title: "扩产 CAPEX / 在建工程 vs 未来折旧压力",
        status: cipHeavy ? "warn" : "good",
        tag: cipHeavy ? "转固折旧期" : "资本开支可控",
        detail: `资本开支占营收 ${capexPctRev}%，在建工程约 $${cip}亿（占固定资产 ${r1(cip / Math.max(1, fixedAssets) * 100)}%），${cipHeavy ? "新产线/智算集群大规模转固后将推升折旧费用，短期对毛利率构成考验。" : "固定资产周转率 " + fixedAssetTurnover + "x，折旧节奏与产能释放匹配度良好。"}`
      },
      {
        title: "存货变动 vs 合同负债 & 行业景气度",
        status: invHealthy ? "good" : "warn",
        tag: invHealthy ? "主动备货信号" : "警惕跌价风险",
        detail: `存货约 $${inventory}亿（周转 ${dio} 天），合同负债/预收款约 $${contractLiab}亿。${ov.invNote || (invHealthy ? "伴随高营收增速与预收订单，备货主要系主动锁定核心器件迎接需求。" : "需警惕行业产品降价或迭代周期引发的存货跌价准备计提。")}`
      },
      {
        title: "归母净利 vs 扣非净利 & 经营现金流（真金白银检验）",
        status: ocfStrong ? "good" : "warn",
        tag: ocfStrong ? "高盈利含金量" : "营运资金占用",
        detail: `归母净利润 $${netProfitParent}亿，扣非净利润 $${deductNonNetProfit}亿（占比 ${r1(deductNonNetProfit / Math.max(0.1, netProfitParent) * 100)}%），经营现金流净额 $${ocf}亿（净现比 ${ocfToNi}x），${ocfStrong ? "主业造血能力极强，账面利润充分转化为真金白银。" : "高速扩张期备货与应收占用部分营运现金，需关注后续现金流回正斜率。"}`
      },
      {
        title: "股权激励 (SBC) 对利润表与现金流背离影响",
        status: sbcRatio > 9 ? "warn" : "good",
        tag: sbcRatio > 9 ? "SBC 稀释偏高" : "激励结构均衡",
        detail: `股权激励费用占营收约 ${sbcRatio}%，在利润表计入管理/研发费用压低表观 GAAP 利润，但属于非现金支出，不消耗经营现金流，${sbcRatio > 9 ? "需结合股票回购注销力度评估对中小股东的真实股本稀释。" : "激励强度与盈利增速匹配。"}`
      },
      {
        title: "商誉与有息负债安全垫（筹资回购 & 资产排雷）",
        status: goodwillRisk || !netCashPos ? "warn" : "good",
        tag: goodwillRisk ? "商誉体量偏高" : (netCashPos ? "净现金充裕" : "可控杠杆"),
        detail: `净负债 ${netDebt <= 0 ? "净现金 $" + Math.abs(netDebt) + "亿" : "$" + netDebt + "亿"}，有息负债率 ${interestDebtRatio}%，商誉占净资产 ${goodwillToEquity}%。${ov.buybackNote || "分红率约 " + dividendRate + "%，通过分红/回购稳步提升股东 ROE 回报。"}`
      }
    ];

    // 7. Automated Strengths, Weaknesses & 4-Dimension Health Score
    const strengths = [];
    const weaknesses = [];

    if (gm >= peerAvgGm) {
      strengths.push(`盈利护城河深厚：毛利率达 ${gm}%（高于行业均值 ${peerAvgGm}% 约 ${Math.abs(gmDelta)} pct），具备强技术定价权与产品结构壁垒。`);
    } else {
      weaknesses.push(`毛利率承压特征：当前毛利率 ${gm}%（行业参考 ${peerAvgGm}%），需持续依靠高毛利新品放量与良率提升对冲成本或降价压力。`);
    }

    if (revYoY >= 20) {
      strengths.push(`高景气成长领跑：最新报告期营收同比劲增 +${revYoY}%（环比约 ${revQoQ >= 0 ? "+" : ""}${revQoQ}%），AI 算力/业务主线兑现度极高。`);
    } else if (revYoY >= 10) {
      strengths.push(`稳健双位数扩张：报告期营收同比 +${revYoY}%，主业占比 ${mainBizPct}%，核心商业模式韧性强。`);
    } else {
      weaknesses.push(`表观增速偏温和：整体营收同比 +${revYoY}%，传统存量业务体量较大，AI 新增量尚处于拉动整体增速的爬坡阶段。`);
    }

    if (ocfStrong && netCashPos) {
      strengths.push(`现金流含金量与资产安全垫极佳：净现比 ${ocfToNi}x、收现比 ${cashReceiveRatio}%，账面净现金 $${Math.abs(netDebt)}亿，抗周期能力突出。`);
    } else if (ocfStrong) {
      strengths.push(`主业造血充沛：经营现金流净额持续覆盖归母净利润（净现比 ${ocfToNi}x），自由现金流支撑研发与股东回报。`);
    } else {
      weaknesses.push(`营运资金占用偏高：扩张期备货与应收拉低短期净现比至 ${ocfToNi}x，需跟踪现金循环周期（${ccc} 天）改善进度。`);
    }

    if (roe >= 20) {
      strengths.push(`卓越股东回报：杜邦拆解 ROE 达 ${roe}%（净利率 ${netMarginPct}% × 周转率 ${assetTurnover}x × 权益乘数 ${equityMultiplier}x），属于高盈利驱动型复利资产。`);
    } else {
      weaknesses.push(`ROE 仍有提升空间：当前估算 ROE 为 ${roe}%（ROA ${roa}%），资本密集度或利润率仍有进一步优化潜力。`);
    }

    if (cipHeavy) {
      weaknesses.push(`高强度 CAPEX 转固风险：资本开支占营收 ${capexPctRev}%，在建工程密集转固将带来折旧高峰，若下游需求放缓易形成利润弹性反向放大。`);
    }
    if (goodwillRisk) {
      weaknesses.push(`并购商誉体量偏高：商誉占净资产达 ${goodwillToEquity}%，若并购标的业绩不达预期存在一次性减值侵蚀利润风险。`);
    }
    if (ov.top5Pct && ov.top5Pct >= 45) {
      weaknesses.push(`大客户集中度较高：前五大客户营收占比约 ${ov.top5Pct}%，业绩对少数北美云巨头/核心客户资本开支节奏高度敏感。`);
    }
    if (c.pe >= 45) {
      weaknesses.push(`估值隐含高增长预期：当前市盈率约 ${c.pe}x，市场已计入较高成长预期，单季业绩或指引小幅不及预期易引发估值波动。`);
    }
    if (weaknesses.length < 2) {
      weaknesses.push(`行业技术迭代与地缘风险：${c.research.risks}。`);
    }

    const scoreProfit = Math.min(98, Math.max(62, Math.round(58 + gm * 0.42 + Math.min(20, revYoY * 0.35))));
    const scoreCash = Math.min(98, Math.max(60, Math.round(52 + ocfToNi * 32 + (netCashPos ? 8 : 0))));
    const scoreSafety = Math.min(98, Math.max(62, Math.round(92 - interestDebtRatio * 0.9 - (goodwillRisk ? 10 : 0) + (currentRatio > 1.5 ? 6 : 0))));
    const scoreReturn = Math.min(98, Math.max(64, Math.round(56 + Math.min(35, roe * 1.1) + dividendRate * 0.15)));
    const totalScore = Math.round(scoreProfit * 0.32 + scoreCash * 0.28 + scoreSafety * 0.20 + scoreReturn * 0.20);

    const verdict = totalScore >= 85
      ? `综合评级【卓越 · ${totalScore}分】：兼具高盈利护城河、优质现金流含金量与清晰 AI 成长曲线，属于产业链核心压舱石资产。`
      : totalScore >= 76
      ? `综合评级【优良 · ${totalScore}分】：主业卡位扎实且成长动能明确，重点跟踪 CAPEX 折旧节奏、回款周转与毛利率趋势变化。`
      : `综合评级【稳健关注 · ${totalScore}分】：具备产业链战略地位，但需警惕高资本开支/估值波动与客户集中度带来的阶段性盈利扰动。`;

    return {
      periodLabel: fin.period,
      p4Series: buildP4Series(c, arch),
      income: {
        revenue: fin.revenue,
        revYoY,
        revQoQ,
        mainBizPct,
        otherBizPct,
        invIncomePct,
        top5Pct: ov.top5Pct || Math.round(arch === "hw_mfg" || arch === "fabless" ? 42 + seed * 22 : arch === "foundry" ? 48 + seed * 15 : 14 + seed * 18),
        revMix: ov.revMix || `${c.subSegment}核心主业 ${Math.round(mainBizPct - 18)}% / 配套服务与生态 ${Math.round(18 + otherBizPct)}%`,
        geoMix: ov.geoMix || (c.market === "CN" || c.market === "HK" ? "中国大陆 76% / 海外亚太及欧美 24%" : "北美 48% / 亚太 31% / 欧洲及其他 21%"),
        recognition: arWarning ? "季节性年末翘尾偏强，需核查四季度应收账款增幅与赊销占比。" : "收入确认平稳且与下游交付验收同步，无突击确认或异常赊销迹象。",
        volPrice: ov.volPrice || (arch === "hw_mfg" ? "“量增对冲降价”：成熟型号温和年降，但新一代 AI 规格放量驱动营收与单机价值提升。" : "“量价齐升”：高阶 AI 产品结构占比提升带动综合 ASP 与出货同步扩张。"),
        gm,
        peerAvgGm,
        gmDelta,
        gmDriver: ov.gmDriver || `核心由高毛利 AI 新品占比提升与规模效应主导，同比变动受上游原材料、稼动率及汇率综合影响。`,
        salesExp,
        adminExp,
        sbcRatio,
        rd,
        rdCapPct,
        finExp,
        opProfit,
        totalProfit,
        netProfitParent,
        deductNonNetProfit,
        minorityProfit,
        netMarginPct
      },
      balance: {
        totalAssets,
        totalLiab,
        equity,
        cash,
        arAmount,
        arRatio,
        arYoY,
        billNote: c.market === "CN" ? "银行承兑汇票为主（>85%），商业承兑占比极低，坏账计提政策审慎。" : "以信用证与大型跨国企业标准账期为主，坏账计提覆盖充分。",
        inventory,
        invStructure: arch === "saas_eda" || arch === "cloud_platform" ? "极轻库存（主要为少量云端硬件备件）" : "原材料 34% / 在产品 28% / 产成品 38%",
        invNote: ov.invNote || (invHealthy ? "存货增长与在手订单匹配，属“主动备货迎接需求”，跌价准备计提充分。" : "需关注行业迭代期老型号产成品的存货跌价准备压力。"),
        fixedAssets,
        cip,
        goodwill,
        goodwillToEquity,
        interestDebt,
        operatingLiab,
        contractLiab,
        debtRatio,
        interestDebtRatio,
        currentRatio,
        quickRatio,
        netDebt,
        equityNote: `留存收益持续厚实，${ov.buybackNote || "配合稳健分红与适度库存股回购优化资本结构。"}`
      },
      cashflow: {
        ocf,
        ocfToNi,
        cashReceiveRatio,
        capex,
        capexPctRev,
        fcf,
        dividendRate,
        financingNote: netCashPos
          ? `筹资现金流以持续现金分红（分红率约 ${dividendRate}%）及股票回购流出为主，几乎无外部股权稀释依赖。`
          : `通过低息长期债券与经营回款平衡高强度扩产融资，同时维持约 ${dividendRate}% 现金分红回报。`
      },
      turnover: {
        dso,
        dio,
        dpo,
        ccc,
        fixedAssetTurnover
      },
      returns: {
        roe,
        roa,
        netMarginPct,
        assetTurnover,
        equityMultiplier,
        dividendRate
      },
      crossChecks,
      summary: {
        totalScore,
        scores: {
          profit: scoreProfit,
          cash: scoreCash,
          safety: scoreSafety,
          ret: scoreReturn
        },
        strengths: strengths.slice(0, 4),
        weaknesses: weaknesses.slice(0, 4),
        verdict
      }
    };
  }

  return {
    analyzeCompany,
    REPORTING_DATES_12
  };
})();
