window.AIChainData = window.AIChainData || { companies: [] };

window.AIChainData.links = [
  // 上游 -> 中游 (硬件与制造传导至大模型与云计算巨头)
  { from: "nvda", to: "msft", label: "GB300/Blackwell 集群" },
  { from: "nvda", to: "googl", label: "云端 GPU 算力合作" },
  { from: "nvda", to: "amzn", label: "AWS P6 GPU 实例" },
  { from: "nvda", to: "meta", label: "百万卡训练集群" },
  { from: "nvda", to: "orcl", label: "OCI 裸金属超算" },
  { from: "nvda", to: "tencent", label: "合规模组与推理生态" },
  { from: "nvda", to: "pltr", label: "AIP GPU 推理加速" },

  { from: "tsmc", to: "msft", label: "Maia 自研芯片代工" },
  { from: "tsmc", to: "googl", label: "TPU v7 3nm/CoWoS" },
  { from: "tsmc", to: "amzn", label: "Trainium3 先进代工" },
  { from: "tsmc", to: "meta", label: "MTIA 定制芯片代工" },

  { from: "avgo", to: "googl", label: "TPU 定制 ASIC 设计" },
  { from: "avgo", to: "meta", label: "MTIA 定制 ASIC/网络" },
  { from: "avgo", to: "msft", label: "800G/1.6T 以太网交换" },
  { from: "avgo", to: "amzn", label: "AI 集群高速光互联" },

  { from: "asml", to: "msft", label: "尖端算力晶圆母机支撑" },
  { from: "asml", to: "googl", label: "EUV 先进制程上游保障" },

  { from: "samsung", to: "amzn", label: "企业级 eSSD/HBM 存储" },
  { from: "samsung", to: "googl", label: "数据中心 DRAM/SSD" },
  { from: "samsung", to: "baba", label: "云端高密度存储供应" },

  { from: "amd", to: "msft", label: "MI355X 推理与 EPYC" },
  { from: "amd", to: "meta", label: "Llama 推理 GPU 采购" },
  { from: "amd", to: "orcl", label: "OCI 异构算力集群" },

  { from: "skhynix", to: "msft", label: "高带宽 HBM4 间接核心" },
  { from: "skhynix", to: "orcl", label: "超算显存与数据中心内存" },
  { from: "skhynix", to: "baba", label: "高密度 DDR5/HBM 供应" },

  { from: "tel", to: "tsmc", label: "EUV 涂胶显影与键合" },
  { from: "tel", to: "skhynix", label: "HBM 刻蚀与晶圆键合" },
  { from: "tel", to: "msft", label: "尖端云芯片制造装备支撑" },

  { from: "fii", to: "msft", label: "NVL72 液冷整机柜总装" },
  { from: "fii", to: "amzn", label: "AWS AI 服务器与 800G 交换" },
  { from: "fii", to: "orcl", label: "液冷机柜核心 ODM" },
  { from: "fii", to: "baba", label: "智算服务器制造供应" },

  { from: "smic", to: "cmcc", label: "国产智算芯片晶圆代工" },
  { from: "smic", to: "tencent", label: "本土 AI 推理与配套芯片" },
  { from: "smic", to: "baba", label: "国产云端配套芯片代工" },

  // 中游 -> 下游 (大模型、云与数据底座赋能行业应用与终端)
  { from: "msft", to: "crm", label: "Azure 云与 Copilot 协同" },
  { from: "msft", to: "now", label: "企业 AI Agent 联合编排" },
  { from: "msft", to: "adbe", label: "Firefly 企业工作流集成" },
  { from: "msft", to: "siemens", label: "Industrial Copilot 工业云" },

  { from: "googl", to: "aapl", label: "云基础设施与搜索生态" },
  { from: "googl", to: "crm", label: "Vertex AI / Gemini 接入" },
  { from: "googl", to: "adbe", label: "多模态创意模型生态合作" },
  { from: "googl", to: "xiaomi", label: "海外端侧 Gemini 集成" },

  { from: "amzn", to: "crm", label: "AWS 云底座与 Data Cloud" },
  { from: "amzn", to: "now", label: "Bedrock 企业自动化集成" },
  { from: "amzn", to: "adbe", label: "AIGC 渲染与云托管" },
  { from: "amzn", to: "sony", label: "游戏/影音云基础设施" },

  { from: "meta", to: "xiaomi", label: "Llama 开源端侧参考生态" },
  { from: "meta", to: "aapl", label: "社交/AI 应用分发生态" },

  { from: "orcl", to: "tsla", label: "视觉大模型训练云合作" },
  { from: "orcl", to: "siemens", label: "工业 ERP 与云数据协同" },

  { from: "tencent", to: "byd", label: "智驾云算力与车联网生态" },
  { from: "tencent", to: "meituan", label: "微信超级入口与云合作" },
  { from: "tencent", to: "xiaomi", label: "内容生态与混元接入" },

  { from: "cmcc", to: "byd", label: "车联网 5G-A 与国家级算力" },
  { from: "cmcc", to: "xiaomi", label: "AIoT 连接与智算网络" },
  { from: "cmcc", to: "meituan", label: "低空无人机通信专网" },

  { from: "sap", to: "siemens", label: "欧洲工业 ERP + 数字孪生" },
  { from: "sap", to: "now", label: "跨系统企业工作流数据" },
  { from: "sap", to: "byd", label: "全球化供应链 ERP 协同" },

  { from: "baba", to: "aapl", label: "中国区端云 AI 大模型合作" },
  { from: "baba", to: "xiaomi", label: "通义千问开源与云协作" },
  { from: "baba", to: "byd", label: "智驾云训练与座舱大模型" },
  { from: "baba", to: "meituan", label: "商业大模型与生态协同" },

  { from: "pltr", to: "siemens", label: "工业供应链 AI 决策闭环" },
  { from: "pltr", to: "tsla", label: "智能制造数据分析标杆" },
  { from: "pltr", to: "sony", label: "全球供应链本体优化" }
];

window.AIChainData.policies = [
  {
    id: "pol-1",
    date: "2026-11-18",
    region: "中国",
    impact: "positive",
    impactLabel: "产业利好",
    tiers: ["upstream", "midstream", "downstream"],
    title: "国务院及多部委深化“人工智能+”行动：扩大国产智算集群采购与行业 Agent 示范补贴",
    summary: "明确提出到 2027 年实现重点央国企与制造业核心环节 AI 渗透率大幅跃升，强化全国一体化算力网“东数西算”绿电直供与国产芯片适配补贴。",
    chainImpact: "直接加速中国移动等运营商智算招标，利好中芯国际本土流片、阿里云/腾讯云行业大模型落地，以及比亚迪、美团等智能驾驶与低空无人配送示范审批。",
    companies: ["smic", "cmcc", "baba", "tencent", "byd", "meituan"]
  },
  {
    id: "pol-2",
    date: "2026-11-10",
    region: "美国",
    impact: "positive",
    impactLabel: "基建支持",
    tiers: ["upstream", "midstream", "downstream"],
    title: "美国联邦 AI 能源与超算基础设施加速令：简化百兆瓦级数据中心电网并网与核电审批",
    summary: "白宫与能源部联合发布数据中心电力基建快速通道法案，支持 SMR 小型核电与大型工业储能优先接入 AI 超级集群，同时强化本土先进封装激励。",
    chainImpact: "显著缓解北美云巨头（微软、谷歌、亚马逊、甲骨文、Meta）的数据中心电力瓶颈，并直接拉动特斯拉 Megapack 储能与西门子智能配电订单。",
    companies: ["nvda", "msft", "googl", "amzn", "orcl", "meta", "tsla", "siemens"]
  },
  {
    id: "pol-3",
    date: "2026-10-28",
    region: "美国",
    impact: "restrictive",
    impactLabel: "出口管制",
    tiers: ["upstream", "midstream"],
    title: "美国商务部 BIS 修订高端 AI 算力扩散与 HBM/光刻机维护细则",
    summary: "更新先进节点 AI 加速器算力密度阈值及部分海外云端算力租赁合规核查要求，对高端 EUV 维保及 HBM 供应链流向提出更严格尽调义务。",
    chainImpact: "短期扰动英伟达、AMD、ASML、东京电子与 SK 海力士的跨区合规成本；中长期进一步强化中国算力产业链（中芯国际、阿里云、中国移动）的自主替代逻辑。",
    companies: ["nvda", "amd", "asml", "tel", "skhynix", "smic", "baba"]
  },
  {
    id: "pol-4",
    date: "2026-10-15",
    region: "欧盟",
    impact: "neutral",
    impactLabel: "合规规范",
    tiers: ["midstream", "downstream"],
    title: "欧盟《人工智能法案》(EU AI Act) 高风险系统合规细则全面进入执行期",
    summary: "针对通用大模型版权透明度、高风险自动驾驶/医疗/企业招聘 AI 系统实施强制审计与可追溯水印规范，同步推出 200 亿欧元欧洲本土“AI 工厂”算力扶持基金。",
    chainImpact: "具备商业版权安全认证与企业合规护城河的巨头（SAP、Adobe、ServiceNow、西门子、微软）受益于中小竞品出清，合规门槛抬升头部集中度。",
    companies: ["sap", "siemens", "adbe", "now", "msft", "googl"]
  },
  {
    id: "pol-5",
    date: "2026-09-26",
    region: "日韩台",
    impact: "positive",
    impactLabel: "补贴扶持",
    tiers: ["upstream"],
    title: "韩国“K-芯片法”延长抵税与日本 10 万亿日元半导体/AI 产业振兴计划落地",
    summary: "韩国上调 HBM 与系统半导体研发及设施投资税收抵免比例；日本推进先进制程设备、封装材料与数据中心能源补贴；中国台湾地区加码 2nm 及先进封装绿电配套。",
    chainImpact: "直接降低台积电、SK 海力士、三星电子、东京电子等东亚上游核心制造与设备巨头的资本开支有效税率，巩固全球供应链核心地位。",
    companies: ["tsmc", "skhynix", "samsung", "tel"]
  },
  {
    id: "pol-6",
    date: "2026-09-12",
    region: "中国",
    impact: "positive",
    impactLabel: "场景放开",
    tiers: ["downstream"],
    title: "工信部与交通部扩大 L3/L4 高阶智能网联汽车准入试点及城市低空物流航线审批",
    summary: "明确支持符合安全冗余标准的高阶智驾车企在主要一线与新一线城市开展规模化商业运行，并放宽无人机末端即时配送空域协同机制。",
    chainImpact: "直接催化比亚迪、小米集团智能驾驶 OTA 商业化溢价，加速美团低空无人机商业配送网络扩张，并带动车端视觉传感器（索尼等）及算力需求。",
    companies: ["byd", "xiaomi", "meituan", "tsla", "sony"]
  }
];

window.AIChainData.researchReports = [
  {
    id: "res-1",
    date: "2026-11-23",
    broker: "高盛 Global Investment Research",
    tier: "upstream",
    rating: "超配 / 强烈买入",
    title: "2027 算力范式展望：从预训练军备转向“推理扩展 + 液冷机柜”双红利",
    summary: "随着长思维链 (Test-Time Compute) 与多模态 Agent 普及，单次用户请求的推理算力消耗激增 10-30 倍。预计 2027 年北美五大云厂商 CAPEX 仍将维持 18%-22% 增长，HBM4 与定制 ASIC 增速将跑赢行业均值。",
    catalysts: "英伟达 Rubin 架构量产节奏、台积电 N2/CoWoS-L 涨价、博通新 ASIC 放量",
    risks: "若下游 AI 应用 ROI 阶段性放缓，上游估值可能面临增速换挡消化",
    companies: ["nvda", "tsmc", "avgo", "skhynix", "fii"]
  },
  {
    id: "res-2",
    date: "2026-11-21",
    broker: "摩根士丹利 Asia & US Tech",
    tier: "midstream",
    rating: "买入",
    title: "中游云巨头盈利拐点拆解：自研芯片如何重塑 AI 云毛利率？",
    summary: "谷歌 TPU v7 与亚马逊 Trainium3 在内部及外部推理负载中的占比已超 40%，有效对冲高昂 GPU 折旧成本。微软凭借 Copilot 企业席位提价与 Azure AI Foundry 实现最稳健的商业化闭环。",
    catalysts: "AWS 与 Google Cloud 营业利润率继续扩张、甲骨文 RPO 加速转化",
    risks: "数据中心电力交付周期拉长导致算力上架不及预期",
    companies: ["msft", "googl", "amzn", "meta", "orcl"]
  },
  {
    id: "res-3",
    date: "2026-11-20",
    broker: "中金公司研究部 (CICC)",
    tier: "midstream",
    rating: "跑赢行业",
    title: "中国 AI 价值重估：开源大模型平权下的“云底座 + 国民入口”双主线",
    summary: "阿里通义千问 Qwen 开源生态大幅降低企业接入 AI 门槛，带动阿里云收入增速重回 20%+ 通道；腾讯依托微信生态天然成为中国最大 C 端 AI Agent 入口；中国移动承担国家级智算基建，三者估值显著低于海外同业。",
    catalysts: "国内互联网巨头 CAPEX 持续兑现、政企 AI 私有化部署爆发",
    risks: "高端算力芯片供给约束、行业 API 价格竞争",
    companies: ["tencent", "baba", "cmcc", "smic"]
  },
  {
    id: "res-4",
    date: "2026-11-19",
    broker: "瑞银证券 (UBS)",
    tier: "downstream",
    rating: "买入",
    title: "企业级 Agent 商业化元年：从“按人头订阅”跃迁至“按数字劳动力结果付费”",
    summary: "ServiceNow Pro Plus、Salesforce Agentforce 与 Palantir AIP 率先验证了 AI 软件的真实增量付费意愿，彻底证伪“AI 杀死传统 SaaS”论调，具备专有企业数据的软件龙头正在享受第二轮估值扩张。",
    catalysts: "Agentforce/Now Assist 净新增 ACV 加速、SAP 云 ERP 强制迁移倒计时",
    risks: "宏观企业 IT 预算周期性波动、高估值软件股利率敏感性",
    companies: ["crm", "now", "pltr", "sap", "adbe"]
  },
  {
    id: "res-5",
    date: "2026-11-17",
    broker: "中信证券研究部",
    tier: "downstream",
    rating: "强于大市",
    title: "物理 AI (Physical AI) 大爆发：高阶智驾平权、端侧 AI 与具身机器人共振",
    summary: "AI 正加速从数字屏幕走向物理世界。特斯拉引领无监督 FSD 与 Optimus 人形机器人落地，比亚迪与小米推动中国高阶智驾与“人车家”端侧 AI 规模化普及，苹果与索尼则牢牢占据个人消费终端与视觉感知入口。",
    catalysts: "L3/L4 法规放开、AI 手机/眼镜换机潮、人形机器人量产定点",
    risks: "汽车终端价格竞争、消费电子换机周期拉长",
    companies: ["tsla", "aapl", "byd", "xiaomi", "sony", "siemens"]
  },
  {
    id: "res-6",
    date: "2026-11-15",
    broker: "野村证券 (Nomura)",
    tier: "upstream",
    rating: "增持",
    title: "东亚半导体装备与存储深度追踪：HBM4 逻辑底层裸片开启晶圆与封装融合新时代",
    summary: "HBM4 首次将存储堆叠与先进逻辑代工深度耦合，SK 海力士联手台积电率先领跑，三星加速追赶；而高深宽比刻蚀与混合键合需求直接把东京电子与 ASML 推入新一轮高毛利设备景气周期。",
    catalysts: "HBM4 商业定价溢价超 25%、晶圆厂 2027 年 WFE 资本开支上修",
    risks: "出口管制升级与汇率波动",
    companies: ["skhynix", "samsung", "tsmc", "tel", "asml"]
  }
];

window.AIChainData.dailyNews = [
  {
    id: "news-1",
    date: "2026-11-24",
    time: "18:40",
    tier: "upstream",
    sentiment: "bullish",
    source: "产业链供应链追踪",
    title: "英伟达 Rubin 架构供应链进入早期拉货备料期，工业富联与台积电获首批核心配额",
    summary: "据供应链调研，台积电 2027 年 CoWoS-L 先进封装月产能规划再度上调 18%，工业富联新一代高功率全液冷机柜产线已完成验证，上游算力硬件高景气能见度延伸至 2027H2。",
    companies: ["nvda", "tsmc", "fii", "skhynix"]
  },
  {
    id: "news-2",
    date: "2026-11-24",
    time: "15:20",
    tier: "midstream",
    sentiment: "bullish",
    source: "全球云计算观察",
    title: "微软 Azure AI 与阿里云同步上调 2027 财年智算推理集群资本开支指引",
    summary: "伴随企业级自主 Agent 与长思考推理模型调用量井喷，全球头部云厂商纷纷加码推理专用节点建设，定制 ASIC 与高速以太网交换需求同步走强。",
    companies: ["msft", "baba", "avgo", "amzn"]
  },
  {
    id: "news-3",
    date: "2026-11-24",
    time: "11:05",
    tier: "downstream",
    sentiment: "bullish",
    source: "智能汽车与机器人快讯",
    title: "比亚迪宣布“天神之眼”高阶智驾累计搭载突破 400 万辆，端到端城区版本开启新一轮 OTA",
    summary: "依托海量真实路况数据回流，比亚迪智驾迭代周期进一步缩短；同时小米汽车 HAD 端到端全场景智驾也公布最新安全里程突破，A+H 智驾产业链持续升温。",
    companies: ["byd", "xiaomi", "tsla"]
  },
  {
    id: "news-4",
    date: "2026-11-24",
    time: "09:15",
    tier: "macro",
    sentiment: "neutral",
    source: "全球科技监管速递",
    title: "欧盟 AI 办公室发布企业级 Agent 合规自查清单，SAP 与西门子率先通过首批认证",
    summary: "新规要求高风险行业自动化决策智能体保留全链路可审计日志。头部企业软件巨头凭借既有数据治理优势反而加速抢占市场份额。",
    companies: ["sap", "siemens", "now", "crm"]
  },
  {
    id: "news-5",
    date: "2026-11-23",
    time: "21:30",
    tier: "upstream",
    sentiment: "bullish",
    source: "半导体设备前线",
    title: "ASML 确认 High-NA EUV 光刻机单季交付提速，东京电子同步扩大 2nm 配套涂胶显影产能",
    summary: "台积电与存储巨头对 2nm 及 1c DRAM 节点投资意愿强劲，欧洲与日本尖端设备龙头在手订单回升至近两年新高。",
    companies: ["asml", "tel", "tsmc", "samsung"]
  },
  {
    id: "news-6",
    date: "2026-11-23",
    time: "16:10",
    tier: "midstream",
    sentiment: "bullish",
    source: "港股科技投研",
    title: "腾讯微信 AI 搜索与小程序 Agent 日活再创新高，机构上调广告与云业务盈利预测",
    summary: "多家外资行指出，微信生态内闭环调用混元及第三方推理模型已显著提升用户停留时长与商业转化效率，AI 正成为腾讯高质量增长新引擎。",
    companies: ["tencent", "meituan"]
  },
  {
    id: "news-7",
    date: "2026-11-23",
    time: "10:45",
    tier: "downstream",
    sentiment: "bullish",
    source: "硅谷软件情报",
    title: "Salesforce 与 ServiceNow 公布企业级数字员工最新消耗数据：大客户续费客单价提升 28%",
    summary: "大型跨国银行与零售商全面上线跨部门 AI Agent 工作流，软件应用层正进入业绩兑现与估值重估共振期。",
    companies: ["crm", "now", "pltr", "adbe"]
  },
  {
    id: "news-8",
    date: "2026-11-22",
    time: "19:20",
    tier: "upstream",
    sentiment: "bearish",
    source: "国际贸易与政策观察",
    title: "市场关注新一轮跨境高端芯片与 HBM 出口审查细则，部分算力硬件股盘中波动加剧",
    summary: "分析人士指出，出口合规收紧短期压制部分外资半导体公司情绪，但同步强化中国移动、中芯国际等本土自主算力链的长期国产替代确定性。",
    companies: ["nvda", "amd", "smic", "cmcc"]
  },
  {
    id: "news-9",
    date: "2026-11-22",
    time: "14:00",
    tier: "downstream",
    sentiment: "bullish",
    source: "消费电子与终端链",
    title: "苹果新一代端侧 AI 芯片订单锁定台积电 N2 首批产能，索尼高规格 AI 视觉传感器同步放量",
    summary: "端侧个人智能体对手机内存带宽与多模态视觉感知提出更高要求，拉动苹果核心供应链高附加值模组出货。",
    companies: ["aapl", "tsmc", "sony"]
  },
  {
    id: "news-10",
    date: "2026-11-22",
    time: "09:50",
    tier: "midstream",
    sentiment: "bullish",
    source: "北美算力基建简报",
    title: "甲骨文 OCI 与谷歌云相继披露百兆瓦级液冷 AI 园区投运进展，电力配储需求外溢",
    summary: "随着新一代单机柜功耗突破 120kW，AI 数据中心对液冷散热、大型储能及智能配电的刚性拉动持续超预期。",
    companies: ["orcl", "googl", "tsla", "siemens", "fii"]
  },
  {
    id: "news-11",
    date: "2026-11-21",
    time: "17:15",
    tier: "downstream",
    sentiment: "bullish",
    source: "低空经济与本地生活",
    title: "美团低空无人机获批新增 12 条跨区常态化航线，AI 实时调度系统单均成本再降 15%",
    summary: "依托高频履约场景与城市低空政策试点放开，美团持续验证物理 AI 无人配送商业模型。",
    companies: ["meituan", "cmcc"]
  },
  {
    id: "news-12",
    date: "2026-11-21",
    time: "11:30",
    tier: "midstream",
    sentiment: "neutral",
    source: "开源生态追踪",
    title: "Meta Llama 与阿里 Qwen 新一轮开源多模态推理基准发布，中小企业私有化部署成本再降 40%",
    summary: "开源模型能力逼近闭源旗舰正在加速下游行业应用百花齐放，推理算力总量需求（杰文斯悖论）持续扩大。",
    companies: ["meta", "baba", "amd", "nvda"]
  }
];
