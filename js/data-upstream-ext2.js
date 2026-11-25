window.AIChainData = window.AIChainData || { companies: [] };

window.AIChainData.companies.push(
  // ===== STAGE 03 第5家: 长电科技 =====
  {
    id: "jcet",
    name: "长电科技 JCET",
    ticker: "600584.SH",
    exchange: "SSE",
    market: "CN",
    marketLabel: "A股",
    tier: "upstream",
    upstreamStage: "u-foundry",
    subSegment: "国产先进封测与 Chiplet",
    role: "中国大陆规模第一、全球前三的封测龙头与 XDFOI™ Chiplet 先进封装主力军",
    marketCap: 118,
    pe: 29.8,
    tags: ["中国封测一哥", "XDFOI Chiplet", "国产AI芯片封测", "收购晟碟存储"],
    moat: "中国大陆唯一实现 4nm 节点多维异构 Chiplet 量产的 OSAT 龙头，承接国产算力与存储封测核心产能",
    financials: makeCompactFin(
      "¥104.2亿", 14.5, 22.4, "¥7.4亿", 34.8, 15.8, 5.2,
      "高性能计算 (AI 算力) 与汽车电子封测占比快速攀升，XDFOI 2.5D/3D 产线满载",
      ["完成晟碟半导体存储封测整合后，大幅增强在企业级 NAND/AI 存储封测领域的全球竞争力。", "国产 AI 推理芯片与本土大算力 Chiplet 封装需求持续释放，显著优化毛利率。"],
      "¥192.8亿", 26.8, 21.6, "¥12.6亿", 32.5,
      "¥364.0亿", 50.6, 19.2, "¥21.5亿", 28.4
    ),
    products: [
      { name: "XDFOI™ 2.5D / 3D Chiplet 高密度异构封装", category: "先进封装平台", desc: "支持多颗国产算力芯片与高带宽存储互联，是本土 CoWoS 替代重要力量。" },
      { name: "车规级与高密度存储 (eSSD/HBM配套) 封测", category: "汽车与存储封测", desc: "服务海内外智能驾驶芯片与数据中心大容量存储封装测试。" }
    ],
    applications: ["国产 AI 训练/推理芯片封装", "数据中心大容量存储封测", "智能驾驶与端侧 AI 芯片"],
    research: { consensus: "买入", broker: "中金公司 / 华泰证券", thesis: "国内 AI 算力芯片国产化叠加 Chiplet 先进封装趋势，推动公司由传统封测向高毛利先进封装跃升。", catalysts: "2.5D 产线放量、汽车与算力大客户导入", risks: "先进封装资本开支折旧与消费电子需求波动" }
  },

  // ===== STAGE 04: AI算力芯片 (新增2家: MRVL, HYGON，与NVDA/AVGO/AMD共5家) =====
  {
    id: "mrvl",
    name: "迈威尔科技 Marvell",
    ticker: "MRVL",
    exchange: "NASDAQ",
    market: "US",
    marketLabel: "美股",
    tier: "upstream",
    upstreamStage: "u-compute",
    subSegment: "定制 ASIC 与光电 DSP",
    role: "北美第二大定制 AI ASIC 芯片龙头（亚马逊 Trainium 核心伙伴）与 800G/1.6T 光电 DSP 霸主",
    marketCap: 940,
    pe: 35.6,
    tags: ["定制ASIC双雄", "1.6T光互联DSP", "亚马逊Trainium", "数据中心占比75%"],
    moat: "在高速 PAM4 光电 DSP 领域占据全球超 50% 份额，并深度绑定亚马逊/微软自研 AI 芯片流片",
    financials: makeCompactFin(
      "$21.8亿", 21.8, 42.6, "$5.9亿", 64.5, 61.8, 26.4,
      "数据中心营收同比大增 78%，1.6T PAM4 光电芯片与 AWS Trainium3 定制芯片双爆发",
      ["与亚马逊签下多年战略供货协议，定制 AI 加速器与高速光互联协同拉动业绩高增。", "1.6T 光模块核心 DSP 与相干光互联芯片 (DCI) 处于全球技术领跑地位。"],
      "$41.2亿", 41.2, 44.2, "$10.8亿", 68.0,
      "$72.5亿", 72.5, 32.8, "$18.4亿", 51.2
    ),
    products: [
      { name: "定制云端 AI XPU / ASIC 芯片平台", category: "定制 AI 算力", desc: "为北美超大规模云厂商联合设计并量产 3nm/2nm 专用 AI 训练推理加速器。" },
      { name: "Nova 1.6T PAM4 DSP & 硅光引擎", category: "AI 光互联芯片", desc: "800G/1.6T AI 光模块的“心脏”，决定万卡集群光传输速率与功耗。" }
    ],
    applications: ["云巨头自研 AI 训练推理芯片", "800G/1.6T 数据中心光模块", "跨数据中心高速互联 (DCI)"],
    research: { consensus: "强烈买入", broker: "摩根大通 / 花旗", thesis: "同时卡位“定制 ASIC 崛起”与“光模块向 1.6T 升级”两大最强算力主线，业绩弹性突出。", catalysts: "新晋北美云巨头定制 ASIC 量产、1.6T 光模块放量", risks: "大客户订单集中度与同业竞争" }
  },
  {
    id: "hygon",
    name: "海光信息 Hygon",
    ticker: "688041.SH",
    exchange: "SSE",
    market: "CN",
    marketLabel: "A股",
    tier: "upstream",
    upstreamStage: "u-compute",
    subSegment: "国产 AI 加速卡与 CPU",
    role: "中国 A 股稀缺“高端服务器 CPU + 深算 DCU AI 加速卡”双料自主算力龙头",
    marketCap: 495,
    pe: 72.4,
    tags: ["深算DCU", "类CUDA生态兼容", "国产算力旗舰", "金融/运营商标配"],
    moat: "深算 DCU 高度兼容主流类 CUDA 软件生态，大幅降低国内大模型从海外 GPU 迁移的改造成本",
    financials: makeCompactFin(
      "¥34.6亿", 4.8, 48.5, "¥8.9亿", 56.2, 63.8, 31.5,
      "深算三号 DCU 在央国企、运营商与互联网推理集群规模出货，营收保持近 50% 高增",
      ["全面适配 DeepSeek、通义千问、混元、九天等国产主流大模型，推理性价比获客户认可。", "高毛利（63%+）叠加充沛合同负债，确立 A 股国产算力芯片盈利规模领头羊地位。"],
      "¥64.2亿", 8.9, 46.2, "¥16.2亿", 52.8,
      "¥116.5亿", 16.2, 49.4, "¥28.4亿", 58.6
    ),
    products: [
      { name: "深算系列 DCU (Deep Computing Unit)", category: "国产 AI 加速卡", desc: "支持 FP8/BF16 大模型训练与高并发推理，软件栈迁移成本极低的自主 GPGPU。" },
      { name: "海光四号/五号 高端服务器 CPU", category: "通用算力 CPU", desc: "兼容 x86 生态，广泛应用于国内智算中心、金融与政务服务器主控节点。" }
    ],
    applications: ["国产万卡智算中心", "大模型私有化部署推理", "金融/电信/政务核心服务器"],
    research: { consensus: "强烈买入", broker: "中信证券 / 国泰君安", thesis: "国内少数兼具大规模商业营收、真实高盈利与成熟软件生态的自主 AI 算力芯片领军企业。", catalysts: "新一代深算 DCU 发布、运营商与金融国产算力大单", risks: "先进晶圆代工产能供给约束、高研发投入" }
  },

  // ===== STAGE 05: HBM存储与高速光互联 (新增3家: MU, ANET, INNOLIGHT，与Samsung/SKHynix共5家) =====
  {
    id: "mu",
    name: "美光科技 Micron",
    ticker: "MU",
    exchange: "NASDAQ",
    market: "US",
    marketLabel: "美股",
    tier: "upstream",
    upstreamStage: "u-memory",
    subSegment: "美国本土 HBM 与 DRAM",
    role: "全球三大 HBM3E/HBM4 存储寡头之一、美国唯一本土尖端 AI 显存龙头",
    marketCap: 1280,
    pe: 12.8,
    tags: ["美股HBM核心", "低功耗HBM3E", "1-gamma DRAM", "英伟达核心认证"],
    moat: "HBM3E 功耗较竞品低约 30%，叠加美国 CHIPS 法案巨额补贴，牢牢锁定北美数据中心长单",
    financials: makeCompactFin(
      "$104.5亿", 104.5, 46.8, "$28.4亿", 88.5, 44.6, 9.8,
      "数据中心业务占比突破 55%，HBM 产能全年售罄并加速切换至高毛利 HBM4 12H",
      ["与英伟达、AMD 深度绑定，HBM 市占率稳步向 25% 迈进，显著抬升公司周期毛利中枢。", "大容量 128GB/256GB 服务器内存条与 PCIe 5.0 AI SSD 同步放量。"],
      "$198.0亿", 198.0, 49.2, "$51.6亿", 96.4,
      "$362.0亿", 362.0, 44.1, "$84.2亿", 145.0
    ),
    products: [
      { name: "HBM3E 12H / HBM4 超低功耗高带宽内存", category: "AI GPU 显存", desc: "兼顾高带宽与行业领先低功耗，支撑英伟达 Blackwell/Rubin 及 AMD 旗舰卡。" },
      { name: "9550 NVMe 数据中心 AI SSD & 高密度 DDR5", category: "AI 集群存储", desc: "为超大规模 AI 训练提供高吞吐数据供给。" }
    ],
    applications: ["AI GPU/ASIC 高带宽显存", "超大规模数据中心内存池", "AI 手机与智能汽车 LPDDR5X"],
    research: { consensus: "强烈买入", broker: "摩根大通 / 花旗", thesis: "HBM 定制化长协锁价锁量正在重塑存储股估值中枢，美光是美股最纯粹的 AI 内存核心标的。", catalysts: "HBM4 顺利量产交付、数据中心毛利率突破 50%", risks: "传统消费电子存储库存周期波动" }
  },
  {
    id: "anet",
    name: "阿里斯塔网络 Arista",
    ticker: "ANET",
    exchange: "NYSE",
    market: "US",
    marketLabel: "美股",
    tier: "upstream",
    upstreamStage: "u-memory",
    subSegment: "AI 高速以太网交换机",
    role: "全球超大规模 AI 数据中心 400G/800G 高速以太网交换机与 EOS 软件霸主",
    marketCap: 1380,
    pe: 46.5,
    tags: ["800G以太网龙头", "超以太网联盟", "微软/Meta核心", "64%毛利率"],
    moat: "独家单一镜像 EOS 网络操作系统 + 深度绑定微软/Meta 万卡以太网 AI 后端组网浪潮",
    financials: makeCompactFin(
      "$22.4亿", 22.4, 24.8, "$8.6亿", 27.4, 64.5, 13.8,
      "AI 后端以太网交换机营收提前突破 $20亿大关，800G 端口进入规模部署期",
      ["超大规模集群从 InfiniBand 向开放式超以太网 (Ultra Ethernet) 演进，Arista 成为最大赢家。", "毛利率稳居 64%+、净利率超 38%，财务质量在硬件网络公司中一骑绝尘。"],
      "$43.1亿", 43.1, 23.5, "$16.4亿", 26.8,
      "$79.5亿", 79.5, 21.2, "$30.1亿", 24.6
    ),
    products: [
      { name: "7800R4 / 7060X6 800G AI 脊叶交换机", category: "AI 集群网络", desc: "搭载博通 Tomahawk 芯片与自研 EOS，支撑十万卡级无损 AI 集群高速互联。" },
      { name: "CloudVision AI 网络遥测与运维平台", category: "网络软件", desc: "实时监控 AI 训练微突发拥塞，最大化昂贵 GPU 集群有效算力利用率 (MFU)。" }
    ],
    applications: ["北美云巨头万卡 AI 后端网络", "超大规模数据中心核心交换", "AI 园区与跨云互联"],
    research: { consensus: "强烈买入", broker: "高盛 / 瑞银", thesis: "随 AI 集群规模扩大，以太网在后端 Scale-Out 组网份额持续攀升，Arista 盈利确定性极高。", catalysts: "Meta/微软 800G 交换机放量、1.6T 新品发布", risks: "英伟达 Spectrum-X 以太网方案的直接竞争" }
  },
  {
    id: "innolight",
    name: "中际旭创 Innolight",
    ticker: "300308.SZ",
    exchange: "SZSE",
    market: "CN",
    marketLabel: "A股",
    tier: "upstream",
    upstreamStage: "u-memory",
    subSegment: "800G/1.6T AI 光模块",
    role: "全球数通光模块市占率第一的 800G/1.6T AI 光互联霸主（A股海外算力链旗帜）",
    marketCap: 255,
    pe: 24.8,
    tags: ["光模块全球第一", "1.6T率先量产", "硅光/CPO布局", "A股算力业绩王"],
    moat: "率先通过谷歌/英伟达/AWS 1.6T 硅光模块认证 + 泰国/国内双基地规模交付与良率绝对领先",
    financials: makeCompactFin(
      "¥82.5亿", 11.5, 44.2, "¥21.2亿", 52.8, 35.6, 5.4,
      "1.6T 高速光模块正式起量叠加 800G 硅光占比提升，净利率创历史新高",
      ["AI 集群带宽每 18 个月翻倍，公司 800G/1.6T 全球份额稳居首位，持续兑现高成长业绩。", "前瞻布局硅光芯片自研、LPO 低功耗方案及下一代共封装光学 (CPO) 引擎。"],
      "¥154.6亿", 21.5, 46.8, "¥39.4亿", 55.2,
      "¥284.0亿", 39.4, 72.5, "¥68.5亿", 96.4
    ),
    products: [
      { name: "1.6T OSFP / 800G 硅光高速光模块", category: "AI 集群光互联", desc: "实现万卡 GPU 集群之间超低延迟、超高带宽光电转换的核心器件。" },
      { name: "LPO 线性驱动与 CPO 共封装光学引擎", category: "下一代光互联", desc: "面向下一代百万卡液冷超算，大幅降低网络互联功耗与成本。" }
    ],
    applications: ["北美云巨头万卡 AI 集群", "国内智算中心高速互联", "数据中心间 DCI 传输"],
    research: { consensus: "强烈买入", broker: "中信证券 / 摩根士丹利", thesis: "1.6T 代际切换带来单价与毛利率双升，是 A 股业绩兑现度最高、全球份额最稳固的算力核心标的。", catalysts: "1.6T 月出货量爬坡、硅光自研比例提升", risks: "海外关税政策扰动、CPO 技术路线演进节奏" }
  },

  // ===== STAGE 06: AI服务器、液冷散热与算力电力 (新增4家: VRT, DELL, QUANTA, ETN，与FII共5家) =====
  {
    id: "vrt",
    name: "维谛技术 Vertiv",
    ticker: "VRT",
    exchange: "NYSE",
    market: "US",
    marketLabel: "美股",
    tier: "upstream",
    upstreamStage: "u-infra",
    subSegment: "AI 液冷散热与供电",
    role: "全球 AI 数据中心液冷系统 (CDU) 与高密度 UPS 供配电绝对霸主（英伟达官方制冷伙伴）",
    marketCap: 495,
    pe: 34.2,
    tags: ["液冷CDU霸主", "英伟达官方伙伴", "高密度UPS供电", "在手订单创纪录"],
    moat: "与英伟达联合研发 120kW-600kW+ 液冷参考架构，具备覆盖全球数据中心的独家现场工程服务网络",
    financials: makeCompactFin(
      "$26.8亿", 26.8, 26.5, "$4.1亿", 42.8, 37.8, 4.5,
      "液冷热管理订单同比翻倍，在手未交付订单 (Backlog) 突破 $95亿创历史纪录",
      ["单机柜功耗从 15kW 飙升至 130kW+，风冷彻底触及物理极限，推动液冷渗透率加速跃升。", "整合 CoolTera 液冷技术后，成为北美与欧洲智算园区一站式热电基建首选。"],
      "$51.2亿", 51.2, 24.8, "$7.6亿", 41.2,
      "$94.5亿", 94.5, 22.4, "$13.2亿", 48.6
    ),
    products: [
      { name: "CoolPhase / Liebert 液冷分配单元 (CDU)", category: "AI 液冷散热", desc: "直接带走 Blackwell/Rubin 机柜百千瓦级超高热量，保障芯片满频稳定运行。" },
      { name: "高密度 UPS 与 800V 直流机房供电架构", category: "算力供电系统", desc: "面向下一代千兆瓦级 AI 工厂的端到端电网到芯片供电方案。" }
    ],
    applications: ["百兆瓦级超大规模 AI 工厂", "全液冷 GPU 整机柜机房", "主权 AI 智算中心基建"],
    research: { consensus: "强烈买入", broker: "高盛 / 美银证券", thesis: "算力密度越高、热电基建价值量占比越大，维谛技术享受长达数年的液冷与高压直流升级周期。", catalysts: "订单出货比 (Book-to-Bill) 持续 >1.2x、营业利润率向 22% 迈进", risks: "数据中心建设审批与电力并网进度延迟" }
  },
  {
    id: "dell",
    name: "戴尔科技 Dell",
    ticker: "DELL",
    exchange: "NYSE",
    market: "US",
    marketLabel: "美股",
    tier: "upstream",
    upstreamStage: "u-infra",
    subSegment: "企业与主权 AI 服务器",
    role: "全球企业级、主权 AI 与二级云 (xAI/CoreWeave) 液冷 AI 服务器整机交付霸主",
    marketCap: 960,
    pe: 15.6,
    tags: ["PowerEdge AI服务器", "xAI超算交付", "主权AI龙头", "AI Factory方案"],
    moat: "全球最强企业级直销与运维网络 + 百万级 GPU 液冷集群极速部署与端到端 AI Factory 集成能力",
    financials: makeCompactFin(
      "$278亿", 278, 13.8, "$16.8亿", 21.4, 22.6, 3.1,
      "单季 AI 优化服务器出货突破 $48亿，在手 AI 服务器订单储备攀升至 $140亿",
      ["与英伟达联合推出的 Dell AI Factory 已覆盖超 3000 家全球大企业及主权政府客户。", "高毛利企业级存储与液冷运维服务占比提升，逐步改善服务器业务盈利水平。"],
      "$532亿", 532, 12.6, "$31.2亿", 19.8,
      "$1015亿", 1015, 11.4, "$56.8亿", 18.2
    ),
    products: [
      { name: "PowerEdge XE9712 全液冷 AI 机柜服务器", category: "AI 整机服务器", desc: "支持英伟达 NVL72 与 AMD MI350 架构的超高密度液冷计算集群。" },
      { name: "Dell AI Factory & PowerScale AI 存储", category: "企业级交钥匙 AI 基建", desc: "整合算力、网络、高速非结构化存储与现场部署的一站式企业 AI 方案。" }
    ],
    applications: ["前沿大模型十万卡集群", "主权国家 AI 基础设施", "大型金融/制造/医疗企业私有 AI"],
    research: { consensus: "买入", broker: "摩根士丹利 / 富国银行", thesis: "主权 AI 与大企业私有化部署浪潮才刚刚启动，戴尔凭借不可复制的企业渠道与低市盈率具备攻守优势。", catalysts: "AI 服务器年度出货突破 $200亿、传统服务器换机周期", risks: "高 GPU 物料占比对整体硬件毛利率的摊薄" }
  },
  {
    id: "quanta",
    name: "广达电脑 Quanta",
    ticker: "2382.TW",
    exchange: "TWSE",
    market: "TW",
    marketLabel: "台股",
    tier: "upstream",
    upstreamStage: "u-infra",
    subSegment: "北美云 AI 服务器 ODM",
    role: "全球北美云巨头 (微软/谷歌/Meta/AWS) AI 服务器与液冷整机柜核心 ODM 霸主",
    marketCap: 375,
    pe: 18.2,
    tags: ["GB300核心ODM", "北美四大云直供", "AI服务器占比70%", "高股息台股龙头"],
    moat: "深耕北美四大超大规模云厂商十余年的直供 (ODM Direct) 模式，液冷整机柜研发与良率领先",
    financials: makeCompactFin(
      "$142亿", 142, 34.6, "$6.2亿", 38.5, 8.9, 2.2,
      "AI 服务器占整体服务器营收比重突破 70%，GB300 全液冷整机柜全面放量出货",
      ["深度承接微软、谷歌、Meta 与亚马逊的 GPU 及定制 ASIC 机柜订单，订单能见度直达 2027 年。", "美国、墨西哥与泰国制造基地产能扩张，灵活应对全球贸易关税变化。"],
      "$268亿", 268, 36.2, "$11.6亿", 41.0,
      "$486亿", 486, 39.4, "$20.4亿", 46.8
    ),
    products: [
      { name: "QCT GB200/GB300 全液冷 AI 机柜系统", category: "超大规模 AI 服务器", desc: "面向北美四大云厂商的定制化 L11 整机柜级交付与集成测试方案。" },
      { name: "云巨头定制 ASIC (TPU/Trainium) 计算托盘", category: "ASIC 整机代工", desc: "同步覆盖 GPU 与自研 ASIC 两条硬件路线，平滑单一芯片风险。" }
    ],
    applications: ["北美超大规模公有云智算中心", "大模型训练与推理机房", "智能汽车域控制器"],
    research: { consensus: "强烈买入", broker: "高盛 / 摩根大通", thesis: "北美四大云厂商 CAPEX 最直接的台股核心代工受益者，兼享高增速与稳健现金分红。", catalysts: "新一代液冷机柜出货超预期、ASIC 服务器份额扩大", risks: "高单价 GPU 料件过账带来的毛利率百分比稀释" }
  },
  {
    id: "etn",
    name: "伊顿 Eaton",
    ticker: "ETN",
    exchange: "NYSE",
    market: "US",
    marketLabel: "美股",
    tier: "upstream",
    upstreamStage: "u-infra",
    subSegment: "算力电网与供配电基建",
    role: "全球超大规模 AI 数据中心变压器、开关柜与电力管理核心霸主（AI 尽头是电力标杆）",
    marketCap: 1480,
    pe: 29.8,
    tags: ["AI电力尽头核心", "数据中心变压器", "北美电网升级", "百亿级订单积压"],
    moat: "垄断北美与欧洲高壁垒电网级变压器与数据中心供配电核心产能，交货排期长达 2-3 年",
    financials: makeCompactFin(
      "$71.2亿", 71.2, 12.8, "$11.6亿", 18.4, 38.9, 3.3,
      "美洲电气板块数据中心订单同比大增 55%，兆瓦级项目储备突破千亿美元大关",
      ["AI 数据中心推动美国电网二十年来首次结构性用电大增长，中高压变压器与开关柜极度紧缺。", "分部营业利润率创历史新高 24.5%，高定价权持续兑现至 2028 年。"],
      "$138.6亿", 138.6, 11.9, "$22.1亿", 17.6,
      "$266.0亿", 266.0, 10.6, "$41.8亿", 16.4
    ),
    products: [
      { name: "超大规模数据中心中高压配电与变压器套件", category: "AI 算力电力基建", desc: "将高压电网电力稳定降压分配至百兆瓦级 AI 算力园区的核心咽喉设备。" },
      { name: "智能微电网、母线槽与储能并网控制器", category: "能效与配电管理", desc: "支持核电/绿电直供 AI 数据中心并平抑万卡训练瞬时功率尖峰。" }
    ],
    applications: ["北美与欧洲 AI 超级数据中心", "电网扩容与变电站升级", "核电/储能并网配套"],
    research: { consensus: "强烈买入", broker: "摩根士丹利 / 瑞银", thesis: "“算力的尽头是电力”，伊顿卡位 AI 基础设施周期最长、竞争壁垒最高的供配电瓶颈环节。", catalysts: "大型 AI 园区并网审批提速、电气板块扩产释放", risks: "宏观工业制造需求放缓、铜等金属原材料波动" }
  }
);

/* ==================== 上游 6 大阶段内部精密传导链路 (用于 3D 链图与详情页联动) ==================== */
window.AIChainData.upstream3DLinks = [
  // Stage 1 (IP/EDA/材料) -> Stage 2 (核心装备) & Stage 3 (代工/封测) & Stage 4 (算力芯片)
  { from: "shinetsu", to: "tsmc", label: "300mm 尖端硅片/EUV胶" },
  { from: "shinetsu", to: "smic", label: "12英寸晶圆基础材料" },
  { from: "shinetsu", to: "skhynix", label: "HBM 高平整硅片" },
  { from: "shinetsu", to: "samsung", label: "存储/逻辑大硅片" },
  { from: "ajinomoto", to: "tsmc", label: "CoWoS/ABF 载板绝缘膜" },
  { from: "ajinomoto", to: "ase", label: "先进封装载板核心膜" },
  { from: "ajinomoto", to: "nvda", label: "GPU 大尺寸载板关键膜" },
  { from: "snps", to: "nvda", label: "2nm EDA & 224G IP" },
  { from: "snps", to: "avgo", label: "定制 ASIC 高速接口 IP" },
  { from: "snps", to: "amd", label: "Chiplet EDA 全流程" },
  { from: "snps", to: "tsmc", label: "N2/A16 PDK 联合认证" },
  { from: "cdns", to: "nvda", label: "Palladium 硬件仿真" },
  { from: "cdns", to: "mrvl", label: "高速 SerDes & 封装仿真" },
  { from: "cdns", to: "avgo", label: "定制 XPU 系统验证" },
  { from: "arm", to: "nvda", label: "Grace CPU 核心架构 IP" },
  { from: "arm", to: "avgo", label: "数据中心控制核 IP" },
  { from: "arm", to: "mrvl", label: "Neoverse 定制核授权" },

  // Stage 2 (核心装备) -> Stage 3 (代工/量测/封测) & Stage 5 (存储)
  { from: "asml", to: "tsmc", label: "High-NA/EUV 光刻机" },
  { from: "asml", to: "samsung", label: "DRAM/逻辑 EUV 装备" },
  { from: "asml", to: "skhynix", label: "HBM4 EUV 光刻机" },
  { from: "amat", to: "tsmc", label: "2nm GAA 薄膜沉积装备" },
  { from: "amat", to: "smic", label: "前道材料工程设备" },
  { from: "amat", to: "mu", label: "DRAM 薄膜与封装装备" },
  { from: "lrcx", to: "tsmc", label: "尖端刻蚀与金属化设备" },
  { from: "lrcx", to: "skhynix", label: "HBM TSV 硅通孔刻蚀" },
  { from: "lrcx", to: "mu", label: "HBM/NAND 深孔刻蚀" },
  { from: "tel", to: "tsmc", label: "EUV 涂胶显影与键合" },
  { from: "tel", to: "skhynix", label: "HBM 晶圆键合装备" },
  { from: "naura", to: "smic", label: "国产刻蚀/PVD/CVD 标配" },
  { from: "naura", to: "jcet", label: "国产先进封装设备" },

  // Stage 3 (代工/量测/封测) -> Stage 4 (AI 算力芯片)
  { from: "klac", to: "tsmc", label: "N2/CoWoS 光学良率检测" },
  { from: "klac", to: "skhynix", label: "HBM 堆叠 3D 检测" },
  { from: "klac", to: "ase", label: "先进封装良率过程控制" },
  { from: "tsmc", to: "nvda", label: "3nm/2nm + CoWoS-L 独占" },
  { from: "tsmc", to: "avgo", label: "云端定制 ASIC 尖端代工" },
  { from: "tsmc", to: "amd", label: "MI355X/EPYC 晶圆代工" },
  { from: "tsmc", to: "mrvl", label: "3nm 定制 XPU 代工" },
  { from: "ase", to: "nvda", label: "CoWoS 溢出封装与终测" },
  { from: "ase", to: "amd", label: "高性能 AI 芯片封测" },
  { from: "ase", to: "avgo", label: "定制 ASIC 封装测试" },
  { from: "smic", to: "hygon", label: "国产算力晶圆制造协同" },
  { from: "jcet", to: "hygon", label: "XDFOI Chiplet 先进封装" },

  // Stage 4 (算力芯片) & Stage 5 (HBM/光互联) 协同 -> Stage 6 (服务器/液冷/电力)
  { from: "skhynix", to: "nvda", label: "HBM3E/HBM4 核心主力供应" },
  { from: "mu", to: "nvda", label: "低功耗 HBM3E 认证供应" },
  { from: "mu", to: "amd", label: "MI350 高带宽显存" },
  { from: "samsung", to: "amd", label: "HBM 与企业级 eSSD" },
  { from: "samsung", to: "dell", label: "AI 服务器大容量存储" },
  { from: "mrvl", to: "innolight", label: "800G/1.6T PAM4 DSP 芯片" },
  { from: "avgo", to: "anet", label: "Tomahawk 6 交换芯片" },
  { from: "avgo", to: "fii", label: "800G 交换机核心芯片" },

  { from: "nvda", to: "fii", label: "NVL72 液冷整机柜总装" },
  { from: "nvda", to: "quanta", label: "GB300 云端整机柜 ODM" },
  { from: "nvda", to: "dell", label: "Dell AI Factory 整机交付" },
  { from: "nvda", to: "vrt", label: "官方液冷参考架构合作" },
  { from: "amd", to: "dell", label: "MI355X 企业 AI 服务器" },
  { from: "amd", to: "quanta", label: "云端异构推理服务器" },
  { from: "hygon", to: "fii", label: "国产智算服务器整机适配" },
  { from: "anet", to: "quanta", label: "AI 集群高速以太网组网" },
  { from: "innolight", to: "fii", label: "800G/1.6T 光模块集群配套" },
  { from: "innolight", to: "anet", label: "800G/1.6T 光电接口互联" },
  { from: "vrt", to: "dell", label: "AI 机柜液冷 CDU 配套" },
  { from: "etn", to: "vrt", label: "智算园区高压供配电协同" },
  { from: "etn", to: "fii", label: "高功率机房母线配电配套" }
];
