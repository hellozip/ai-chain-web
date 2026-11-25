window.AIChainData = window.AIChainData || { companies: [] };

/* ==================== 上游 6 大细分链路定义 (30 家代表企业) ==================== */
window.AIChainData.upstreamStages = [
  {
    id: "u-eda",
    index: 1,
    code: "STAGE 01",
    name: "架构 IP · EDA · 特种材料",
    shortName: "IP/EDA与材料",
    color: "#38bdf8",
    desc: "芯片底层指令集 IP、尖端 EDA 设计仿真软件、12 英寸大硅片与 ABF 载板膜"
  },
  {
    id: "u-equip",
    index: 2,
    code: "STAGE 02",
    name: "晶圆制造核心装备",
    shortName: "半导体前道设备",
    color: "#60a5fa",
    desc: "EUV 极紫外光刻机、薄膜沉积、极低温高深宽比刻蚀与涂胶显影设备"
  },
  {
    id: "u-foundry",
    index: 3,
    code: "STAGE 03",
    name: "晶圆代工 · 量测 · 先进封测",
    shortName: "代工量测与封测",
    color: "#818cf8",
    desc: "3nm/2nm 尖端逻辑晶圆代工、良率检测、CoWoS 与 Chiplet 先进封装"
  },
  {
    id: "u-compute",
    index: 4,
    code: "STAGE 04",
    name: "AI 算力芯片 (GPU / ASIC / DCU)",
    shortName: "AI 算力芯片",
    color: "#a78bfa",
    desc: "超大规模训练/推理 GPU、云巨头定制 ASIC 与自主可控国产算力加速器"
  },
  {
    id: "u-memory",
    index: 5,
    code: "STAGE 05",
    name: "HBM 高带宽存储 · 光互联网络",
    shortName: "HBM存储与光互联",
    color: "#f472b6",
    desc: "HBM3E/HBM4 高带宽显存、800G/1.6T AI 光模块与高速无损以太网交换机"
  },
  {
    id: "u-infra",
    index: 6,
    code: "STAGE 06",
    name: "AI 服务器 · 液冷散热 · 算力电力",
    shortName: "整机液冷与电力",
    color: "#34d399",
    desc: "百千瓦级全液冷 AI 机柜 ODM、CDU 液冷散热与智算中心高压供配电基建"
  }
];

function makeCompactFin(qRev, qRevNum, qYoY, qNi, qNiYoY, gm, rd, qHl, qTk, hRev, hRevNum, hYoY, hNi, hNiYoY, yRev, yRevNum, yYoY, yNi, yNiYoY) {
  return {
    quarterly: {
      period: "2026Q3",
      revenue: qRev,
      revenueNum: qRevNum,
      revYoY: qYoY,
      netIncome: qNi,
      niYoY: qNiYoY,
      grossMargin: gm,
      rdRatio: rd,
      highlight: qHl,
      takeaways: qTk,
      series: [
        { label: "25Q4", rev: Number((qRevNum * 0.86).toFixed(1)), ni: Number((qRevNum * (gm / 260)).toFixed(1)) },
        { label: "26Q1", rev: Number((qRevNum * 0.90).toFixed(1)), ni: Number((qRevNum * (gm / 245)).toFixed(1)) },
        { label: "26Q2", rev: Number((qRevNum * 0.95).toFixed(1)), ni: Number((qRevNum * (gm / 230)).toFixed(1)) },
        { label: "26Q3", rev: qRevNum, ni: Number((qRevNum * (gm / 215)).toFixed(1)) }
      ]
    },
    semiannual: {
      period: "2026H1",
      revenue: hRev,
      revenueNum: hRevNum,
      revYoY: hYoY,
      netIncome: hNi,
      niYoY: hNiYoY,
      grossMargin: Number((gm - 0.4).toFixed(1)),
      rdRatio: Number((rd + 0.2).toFixed(1)),
      highlight: qHl,
      takeaways: [qTk[0]],
      series: [
        { label: "25H1", rev: Number((hRevNum / (1 + hYoY / 100)).toFixed(1)), ni: Number((hRevNum * 0.19).toFixed(1)) },
        { label: "25H2", rev: Number((hRevNum * 0.94).toFixed(1)), ni: Number((hRevNum * 0.22).toFixed(1)) },
        { label: "26H1", rev: hRevNum, ni: Number((hRevNum * 0.25).toFixed(1)) }
      ]
    },
    annual: {
      period: "2025FY",
      revenue: yRev,
      revenueNum: yRevNum,
      revYoY: yYoY,
      netIncome: yNi,
      niYoY: yNiYoY,
      grossMargin: Number((gm - 0.9).toFixed(1)),
      rdRatio: Number((rd + 0.3).toFixed(1)),
      highlight: qHl,
      takeaways: [qTk[qTk.length - 1]],
      series: [
        { label: "2023FY", rev: Number((yRevNum * 0.78).toFixed(1)), ni: Number((yRevNum * 0.16).toFixed(1)) },
        { label: "2024FY", rev: Number((yRevNum * 0.89).toFixed(1)), ni: Number((yRevNum * 0.20).toFixed(1)) },
        { label: "2025FY", rev: yRevNum, ni: Number((yRevNum * 0.24).toFixed(1)) }
      ]
    }
  };
}

window.AIChainData.companies.push(
  // ===== STAGE 01: 架构IP · EDA · 特种材料 (5家) =====
  {
    id: "arm",
    name: "安谋控股 Arm",
    ticker: "ARM",
    exchange: "NASDAQ",
    market: "US",
    marketLabel: "美股",
    tier: "upstream",
    upstreamStage: "u-eda",
    subSegment: "芯片架构 IP 霸主",
    role: "全球 AI 手机/数据中心 CPU 架构授权霸主（英伟达 Grace 与云厂商自研芯片核心底座）",
    marketCap: 1580,
    pe: 78.5,
    tags: ["Armv9架构", "CSS子系统", "Grace CPU底座", "96%毛利率"],
    moat: "垄断全球 99% 智能手机与加速渗透超大规模 AI 数据中心的底层指令集生态与专利版税模式",
    financials: makeCompactFin(
      "$13.2亿", 13.2, 31.5, "$4.1亿", 46.2, 96.4, 42.0,
      "Armv9 与 CSS 计算子系统版税率翻倍，AI 服务器与端侧芯片授权齐发力",
      ["数据中心基于 Arm 的定制芯片（AWS Graviton、谷歌 Axion、英伟达 Grace）份额突破 35%。", "超高 96%+ 软件级毛利率与永久版税模式构建极强复利壁垒。"],
      "$24.8亿", 24.8, 29.8, "$7.4亿", 41.5,
      "$44.5亿", 44.5, 26.4, "$12.8亿", 39.0
    ),
    products: [
      { name: "Armv9 & Neoverse CSS 算力子系统", category: "数据中心 CPU IP", desc: "大幅缩短云巨头与英伟达自研 AI 主控 CPU 研发周期，显著提升单芯片版税率。" },
      { name: "Ethos / Kleidi 端侧 AI 加速库", category: "端侧 AI 架构", desc: "驱动全球数十亿部 AI 智能手机与边缘设备高效本地推理。" }
    ],
    applications: ["AI 数据中心主控 CPU", "云巨头自研处理器", "端侧 AI 手机与汽车芯片"],
    research: { consensus: "买入", broker: "摩根士丹利 / 花旗", thesis: "CSS 高阶授权推动单颗芯片版税率跃升，AI 时代数据中心与端侧双线受益。", catalysts: "CSS 客户放量、AI PC 与端侧换机潮", risks: "高估值溢价与软银持股流通盘波动" }
  },
  {
    id: "snps",
    name: "新思科技 Synopsys",
    ticker: "SNPS",
    exchange: "NASDAQ",
    market: "US",
    marketLabel: "美股",
    tier: "upstream",
    upstreamStage: "u-eda",
    subSegment: "EDA 软件与高速 IP",
    role: "全球第一大芯片 EDA 设计软件与 SerDes/PCIe/HBM 接口 IP 绝对龙头",
    marketCap: 860,
    pe: 36.4,
    tags: ["AI芯片EDA", "DSO.ai", "Ansys多物理仿真", "HBM接口IP"],
    moat: "几乎所有 3nm/2nm AI GPU 与 ASIC 流片必备的物理验证与接口 IP 寡头垄断",
    financials: makeCompactFin(
      "$21.4亿", 21.4, 24.6, "$5.8亿", 29.5, 81.2, 34.5,
      "整合 Ansys 后打造“芯片到系统”全栈仿真霸主，AI 芯片复杂流片拉动客单价提升",
      ["AI 加速器晶体管规模向万亿迈进，3DIC Multi-Die 封装设计工具订单暴增。", "DSO.ai 自主设计软件已助力全球超千款先进制程芯片提效流片。"],
      "$40.2亿", 40.2, 22.8, "$10.6亿", 27.4,
      "$71.8亿", 71.8, 17.5, "$19.2亿", 24.1
    ),
    products: [
      { name: "Fusion Compiler & 3DIC Compiler", category: "尖端 EDA 工具", desc: "面向 2nm GAA 与 CoWoS 多裸片堆叠 AI 芯片的全流程布局布线平台。" },
      { name: "224G SerDes / HBM4 控制器 IP", category: "高速接口 IP", desc: "英伟达、博通、AMD 及云巨头定制 ASIC 不可或缺的高速互联底层模块。" }
    ],
    applications: ["尖端 AI GPU/ASIC 芯片设计", "3D 先进封装多物理场热仿真", "智能汽车芯片验证"],
    research: { consensus: "强烈买入", broker: "摩根大通 / 富国银行", thesis: "芯片设计复杂度呈指数级上升，EDA 属于穿越周期的 AI 算力“硬通货税基”。", catalysts: "Ansys 协同效应释放、2nm/A16 新工具周期", risks: "对华 EDA 出口管制限制部分区域收入" }
  },
  {
    id: "cdns",
    name: "楷登电子 Cadence",
    ticker: "CDNS",
    exchange: "NASDAQ",
    market: "US",
    marketLabel: "美股",
    tier: "upstream",
    upstreamStage: "u-eda",
    subSegment: "EDA 与硬件仿真系统",
    role: "全球模拟/数字芯片 EDA 双寡头之一与 Palladium 硬件仿真加速霸主",
    marketCap: 830,
    pe: 42.8,
    tags: ["Palladium硬件仿真", "AI辅助设计", "高速封装仿真", "云巨头刚需"],
    moat: "Palladium/Protium 硬件仿真机为超大型 AI 芯片流片前验证唯一首选，客户续约率近 100%",
    financials: makeCompactFin(
      "$14.8亿", 14.8, 19.8, "$4.1亿", 24.6, 86.5, 35.8,
      "AI 数据中心芯片验证需求井喷，Palladium Z3 与 Protium X3 硬件系统供不应求",
      ["在手积压订单创历史新高超 $75亿，北美云巨头自研 ASIC 项目全面采用 Cadence 套件。", "数据中心热流体数字孪生软件切入液冷 AI 机房设计新蓝海。"],
      "$28.1亿", 28.1, 18.4, "$7.6亿", 22.9,
      "$51.2亿", 51.2, 16.2, "$13.8亿", 20.5
    ),
    products: [
      { name: "Palladium Z3 / Protium X3 仿真系统", category: "硬件加速验证", desc: "在流片前以百亿门级容量模拟整个 AI GPU 集群软硬件运行，避免数千万美元流片失误。" },
      { name: "Cadence.AI & Celsius 3D 封装热仿真", category: "系统级 EDA", desc: "解决高功耗 AI 芯片与液冷机柜散热瓶颈的底层仿真工具。" }
    ],
    applications: ["超大规模 AI 芯片流片前验证", "3D 封装热力仿真", "AI 数据中心冷却建模"],
    research: { consensus: "买入", broker: "高盛 / 美银证券", thesis: "云巨头自研芯片百花齐放，每新增一家定制 ASIC 玩家都直接增厚 Cadence 长期订阅收入。", catalysts: "硬件仿真系统新一代放量、AI 药物与系统仿真扩张", risks: "高估值对宏观研发预算放缓敏感" }
  },
  {
    id: "shinetsu",
    name: "信越化学 Shin-Etsu",
    ticker: "4063.T",
    exchange: "TSE",
    market: "JP",
    marketLabel: "日股",
    tier: "upstream",
    upstreamStage: "u-eda",
    subSegment: "半导体硅片与光刻胶",
    role: "全球市占率第一的 12 英寸半导体大硅片与 EUV 光刻胶材料绝对霸主",
    marketCap: 760,
    pe: 19.5,
    tags: ["12英寸硅片全球第一", "EUV光刻胶", "光掩模基板", "日本材料霸主"],
    moat: "300mm 顶级纯度外延片与 EUV 光刻胶全球份额遥遥领先，是台积电/三星/SK海力士最上游基石",
    financials: makeCompactFin(
      "$45.2亿", 45.2, 11.4, "$10.4亿", 15.8, 38.6, 4.2,
      "3nm/2nm 逻辑外延片与 HBM 专用高平整度 300mm 硅片需求强劲，毛利领跑材料同行",
      ["AI 芯片封装面积扩大及 HBM 堆叠耗硅量倍增，直接驱动高端 12 英寸硅片长单满载。", "EUV 光刻胶与石英光掩模基板随先进制程曝光层数增加实现高双位数增长。"],
      "$87.6亿", 87.6, 10.2, "$19.8亿", 14.5,
      "$169.0亿", 169.0, 8.8, "$38.2亿", 11.6
    ),
    products: [
      { name: "300mm 尖端半导体硅片与外延片", category: "晶圆基底材料", desc: "纯度达 11 个 9 的尖端单晶硅片，构成所有 AI 逻辑芯片与 HBM 内存的物理载体。" },
      { name: "EUV 极紫外光刻胶与光掩模基板", category: "光刻关键耗材", desc: "支撑 3nm/2nm 极紫外光刻图形转移的高分辨率化学材料。" }
    ],
    applications: ["尖端 AI 逻辑晶圆制造", "HBM 高带宽存储晶圆", "EUV 先进光刻工艺"],
    research: { consensus: "买入", broker: "野村证券 / 摩根士丹利", thesis: "晶圆厂产能利用率全面回升带动硅片去库结束，EUV 光刻胶放量打开高毛利成长空间。", catalysts: "300mm 长协提价、2nm 配套材料认证放量", risks: "PVC 化工副业周期波动、日元汇率变动" }
  },
  {
    id: "ajinomoto",
    name: "味之素 Ajinomoto",
    ticker: "2802.T",
    exchange: "TSE",
    market: "JP",
    marketLabel: "日股",
    tier: "upstream",
    upstreamStage: "u-eda",
    subSegment: "ABF 封装载板绝缘膜",
    role: "全球 AI 芯片 ABF 先进封装载板绝缘增层膜 (ABF) 95%+ 份额隐形垄断霸主",
    marketCap: 430,
    pe: 28.4,
    tags: ["ABF膜95%垄断", "AI封装隐形冠军", "高毛利电子材料", "英伟达/AMD必备"],
    moat: "独家氨基酸衍生物化学工艺垄断全球几乎全部高端 GPU/CPU/ASIC 封装基板核心绝缘膜",
    financials: makeCompactFin(
      "$26.8亿", 26.8, 9.6, "$2.8亿", 21.4, 39.2, 3.1,
      "AI 服务器 GPU/ASIC 载板面积与层数大增，电子材料 (ABF) 板块营业利润大增 38%",
      ["新一代 Blackwell/Rubin 及定制 ASIC 载板尺寸较传统 CPU 扩大 3-5 倍，ABF 膜用量呈倍数级攀升。", "电子材料部门贡献极高利润率，与消费食品现金牛形成稳健双轮结构。"],
      "$51.4亿", 51.4, 8.9, "$5.2亿", 19.2,
      "$99.5亿", 99.5, 7.6, "$9.4亿", 18.0
    ),
    products: [
      { name: "ABF (Ajinomoto Build-up Film) 增层膜", category: "先进封装核心材料", desc: "实现高密度微细线路布线的核心绝缘膜，全球顶级 AI 算力芯片封装不可替代材料。" },
      { name: "面向玻璃基板与光共封装 (CPO) 下一代绝缘膜", category: "前沿封装材料", desc: "卡位未来 AI 芯片超大尺寸封装与硅光互联基板演进。" }
    ],
    applications: ["AI GPU/ASIC 先进封装载板", "数据中心交换芯片基板", "下一代玻璃基板与 CPO"],
    research: { consensus: "买入", broker: "高盛 / 瑞银", thesis: "算力芯片越做越大、层数越堆越多，作为 95%+ 垄断的卡脖子隐形冠军享有极高定价权。", catalysts: "玻璃基板新膜量产、AI 服务器载板层数升级", risks: "传统 PC/手机载板需求季节性波动" }
  },

  // ===== STAGE 02: 晶圆制造核心装备 (新增3家，与ASML/TEL共5家) =====
  {
    id: "amat",
    name: "应用材料 Applied Materials",
    ticker: "AMAT",
    exchange: "NASDAQ",
    market: "US",
    marketLabel: "美股",
    tier: "upstream",
    upstreamStage: "u-equip",
    subSegment: "薄膜沉积与综合装备",
    role: "全球营收规模第一的半导体薄膜沉积 (PVD/CVD)、GAA 晶体管与先进封装设备巨头",
    marketCap: 1680,
    pe: 21.8,
    tags: ["薄膜沉积龙头", "GAA2nm设备", "背面供电", "HBM封装设备"],
    moat: "产品线最全的材料工程设备超市 + GAA 环绕栅极与背面供电核心工艺增量最大受益者",
    financials: makeCompactFin(
      "$78.5亿", 78.5, 14.8, "$21.2亿", 18.5, 48.4, 12.1,
      "2nm GAA 晶体管与 HBM 先进封装设备双双创收新高，先进封装年化营收突破 $22亿",
      ["从 FinFET 转向 2nm GAA 与背面供电 (BSPDN)，使应用材料单厂可触达设备价值量提升超 20%。", "AGS 全球服务订阅收入占比稳步提高，平抑晶圆厂资本开支周期。"],
      "$152.4亿", 152.4, 13.6, "$40.8亿", 17.2,
      "$288.0亿", 288.0, 9.4, "$76.5亿", 12.8
    ),
    products: [
      { name: "Endura / Producer 薄膜沉积与外延系统", category: "前道材料工程", desc: "支撑 2nm GAA 纳米片通道与超低电阻铜互连的核心薄膜工艺装备。" },
      { name: "Sculpta 图形整形 & 先进封装混合键合设备", category: "光刻互补与封装", desc: "协助减少 EUV 多重曝光步骤并赋能 HBM4/CoWoS 晶圆级封装。" }
    ],
    applications: ["2nm GAA 逻辑晶圆产线", "HBM 高带宽存储制造", "背面供电与混合键合封装"],
    research: { consensus: "买入", broker: "摩根大通 / 美银", thesis: "GAA 与背面供电进入大规模扩产期，叠加 HBM 封装设备高增，估值在美股设备龙头中具性价比。", catalysts: "台积电 N2/A16 设备拉货、先进封装业务翻倍", risks: "对华半导体设备出口限制收紧" }
  },
  {
    id: "lrcx",
    name: "泛林集团 Lam Research",
    ticker: "LRCX",
    exchange: "NASDAQ",
    market: "US",
    marketLabel: "美股",
    tier: "upstream",
    upstreamStage: "u-equip",
    subSegment: "刻蚀与 HBM TSV 装备",
    role: "全球导体/介质刻蚀霸主与 HBM 硅通孔 (TSV) 堆叠核心工艺设备绝对龙头",
    marketCap: 1180,
    pe: 24.5,
    tags: ["刻蚀设备霸主", "HBM TSV核心", "钼金属化", "高深宽比刻蚀"],
    moat: "垄断 HBM 堆叠必需的硅通孔深孔刻蚀与电镀工艺，同时主导 3D NAND 升级换代周期",
    financials: makeCompactFin(
      "$51.2亿", 51.2, 26.4, "$14.6亿", 33.8, 49.2, 11.8,
      "HBM 扩产叠加 AI 企业级 SSD 带动 NAND 设备复苏，营收同比劲增 26.4%",
      ["HBM 从 8 层迈向 12/16 层堆叠，泛林 SABRE 3D 电镀与 Syndion TSV 刻蚀机订单翻倍。", "面向 2nm 以下的原子层沉积 (ALD) 钼金属工艺获全球头部晶圆厂批量导入。"],
      "$98.4亿", 98.4, 24.8, "$27.5亿", 31.2,
      "$182.0亿", 182.0, 21.5, "$49.2亿", 27.4
    ),
    products: [
      { name: "Syndion GP TSV 刻蚀 & SABRE 3D 电镀机", category: "HBM 先进封装设备", desc: "打通 HBM 芯片垂直微通道与铜填充互连的核心垄断级装备。" },
      { name: "Cryo 3.0 极低温高深宽比刻蚀系统", category: "尖端刻蚀设备", desc: "支撑 400 层+ 3D NAND 与下一代 AI 大容量企业级 SSD 制造。" }
    ],
    applications: ["HBM3E/HBM4 垂直堆叠制造", "AI 逻辑晶圆原子级刻蚀", "大容量企业级 3D NAND"],
    research: { consensus: "强烈买入", broker: "高盛 / 伯恩斯坦", thesis: "存储芯片向 HBM 高堆叠和 300+ 层 NAND 演进使泛林成为设备板块盈利弹性最大的标的之一。", catalysts: "HBM4 产能扩张、NAND 晶圆厂升级资本开支重启", risks: "存储周期资本开支波动与地缘出口政策" }
  },
  {
    id: "naura",
    name: "北方华创 NAURA",
    ticker: "002371.SZ",
    exchange: "SZSE",
    market: "CN",
    marketLabel: "A股",
    tier: "upstream",
    upstreamStage: "u-equip",
    subSegment: "国产半导体前道装备",
    role: "中国大陆规模最大、品类最全的平台型半导体前道装备绝对龙头（A股装备核心）",
    marketCap: 365,
    pe: 31.2,
    tags: ["国产设备一哥", "刻蚀/PVD/CVD", "本土晶圆厂标配", "A股硬科技龙头"],
    moat: "覆盖刻蚀、薄膜沉积、热处理、清洗全流程的国产平台型设备商，深度绑定国内全部头部晶圆厂",
    financials: makeCompactFin(
      "¥96.4亿", 13.4, 34.2, "¥21.8亿", 39.5, 44.6, 15.2,
      "国内晶圆厂自主扩产需求旺盛，刻蚀与薄膜沉积新机台持续突破高阶节点",
      ["在手订单充沛，中芯国际、长江存储、长鑫存储等本土 AI 与存储产线国产化率持续抬升。", "规模效应叠加高阶机台放量，净利率稳步站上 22% 以上。"],
      "¥178.5亿", 24.8, 36.8, "¥39.2亿", 41.2,
      "¥312.0亿", 43.3, 38.5, "¥64.5亿", 45.6
    ),
    products: [
      { name: "ICP/CCP 硅/金属刻蚀与 PVD/CVD 沉积设备", category: "国产前道核心设备", desc: "满足本土 12 英寸逻辑、AI 算力芯片及国产存储产线自主可控需求。" },
      { name: "立式炉管氧化退火与单片清洗机", category: "热处理与湿法装备", desc: "国内市占率稳居第一梯队的核心工艺装备。" }
    ],
    applications: ["中国大陆 12 英寸逻辑晶圆厂", "国产 DRAM/NAND 存储产线", "本土先进封装与功率半导体"],
    research: { consensus: "强烈买入", broker: "中信证券 / 中金公司", thesis: "海外出口管制越严，本土晶圆厂对北方华创的验证与采购确定性越高，是 A 股国产算力底层装备首选。", catalysts: "国内晶圆厂新一轮招标落地、涂胶显影/量测等新品类拓展", risks: "晶圆厂资本开支阶段性节奏变化" }
  },

  // ===== STAGE 03: 晶圆代工 · 量测 · 先进封测 (新增3家中的前2家: KLAC, ASE) =====
  {
    id: "klac",
    name: "科磊 KLA",
    ticker: "KLAC",
    exchange: "NASDAQ",
    market: "US",
    marketLabel: "美股",
    tier: "upstream",
    upstreamStage: "u-foundry",
    subSegment: "良率检测与光学量测",
    role: "全球晶圆缺陷检测与过程控制设备绝对霸主（市占率超 55%，毛利率居设备之首）",
    marketCap: 1120,
    pe: 28.6,
    tags: ["光学检测55%垄断", "EUV掩模检测", "先进封装检测", "62%超高毛利"],
    moat: "芯片制程越尖端、裸片面积越大，良率检测频次呈指数增长，科磊在光学晶圆检测领域近乎无替代者",
    financials: makeCompactFin(
      "$33.8亿", 33.8, 21.5, "$11.2亿", 26.8, 62.4, 11.4,
      "2nm 逻辑与 CoWoS/HBM 先进封装良率控制强度大增，毛利率高达 62.4%",
      ["AI 大芯片面积逼近光罩极限，单颗缺陷成本极高，倒逼台积电与存储厂大幅增加 KLA 检测步骤。", "先进封装检测业务同比高增超 65%，成为公司全新高毛利增长极。"],
      "$65.2亿", 65.2, 20.4, "$21.4亿", 25.1,
      "$121.5亿", 121.5, 18.6, "$38.9亿", 23.4
    ),
    products: [
      { name: "Broadband Plasma (BBP) 晶圆光学缺陷检测仪", category: "尖端良率检测", desc: "以纳米级精度捕捉 3nm/2nm 逻辑芯片与 HBM 制造中的致命微粒缺陷。" },
      { name: "EUV 光掩模检测与先进封装 3D 量测系统", category: "掩模与封装控制", desc: "保障 High-NA EUV 光罩零缺陷及 CoWoS/混合键合高良率量产。" }
    ],
    applications: ["3nm/2nm 晶圆厂良率爬坡", "EUV 光掩模缺陷检测", "HBM 与 CoWoS 先进封装检测"],
    research: { consensus: "强烈买入", broker: "摩根士丹利 / 巴克莱", thesis: "设备板块中盈利质量最高、竞争格局最稳固的“良率守护神”，直接受益于 AI 大裸片与复杂封装趋势。", catalysts: "先进封装检测份额提升、2nm 爬坡周期", risks: "海外出口合规政策调整" }
  },
  {
    id: "ase",
    name: "日月光投控 ASE",
    ticker: "3711.TW",
    exchange: "TWSE / NYSE",
    market: "TW",
    marketLabel: "台股",
    tier: "upstream",
    upstreamStage: "u-foundry",
    subSegment: "先进封测 OSAT 龙头",
    role: "全球市占率第一的委外封测 (OSAT) 霸主与台积电 CoWoS 先进封装溢出核心承接方",
    marketCap: 255,
    pe: 18.4,
    tags: ["全球封测第一", "FOCoS先进封装", "AI芯片终测", "台积电核心伙伴"],
    moat: "全球最大封测产能规模 + 与台积电深度协作承接 CoWoS-oS 与高复杂度 AI 芯片测试业务",
    financials: makeCompactFin(
      "$53.4亿", 53.4, 15.6, "$4.1亿", 28.4, 18.2, 4.6,
      "先进封装与 AI 芯片测试 (LEAP) 营收同比翻倍，突破年度 $12亿目标",
      ["AI GPU/ASIC 芯片测试时间较传统芯片拉长 3-5 倍，高毛利测试业务大幅改善盈利结构。", "FOCoS-Bridge 等自研 2.5D/3D 先进封装方案获北美云巨头定制 ASIC 采用。"],
      "$101.2亿", 101.2, 13.8, "$7.4亿", 24.5,
      "$192.5亿", 192.5, 9.2, "$13.6亿", 18.8
    ),
    products: [
      { name: "VIPack™ / FOCoS 2.5D & 3D 先进封装平台", category: "先进封装", desc: "支持多颗 AI 计算芯片与 HBM 高密度互联，承接晶圆厂外溢先进封装订单。" },
      { name: "AI 算力芯片高功率晶圆测试与终测 (CP/FT)", category: "芯片测试", desc: "解决千瓦级 AI 芯片测试散热与良率筛选瓶颈。" }
    ],
    applications: ["AI GPU/ASIC 先进封装与测试", "高速网络交换芯片封测", "智能汽车与端侧 AI SoC"],
    research: { consensus: "买入", broker: "瑞银 / 摩根大通", thesis: "台积电 CoWoS 持续满载促使高附加值封装与测试加速外溢，公司估值具吸引力且成长加速。", catalysts: "先进封装营收占比突破 15%、AI 芯片测试产能满载", risks: "消费电子传统封装复苏节奏偏缓" }
  }
);
