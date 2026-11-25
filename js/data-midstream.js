window.AIChainData = window.AIChainData || { companies: [] };

window.AIChainData.companies.push(
  // ==================== 中游 · 基础大模型与算力云平台 (10家) ====================
  {
    id: "msft",
    name: "微软 Microsoft",
    ticker: "MSFT",
    exchange: "NASDAQ",
    market: "US",
    marketLabel: "美股",
    tier: "midstream",
    subSegment: "超大规模AI云与企业底座",
    role: "全球企业级 AI 云 (Azure AI) 与 Copilot 生态领导者",
    marketCap: 32600,
    pe: 31.8,
    tags: ["Azure AI", "OpenAI战略伙伴", "Copilot Studio", "企业Agent底座"],
    moat: "全球最大企业 IT 存量分发渠道 (M365/Azure/GitHub) + 全栈 AI 云基础设施",
    financials: {
      quarterly: {
        period: "2026Q3 (FY27Q1)",
        revenue: "$768亿",
        revenueNum: 768,
        revYoY: 16.4,
        netIncome: "$286亿",
        niYoY: 15.8,
        grossMargin: 69.2,
        rdRatio: 11.4,
        highlight: "Azure 云增速 36%，其中 AI 服务贡献了 16 个百分点的增长拉动",
        takeaways: [
          "Azure AI Foundry 活跃企业客户突破 9 万家，AI 推理 token 调用量同比增超 3 倍。",
          "Microsoft 365 Copilot 商业付费席位渗透率加速，企业级自主 Agent 收入起量。",
          "单季资本开支达 $245亿，持续扩建全球液冷 AI 数据中心。"
        ],
        series: [
          { label: "25Q4", rev: 696, ni: 241 },
          { label: "26Q1", rev: 718, ni: 254 },
          { label: "26Q2", rev: 745, ni: 271 },
          { label: "26Q3", rev: 768, ni: 286 }
        ]
      },
      semiannual: {
        period: "2026H1",
        revenue: "$1463亿",
        revenueNum: 1463,
        revYoY: 15.9,
        netIncome: "$525亿",
        niYoY: 15.2,
        grossMargin: 69.5,
        rdRatio: 11.6,
        highlight: "AI 业务年化营收运行率 (ARR) 突破 $250亿，商业剩余履约义务达 $3150亿",
        takeaways: [
          "GitHub Copilot 付费开发者突破 450 万，代码生成成为最快变现的 AI 场景。"
        ],
        series: [
          { label: "25H1", rev: 1262, ni: 456 },
          { label: "25H2", rev: 1368, ni: 488 },
          { label: "26H1", rev: 1463, ni: 525 }
        ]
      },
      annual: {
        period: "2025FY",
        revenue: "$2780亿",
        revenueNum: 2780,
        revYoY: 15.4,
        netIncome: "$1012亿",
        niYoY: 14.8,
        grossMargin: 69.8,
        rdRatio: 11.8,
        highlight: "全球首个净利润突破千亿美元且实现全面 AI 商业化落地的云计算巨头",
        takeaways: [
          "云业务与办公生产力双轮驱动，高盈利能力支撑超大规模 AI 资本开支。"
        ],
        series: [
          { label: "2023FY", rev: 2119, ni: 724 },
          { label: "2024FY", rev: 2451, ni: 881 },
          { label: "2025FY", rev: 2780, ni: 1012 }
        ]
      }
    },
    products: [
      { name: "Azure AI Foundry & Maia 定制芯片", category: "AI 云计算平台", desc: "支持多模型编排、微调与推理托管的企业级 AI 云底座。" },
      { name: "Microsoft 365 Copilot & Agent Studio", category: "企业智能体平台", desc: "将生成式 AI 与自主工作流深度嵌入 Office、Teams 与 Dynamics。" }
    ],
    applications: ["企业级 AI 云算力托管", "智能办公与协同 Agent", "软件开发辅助", "金融与政企知识库"],
    research: {
      consensus: "强烈买入",
      broker: "摩根士丹利 / 瑞银",
      thesis: "Azure AI 算力供给瓶颈逐步缓解叠加 Copilot 商业化放量，是最具攻守兼备属性的中游核心资产。",
      catalysts: "Azure 增速维持 35%+、Copilot ARPU 提升、资本开支折旧拐点",
      risks: "巨额数据中心资本开支带来的短期利润率压制"
    }
  },
  {
    id: "googl",
    name: "谷歌 Alphabet",
    ticker: "GOOGL",
    exchange: "NASDAQ",
    market: "US",
    marketLabel: "美股",
    tier: "midstream",
    subSegment: "全栈AI模型与云平台",
    role: "拥有自研 TPU + Gemini 多模态模型 + Google Cloud 全栈闭环的 AI 巨擘",
    marketCap: 23800,
    pe: 22.6,
    tags: ["Gemini原生多模态", "自研TPU集群", "Google Cloud", "AI搜索变现"],
    moat: "唯一实现“自研尖端芯片(TPU)+顶级大模型(Gemini)+全球云+十亿级分发入口”全栈闭环",
    financials: {
      quarterly: {
        period: "2026Q3",
        revenue: "$1024亿",
        revenueNum: 1024,
        revYoY: 15.8,
        netIncome: "$308亿",
        niYoY: 19.6,
        grossMargin: 59.4,
        rdRatio: 13.8,
        highlight: "Google Cloud 单季营收突破 $158亿 (+34%)，营业利润率跃升至 21%",
        takeaways: [
          "AI Overviews 与 AI Mode 搜索广告转化率同比提升，打消搜索被颠覆担忧。",
          "TPU v7 (Ironwood) 集群大幅降低 Gemini 推理单位成本，支撑高毛利 API 服务。",
          "Waymo 商业化无人出租车周订单量突破 40 万单，扩大领跑优势。"
        ],
        series: [
          { label: "25Q4", rev: 965, ni: 265 },
          { label: "26Q1", rev: 932, ni: 274 },
          { label: "26Q2", rev: 981, ni: 292 },
          { label: "26Q3", rev: 1024, ni: 308 }
        ]
      },
      semiannual: {
        period: "2026H1",
        revenue: "$1913亿",
        revenueNum: 1913,
        revYoY: 14.7,
        netIncome: "$566亿",
        niYoY: 19.2,
        grossMargin: 58.9,
        rdRatio: 14.0,
        highlight: "全栈自研硬件成本优势显现，云业务成为利润增长核心引擎",
        takeaways: [
          "Gemini 企业订阅与 Vertex AI 平台年化收入翻倍以上增长。"
        ],
        series: [
          { label: "25H1", rev: 1668, ni: 475 },
          { label: "25H2", rev: 1848, ni: 528 },
          { label: "26H1", rev: 1913, ni: 566 }
        ]
      },
      annual: {
        period: "2025FY",
        revenue: "$3516亿",
        revenueNum: 3516,
        revYoY: 13.8,
        netIncome: "$1003亿",
        niYoY: 22.4,
        grossMargin: 58.4,
        rdRatio: 14.2,
        highlight: "广告现金牛与 AI 云双引擎共振，估值具备较高安全边际",
        takeaways: [
          "DeepMind 在多模态、代码、科学计算 (AlphaFold) 持续保持全球第一梯队。"
        ],
        series: [
          { label: "2023FY", rev: 3074, ni: 738 },
          { label: "2024FY", rev: 3500, ni: 1001 },
          { label: "2025FY", rev: 3516, ni: 1003 }
        ]
      }
    },
    products: [
      { name: "Gemini 多模态大模型 & Vertex AI", category: "基础大模型", desc: "支持超长上下文、视频音频理解、代码与复杂推理的企业及消费级旗舰模型。" },
      { name: "Google Cloud & TPU 算力基础设施", category: "全栈云平台", desc: "结合自研 TPU 与英伟达 GPU 的高性价比 AI 训练推理云。" }
    ],
    applications: ["AI 搜索与数字广告", "企业级多模态开发平台", "科研 AI 与生命科学", "Android 端侧 AI"],
    research: {
      consensus: "强烈买入",
      broker: "高盛 / 花旗",
      thesis: "全栈 TPU 成本优势在推理普及期持续放大，云利润率快速释放且市盈率在北美科技巨头中具吸引力。",
      catalysts: "Google Cloud 增速超预期、AI 搜索商业化变现数据、Waymo 扩张",
      risks: "欧美反垄断监管裁决不确定性、生成式搜索竞争"
    }
  },
  {
    id: "amzn",
    name: "亚马逊 Amazon",
    ticker: "AMZN",
    exchange: "NASDAQ",
    market: "US",
    marketLabel: "美股",
    tier: "midstream",
    subSegment: "全球第一大公有云",
    role: "全球市占率第一的 AWS 云计算巨头与自研 Trainium AI 算力云底座",
    marketCap: 22900,
    pe: 33.4,
    tags: ["AWS Bedrock", "Trainium3自研芯", "Anthropic生态", "智能物流AI"],
    moat: "全球最庞大的企业云存量客户群 + 多模型中立平台 Bedrock + 自研高性价比训练推理芯片",
    financials: {
      quarterly: {
        period: "2026Q3",
        revenue: "$1812亿",
        revenueNum: 1812,
        revYoY: 13.2,
        netIncome: "$198亿",
        niYoY: 26.8,
        grossMargin: 49.6,
        rdRatio: 13.2,
        highlight: "AWS 单季营收达 $334亿 (+22.5%)，营业利润率维持 37% 高位",
        takeaways: [
          "AWS AI 业务年化营收突破 $150亿，保持三位数同比高增，Anthropic Claude 调用量激增。",
          "Trainium2/3 自研芯片集群大幅降低云端推理价格，吸引大批企业从纯 GPU 迁移。",
          "零售物流机器人与 AI 广告投放带动北美零售营业利润率持续创新高。"
        ],
        series: [
          { label: "25Q4", rev: 1878, ni: 192 },
          { label: "26Q1", rev: 1615, ni: 164 },
          { label: "26Q2", rev: 1708, ni: 181 },
          { label: "26Q3", rev: 1812, ni: 198 }
        ]
      },
      semiannual: {
        period: "2026H1",
        revenue: "$3323亿",
        revenueNum: 3323,
        revYoY: 12.6,
        netIncome: "$345亿",
        niYoY: 28.4,
        grossMargin: 49.1,
        rdRatio: 13.5,
        highlight: "AWS 重回加速通道，叠加电商广告高毛利驱动盈利全面释放",
        takeaways: [
          "2026 年全年资本开支超 $1000亿，绝大部分投向 AWS AI 算力与数据中心电力。"
        ],
        series: [
          { label: "25H1", rev: 2951, ni: 269 },
          { label: "25H2", rev: 3466, ni: 348 },
          { label: "26H1", rev: 3323, ni: 345 }
        ]
      },
      annual: {
        period: "2025FY",
        revenue: "$6417亿",
        revenueNum: 6417,
        revYoY: 11.8,
        netIncome: "$617亿",
        niYoY: 38.2,
        grossMargin: 48.6,
        rdRatio: 13.8,
        highlight: "AWS 云计算、零售广告与 AI 自动化仓储构成三大高现金流支柱",
        takeaways: [
          "Bedrock 成为企业部署 Claude、Llama、Nova 等多模型的首选云枢纽。"
        ],
        series: [
          { label: "2023FY", rev: 5748, ni: 304 },
          { label: "2024FY", rev: 6380, ni: 592 },
          { label: "2025FY", rev: 6417, ni: 617 }
        ]
      }
    },
    products: [
      { name: "AWS Bedrock & SageMaker AI", category: "多模型云平台", desc: "提供一站式模型托管、微调、护栏与 Agent 编排的企业云服务。" },
      { name: "Trainium / Inferentia 自研芯片", category: "云端定制算力", desc: "专为大规模深度学习训练与低成本推理优化的 AWS 定制芯片。" }
    ],
    applications: ["企业级公有云与 AI 迁移", "跨境电商智能推荐", "仓储具身机器人调度", "精准数字广告"],
    research: {
      consensus: "强烈买入",
      broker: "摩根大通 / 美银",
      thesis: "AWS 云迁移与 AI 推理需求共振，自研芯片改善长期投资回报率，叠加电商利润率扩张具强确定性。",
      catalysts: "AWS 同比增速进一步提速、Trainium3 外部客户放量",
      risks: "超高资本开支短期压制自由现金流、消费宏观环境波动"
    }
  },
  {
    id: "meta",
    name: "Meta Platforms",
    ticker: "META",
    exchange: "NASDAQ",
    market: "US",
    marketLabel: "美股",
    tier: "midstream",
    subSegment: "开源大模型与AI广告",
    role: "全球开源大模型 (Llama) 生态引领者与 AI 广告推荐变现标杆",
    marketCap: 16400,
    pe: 24.9,
    tags: ["Llama开源生态", "AI精准广告", "Meta AI助手", "Ray-Ban AI眼镜"],
    moat: "33 亿+ 全球日活社交图谱数据 + 开源 Llama 吸引全球开发者 + 行业最高效 AI 广告引擎",
    financials: {
      quarterly: {
        period: "2026Q3",
        revenue: "$496亿",
        revenueNum: 496,
        revYoY: 21.8,
        netIncome: "$192亿",
        niYoY: 22.4,
        grossMargin: 81.6,
        rdRatio: 26.8,
        highlight: "AI 驱动 Reels 与 Advantage+ 广告转化率双位数提升，毛利率高达 81.6%",
        takeaways: [
          "Meta AI 月活用户突破 12 亿，商业对话 Agent (WhatsApp/IG) 开始贡献增量广告收入。",
          "AI 智能眼镜出货量同比翻倍，成为端侧多模态交互爆款载体。"
        ],
        series: [
          { label: "25Q4", rev: 484, ni: 208 },
          { label: "26Q1", rev: 432, ni: 164 },
          { label: "26Q2", rev: 465, ni: 179 },
          { label: "26Q3", rev: 496, ni: 192 }
        ]
      },
      semiannual: {
        period: "2026H1",
        revenue: "$897亿",
        revenueNum: 897,
        revYoY: 20.5,
        netIncome: "$343亿",
        niYoY: 23.1,
        grossMargin: 81.2,
        rdRatio: 27.1,
        highlight: "开源大模型战略降低基础设施长期锁定风险，广告 ROI 持续领先",
        takeaways: [
          "2026 年资本开支上调至 $680-720亿，建成超百万卡等效 AI 训练集群。"
        ],
        series: [
          { label: "25H1", rev: 744, ni: 279 },
          { label: "25H2", rev: 890, ni: 365 },
          { label: "26H1", rev: 897, ni: 343 }
        ]
      },
      annual: {
        period: "2025FY",
        revenue: "$1645亿",
        revenueNum: 1645,
        revYoY: 21.9,
        netIncome: "$624亿",
        niYoY: 59.1,
        grossMargin: 81.5,
        rdRatio: 26.6,
        highlight: "将 AI 算力投资直接转化为核心广告主业高增长与高利润率的最成功典范",
        takeaways: [
          "Llama 系列累计下载量超 12 亿次，建立全球开源大模型事实标准。"
        ],
        series: [
          { label: "2023FY", rev: 1349, ni: 391 },
          { label: "2024FY", rev: 1645, ni: 624 },
          { label: "2025FY", rev: 1645, ni: 624 }
        ]
      }
    },
    products: [
      { name: "Llama 4 开源多模态大模型", category: "开源基础模型", desc: "原生多模态 MoE 架构，供全球企业免费商用与私有化微调。" },
      { name: "Advantage+ AI 广告与 Ray-Ban AI 眼镜", category: "商业引擎与穿戴", desc: "全自动生成广告创意并精准投放；AI 眼镜引领下一代随身计算。" }
    ],
    applications: ["AI 社交推荐与精准营销", "开源大模型生态", "商业客服 Agent", "可穿戴 AI 硬件"],
    research: {
      consensus: "强烈买入",
      broker: "高盛 / 巴克莱",
      thesis: "AI 对核心广告业务的正向 ROI 已在财报中充分验证，WhatsApp 商业智能体与 AI 眼镜打开新估值空间。",
      catalysts: "WhatsApp 商业 Agent 变现放量、AI 眼镜新一代发布",
      risks: "Reality Labs 持续投入亏损、欧美青少年与隐私监管"
    }
  },
  {
    id: "orcl",
    name: "甲骨文 Oracle",
    ticker: "ORCL",
    exchange: "NYSE",
    market: "US",
    marketLabel: "美股",
    tier: "midstream",
    subSegment: "超大规模AI算力云",
    role: "OCI 超大规模 AI 训练算力云黑马与全球核心企业数据库巨头",
    marketCap: 5150,
    pe: 37.6,
    tags: ["OCI算力云", "Stargate项目", "多云数据库", "RPO千亿订单"],
    moat: "高性价比 RDMA 裸金属 AI 集群架构 + 深度锁定全球大企业核心数据库迁移红利",
    financials: {
      quarterly: {
        period: "2026Q3",
        revenue: "$162亿",
        revenueNum: 162,
        revYoY: 16.8,
        netIncome: "$41亿",
        niYoY: 21.4,
        grossMargin: 71.2,
        rdRatio: 15.6,
        highlight: "OCI 基础设施云营收同比暴增 62%，剩余履约义务 (RPO) 突破 $1450亿",
        takeaways: [
          "深度参与北美超大 AI 算力基地 (Stargate) 建设，签下多家头部大模型长期算力租赁大单。",
          "Oracle Database@Azure/AWS/GoogleCloud 多云数据库业务同比翻倍。"
        ],
        series: [
          { label: "25Q4", rev: 141, ni: 34 },
          { label: "26Q1", rev: 147, ni: 36 },
          { label: "26Q2", rev: 155, ni: 39 },
          { label: "26Q3", rev: 162, ni: 41 }
        ]
      },
      semiannual: {
        period: "2026H1",
        revenue: "$302亿",
        revenueNum: 302,
        revYoY: 15.2,
        netIncome: "$75亿",
        niYoY: 19.8,
        grossMargin: 71.4,
        rdRatio: 15.9,
        highlight: "从传统数据库成功跃迁为北美第四大超大规模 AI 云基础设施巨头",
        takeaways: [
          "千兆瓦级液冷 AI 数据中心加速交付，高确定性在手订单保障未来 3 年营收高增。"
        ],
        series: [
          { label: "25H1", rev: 262, ni: 63 },
          { label: "25H2", rev: 281, ni: 69 },
          { label: "26H1", rev: 302, ni: 75 }
        ]
      },
      annual: {
        period: "2025FY",
        revenue: "$574亿",
        revenueNum: 574,
        revYoY: 9.8,
        netIncome: "$132亿",
        niYoY: 16.2,
        grossMargin: 71.8,
        rdRatio: 16.1,
        highlight: "云基础设施收入占比反超传统软件许可，迈入双位数复合增长新阶段",
        takeaways: [
          "与英伟达、OpenAI、xAI 等头部算力需求方形成深度战略绑定。"
        ],
        series: [
          { label: "2023FY", rev: 500, ni: 85 },
          { label: "2024FY", rev: 530, ni: 105 },
          { label: "2025FY", rev: 574, ni: 132 }
        ]
      }
    },
    products: [
      { name: "Oracle Cloud Infrastructure (OCI Supercluster)", category: "AI 算力云", desc: "支持十万级 GPU 裸金属互联与超低延迟 RDMA 网络的专用 AI 云集群。" },
      { name: "Oracle 23ai 向量数据库", category: "AI 数据库", desc: "原生内置 AI 向量检索与 RAG 能力，无缝赋能存量企业数据资产。" }
    ],
    applications: ["前沿大模型万卡训练集群", "金融/政务/医疗核心数据库 RAG", "多云混合架构"],
    research: {
      consensus: "买入",
      broker: "瑞银 / 杰富瑞",
      thesis: "超千亿美元 RPO 积压订单提供罕见的多年营收能见度，OCI 算力交付节奏决定估值上限。",
      catalysts: "新签主权及头部大模型云大单、电力与机房交付提速",
      risks: "数据中心资本开支攀升带来的杠杆与自由现金流压力"
    }
  },
  {
    id: "tencent",
    name: "腾讯控股 Tencent",
    ticker: "0700.HK",
    exchange: "HKEX",
    market: "HK",
    marketLabel: "港股",
    tier: "midstream",
    subSegment: "大模型、腾讯云与超级生态",
    role: "中国最大互联网与 AI 超级生态平台（混元大模型 + 腾讯云 + 微信 AI）",
    marketCap: 4950,
    pe: 17.8,
    tags: ["混元大模型", "微信AI生态", "AI广告提效", "港股科技龙头"],
    moat: "13.8 亿微信国民级超级入口 + 混元/DeepSeek 多模型融合分发 + 游戏/广告高现金流变现",
    financials: {
      quarterly: {
        period: "2026Q3",
        revenue: "¥1845亿",
        revenueNum: 256,
        revYoY: 11.4,
        netIncome: "¥628亿",
        niYoY: 16.5,
        grossMargin: 54.2,
        rdRatio: 10.6,
        highlight: "AI 驱动营销服务收入同比 +19%，毛利率持续攀升至 54.2%",
        takeaways: [
          "微信搜一搜与小程序全面接入 AI 智能体与元宝助手，用户日均 AI 交互量倍增。",
          "AI 推荐算法大幅提升视频号广告点击率与加载空间，成为最直接利润增量。",
          "2026 年 AI 算力资本开支显著提升，同时维持千亿港元级回购与分红。"
        ],
        series: [
          { label: "25Q4", rev: 239, ni: 76 },
          { label: "26Q1", rev: 243, ni: 81 },
          { label: "26Q2", rev: 249, ni: 84 },
          { label: "26Q3", rev: 256, ni: 87 }
        ]
      },
      semiannual: {
        period: "2026H1",
        revenue: "¥3540亿",
        revenueNum: 492,
        revYoY: 10.8,
        netIncome: "¥1188亿",
        niYoY: 18.2,
        grossMargin: 53.8,
        rdRatio: 10.8,
        highlight: "高质量增长战略深化，Non-IFRS 净利润增速持续快于营收",
        takeaways: [
          "腾讯云 AI 推理 API 调用与行业大模型落地金融、政务、文旅、游戏全行业。"
        ],
        series: [
          { label: "25H1", rev: 444, ni: 140 },
          { label: "25H2", rev: 472, ni: 158 },
          { label: "26H1", rev: 492, ni: 165 }
        ]
      },
      annual: {
        period: "2025FY",
        revenue: "¥6603亿",
        revenueNum: 917,
        revYoY: 8.4,
        netIncome: "¥2227亿",
        niYoY: 41.2,
        grossMargin: 52.9,
        rdRatio: 10.7,
        highlight: "盈利能力迈上新台阶，确立中国 C 端 AI 应用与企业云双料核心地位",
        takeaways: [
          "游戏业务结合 AI 制作管线降本增效，长青游戏矩阵表现稳健。"
        ],
        series: [
          { label: "2023FY", rev: 846, ni: 219 },
          { label: "2024FY", rev: 917, ni: 309 },
          { label: "2025FY", rev: 917, ni: 309 }
        ]
      }
    },
    products: [
      { name: "混元大模型 (Hunyuan) & 腾讯元宝", category: "基础模型与C端助手", desc: "支持深度推理、3D 内容生成与多模态交互，无缝打通微信与公众号内容生态。" },
      { name: "腾讯云 TI 平台与高性能智算网络", category: "AI 云平台", desc: "提供万卡集群调度、多模型托管与企业知识引擎服务。" }
    ],
    applications: ["微信生态 AI Agent", "精准视频号广告", "AI 游戏开发与 NPC", "企业协同办公"],
    research: {
      consensus: "强烈买入",
      broker: "中金公司 / 高盛",
      thesis: "微信作为中国最强 AI Agent 天然分发入口，兼具广告/游戏高确定性现金流与股东高回报。",
      catalysts: "微信 AI Agent 商业化闭环落地、AI 广告加载率提升、游戏大作上线",
      risks: "宏观消费复苏节奏、高端 GPU 算力进口限制"
    }
  },
  {
    id: "cmcc",
    name: "中国移动 China Mobile",
    ticker: "600941.SH",
    exchange: "SSE / HKEX",
    market: "CN",
    marketLabel: "A股",
    tier: "midstream",
    subSegment: "国家级算力网络与行业模型",
    role: "中国最大智算中心与“东数西算”算力网络核心运营商（A股超大市值底座）",
    marketCap: 3150,
    pe: 14.5,
    tags: ["全国算力网", "九天大模型", "移动云", "高股息红利"],
    moat: "全国最大规模呼和浩特/哈尔滨等超万卡国产智算集群 + 政企通信渠道绝对壁垒",
    financials: {
      quarterly: {
        period: "2026Q3",
        revenue: "¥2615亿",
        revenueNum: 363,
        revYoY: 4.6,
        netIncome: "¥342亿",
        niYoY: 5.8,
        grossMargin: 29.8,
        rdRatio: 3.1,
        highlight: "算力网络与移动云收入同比 +21%，智算总规模突破 45 EFLOPS (FP16)",
        takeaways: [
          "资本开支结构性向智算倾斜，国产 AI 芯片采购比例超过 85%，引领国产算力生态成熟。",
          "“九天”行业大模型在能源、制造、政务、医疗落地超 800 个标杆项目。"
        ],
        series: [
          { label: "25Q4", rev: 344, ni: 40 },
          { label: "26Q1", rev: 369, ni: 42 },
          { label: "26Q2", rev: 392, ni: 69 },
          { label: "26Q3", rev: 363, ni: 48 }
        ]
      },
      semiannual: {
        period: "2026H1",
        revenue: "¥5610亿",
        revenueNum: 779,
        revYoY: 4.2,
        netIncome: "¥846亿",
        niYoY: 5.6,
        grossMargin: 30.1,
        rdRatio: 3.2,
        highlight: "DICT 数字化转型收入占比突破 31%，现金分红率承诺持续向 75%+ 迈进",
        takeaways: [
          "充沛自由现金流支撑全国算力并网调度，成为央国企 AI 基础设施首选承建方。"
        ],
        series: [
          { label: "25H1", rev: 748, ni: 111 },
          { label: "25H2", rev: 721, ni: 83 },
          { label: "26H1", rev: 779, ni: 117 }
        ]
      },
      annual: {
        period: "2025FY",
        revenue: "¥10580亿",
        revenueNum: 1469,
        revYoY: 3.8,
        netIncome: "¥1418亿",
        niYoY: 5.2,
        grossMargin: 29.5,
        rdRatio: 3.1,
        highlight: "国内营收超万亿元的国家级算力网络底座与高股息价值压舱石",
        takeaways: [
          "全面推进“AI+”战略，实现算力、连接、数据与行业模型一体化输出。"
        ],
        series: [
          { label: "2023FY", rev: 1402, ni: 183 },
          { label: "2024FY", rev: 1445, ni: 192 },
          { label: "2025FY", rev: 1469, ni: 197 }
        ]
      }
    },
    products: [
      { name: "移动云与全国智算并网平台", category: "国家级算力云", desc: "打通全国多地超万卡智算中心，支持异构国产芯片统一调度与算力租赁。" },
      { name: "九天 (Jiutian) 行业大模型矩阵", category: "行业基础模型", desc: "深耕通信、工业、政务、能源等垂直行业的自主可控大模型底座。" }
    ],
    applications: ["政企与央国企智算中心", "东数西算全国算力调度", "工业与能源大模型", "AI 智慧家庭"],
    research: {
      consensus: "买入",
      broker: "中信证券 / 国泰君安",
      thesis: "“AI+”国家战略核心算力基建承担者，移动云与智算打开成长二曲线，叠加高股息具备极强防御价值。",
      catalysts: "国产智算集群利用率攀升、央国企 AI 采购提速、派息率上调",
      risks: "传统电信 ARPU 增长放缓、云业务政企回款周期"
    }
  },
  {
    id: "sap",
    name: "思爱普 SAP",
    ticker: "SAP.DE",
    exchange: "XETRA / NYSE",
    market: "EU",
    marketLabel: "欧股",
    tier: "midstream",
    subSegment: "企业云ERP与Business AI",
    role: "欧洲最大市值科技巨头与全球企业核心业务数据 + Business AI 平台龙头",
    marketCap: 2980,
    pe: 38.4,
    tags: ["Business AI", "Joule智能体", "云ERP迁移", "欧洲市值第一科技股"],
    moat: "承接全球超 75% 商业交易流程的核心 ERP 数据壁垒，客户粘性与切换成本极高",
    financials: {
      quarterly: {
        period: "2026Q3",
        revenue: "$104亿",
        revenueNum: 104,
        revYoY: 13.6,
        netIncome: "$21亿",
        niYoY: 24.5,
        grossMargin: 73.8,
        rdRatio: 17.8,
        highlight: "云业务收入同比 +27%，超 50% 的新签云大单包含 Business AI 模块",
        takeaways: [
          "Joule AI 助手全面覆盖财务、供应链、人力与采购全流程，显著提升高阶云套餐 ARPU。",
          "当前云积压订单 (Current Cloud Backlog) 突破 €185亿，增速强劲。"
        ],
        series: [
          { label: "25Q4", rev: 98, ni: 18 },
          { label: "26Q1", rev: 96, ni: 17 },
          { label: "26Q2", rev: 100, ni: 19 },
          { label: "26Q3", rev: 104, ni: 21 }
        ]
      },
      semiannual: {
        period: "2026H1",
        revenue: "$196亿",
        revenueNum: 196,
        revYoY: 12.8,
        netIncome: "$36亿",
        niYoY: 27.2,
        grossMargin: 73.4,
        rdRatio: 18.1,
        highlight: "RISE with SAP 推动存量本地大客户加速上云并订阅 AI 套件",
        takeaways: [
          "组织效率优化与高毛利云占比提升驱动营业利润率持续改善。"
        ],
        series: [
          { label: "25H1", rev: 174, ni: 28 },
          { label: "25H2", rev: 192, ni: 34 },
          { label: "26H1", rev: 196, ni: 36 }
        ]
      },
      annual: {
        period: "2025FY",
        revenue: "$366亿",
        revenueNum: 366,
        revYoY: 10.9,
        netIncome: "$62亿",
        niYoY: 31.4,
        grossMargin: 72.9,
        rdRatio: 18.4,
        highlight: "跃居欧洲第一大市值科技公司，成为全球企业级 AI 数据层核心枢纽",
        takeaways: [
          "与 Databricks 深度合作推出 SAP Business Data Cloud，打通结构化 ERP 与 AI 模型。"
        ],
        series: [
          { label: "2023FY", rev: 312, ni: 36 },
          { label: "2024FY", rev: 342, ni: 48 },
          { label: "2025FY", rev: 366, ni: 62 }
        ]
      }
    },
    products: [
      { name: "SAP Business AI & Joule Copilot", category: "企业智能体底座", desc: "基于企业真实财务与供应链数据运行的多智能体协同平台。" },
      { name: "S/4HANA Cloud & Business Data Cloud", category: "企业云与数据层", desc: "支撑跨国企业实时决策与 AI 训练推理的高可信数据底座。" }
    ],
    applications: ["跨国企业 ERP 财务与供应链 AI", "企业数据治理与合规", "自动化采购与人力决策"],
    research: {
      consensus: "买入",
      broker: "瑞银 / 摩根大通",
      thesis: "2027 年传统本地版维护到期倒逼大客户加速上云，Business AI 带来清晰的增量付费转化。",
      catalysts: "云积压订单维持 25%+ 增速、Business Data Cloud 商业化放量",
      risks: "欧洲宏观经济疲软导致部分企业 IT 预算延后"
    }
  },
  {
    id: "baba",
    name: "阿里巴巴 Alibaba",
    ticker: "9988.HK",
    exchange: "HKEX / NYSE",
    market: "HK",
    marketLabel: "港股",
    tier: "midstream",
    subSegment: "开源模型与亚太第一云",
    role: "全球顶级开源大模型通义千问 (Qwen) 打造者与亚洲第一大云计算平台",
    marketCap: 2680,
    pe: 14.1,
    tags: ["通义千问Qwen", "阿里云AI", "3800亿CAPEX", "开源全球领先"],
    moat: "中国第一云基础设施市占率 + 通义千问 Qwen 全球开源模型社区领先影响力",
    financials: {
      quarterly: {
        period: "2026Q3",
        revenue: "¥2685亿",
        revenueNum: 373,
        revYoY: 9.8,
        netIncome: "¥462亿",
        niYoY: 14.2,
        grossMargin: 41.5,
        rdRatio: 6.2,
        highlight: "阿里云收入同比加速至 +24%，AI 相关云产品收入连续 9 个季度三位数增长",
        takeaways: [
          "通义千问 Qwen 系列全球开源衍生模型数量居世界前列，带动阿里云百炼平台调用暴增。",
          "三年投入超 3800 亿元用于 AI 与云基建，全面承接中国企业及端侧 AI（含苹果等生态合作）云需求。",
          "核心电商淘天集团全站推广 AI 商业化率提升，稳定贡献自由现金流。"
        ],
        series: [
          { label: "25Q4", rev: 389, ni: 68 },
          { label: "26Q1", rev: 334, ni: 49 },
          { label: "26Q2", rev: 361, ni: 59 },
          { label: "26Q3", rev: 373, ni: 64 }
        ]
      },
      semiannual: {
        period: "2026H1",
        revenue: "¥5004亿",
        revenueNum: 695,
        revYoY: 8.9,
        netIncome: "¥778亿",
        niYoY: 15.6,
        grossMargin: 40.9,
        rdRatio: 6.4,
        highlight: "“AI 驱动 + 电商聚焦”战略重塑估值体系，阿里云盈利能力显著增强",
        takeaways: [
          "阿里云经调整 EBITA 利润率稳步升至 11%+，成为集团估值重估核心催化剂。"
        ],
        series: [
          { label: "25H1", rev: 638, ni: 93 },
          { label: "25H2", rev: 731, ni: 121 },
          { label: "26H1", rev: 695, ni: 108 }
        ]
      },
      annual: {
        period: "2025FY",
        revenue: "¥9963亿",
        revenueNum: 1384,
        revYoY: 6.8,
        netIncome: "¥1581亿",
        niYoY: 12.4,
        grossMargin: 39.8,
        rdRatio: 6.1,
        highlight: "完成非核心资产剥离，全力押注“云计算 + 通义千问大模型”第二曲线",
        takeaways: [
          "高强度股票回购与分红托底估值，云与 AI 资产价值重估空间凸显。"
        ],
        series: [
          { label: "2023FY", rev: 1265, ni: 141 },
          { label: "2024FY", rev: 1306, ni: 157 },
          { label: "2025FY", rev: 1384, ni: 219 }
        ]
      }
    },
    products: [
      { name: "通义千问 Qwen 开源/闭源大模型", category: "基础大模型", desc: "覆盖多模态、编程、数学与超长推理的全尺寸模型家族，开源生态全球领先。" },
      { name: "阿里云飞天智算 & 百炼平台", category: "AI 云计算", desc: "支持万卡异构训练与一站式企业 Agent 构建部署平台。" }
    ],
    applications: ["中国企业级 AI 云与大模型托管", "手机与汽车端侧云端大模型", "跨境电商 AI 运营"],
    research: {
      consensus: "强烈买入",
      broker: "高盛 / 摩根大通",
      thesis: "作为中国“云 + 开源大模型”双料龙头，阿里云加速增长正推动估值从纯电商向 AI 科技平台切换。",
      catalysts: "阿里云增速站上 25%+、Qwen 新旗舰模型发布、端侧大模型合作落地",
      risks: "国内电商竞争加剧、高额 AI 资本开支短期压制自由现金流"
    }
  },
  {
    id: "pltr",
    name: "Palantir",
    ticker: "PLTR",
    exchange: "NASDAQ",
    market: "US",
    marketLabel: "美股",
    tier: "midstream",
    subSegment: "企业级AI决策与本体平台",
    role: "全球企业与国防级 AI 操作系统 (AIP) 与 Ontology 数据本体平台标杆",
    marketCap: 1920,
    pe: 118.0,
    tags: ["AIP智能体平台", "Ontology本体", "美国商业高增", "AI软件龙头"],
    moat: "将大模型与企业真实生产数据/权限/行动闭环结合的 Ontology 本体架构，难以被通用聊天框替代",
    financials: {
      quarterly: {
        period: "2026Q3",
        revenue: "$11.6亿",
        revenueNum: 11.6,
        revYoY: 44.2,
        netIncome: "$3.4亿",
        niYoY: 78.5,
        grossMargin: 82.4,
        rdRatio: 16.5,
        highlight: "美国商业收入同比飙升 68%，Rule of 40 指标高达 86%",
        takeaways: [
          "AIP Bootcamp 模式大幅缩短大企业签单周期，百万美元级以上合同数创历史新高。",
          "政府与国防 AI 指挥决策系统需求在全球地缘变局下维持高景气度。"
        ],
        series: [
          { label: "25Q4", rev: 8.3, ni: 2.0 },
          { label: "26Q1", rev: 9.2, ni: 2.4 },
          { label: "26Q2", rev: 10.4, ni: 2.9 },
          { label: "26Q3", rev: 11.6, ni: 3.4 }
        ]
      },
      semiannual: {
        period: "2026H1",
        revenue: "$19.6亿",
        revenueNum: 19.6,
        revYoY: 41.8,
        netIncome: "$5.3亿",
        niYoY: 82.0,
        grossMargin: 82.1,
        rdRatio: 16.9,
        highlight: "成为纯 AI 软件层营收加速最快、盈利质量最高的现象级标的",
        takeaways: [
          "账面现金及等价物超 $60亿且零有息负债，自由现金流利润率超 42%。"
        ],
        series: [
          { label: "25H1", rev: 13.8, ni: 2.9 },
          { label: "25H2", rev: 16.1, ni: 3.8 },
          { label: "26H1", rev: 19.6, ni: 5.3 }
        ]
      },
      annual: {
        period: "2025FY",
        revenue: "$29.9亿",
        revenueNum: 29.9,
        revYoY: 32.5,
        netIncome: "$6.7亿",
        niYoY: 112.0,
        grossMargin: 81.8,
        rdRatio: 17.2,
        highlight: "验证了企业级 AI 从“概念验证”走向“生产级自主决策”的商业化闭环",
        takeaways: [
          "客户净留存率 (NDR) 持续上行至 124%，老客户不断追加工作流模块。"
        ],
        series: [
          { label: "2023FY", rev: 22.3, ni: 2.1 },
          { label: "2024FY", rev: 28.7, ni: 4.6 },
          { label: "2025FY", rev: 29.9, ni: 6.7 }
        ]
      }
    },
    products: [
      { name: "Palantir AIP (Artificial Intelligence Platform)", category: "企业级 AI 操作系统", desc: "安全接入多款大语言模型，在企业权限框架内直接执行供应链、金融与制造决策。" },
      { name: "Foundry & Gotham Ontology", category: "数据本体底座", desc: "将企业异构数据映射为可计算的业务数字孪生对象。" }
    ],
    applications: ["国防与情报 AI 决策", "制造业与供应链实时调度", "医疗与能源资产优化", "金融风控反欺诈"],
    research: {
      consensus: "中性/增持",
      broker: "Wedbush / 摩根士丹利",
      thesis: "企业级 AI 软件落地标杆，基本面与增速无可挑剔，但高估值对业绩持续超预期提出极高要求。",
      catalysts: "美国商业大单继续加速、欧洲企业 AI 预算放量",
      risks: "远期市盈率估值极高带来的高波动回撤风险"
    }
  }
);
