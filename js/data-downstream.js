window.AIChainData = window.AIChainData || { companies: [] };

window.AIChainData.companies.push(
  // ==================== 下游 · 行业应用与智能终端 (10家) ====================
  {
    id: "aapl",
    name: "苹果 Apple",
    ticker: "AAPL",
    exchange: "NASDAQ",
    market: "US",
    marketLabel: "美股",
    tier: "downstream",
    subSegment: "端侧AI消费电子生态",
    role: "全球最大消费级端侧 AI 硬件入口与 Apple Intelligence 隐私算力生态霸主",
    marketCap: 35800,
    pe: 30.2,
    tags: ["Apple Intelligence", "A/M系列端侧芯", "23亿活跃设备", "隐私云计算"],
    moat: "23 亿+ 活跃高端终端硬件闭环 + 自研 Apple Silicon 统一内存架构 + 极高服务毛利",
    financials: {
      quarterly: {
        period: "2026Q3 (FY26Q4)",
        revenue: "$1048亿",
        revenueNum: 1048,
        revYoY: 8.6,
        netIncome: "$264亿",
        niYoY: 11.4,
        grossMargin: 47.4,
        rdRatio: 8.2,
        highlight: "iPhone 18 端侧 AI 换机周期兑现，服务业务单季营收突破 $288亿",
        takeaways: [
          "全新 Siri 跨应用自主操作 Agent 落地，推动 Pro 系列高内存版本占比创新高。",
          "中国区与阿里通义千问等本地化端云 AI 服务协同落地，大中华区销量企稳回升。",
          "服务业务毛利率超 74%，持续抬升公司整体盈利中枢。"
        ],
        series: [
          { label: "25Q4", rev: 1243, ni: 363 },
          { label: "26Q1", rev: 964, ni: 251 },
          { label: "26Q2", rev: 912, ni: 229 },
          { label: "26Q3", rev: 1048, ni: 264 }
        ]
      },
      semiannual: {
        period: "2026H1",
        revenue: "$1876亿",
        revenueNum: 1876,
        revYoY: 7.4,
        netIncome: "$480亿",
        niYoY: 10.2,
        grossMargin: 47.1,
        rdRatio: 8.4,
        highlight: "Mac 与 iPad 凭借 M4/M5 统一大内存成为个人本地大模型运行首选终端",
        takeaways: [
          "Private Cloud Compute 自研芯片云推理服务器规模扩容，保障零数据留存隐私。"
        ],
        series: [
          { label: "25H1", rev: 1747, ni: 436 },
          { label: "25H2", rev: 2208, ni: 604 },
          { label: "26H1", rev: 1876, ni: 480 }
        ]
      },
      annual: {
        period: "2025FY",
        revenue: "$4052亿",
        revenueNum: 4052,
        revYoY: 5.8,
        netIncome: "$1040亿",
        niYoY: 8.9,
        grossMargin: 46.6,
        rdRatio: 8.1,
        highlight: "稳居全球消费级 AI 最大分发终端与最强现金奶牛",
        takeaways: [
          "年回购规模超 $950亿，App Store 成为消费级 AI 应用生态税收枢纽。"
        ],
        series: [
          { label: "2023FY", rev: 3833, ni: 970 },
          { label: "2024FY", rev: 3910, ni: 937 },
          { label: "2025FY", rev: 4052, ni: 1040 }
        ]
      }
    },
    products: [
      { name: "iPhone / Mac 端侧 Apple Intelligence", category: "个人智能终端", desc: "依托自研芯片神经引擎实现本地个人上下文理解与跨 App 意图执行。" },
      { name: "Private Cloud Compute & VisionOS", category: "隐私AI云与空间计算", desc: "无缝衔接端侧与云端大模型，卡位下一代空间交互计算。" }
    ],
    applications: ["个人随身 AI 助手", "端侧本地模型推理", "移动应用生态分发", "可穿戴健康 AI"],
    research: {
      consensus: "买入",
      broker: "摩根士丹利 / 花旗",
      thesis: "端侧 AI 无需承担超额算力军备 CAPEX，却坐享个人智能体最终入口红利与高毛利服务变现。",
      catalysts: "新一代 AI 手机换机潮、可折叠终端及 AI 智能家居新品发布",
      risks: "全球智能手机竞争加剧、欧美应用商店反垄断合规调整"
    }
  },
  {
    id: "tsla",
    name: "特斯拉 Tesla",
    ticker: "TSLA",
    exchange: "NASDAQ",
    market: "US",
    marketLabel: "美股",
    tier: "downstream",
    subSegment: "自动驾驶与具身机器人",
    role: "全球物理 AI (Physical AI) 领军者：端到端 FSD 自动驾驶 + Optimus 人形机器人",
    marketCap: 10800,
    pe: 86.5,
    tags: ["FSD无监督智驾", "Robotaxi", "Optimus机器人", "物理AI龙头"],
    moat: "全球超 700 万辆实时路采视觉车队数据 + Cortex 万卡训练集群 + 车端/机器人端复用算力",
    financials: {
      quarterly: {
        period: "2026Q3",
        revenue: "$296亿",
        revenueNum: 296,
        revYoY: 14.2,
        netIncome: "$32亿",
        niYoY: 28.4,
        grossMargin: 21.4,
        rdRatio: 5.4,
        highlight: "无监督 FSD 在北美多城开启 Robotaxi 车队试运营，储能业务毛利率创 31% 新高",
        takeaways: [
          "FSD 软件递延收入确认与订阅率显著抬头，带动汽车业务毛利率重回扩张通道。",
          "Optimus Gen-3 人形机器人已在自有超级工厂部署数千台，计划 2027 年启动外部商用交付。",
          "Megapack 储能装机量同比大增 65%，直接受益于全球 AI 数据中心配储刚需。"
        ],
        series: [
          { label: "25Q4", rev: 268, ni: 25 },
          { label: "26Q1", rev: 252, ni: 23 },
          { label: "26Q2", rev: 274, ni: 28 },
          { label: "26Q3", rev: 296, ni: 32 }
        ]
      },
      semiannual: {
        period: "2026H1",
        revenue: "$526亿",
        revenueNum: 526,
        revYoY: 11.8,
        netIncome: "$51亿",
        niYoY: 32.0,
        grossMargin: 20.6,
        rdRatio: 5.7,
        highlight: "估值逻辑全面从纯电动车转向“自动驾驶出行网络 + 具身智能机器人 + AI 储能”",
        takeaways: [
          "自研 AI5 车载与机器人推理芯片进入流片阶段，算力较 HW4 提升数倍。"
        ],
        series: [
          { label: "25H1", rev: 470, ni: 39 },
          { label: "25H2", rev: 525, ni: 49 },
          { label: "26H1", rev: 526, ni: 51 }
        ]
      },
      annual: {
        period: "2025FY",
        revenue: "$995亿",
        revenueNum: 995,
        revYoY: 5.6,
        netIncome: "$88亿",
        niYoY: 19.2,
        grossMargin: 19.2,
        rdRatio: 5.2,
        highlight: "建成超大规模视觉世界模型训练集群，奠定物理世界 AI 先发优势",
        takeaways: [
          "纯视觉端到端神经网络路线在成本与泛化能力上持续迭代。"
        ],
        series: [
          { label: "2023FY", rev: 968, ni: 109 },
          { label: "2024FY", rev: 977, ni: 71 },
          { label: "2025FY", rev: 995, ni: 88 }
        ]
      }
    },
    products: [
      { name: "FSD (Full Self-Driving) & Cybercab", category: "端到端自动驾驶", desc: "纯视觉端到端神经网络自动驾驶系统与无人驾驶出租车网络。" },
      { name: "Optimus 具身人形机器人", category: "具身智能", desc: "复用汽车视觉大脑与高自由度灵巧手，面向工厂制造与通用劳动场景。" },
      { name: "Megapack 工业级储能", category: "AI 数据中心能源", desc: "解决 AI 算力中心电网调峰与绿电稳定供应的高毛利储能系统。" }
    ],
    applications: ["L4 级无人驾驶出行", "工厂与通用人形机器人", "AI 算力中心配套储能"],
    research: {
      consensus: "买入",
      broker: "摩根士丹利 / Wedbush",
      thesis: "若 Robotaxi 网络与 Optimus 具身机器人顺利规模化商业落地，公司将打开万亿美元级物理 AI 市场。",
      catalysts: "Robotaxi 运营城市扩张、FSD 在中欧获批进展、Optimus 外部大客户订单",
      risks: "电动车价格战拖累短期现金流、自动驾驶安全与法规审批延后"
    }
  },
  {
    id: "crm",
    name: "赛富时 Salesforce",
    ticker: "CRM",
    exchange: "NYSE",
    market: "US",
    marketLabel: "美股",
    tier: "downstream",
    subSegment: "企业级AI Agent SaaS",
    role: "全球 CRM 软件霸主与企业级数字劳动力 (Agentforce) 商业化旗手",
    marketCap: 3250,
    pe: 29.5,
    tags: ["Agentforce", "数字劳动力", "Data Cloud", "SaaS AI转型"],
    moat: "全球 15 万+ 企业客户关系与销售客服全量数据 + 按结果/对话计费的新型 Agent 商业模式",
    financials: {
      quarterly: {
        period: "2026Q3 (FY27Q3)",
        revenue: "$108亿",
        revenueNum: 108,
        revYoY: 11.4,
        netIncome: "$24亿",
        niYoY: 22.8,
        grossMargin: 77.6,
        rdRatio: 14.1,
        highlight: "Agentforce 付费签约客户突破 2.2 万家，Data Cloud ARR 突破 $20亿",
        takeaways: [
          "按交互消耗计费的 Agentforce 成功打破“AI 削减 SaaS 席位”的悲观叙事。",
          "非 GAAP 营业利润率站稳 34.5% 高位，现金流转化强劲。"
        ],
        series: [
          { label: "25Q4", rev: 100, ni: 20 },
          { label: "26Q1", rev: 101, ni: 21 },
          { label: "26Q2", rev: 104, ni: 22 },
          { label: "26Q3", rev: 108, ni: 24 }
        ]
      },
      semiannual: {
        period: "2026H1",
        revenue: "$205亿",
        revenueNum: 205,
        revYoY: 10.6,
        netIncome: "$43亿",
        niYoY: 24.1,
        grossMargin: 77.2,
        rdRatio: 14.3,
        highlight: "Data Cloud + Agentforce 双引擎带动大企业续费率与净扩增率企稳回升",
        takeaways: [
          "Slack 全面升级为企业级多 Agent 协作入口，强化工作流粘性。"
        ],
        series: [
          { label: "25H1", rev: 185, ni: 35 },
          { label: "25H2", rev: 199, ni: 39 },
          { label: "26H1", rev: 205, ni: 43 }
        ]
      },
      annual: {
        period: "2025FY",
        revenue: "$384亿",
        revenueNum: 384,
        revYoY: 9.8,
        netIncome: "$74亿",
        niYoY: 36.2,
        grossMargin: 76.8,
        rdRatio: 14.5,
        highlight: "率先跑通企业级 AI Agent 从 Copilot 到全自主数字员工的付费闭环",
        takeaways: [
          "持续推进分红与股票回购，成为高质量 AI 应用层现金流标杆。"
        ],
        series: [
          { label: "2023FY", rev: 349, ni: 41 },
          { label: "2024FY", rev: 379, ni: 62 },
          { label: "2025FY", rev: 384, ni: 74 }
        ]
      }
    },
    products: [
      { name: "Agentforce 数字劳动力平台", category: "企业自主 Agent", desc: "7×24 小时自动处理客户服务、线索培育、营销投放与电商订单的智能体集群。" },
      { name: "Salesforce Data Cloud", category: "企业客户数据底座", desc: "实时汇聚企业内外部非结构化客户数据，为 AI Agent 提供零幻觉上下文。" }
    ],
    applications: ["智能客服与工单闭环", "B2B 销售自动化", "精准营销活动编排", "Slack 企业协作"],
    research: {
      consensus: "买入",
      broker: "高盛 / 摩根大通",
      thesis: "证明了垂直行业 SaaS 龙头凭借专有业务数据反而最受益于 Agent 浪潮，估值具备重估空间。",
      catalysts: "Agentforce 消耗量加速、cRPO 增速突破双位数",
      risks: "企业 IT 软件支出预算波动、来自微软 Dynamics Agent 的直接竞争"
    }
  },
  {
    id: "now",
    name: "ServiceNow",
    ticker: "NOW",
    exchange: "NYSE",
    market: "US",
    marketLabel: "美股",
    tier: "downstream",
    subSegment: "企业工作流AI自动化",
    role: "全球企业 IT 运维与跨部门工作流 AI 编排操作系统龙头",
    marketCap: 2240,
    pe: 52.8,
    tags: ["Now Assist", "Pro Plus提价", "企业AI控制塔", "高续费SaaS"],
    moat: "高达 98% 的大型企业续费率 + 横跨 IT/HR/财务/安全的企业工作流总枢纽地位",
    financials: {
      quarterly: {
        period: "2026Q3",
        revenue: "$36.2亿",
        revenueNum: 36.2,
        revYoY: 22.8,
        netIncome: "$6.8亿",
        niYoY: 31.4,
        grossMargin: 79.4,
        rdRatio: 22.1,
        highlight: "Pro Plus 生成式 AI 套餐净新增 ACV 同比增长超 140%，续费率稳居 98%",
        takeaways: [
          "Now Assist AI Agent 成为公司历史上增长最快的新产品线，渗透超 40% 财富 500 强。",
          "AI Control Tower 协助企业统一治理来自微软、AWS、英伟达生态的第三方智能体。"
        ],
        series: [
          { label: "25Q4", rev: 30.8, ni: 5.1 },
          { label: "26Q1", rev: 32.4, ni: 5.6 },
          { label: "26Q2", rev: 34.3, ni: 6.2 },
          { label: "26Q3", rev: 36.2, ni: 6.8 }
        ]
      },
      semiannual: {
        period: "2026H1",
        revenue: "$66.7亿",
        revenueNum: 66.7,
        revYoY: 22.4,
        netIncome: "$11.8亿",
        niYoY: 34.0,
        grossMargin: 79.2,
        rdRatio: 22.4,
        highlight: "在百亿美元营收体量下仍保持 22%+ 高速增长的“AI 应用层优等生”",
        takeaways: [
          "与英伟达、微软深度集成，成为大企业落地 AI 工作流的必选编排层。"
        ],
        series: [
          { label: "25H1", rev: 54.5, ni: 8.8 },
          { label: "25H2", rev: 60.4, ni: 10.1 },
          { label: "26H1", rev: 66.7, ni: 11.8 }
        ]
      },
      annual: {
        period: "2025FY",
        revenue: "$114.9亿",
        revenueNum: 114.9,
        revYoY: 22.6,
        netIncome: "$18.9亿",
        niYoY: 38.5,
        grossMargin: 79.0,
        rdRatio: 22.6,
        highlight: "成功通过 Pro Plus 30%-60% 提价将生成式 AI 转化为实打实的订阅营收增长",
        takeaways: [
          "自由现金流利润率超过 31%，成长性与盈利质量位列全球软件前列。"
        ],
        series: [
          { label: "2023FY", rev: 89.7, ni: 11.2 },
          { label: "2024FY", rev: 109.8, ni: 14.3 },
          { label: "2025FY", rev: 114.9, ni: 18.9 }
        ]
      }
    },
    products: [
      { name: "Now Assist & AI Agent Orchestrator", category: "工作流智能体", desc: "自动诊断 IT 故障、审批合规工单、调度跨部门工作流的企业级 AI 平台。" },
      { name: "Workflow Data Fabric", category: "实时工作流数据层", desc: "零拷贝连接 Snowflake、Databricks 与 SAP 数据，实现毫秒级自动化执行。" }
    ],
    applications: ["企业 IT 运维自动化 (ITSM)", "网络安全应急响应", "HR 与供应链流程自动化"],
    research: {
      consensus: "强烈买入",
      broker: "摩根士丹利 / 瑞银",
      thesis: "企业级 AI 软件领域确定性最强的复利机器，Pro Plus 渗透率仍处于中早期。",
      catalysts: "cRPO 增速超 22%、联邦政府与跨国大单落地",
      risks: "高估值溢价对宏观 IT 支出放缓较为敏感"
    }
  },
  {
    id: "adbe",
    name: "Adobe",
    ticker: "ADBE",
    exchange: "NASDAQ",
    market: "US",
    marketLabel: "美股",
    tier: "downstream",
    subSegment: "生成式创意与内容AI",
    role: "全球数字创意与文档软件绝对霸主（Firefly 商业安全生成式 AI 引擎）",
    marketCap: 2180,
    pe: 24.2,
    tags: ["Firefly生成式AI", "AI视频/图像", "商用版权安全", "Acrobat AI"],
    moat: "创意设计行业不可替代的工作流标准 (PS/PR/AE/PDF) + 商业版权零纠纷护城河",
    financials: {
      quarterly: {
        period: "2026Q3",
        revenue: "$61.8亿",
        revenueNum: 61.8,
        revYoY: 11.8,
        netIncome: "$19.6亿",
        niYoY: 15.4,
        grossMargin: 88.9,
        rdRatio: 17.6,
        highlight: "AI-first 独立与附加产品年化经常性收入突破 $12亿，视频生成模型商业化提速",
        takeaways: [
          "Firefly Video 与第三方多模型集成落地 Premiere Pro，大幅提升专业剪辑师粘性。",
          "Acrobat AI Assistant 驱动文档云营收保持 18%+ 高增，整体毛利率近 89%。"
        ],
        series: [
          { label: "25Q4", rev: 56.1, ni: 16.8 },
          { label: "26Q1", rev: 57.9, ni: 17.6 },
          { label: "26Q2", rev: 59.7, ni: 18.5 },
          { label: "26Q3", rev: 61.8, ni: 19.6 }
        ]
      },
      semiannual: {
        period: "2026H1",
        revenue: "$117.6亿",
        revenueNum: 117.6,
        revYoY: 11.4,
        netIncome: "$36.1亿",
        niYoY: 16.2,
        grossMargin: 88.7,
        rdRatio: 17.8,
        highlight: "以“商业版权安全 + 精细可控编辑”稳住专业企业市场基本盘",
        takeaways: [
          "GenStudio 为全球消费品大牌提供端到端 AI 营销内容自动化供应链。"
        ],
        series: [
          { label: "25H1", rev: 105.6, ni: 31.1 },
          { label: "25H2", rev: 111.5, ni: 33.4 },
          { label: "26H1", rev: 117.6, ni: 36.1 }
        ]
      },
      annual: {
        period: "2025FY",
        revenue: "$217.1亿",
        revenueNum: 217.1,
        revYoY: 10.8,
        netIncome: "$64.5亿",
        niYoY: 14.9,
        grossMargin: 88.5,
        rdRatio: 18.0,
        highlight: "全产业链毛利率最高标的之一，持续验证创意工作流 AI 变现路径",
        takeaways: [
          "Firefly 累计生成商业资产超 250 亿次，强化 Creative Cloud 生态壁垒。"
        ],
        series: [
          { label: "2023FY", rev: 194.1, ni: 54.3 },
          { label: "2024FY", rev: 215.1, ni: 55.6 },
          { label: "2025FY", rev: 217.1, ni: 64.5 }
        ]
      }
    },
    products: [
      { name: "Adobe Firefly 多模态生成引擎", category: "商用 AIGC 模型", desc: "覆盖图像、矢量、音频与视频生成，提供企业级 IP 版权赔偿保障。" },
      { name: "Creative Cloud & GenStudio", category: "创意与营销套件", desc: "将生成式 AI 深度嵌入 Photoshop、Premiere、Illustrator 与文档生态。" }
    ],
    applications: ["专业影视与平面设计", "品牌营销内容工厂", "智能 PDF 合同分析", "数字体验管理"],
    research: {
      consensus: "增持",
      broker: "美银证券 / 富国银行",
      thesis: "估值回落至历史低位区间，若 AI 视频生成与 GenStudio 推动数字媒体净新增 ARR 重加速，将迎双击。",
      catalysts: "Firefly 商业化提价兑现、GenStudio 大企业签约超预期",
      risks: "开源及独立 AI 视频/图像工具对轻度创作者用户的分流"
    }
  },
  {
    id: "siemens",
    name: "西门子 Siemens",
    ticker: "SIE.DE",
    exchange: "XETRA",
    market: "EU",
    marketLabel: "欧股",
    tier: "downstream",
    subSegment: "工业AI与数字孪生",
    role: "全球工业 AI、工厂自动化、EDA 软件与 AI 数据中心配电基建龙头",
    marketCap: 1680,
    pe: 18.2,
    tags: ["工业Copilot", "数字孪生", "数据中心配电", "欧洲工业AI龙头"],
    moat: "工业 PLC 自动化硬件全球第一 + 收购 Altair 补齐工业仿真 AI + 与英伟达共建工业元宇宙",
    financials: {
      quarterly: {
        period: "2026Q3",
        revenue: "$224亿",
        revenueNum: 224,
        revYoY: 8.4,
        netIncome: "$26.5亿",
        niYoY: 14.2,
        grossMargin: 39.6,
        rdRatio: 8.4,
        highlight: "智能基础设施 (SI) 数据中心配电订单暴增 +54%，工业软件云化加速",
        takeaways: [
          "整合 Altair 工业仿真与 AI 物理模型软件后，Xcelerator 工业数字孪生平台竞争力跃升。",
          "与英伟达联合推出的 Industrial Copilot 已在汽车、半导体、航空工厂大规模部署。"
        ],
        series: [
          { label: "25Q4", rev: 218, ni: 23.1 },
          { label: "26Q1", rev: 204, ni: 22.8 },
          { label: "26Q2", rev: 215, ni: 24.6 },
          { label: "26Q3", rev: 224, ni: 26.5 }
        ]
      },
      semiannual: {
        period: "2026H1",
        revenue: "$419亿",
        revenueNum: 419,
        revYoY: 7.9,
        netIncome: "$47.4亿",
        niYoY: 15.1,
        grossMargin: 39.2,
        rdRatio: 8.5,
        highlight: "兼具“AI 算力中心电网配电”与“制造业工业 AI 软件”双重受益属性",
        takeaways: [
          "数字工业 (DI) 软件年度经常性收入 (ARR) 保持 14%+ 稳健增长。"
        ],
        series: [
          { label: "25H1", rev: 388, ni: 41.2 },
          { label: "25H2", rev: 432, ni: 47.0 },
          { label: "26H1", rev: 419, ni: 47.4 }
        ]
      },
      annual: {
        period: "2025FY",
        revenue: "$820亿",
        revenueNum: 820,
        revYoY: 6.2,
        netIncome: "$88.2亿",
        niYoY: 9.8,
        grossMargin: 38.8,
        rdRatio: 8.3,
        highlight: "成功从传统重工转型为高毛利工业软件、电气化与物理 AI 平台巨头",
        takeaways: [
          "在手积压订单超 €1180亿，覆盖全球智算中心供配电与智能工厂升级周期。"
        ],
        series: [
          { label: "2023FY", rev: 778, ni: 85.0 },
          { label: "2024FY", rev: 772, ni: 80.3 },
          { label: "2025FY", rev: 820, ni: 88.2 }
        ]
      }
    },
    products: [
      { name: "Siemens Xcelerator & Industrial Copilot", category: "工业 AI 与数字孪生", desc: "结合英伟达 Omniverse 与物理仿真 AI，实现产线自动编程与预测性维护。" },
      { name: "AI 数据中心智能配电与微电网方案", category: "算力能源基建", desc: "为百兆瓦级超大规模 AI 机房提供高可靠中低压电气与能效管理。" }
    ],
    applications: ["智能制造与黑灯工厂", "芯片 EDA 与物理仿真", "超大规模 AI 数据中心配电"],
    research: {
      consensus: "买入",
      broker: "摩根大通 / 德意志银行",
      thesis: "同时卡位 AI 算力电力瓶颈与工业 AI 智能化改造两条长周期主线，估值稳健且具欧股稀缺性。",
      catalysts: "工业自动化订单拐点向上、Altair 协同增厚软件利润率",
      risks: "欧洲制造业景气度复苏缓慢、工业软件整合周期"
    }
  },
  {
    id: "byd",
    name: "比亚迪 BYD",
    ticker: "002594.SZ",
    exchange: "SZSE / HKEX",
    market: "CN",
    marketLabel: "A股",
    tier: "downstream",
    subSegment: "智能驾驶与AI汽车规模化",
    role: "全球新能源汽车销量霸主与高阶智驾“天神之眼”全民普及引领者（A+H 旗舰）",
    marketCap: 1380,
    pe: 19.4,
    tags: ["天神之眼智驾", "璇玑AI架构", "千万级车队数据", "A股智能汽车龙头"],
    moat: "年销超 450 万辆全球最大智能车数据闭环 + 全栈垂直整合成本优势 + 端侧智驾规模平权",
    financials: {
      quarterly: {
        period: "2026Q3",
        revenue: "¥2340亿",
        revenueNum: 325,
        revYoY: 16.4,
        netIncome: "¥142亿",
        niYoY: 22.1,
        grossMargin: 21.8,
        rdRatio: 6.8,
        highlight: "搭载“天神之眼”高阶智驾车型销量占比突破 68%，海外销量同比大增 72%",
        takeaways: [
          "千万级保有车辆构建中国最大端到端智驾数据飞轮，智驾研发团队超 5000 人。",
          "璇玑架构深度融合本土大模型，打造全场景智能座舱与车控一体化 AI 体验。",
          "高附加值方程豹、腾势、仰望及海外市场显著提升单车净利与毛利率。"
        ],
        series: [
          { label: "25Q4", rev: 342, ni: 19.8 },
          { label: "26Q1", rev: 256, ni: 13.4 },
          { label: "26Q2", rev: 298, ni: 16.9 },
          { label: "26Q3", rev: 325, ni: 19.7 }
        ]
      },
      semiannual: {
        period: "2026H1",
        revenue: "¥3988亿",
        revenueNum: 554,
        revYoY: 18.2,
        netIncome: "¥218亿",
        niYoY: 24.5,
        grossMargin: 21.3,
        rdRatio: 7.1,
        highlight: "全面吹响“全民智驾”号角，将激光雷达与高速/城区 NOA 普及至主流价格带",
        takeaways: [
          "半年研发投入超 ¥280亿，持续位居 A 股制造业上市公司研发投入榜首。"
        ],
        series: [
          { label: "25H1", rev: 469, ni: 24.3 },
          { label: "25H2", rev: 612, ni: 34.1 },
          { label: "26H1", rev: 554, ni: 30.3 }
        ]
      },
      annual: {
        period: "2025FY",
        revenue: "¥7782亿",
        revenueNum: 1081,
        revYoY: 28.4,
        netIncome: "¥420亿",
        niYoY: 36.8,
        grossMargin: 20.9,
        rdRatio: 6.9,
        highlight: "实现电动化上半场绝对领先，全速领跑智能化与全球化下半场",
        takeaways: [
          "与国产芯片、算力云协同推进车端大模型与具身制造机器人落地工厂。"
        ],
        series: [
          { label: "2023FY", rev: 836, ni: 41.7 },
          { label: "2024FY", rev: 1079, ni: 55.8 },
          { label: "2025FY", rev: 1081, ni: 58.3 }
        ]
      }
    },
    products: [
      { name: "“天神之眼”高阶智能驾驶系统", category: "端到端智驾", desc: "覆盖高速与城市领航辅助，依托海量真实路况数据持续 OTA 进化。" },
      { name: "璇玑 AI 整车智能架构", category: "AI 智能座舱与车控", desc: "打通底盘、动力、座舱与云端 AI 大模型，实现整车级自主协同。" }
    ],
    applications: ["高阶自动驾驶乘用车", "AI 智能座舱交互", "海外新能源与智能出行生态"],
    research: {
      consensus: "强烈买入",
      broker: "中信证券 / 花旗",
      thesis: "高阶智驾平权将中小车企进一步甩开代差，海量数据积累与出海高毛利双轮驱动业绩与估值双击。",
      catalysts: "城区 NOA 大规模 OTA 落地、欧洲与南美本地化建厂投产",
      risks: "国内汽车行业阶段性竞争加剧、海外贸易关税壁垒"
    }
  },
  {
    id: "meituan",
    name: "美团 Meituan",
    ticker: "3690.HK",
    exchange: "HKEX",
    market: "HK",
    marketLabel: "港股",
    tier: "downstream",
    subSegment: "AI本地生活与无人配送",
    role: "全球最大即时配送 AI 调度网络、低空无人机与本地生活智能体龙头",
    marketCap: 1320,
    pe: 20.6,
    tags: ["AI实时调度", "低空无人机", "自动配送车", "本地生活Agent"],
    moat: "日均近亿级实时履约时空数据 + 行业壁垒极高的 AI 运力调度与无人配送落地网络",
    financials: {
      quarterly: {
        period: "2026Q3",
        revenue: "¥1065亿",
        revenueNum: 148,
        revYoY: 14.5,
        netIncome: "¥149亿",
        niYoY: 19.8,
        grossMargin: 39.8,
        rdRatio: 6.4,
        highlight: "AI 商家运营助手与本地生活 Agent 提升转化率，无人机累计商业配送突破 80 万单",
        takeaways: [
          "核心本地商业稳健增长，AI 智能定价与动态运力调度持续优化单均履约成本。",
          "Keeta 海外拓展至中东多国并复制中国 AI 履约算法优势，打开增量空间。"
        ],
        series: [
          { label: "25Q4", rev: 126, ni: 14.5 },
          { label: "26Q1", rev: 121, ni: 15.2 },
          { label: "26Q2", rev: 136, ni: 18.4 },
          { label: "26Q3", rev: 148, ni: 20.7 }
        ]
      },
      semiannual: {
        period: "2026H1",
        revenue: "¥1852亿",
        revenueNum: 257,
        revYoY: 15.2,
        netIncome: "¥242亿",
        niYoY: 22.4,
        grossMargin: 39.2,
        rdRatio: 6.6,
        highlight: "自研大模型深度赋能商户智能营销与自动客服，盈利韧性突出",
        takeaways: [
          "自研自动配送车与低空无人机形成“空地协同”物理 AI 履约闭环。"
        ],
        series: [
          { label: "25H1", rev: 223, ni: 27.4 },
          { label: "25H2", rev: 251, ni: 32.1 },
          { label: "26H1", rev: 257, ni: 33.6 }
        ]
      },
      annual: {
        period: "2025FY",
        revenue: "¥3415亿",
        revenueNum: 474,
        revYoY: 21.4,
        netIncome: "¥438亿",
        niYoY: 58.6,
        grossMargin: 38.6,
        rdRatio: 6.5,
        highlight: "构建了全球最复杂的实时物理世界 AI 运力调度与本地服务商业闭环",
        takeaways: [
          "积极布局具身机器人与低空经济基础设施，长期降本空间广阔。"
        ],
        series: [
          { label: "2023FY", rev: 384, ni: 32.3 },
          { label: "2024FY", rev: 469, ni: 60.8 },
          { label: "2025FY", rev: 474, ni: 60.8 }
        ]
      }
    },
    products: [
      { name: "超脑即时配送 AI 调度系统 & 本地生活 Agent", category: "时空 AI 算法", desc: "每秒百万次路径优化计算，并通过对话式 Agent 重构本地吃喝玩乐决策。" },
      { name: "美团低空无人机 & 自动配送车", category: "物理 AI 履约", desc: "已在深圳、上海、北京及迪拜等多城常态化运营的城市低空物流网络。" }
    ],
    applications: ["超大规模即时零售调度", "低空无人机物流", "本地商户 AI 营销 Agent"],
    research: {
      consensus: "买入",
      broker: "高盛 / 中金公司",
      thesis: "竞争格局企稳后盈利能力持续兑现，AI Agent 交互与低空无人配送提供长期结构性估值溢价。",
      catalysts: "即时零售闪购高增、Keeta 海外进展超预期、无人机航线放量",
      risks: "国内宏观消费波动、海外新业务阶段性投入"
    }
  },
  {
    id: "sony",
    name: "索尼集团 Sony",
    ticker: "6758.T",
    exchange: "TSE / NYSE",
    market: "JP",
    marketLabel: "日股",
    tier: "downstream",
    subSegment: "AI视觉感知与文娱内容",
    role: "全球第一大 AI 图像传感器 (CIS) 巨头与游戏/音乐/影视 AI 娱乐生态龙头",
    marketCap: 1260,
    pe: 18.8,
    tags: ["视觉传感器全球第一", "边缘AI相机芯片", "PlayStation生态", "AI文娱IP"],
    moat: "全球超 50% 高端图像传感器份额（AI 终端与机器人的“眼睛”）+ 全球顶级娱乐 IP 版权库",
    financials: {
      quarterly: {
        period: "2026Q3",
        revenue: "$218亿",
        revenueNum: 218,
        revYoY: 9.2,
        netIncome: "$22.4亿",
        niYoY: 16.5,
        grossMargin: 41.2,
        rdRatio: 6.5,
        highlight: "I&SS 图像传感器受高端 AI 手机与车载/机器人视觉拉动盈利创新高",
        takeaways: [
          "集成片上 AI 处理器的 AITRIOS 边缘视觉传感器在零售与工业检测加速普及。",
          "游戏与网络服务 (PSN) 引入 AI 超分渲染 (PSSR) 与智能内容推荐，营业利润率攀升。"
        ],
        series: [
          { label: "25Q4", rev: 256, ni: 24.8 },
          { label: "26Q1", rev: 194, ni: 18.6 },
          { label: "26Q2", rev: 205, ni: 20.1 },
          { label: "26Q3", rev: 218, ni: 22.4 }
        ]
      },
      semiannual: {
        period: "2026H1",
        revenue: "$399亿",
        revenueNum: 399,
        revYoY: 8.6,
        netIncome: "$38.7亿",
        niYoY: 15.8,
        grossMargin: 40.8,
        rdRatio: 6.7,
        highlight: "剥离金融业务聚焦“创意娱乐 + 视觉感知芯片”，ROE 持续改善",
        takeaways: [
          "手握海量正版音乐、动漫、影视 IP，在生成式 AI 版权授权与内容增效中占据主动权。"
        ],
        series: [
          { label: "25H1", rev: 367, ni: 33.4 },
          { label: "25H2", rev: 462, ni: 43.2 },
          { label: "26H1", rev: 399, ni: 38.7 }
        ]
      },
      annual: {
        period: "2025FY",
        revenue: "$829亿",
        revenueNum: 829,
        revYoY: 7.4,
        netIncome: "$76.6亿",
        niYoY: 14.2,
        grossMargin: 40.2,
        rdRatio: 6.6,
        highlight: "日本市值领先的全球科技娱乐巨头，卡位物理 AI 视觉感知与 AIGC 内容双赛道",
        takeaways: [
          "车载与机器人高动态范围视觉传感器成为增长最快的硬件细分。"
        ],
        series: [
          { label: "2023FY", rev: 795, ni: 64.0 },
          { label: "2024FY", rev: 772, ni: 67.1 },
          { label: "2025FY", rev: 829, ni: 76.6 }
        ]
      }
    },
    products: [
      { name: "IMX / AITRIOS 边缘 AI 图像传感器", category: "物理 AI 视觉感知", desc: "全球旗舰手机、自动驾驶与人形机器人的核心视觉感知芯片，内置端侧 AI 推理。" },
      { name: "PlayStation & 动漫影视 AI 制作生态", category: "AI 互动娱乐", desc: "结合 AI 超分、虚拟制片与海量 IP 版权打造的全球内容平台。" }
    ],
    applications: ["AI 手机与车载/机器人视觉", "AI 辅助游戏与动画制作", "边缘智能安防与零售"],
    research: {
      consensus: "买入",
      broker: "摩根士丹利 / 野村证券",
      thesis: "既是端侧 AI 视觉传感不可或缺的硬件龙头，又是 AI 时代稀缺的顶级版权与互动娱乐平台。",
      catalysts: "大作游戏周期释放、机器人/车载传感器大单、持续回购",
      risks: "手机大客户传感器订单波动、日元升值汇兑影响"
    }
  },
  {
    id: "xiaomi",
    name: "小米集团 Xiaomi",
    ticker: "1810.HK",
    exchange: "HKEX",
    market: "HK",
    marketLabel: "港股",
    tier: "downstream",
    subSegment: "人车家端侧AI全生态",
    role: "全球领先“人车家全生态”端侧 AI 手机、智能汽车与最大消费级 IoT 平台",
    marketCap: 1210,
    pe: 26.4,
    tags: ["人车家AI生态", "小米汽车智驾", "HyperAI", "全球最大IoT"],
    moat: "超 9.5 亿台 AIoT 连接设备 + 高端手机 + 爆款智能电动车构成的跨场景端侧 AI 闭环",
    financials: {
      quarterly: {
        period: "2026Q3",
        revenue: "¥1215亿",
        revenueNum: 169,
        revYoY: 31.4,
        netIncome: "¥98亿",
        niYoY: 46.2,
        grossMargin: 22.8,
        rdRatio: 7.4,
        highlight: "智能电动汽车单季交付突破 11 万台并实现全面盈利，HyperAI 渗透全生态",
        takeaways: [
          "小米汽车 HAD 端到端全场景智能驾驶全面推送，带动高端品牌势能反哺手机与家电。",
          "端侧多模态大模型“超级小爱”实现手机、汽车与智能家居跨设备无缝意图联动。",
          "AIoT 与高端智能手机双双创历史单季毛利率新高。"
        ],
        series: [
          { label: "25Q4", rev: 151, ni: 11.4 },
          { label: "26Q1", rev: 146, ni: 11.8 },
          { label: "26Q2", rev: 158, ni: 12.9 },
          { label: "26Q3", rev: 169, ni: 13.6 }
        ]
      },
      semiannual: {
        period: "2026H1",
        revenue: "¥2188亿",
        revenueNum: 304,
        revYoY: 33.8,
        netIncome: "¥178亿",
        niYoY: 48.5,
        grossMargin: 22.3,
        rdRatio: 7.6,
        highlight: "全球唯二成功实现“AI 手机 + 智能汽车 + 全屋智能”商业大闭环的科技巨头",
        takeaways: [
          "重金投入端侧大模型、自研芯片与智能驾驶，AI 研发投入占总研发比例大幅提升。"
        ],
        series: [
          { label: "25H1", rev: 227, ni: 16.6 },
          { label: "25H2", rev: 281, ni: 21.8 },
          { label: "26H1", rev: 304, ni: 24.7 }
        ]
      },
      annual: {
        period: "2025FY",
        revenue: "¥3659亿",
        revenueNum: 508,
        revYoY: 35.0,
        netIncome: "¥272亿",
        niYoY: 41.3,
        grossMargin: 21.6,
        rdRatio: 6.9,
        highlight: "业绩与市值双双迈入千亿美元俱乐部，成为港股端侧 AI 与智能车核心旗帜",
        takeaways: [
          "全球智能手机稳居前三，叠加汽车业务高增打开中长期成长天花板。"
        ],
        series: [
          { label: "2023FY", rev: 376, ni: 26.8 },
          { label: "2024FY", rev: 508, ni: 37.8 },
          { label: "2025FY", rev: 508, ni: 37.8 }
        ]
      }
    },
    products: [
      { name: "Xiaomi HyperOS & 超级小爱端侧 AI", category: "跨端 AI 操作系统", desc: "打通手机、平板、汽车与智能家居的全场景跨端多模态 AI 助手。" },
      { name: "小米智能电动汽车 (SU7 / YU7 系列) & HAD 智驾", category: "AI 智能汽车", desc: "结合端到端大模型智驾与高集成智能座舱的爆款新能源智能车。" }
    ],
    applications: ["AI 智能手机与穿戴", "端到端智能驾驶汽车", "全屋 AIoT 智能家居"],
    research: {
      consensus: "强烈买入",
      broker: "高盛 / 中信证券",
      thesis: "“人车家”跨终端 AI 生态护城河在海内外均具稀缺性，汽车盈利释放叠加 AI 眼镜等新硬件持续催化。",
      catalysts: "二期汽车工厂产能释放、AI 眼镜/自研芯片进展、高端机海外放量",
      risks: "新能源车行业竞争加剧、上游存储芯片涨价对手机毛利扰动"
    }
  }
);
