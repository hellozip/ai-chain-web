window.AIChainData = window.AIChainData || { companies: [] };

window.AIChainData.companies.push(
  // ==================== 上游 · 算力硬件与基础制造 (10家) ====================
  {
    id: "nvda",
    name: "英伟达 NVIDIA",
    ticker: "NVDA",
    exchange: "NASDAQ",
    market: "US",
    marketLabel: "美股",
    tier: "upstream",
    subSegment: "AI GPU与计算平台",
    role: "AI 训练/推理 GPU 绝对龙头与 CUDA 生态霸主",
    marketCap: 34200, // 亿美元 ($3.42T)
    pe: 42.5,
    tags: ["Blackwell/Rubin", "CUDA", "NVLink", "液冷机柜"],
    moat: "软硬一体 CUDA 软件栈 + NVLink 机柜级互联 + 年更架构迭代周期",
    financials: {
      quarterly: {
        period: "2026Q3 (FY27Q3)",
        revenue: "$542亿",
        revenueNum: 542,
        revYoY: 54.6,
        netIncome: "$311亿",
        niYoY: 58.2,
        grossMargin: 74.2,
        rdRatio: 9.1,
        highlight: "数据中心收入占比超 89%，Blackwell Ultra 机柜交付全面放量",
        takeaways: [
          "数据中心营收达 $485亿，同比 +61%，推理端 token 算力需求占比首次突破 45%。",
          "毛利率企稳于 74.2%，Rubin 架构已完成早期样片流片，预计 2027H1 衔接量产。",
          "主权 AI 与企业级 NIM 微服务软件订阅年化收入突破 $40亿。"
        ],
        series: [
          { label: "25Q4", rev: 393, ni: 221 },
          { label: "26Q1", rev: 441, ni: 249 },
          { label: "26Q2", rev: 492, ni: 281 },
          { label: "26Q3", rev: 542, ni: 311 }
        ]
      },
      semiannual: {
        period: "2026H1",
        revenue: "$933亿",
        revenueNum: 933,
        revYoY: 63.4,
        netIncome: "$530亿",
        niYoY: 66.8,
        grossMargin: 73.8,
        rdRatio: 9.4,
        highlight: "GB200/GB300 NVL72 整机柜成为北美云巨头标配，网络业务翻倍",
        takeaways: [
          "Spectrum-X 以太网与 InfiniBand 网络平台合计半年度营收超 $110亿。",
          "自由现金流达 $492亿，持续执行大规模股票回购计划。"
        ],
        series: [
          { label: "25H1", rev: 571, ni: 318 },
          { label: "25H2", rev: 744, ni: 416 },
          { label: "26H1", rev: 933, ni: 530 }
        ]
      },
      annual: {
        period: "2025FY",
        revenue: "$1315亿",
        revenueNum: 1315,
        revYoY: 112.5,
        netIncome: "$734亿",
        niYoY: 141.0,
        grossMargin: 75.1,
        rdRatio: 9.8,
        highlight: "全球首个年营收突破 1300 亿美元的纯半导体设计巨头",
        takeaways: [
          "Hopper 与 Blackwell 代际无缝切换，巩固数据中心 85%+ 训练算力份额。",
          "汽车与具身智能 Isaac 平台成为第二增长曲线。"
        ],
        series: [
          { label: "2023FY", rev: 270, ni: 44 },
          { label: "2024FY", rev: 609, ni: 298 },
          { label: "2025FY", rev: 1315, ni: 734 }
        ]
      }
    },
    products: [
      { name: "Blackwell Ultra / GB300 NVL72", category: "AI 算力机柜", desc: "72 卡液冷全互联机柜，面向万亿参数大模型与长思维链推理。" },
      { name: "CUDA & NIM 微服务", category: "软件生态", desc: "覆盖全球 500 万+ 开发者与企业级推理部署框架，构建高迁移成本护城河。" },
      { name: "Spectrum-X / Quantum InfiniBand", category: "高速网络", desc: "800G/1.6T 级 AI 集群无损以太网与高速互联交换平台。" }
    ],
    applications: ["超大规模云端训练", "Agent 推理集群", "主权 AI 基建", "自动驾驶与具身机器人仿真"],
    research: {
      consensus: "强烈买入",
      broker: "高盛 / 摩根士丹利",
      thesis: "推理计算范式向 Test-Time Compute 演进大幅拉动算力密度，Rubin 周期延续整机柜单价与生态壁垒。",
      catalysts: "Rubin 架构发布细节、云厂商 2027 年 CAPEX 上修、主权 AI 大单",
      risks: "北美大客户自研 ASIC 分流、对华出口管制进一步收紧"
    }
  },
  {
    id: "tsmc",
    name: "台积电 TSMC",
    ticker: "2330.TW",
    exchange: "TWSE / NYSE",
    market: "TW",
    marketLabel: "台股",
    tier: "upstream",
    subSegment: "先进晶圆代工",
    role: "全球 3nm/2nm 先进制程与 CoWoS 先进封装绝对垄断者",
    marketCap: 10200,
    pe: 24.8,
    tags: ["N2制程", "CoWoS-L", "先进封装", "晶圆代工"],
    moat: "先进制程良率遥遥领先 + 全球 AI 芯片唯一规模化 CoWoS 产能",
    financials: {
      quarterly: {
        period: "2026Q3",
        revenue: "$318亿",
        revenueNum: 318,
        revYoY: 31.2,
        netIncome: "$136亿",
        niYoY: 35.8,
        grossMargin: 57.8,
        rdRatio: 7.4,
        highlight: "3nm 及以下制程占比升至 32%，2nm (N2) 正式贡献首批商业营收",
        takeaways: [
          "HPC（含 AI 加速器）营收占比达 56%，环比持续高增。",
          "CoWoS 产能较去年同期翻倍但依然供不应求，先进封装毛利率显著改善。",
          "亚利桑那与熊本晶圆厂产能爬坡顺利，海外成本稀释好于市场预期。"
        ],
        series: [
          { label: "25Q4", rev: 268, ni: 112 },
          { label: "26Q1", rev: 279, ni: 118 },
          { label: "26Q2", rev: 298, ni: 127 },
          { label: "26Q3", rev: 318, ni: 136 }
        ]
      },
      semiannual: {
        period: "2026H1",
        revenue: "$577亿",
        revenueNum: 577,
        revYoY: 34.5,
        netIncome: "$245亿",
        niYoY: 39.2,
        grossMargin: 56.9,
        rdRatio: 7.6,
        highlight: "先进制程提价与满载稼动率驱动毛利率重回 57% 上方",
        takeaways: [
          "2026 年资本开支上调至 $420-450亿，重点投向 N2 产线与 CoWoS-L。",
          "AI 加速器相关收入五年复合增速指引上修至 45%+。"
        ],
        series: [
          { label: "25H1", rev: 429, ni: 176 },
          { label: "25H2", rev: 511, ni: 215 },
          { label: "26H1", rev: 577, ni: 245 }
        ]
      },
      annual: {
        period: "2025FY",
        revenue: "$940亿",
        revenueNum: 940,
        revYoY: 31.8,
        netIncome: "$391亿",
        niYoY: 36.4,
        grossMargin: 56.1,
        rdRatio: 7.5,
        highlight: "几乎包揽全球全部尖端 AI GPU、ASIC 与端侧 AI SoC 代工订单",
        takeaways: [
          "全球纯晶圆代工市占率突破 65%，先进节点 (>90%) 具备极强议价权。",
          "A16 背面供电技术路线图领先竞争对手 1.5-2 年。"
        ],
        series: [
          { label: "2023FY", rev: 693, ni: 269 },
          { label: "2024FY", rev: 713, ni: 287 },
          { label: "2025FY", rev: 940, ni: 391 }
        ]
      }
    },
    products: [
      { name: "N3P / N2 先进制程代工", category: "尖端逻辑晶圆", desc: "采用 GAA 纳米片晶体管架构，为旗舰 AI GPU 与手机 AI 芯片提供最优能效比。" },
      { name: "CoWoS-L / SoIC 3D 封装", category: "先进封装", desc: "支持多颗 HBM 与大型 AI 计算裸片的高密度硅中介层集成。" }
    ],
    applications: ["AI GPU/ASIC 晶圆代工", "端侧 AI 手机/PC SoC", "高速光互联与网络芯片"],
    research: {
      consensus: "强烈买入",
      broker: "摩根大通 / 瑞银",
      thesis: "无论 GPU 还是自研 ASIC 胜出均需台积电代工，是 AI 算力军备竞赛中确定性最高的“卖水人”。",
      catalysts: "N2 制程大规模量产、2027 年先进节点价格调整、CoWoS 产能扩充",
      risks: "地缘政治不确定性、海外建厂折旧成本上升"
    }
  },
  {
    id: "avgo",
    name: "博通 Broadcom",
    ticker: "AVGO",
    exchange: "NASDAQ",
    market: "US",
    marketLabel: "美股",
    tier: "upstream",
    subSegment: "定制 ASIC 与高速互联",
    role: "全球定制 AI ASIC 芯片龙头与以太网交换芯片霸主",
    marketCap: 8950,
    pe: 36.2,
    tags: ["定制ASIC", "Tomahawk交换芯片", "光互联DSP", "VMware"],
    moat: "深度绑定谷歌/Meta/字节等云巨头自研 XPU + 800G/1.6T 以太网交换垄断",
    financials: {
      quarterly: {
        period: "2026Q3",
        revenue: "$174亿",
        revenueNum: 174,
        revYoY: 28.9,
        netIncome: "$68亿",
        niYoY: 36.5,
        grossMargin: 76.4,
        rdRatio: 16.2,
        highlight: "AI 半导体单季营收突破 $65亿，新增两家超大规模定制 XPU 客户进入量产",
        takeaways: [
          "定制 AI 加速器 (XPU) 同比大增 74%，覆盖谷歌 TPU v6/v7 及 Meta MTIA 迭代。",
          "Tomahawk 6 102.4T 交换芯片开始出货，支撑十万卡以太网集群互联。",
          "VMware 基础设施软件订阅化转型完成，营业利润率超 70%。"
        ],
        series: [
          { label: "25Q4", rev: 141, ni: 51 },
          { label: "26Q1", rev: 152, ni: 56 },
          { label: "26Q2", rev: 163, ni: 62 },
          { label: "26Q3", rev: 174, ni: 68 }
        ]
      },
      semiannual: {
        period: "2026H1",
        revenue: "$315亿",
        revenueNum: 315,
        revYoY: 31.2,
        netIncome: "$118亿",
        niYoY: 41.0,
        grossMargin: 75.8,
        rdRatio: 16.5,
        highlight: "AI ASIC 与以太网高速互联双轮驱动，毛利率维持软件级高位",
        takeaways: [
          "管理层重申 2027 年定制 AI 芯片可触达市场空间 (SAM) 达 $600-900亿。",
          "光模块 DSP 与硅光 CPO 方案获北美多云平台认证。"
        ],
        series: [
          { label: "25H1", rev: 240, ni: 84 },
          { label: "25H2", rev: 279, ni: 101 },
          { label: "26H1", rev: 315, ni: 118 }
        ]
      },
      annual: {
        period: "2025FY",
        revenue: "$519亿",
        revenueNum: 519,
        revYoY: 44.2,
        netIncome: "$185亿",
        niYoY: 38.6,
        grossMargin: 75.2,
        rdRatio: 17.1,
        highlight: "完成 VMware 整合与 AI ASIC 跃升，成为“非英伟达阵营”核心旗手",
        takeaways: [
          "全年 AI 相关收入达 $182亿，占比提升至半导体板块的 52%。",
          "充沛自由现金流支撑连续多年双位数股息增长。"
        ],
        series: [
          { label: "2023FY", rev: 358, ni: 141 },
          { label: "2024FY", rev: 360, ni: 134 },
          { label: "2025FY", rev: 519, ni: 185 }
        ]
      }
    },
    products: [
      { name: "定制 AI XPU / ASIC 设计平台", category: "定制算力芯片", desc: "提供顶级 SerDes IP、先进封装协同与后端物理设计，赋能云巨头自研芯片。" },
      { name: "Tomahawk / Jericho 交换芯片", category: "数据中心网络", desc: "支撑 800G/1.6T 大规模 AI 集群 Scale-Out 组网的核心以太网芯片。" },
      { name: "VMware Cloud Foundation", category: "私有云软件", desc: "企业级私有云与 Private AI 虚拟化底座。" }
    ],
    applications: ["云巨头自研推理/训练 ASIC", "万卡集群高速网络互联", "硅光 CPO 与光模块 DSP", "企业私有 AI 云"],
    research: {
      consensus: "买入",
      broker: "美银证券 / 伯恩斯坦",
      thesis: "推理时代追求极致 TCO（总拥有成本），定制 ASIC 份额持续抬升，博通兼具算力与网络双重红利。",
      catalysts: "新晋超大规模客户流片量产、CPO 硅光交换机商用落地",
      risks: "少数大客户营收集中度较高、传统非 AI 半导体复苏节奏"
    }
  },
  {
    id: "asml",
    name: "阿斯麦 ASML",
    ticker: "ASML.AS",
    exchange: "Euronext / NASDAQ",
    market: "EU",
    marketLabel: "欧股",
    tier: "upstream",
    subSegment: "光刻核心设备",
    role: "全球唯一 EUV / High-NA EUV 极紫外光刻机垄断供应商",
    marketCap: 3350,
    pe: 31.4,
    tags: ["High-NA EUV", "极紫外光刻", "晶圆上游母机", "欧洲科技龙头"],
    moat: "百亿美元级光学/光源精密供应链独占体系，100% 垄断先进制程 EUV 光刻",
    financials: {
      quarterly: {
        period: "2026Q3",
        revenue: "$94亿",
        revenueNum: 94,
        revYoY: 19.4,
        netIncome: "$27亿",
        niYoY: 22.8,
        grossMargin: 52.6,
        rdRatio: 14.3,
        highlight: "High-NA EUV (EXE:5200) 确认收入台数增加，在手订单回升至 €390亿",
        takeaways: [
          "逻辑先进制程与 HBM 所需的 DRAM EUV 订单同步回暖，单季新增预订超 €68亿。",
          "已安装机台服务与升级收入 (IBM) 占比稳定在 25%，平滑设备周期波动。"
        ],
        series: [
          { label: "25Q4", rev: 91, ni: 26 },
          { label: "26Q1", rev: 83, ni: 23 },
          { label: "26Q2", rev: 88, ni: 25 },
          { label: "26Q3", rev: 94, ni: 27 }
        ]
      },
      semiannual: {
        period: "2026H1",
        revenue: "$171亿",
        revenueNum: 171,
        revYoY: 21.3,
        netIncome: "$48亿",
        niYoY: 24.5,
        grossMargin: 52.1,
        rdRatio: 14.8,
        highlight: "台积电 N2 与存储厂 1c DRAM 扩产带动低数值孔径与高数值孔径双线出货",
        takeaways: [
          "中国大陆营收占比常态化回落至 22% 左右，欧美台韩先进逻辑占比提升至 78%。",
          "High-NA EUV 单台售价近 $3.8亿，随良率提升逐步释放毛利弹性。"
        ],
        series: [
          { label: "25H1", rev: 141, ni: 39 },
          { label: "25H2", rev: 170, ni: 49 },
          { label: "26H1", rev: 171, ni: 48 }
        ]
      },
      annual: {
        period: "2025FY",
        revenue: "$311亿",
        revenueNum: 311,
        revYoY: 11.2,
        netIncome: "$88亿",
        niYoY: 13.5,
        grossMargin: 51.6,
        rdRatio: 14.5,
        highlight: "穿越晶圆厂资本开支调整期，奠定 2026-2030 年 AI 光刻长周期基础",
        takeaways: [
          "公司长期指引维持 2030 年年营收 €440-600亿、毛利率 56%-60%。"
        ],
        series: [
          { label: "2023FY", rev: 298, ni: 85 },
          { label: "2024FY", rev: 280, ni: 78 },
          { label: "2025FY", rev: 311, ni: 88 }
        ]
      }
    },
    products: [
      { name: "TWINSCAN EXE:5200 (High-NA EUV)", category: "下一代光刻机", desc: "0.55 数值孔径极紫外光刻系统，面向 2nm 以下及 A14 尖端 AI 芯片。" },
      { name: "TWINSCAN NXE:3800E (EUV)", category: "主力光刻机", desc: "每小时 220 片晶圆高吞吐量，支撑当前 3nm/2nm 与 HBM4 制造。" }
    ],
    applications: ["3nm/2nm 逻辑芯片光刻", "HBM/尖端 DRAM 制造", "计算光刻与晶圆量测"],
    research: {
      consensus: "买入",
      broker: "摩根士丹利 / 德意志银行",
      thesis: "AI 算力芯片面积持续增大叠加 HBM 堆叠升级，直接推升每片晶圆 EUV 曝光层数。",
      catalysts: "台积电与三星 2027 年资本开支指引、High-NA 商业订单放量",
      risks: "欧美对华设备出口及售后维保管制升级、部分代工厂扩产延后"
    }
  },
  {
    id: "samsung",
    name: "三星电子 Samsung",
    ticker: "005930.KS",
    exchange: "KRX",
    market: "KR",
    marketLabel: "韩股",
    tier: "upstream",
    subSegment: "存储芯片与半导体制造",
    role: "全球最大 DRAM/NAND 存储巨头与 HBM/AI 手机综合龙头",
    marketCap: 3120,
    pe: 14.2,
    tags: ["HBM3E/HBM4", "企业级SSD", "DRAM", "Galaxy AI"],
    moat: "全球最大存储产能规模 + 存储/代工/终端垂直整合能力",
    financials: {
      quarterly: {
        period: "2026Q3",
        revenue: "$612亿",
        revenueNum: 612,
        revYoY: 16.5,
        netIncome: "$89亿",
        niYoY: 31.4,
        grossMargin: 41.2,
        rdRatio: 10.6,
        highlight: "HBM4 样品通过核心 GPU 客户验证，AI 服务器企业级 eSSD 营收大增",
        takeaways: [
          "DS 半导体部门营业利润创近三年新高，高毛利 DDR5 与 eSSD 贡献显著。",
          "HBM3E 12 层堆叠出货量环比增长 48%，缩小与竞争对手差距。"
        ],
        series: [
          { label: "25Q4", rev: 554, ni: 66 },
          { label: "26Q1", rev: 568, ni: 74 },
          { label: "26Q2", rev: 590, ni: 82 },
          { label: "26Q3", rev: 612, ni: 89 }
        ]
      },
      semiannual: {
        period: "2026H1",
        revenue: "$1158亿",
        revenueNum: 1158,
        revYoY: 14.8,
        netIncome: "$156亿",
        niYoY: 28.9,
        grossMargin: 40.3,
        rdRatio: 10.9,
        highlight: "存储周期上行叠加端侧 Galaxy AI 旗舰换机，盈利质量持续修复",
        takeaways: [
          "数据中心大容量 QLC SSD 成为 AI 训练语料存储刚需，市占率全球第一。"
        ],
        series: [
          { label: "25H1", rev: 1009, ni: 121 },
          { label: "25H2", rev: 1080, ni: 134 },
          { label: "26H1", rev: 1158, ni: 156 }
        ]
      },
      annual: {
        period: "2025FY",
        revenue: "$2089亿",
        revenueNum: 2089,
        revYoY: 18.2,
        netIncome: "$255亿",
        niYoY: 84.5,
        grossMargin: 38.8,
        rdRatio: 11.2,
        highlight: "存储超级周期重启，稳居全球存储芯片出货总量榜首",
        takeaways: [
          "积极推进 HBM4 逻辑底层裸片自研与晶圆代工协同策略。"
        ],
        series: [
          { label: "2023FY", rev: 1980, ni: 118 },
          { label: "2024FY", rev: 1767, ni: 138 },
          { label: "2025FY", rev: 2089, ni: 255 }
        ]
      }
    },
    products: [
      { name: "HBM3E 12H / HBM4 高带宽内存", category: "AI 显存", desc: "面向下一代 AI 加速器的高堆叠、低功耗高带宽存储模块。" },
      { name: "PM1753 / 企业级大容量 eSSD", category: "AI 数据存储", desc: "支持 PCIe 5.0 与百 TB 级 AI 语料库高速读写。" }
    ],
    applications: ["AI 服务器内存与存储", "高带宽 GPU 显存", "端侧 AI 智能手机与显示"],
    research: {
      consensus: "增持",
      broker: "花旗 / 野村证券",
      thesis: "估值处于全球 AI 硬件巨头低位，HBM4 认证突破与企业级 SSD 景气度带来估值修复空间。",
      catalysts: "HBM4 获北美头部客户大批量订单、晶圆代工良率改善",
      risks: "先进逻辑代工亏损收窄不及预期、消费电子需求波动"
    }
  },
  {
    id: "amd",
    name: "超威半导体 AMD",
    ticker: "AMD",
    exchange: "NASDAQ",
    market: "US",
    marketLabel: "美股",
    tier: "upstream",
    subSegment: "数据中心 GPU/CPU",
    role: "全球数据中心 AI GPU 核心二号挑战者与 EPYC 服务器 CPU 龙头",
    marketCap: 2680,
    pe: 34.1,
    tags: ["MI350/MI400", "EPYC CPU", "ROCm开源生态", "AI PC"],
    moat: "Chiplet 先进封装架构优势 + 开放 ROCm 软件栈 + CPU+GPU 全栈数据中心方案",
    financials: {
      quarterly: {
        period: "2026Q3",
        revenue: "$92亿",
        revenueNum: 92,
        revYoY: 34.8,
        netIncome: "$24亿",
        niYoY: 52.1,
        grossMargin: 54.6,
        rdRatio: 22.8,
        highlight: "Instinct MI355X 放量带动数据中心单季营收突破 $53亿，EPYC 市占率超 36%",
        takeaways: [
          "微软、Meta 与甲骨文大规模采购 MI350 系列用于高性价比大模型推理集群。",
          "整合 ZT Systems 机柜设计团队后，整机柜级交付能力显著提升。"
        ],
        series: [
          { label: "25Q4", rev: 76, ni: 17 },
          { label: "26Q1", rev: 80, ni: 19 },
          { label: "26Q2", rev: 86, ni: 21 },
          { label: "26Q3", rev: 92, ni: 24 }
        ]
      },
      semiannual: {
        period: "2026H1",
        revenue: "$166亿",
        revenueNum: 166,
        revYoY: 35.2,
        netIncome: "$40亿",
        niYoY: 56.4,
        grossMargin: 54.1,
        rdRatio: 23.4,
        highlight: "数据中心占比跃升至 57%，成为第二大商用通用 AI GPU 供应商",
        takeaways: [
          "Ryzen AI 商用笔记本芯片市占率提升，端侧 NPU 算力领跑 x86 阵营。"
        ],
        series: [
          { label: "25H1", rev: 123, ni: 26 },
          { label: "25H2", rev: 145, ni: 32 },
          { label: "26H1", rev: 166, ni: 40 }
        ]
      },
      annual: {
        period: "2025FY",
        revenue: "$268亿",
        revenueNum: 268,
        revYoY: 18.1,
        netIncome: "$58亿",
        niYoY: 42.8,
        grossMargin: 53.2,
        rdRatio: 24.0,
        highlight: "数据中心 AI GPU 年化营收跨越百亿美元台阶",
        takeaways: [
          "ROCm 生态与 PyTorch/vLLM 深度适配，降低推理迁移门槛。"
        ],
        series: [
          { label: "2023FY", rev: 227, ni: 33 },
          { label: "2024FY", rev: 258, ni: 41 },
          { label: "2025FY", rev: 268, ni: 58 }
        ]
      }
    },
    products: [
      { name: "Instinct MI355X / MI400", category: "AI 加速卡", desc: "超大 HBM 容量与高 FP4/FP8 推理吞吐，主打大内存推理性价比。" },
      { name: "EPYC Turin 服务器 CPU", category: "通用算力 CPU", desc: "AI 节点必备高性能主控 CPU，持续抢占传统服务器市场份额。" }
    ],
    applications: ["大模型云端推理", "超算中心", "企业级 AI 服务器", "AI PC 端侧终端"],
    research: {
      consensus: "买入",
      broker: "巴克莱 / 杰富瑞",
      thesis: "云巨头为平衡单一供应商风险持续扶植 AMD，MI400 机柜级产品有望打开更大市场份额。",
      catalysts: "MI400 整机柜客户官宣、ROCm 推理性能基准突破",
      risks: "英伟达架构迭代压制、云厂自研推理芯片挤压"
    }
  },
  {
    id: "skhynix",
    name: "SK海力士 SK Hynix",
    ticker: "000660.KS",
    exchange: "KRX",
    market: "KR",
    marketLabel: "韩股",
    tier: "upstream",
    subSegment: "HBM 高带宽内存",
    role: "全球 HBM3E/HBM4 高带宽内存市占率第一的核心霸主",
    marketCap: 1380,
    pe: 8.6,
    tags: ["HBM绝对龙头", "MR-MUF封装", "HBM4量产", "英伟达核心供应"],
    moat: "独家 MR-MUF 散热封装工艺良率领先 + 与台积电深度协同定制 HBM4 底座",
    financials: {
      quarterly: {
        period: "2026Q3",
        revenue: "$162亿",
        revenueNum: 162,
        revYoY: 38.4,
        netIncome: "$58亿",
        niYoY: 51.2,
        grossMargin: 53.5,
        rdRatio: 8.2,
        highlight: "HBM 占 DRAM 总收入比例突破 46%，2027 年 HBM4 产能已基本被锁定",
        takeaways: [
          "营业利润率连续四个季度站稳 38% 以上，彻底摆脱传统存储强周期低毛利模式。",
          "与台积电联合开发的定制化 HBM4 12H 率先实现规模交付。"
        ],
        series: [
          { label: "25Q4", rev: 138, ni: 47 },
          { label: "26Q1", rev: 145, ni: 50 },
          { label: "26Q2", rev: 153, ni: 54 },
          { label: "26Q3", rev: 162, ni: 58 }
        ]
      },
      semiannual: {
        period: "2026H1",
        revenue: "$298亿",
        revenueNum: 298,
        revYoY: 41.2,
        netIncome: "$104亿",
        niYoY: 62.5,
        grossMargin: 52.8,
        rdRatio: 8.5,
        highlight: "高毛利 HBM 长单锁价锁量，现金流大幅改善并加速去杠杆",
        takeaways: [
          "清州 M15X 晶圆厂与龙仁集群稳步扩产，承接全球 AI 显存倍增需求。"
        ],
        series: [
          { label: "25H1", rev: 211, ni: 64 },
          { label: "25H2", rev: 266, ni: 90 },
          { label: "26H1", rev: 298, ni: 104 }
        ]
      },
      annual: {
        period: "2025FY",
        revenue: "$477亿",
        revenueNum: 477,
        revYoY: 96.3,
        netIncome: "$154亿",
        niYoY: 310.0,
        grossMargin: 50.4,
        rdRatio: 8.8,
        highlight: "凭借 HBM 先发统治力创历史最高年度盈利纪录",
        takeaways: [
          "全球 HBM 市占率超过 55%，成为英伟达旗舰卡最核心存储伙伴。"
        ],
        series: [
          { label: "2023FY", rev: 243, ni: -68 },
          { label: "2024FY", rev: 412, ni: 121 },
          { label: "2025FY", rev: 477, ni: 154 }
        ]
      }
    },
    products: [
      { name: "HBM4 12层 / 16层堆叠内存", category: "尖端 AI 显存", desc: "2048-bit 超宽接口，搭配台积电逻辑基底裸片，支撑下一代 GPU 带宽翻倍。" },
      { name: "LPDDR5X / 321层企业级 NAND", category: "数据中心存储", desc: "服务低功耗 AI 服务器与边缘计算节点。" }
    ],
    applications: ["AI GPU/ASIC 高带宽显存", "数据中心高密度内存池", "AI 手机端侧高速缓存"],
    research: {
      consensus: "强烈买入",
      broker: "高盛 / 麦格理",
      thesis: "HBM 正从标准化大宗商品转变为定制化高壁垒器件，盈利能见度远高于历史上任何一轮存储周期。",
      catalysts: "HBM4 溢价率超预期、AI 推理内存容量倍增趋势",
      risks: "竞争对手 HBM4 良率追赶带来的份额与价格竞争"
    }
  },
  {
    id: "tel",
    name: "东京电子 Tokyo Electron",
    ticker: "8035.T",
    exchange: "TSE",
    market: "JP",
    marketLabel: "日股",
    tier: "upstream",
    subSegment: "半导体前道制程设备",
    role: "全球涂胶显影机 (Coater/Developer) 绝对霸主与刻蚀/键合设备龙头",
    marketCap: 920,
    pe: 25.4,
    tags: ["涂胶显影90%市占", "低温刻蚀", "混合键合", "日本半导体核心"],
    moat: "EUV 光刻配套涂胶显影机全球近 90% 市占率 + HBM 键合与高深宽比刻蚀核心工艺",
    financials: {
      quarterly: {
        period: "2026Q3",
        revenue: "$48亿",
        revenueNum: 48,
        revYoY: 22.1,
        netIncome: "$12亿",
        niYoY: 27.4,
        grossMargin: 47.2,
        rdRatio: 10.8,
        highlight: "HBM 与 2nm GAA 产线所需的键合及极低温刻蚀设备订单创新高",
        takeaways: [
          "面向先进封装的晶圆键合 (Wafer Bonder) 业务同比翻倍，切入 AI 3D 堆叠红利。",
          "EUV 配套涂胶显影设备与 ASML High-NA 同步放量。"
        ],
        series: [
          { label: "25Q4", rev: 42, ni: 10 },
          { label: "26Q1", rev: 44, ni: 10.6 },
          { label: "26Q2", rev: 46, ni: 11.3 },
          { label: "26Q3", rev: 48, ni: 12 }
        ]
      },
      semiannual: {
        period: "2026H1",
        revenue: "$90亿",
        revenueNum: 90,
        revYoY: 24.0,
        netIncome: "$21.9亿",
        niYoY: 28.6,
        grossMargin: 46.8,
        rdRatio: 11.1,
        highlight: "毛利率攀升至 46.8%，受益于先进制程设备结构性占比提高",
        takeaways: [
          "研发投入持续加码，未来五年规划投入超 1.5 万亿日元巩固前道与封装设备壁垒。"
        ],
        series: [
          { label: "25H1", rev: 73, ni: 17 },
          { label: "25H2", rev: 84, ni: 20 },
          { label: "26H1", rev: 90, ni: 21.9 }
        ]
      },
      annual: {
        period: "2025FY",
        revenue: "$157亿",
        revenueNum: 157,
        revYoY: 27.5,
        netIncome: "$37亿",
        niYoY: 36.2,
        grossMargin: 46.2,
        rdRatio: 11.0,
        highlight: "日本半导体产业链复兴核心旗舰，深度绑定台积电/三星/SK海力士",
        takeaways: [
          "高 ROE（>28%）叠加高分红回购比例，受全球机构资金青睐。"
        ],
        series: [
          { label: "2023FY", rev: 128, ni: 25 },
          { label: "2024FY", rev: 123, ni: 27 },
          { label: "2025FY", rev: 157, ni: 37 }
        ]
      }
    },
    products: [
      { name: "CLEAN TRACK LITHIUS 涂胶显影机", category: "光刻配套设备", desc: "几乎所有 EUV 光刻产线的标准配置，控制纳米级光刻胶均匀度。" },
      { name: "低温高深宽比刻蚀 & 晶圆键合机", category: "刻蚀与封装设备", desc: "解决 400 层+ 3D NAND 与 HBM 先进封装的核心制程瓶颈。" }
    ],
    applications: ["先进逻辑晶圆产线", "HBM 堆叠与混合键合", "3D NAND 存储制造"],
    research: {
      consensus: "买入",
      broker: "野村证券 / 高盛",
      thesis: "AI 芯片向 2nm GAA、背面供电与 3D 堆叠演进，显著提升单厂前道及封装设备资本强度。",
      catalysts: "Cryo 低温刻蚀机获大厂批量导入、2027 年全球 WFE 设备支出上修",
      risks: "日本对华半导体设备出口限制加码、日元汇率大幅波动"
    }
  },
  {
    id: "fii",
    name: "工业富联 FII",
    ticker: "601138.SH",
    exchange: "SSE",
    market: "CN",
    marketLabel: "A股",
    tier: "upstream",
    subSegment: "AI 服务器与液冷整机",
    role: "全球 AI 服务器整机柜与 800G 交换机核心代工龙头（A股算力大市值标杆）",
    marketCap: 760,
    pe: 21.5,
    tags: ["GB300液冷机柜", "800G交换机", "全球ODM龙头", "A股算力核心"],
    moat: "全球产能多地布局（墨西哥/越南/中国/美国）+ 顶级液冷整机柜垂直集成制造能力",
    financials: {
      quarterly: {
        period: "2026Q3",
        revenue: "¥1968亿",
        revenueNum: 273,
        revYoY: 28.4,
        netIncome: "¥79.5亿",
        niYoY: 31.2,
        grossMargin: 8.6,
        rdRatio: 1.9,
        highlight: "云计算业务占比突破 62%，AI 服务器单季营收同比大增超 85%",
        takeaways: [
          "北美四大云巨头 GB200/GB300 液冷整机柜交付份额稳居全球首位。",
          "800G 高速交换机与 AI 集群光互联板卡放量，显著拉动通信板块毛利率。"
        ],
        series: [
          { label: "25Q4", rev: 235, ni: 10.1 },
          { label: "26Q1", rev: 221, ni: 8.9 },
          { label: "26Q2", rev: 249, ni: 10.2 },
          { label: "26Q3", rev: 273, ni: 11.0 }
        ]
      },
      semiannual: {
        period: "2026H1",
        revenue: "¥3385亿",
        revenueNum: 470,
        revYoY: 27.2,
        netIncome: "¥137.4亿",
        niYoY: 30.8,
        grossMargin: 8.4,
        rdRatio: 2.0,
        highlight: "AI 服务器占整体服务器营收比重超 55%，现金分红率保持高位",
        takeaways: [
          "全球制造网络有效对冲关税扰动，北美与东南亚高阶产线利用率满载。"
        ],
        series: [
          { label: "25H1", rev: 369, ni: 14.6 },
          { label: "25H2", rev: 446, ni: 19.8 },
          { label: "26H1", rev: 470, ni: 19.1 }
        ]
      },
      annual: {
        period: "2025FY",
        revenue: "¥6091亿",
        revenueNum: 846,
        revYoY: 27.9,
        netIncome: "¥248.6亿",
        niYoY: 18.2,
        grossMargin: 8.1,
        rdRatio: 2.1,
        highlight: "稳居 A 股 AI 硬件营收与净利润绝对规模第一梯队",
        takeaways: [
          "深度参与从 GPU 模组、主板、液冷散热到整机柜总装全价值链。"
        ],
        series: [
          { label: "2023FY", rev: 662, ni: 29.2 },
          { label: "2024FY", rev: 661, ni: 29.3 },
          { label: "2025FY", rev: 846, ni: 34.5 }
        ]
      }
    },
    products: [
      { name: "NVL72 液冷 AI 服务器整机柜", category: "AI 算力整机", desc: "涵盖计算托盘、交换托盘、CDU 液冷分配单元的全栈交付方案。" },
      { name: "800G / 1.6T 数据中心高速交换机", category: "高速网络设备", desc: "服务北美及国内头部云厂商大规模 AI 训练集群组网。" }
    ],
    applications: ["北美超大规模数据中心", "国内智算中心建设", "工业互联网与智能制造"],
    research: {
      consensus: "买入",
      broker: "中信证券 / 中金公司",
      thesis: "随单机柜价值量跃升及液冷渗透率提升，公司作为核心总装龙头盈利弹性与能见度在 A 股算力链中具备显著稀缺性。",
      catalysts: "新一代液冷机柜良率爬坡、800G/1.6T 交换机放量、高分红预期",
      risks: "海外关税政策变动、下游云厂商 CAPEX 阶段性波动"
    }
  },
  {
    id: "smic",
    name: "中芯国际 SMIC",
    ticker: "688981.SH",
    exchange: "SSE / HKEX",
    market: "CN",
    marketLabel: "A股",
    tier: "upstream",
    subSegment: "本土晶圆代工",
    role: "中国大陆规模最大、技术最领先的本土晶圆代工核心（A+H 大市值龙头）",
    marketCap: 710,
    pe: 58.2,
    tags: ["国产替代核心", "本土AI芯片代工", "12英寸扩产", "A+H两地上市"],
    moat: "中国大陆最完备的本土逻辑晶圆制造产能与国产设备材料导入验证平台",
    financials: {
      quarterly: {
        period: "2026Q3",
        revenue: "$25.4亿",
        revenueNum: 25.4,
        revYoY: 18.6,
        netIncome: "$2.45亿",
        niYoY: 42.0,
        grossMargin: 23.1,
        rdRatio: 9.8,
        highlight: "产能利用率攀升至 93.5%，12 英寸高附加值晶圆占比提升驱动毛利率修复",
        takeaways: [
          "本土 AI 推理芯片、汽车电子及端侧 AIoT SoC 代工需求旺盛，订单排期饱满。",
          "折旧高峰逐步平滑，产品组合升级推动毛利率连续三个季度环比改善。"
        ],
        series: [
          { label: "25Q4", rev: 22.1, ni: 1.5 },
          { label: "26Q1", rev: 23.0, ni: 1.8 },
          { label: "26Q2", rev: 24.2, ni: 2.1 },
          { label: "26Q3", rev: 25.4, ni: 2.45 }
        ]
      },
      semiannual: {
        period: "2026H1",
        revenue: "$47.2亿",
        revenueNum: 47.2,
        revYoY: 22.4,
        netIncome: "$3.9亿",
        niYoY: 46.8,
        grossMargin: 21.8,
        rdRatio: 10.1,
        highlight: "国内客户本土化流片趋势不可逆，晶圆出货总量创历史新高",
        takeaways: [
          "中国区营收占比稳定在 83% 以上，成为国产算力自主可控基石。"
        ],
        series: [
          { label: "25H1", rev: 38.6, ni: 2.6 },
          { label: "25H2", rev: 43.8, ni: 3.1 },
          { label: "26H1", rev: 47.2, ni: 3.9 }
        ]
      },
      annual: {
        period: "2025FY",
        revenue: "$82.4亿",
        revenueNum: 82.4,
        revYoY: 27.1,
        netIncome: "$5.7亿",
        niYoY: 16.3,
        grossMargin: 19.6,
        rdRatio: 10.4,
        highlight: "跃升至全球纯晶圆代工市场份额前三，稳居中国大陆绝对龙头",
        takeaways: [
          "持续高强度资本开支建设 12 英寸产线，卡位中国 AI 与智能汽车芯片制造需求。"
        ],
        series: [
          { label: "2023FY", rev: 63.2, ni: 9.0 },
          { label: "2024FY", rev: 64.8, ni: 4.9 },
          { label: "2025FY", rev: 82.4, ni: 5.7 }
        ]
      }
    },
    products: [
      { name: "12 英寸先进与特色逻辑代工", category: "本土逻辑晶圆", desc: "支撑国产 AI 推理加速器、手机主芯片与车载智能芯片制造。" },
      { name: "电源管理 / CIS / 高压驱动工艺平台", category: "AI 配套芯片", desc: "覆盖 AI 服务器电源芯片、智能视觉传感器与端侧 AIoT 芯片。" }
    ],
    applications: ["国产 AI 算力芯片制造", "智能汽车与自动驾驶芯片", "端侧消费电子与物联网"],
    research: {
      consensus: "增持",
      broker: "中金公司 / 华泰证券",
      thesis: "出口管制倒逼中国本土 AI 算力与终端芯片加速回流国内代工，中芯国际具备不可替代的战略溢价与产能弹性。",
      catalysts: "本土 AI 推理芯片大规模流片、毛利率突破 25%、国产设备产线良率提升",
      risks: "高资本开支带来的折旧压力、成熟制程价格竞争"
    }
  }
);
