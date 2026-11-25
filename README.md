# AI 全球产业链投研图谱终端 (AI Global Value Chain Research Terminal)

交互式现代化 AI 产业链（上中下游）上市公司投研终端，覆盖美股、A股、港股、台股、欧股、韩股、日股七大市场共 30 家大市值龙头，支持**实时股价自动抓取**与**全网 AI 产业链资讯自动抓取**。

## 核心特性
- **交互式链式图**：上游算力硬件（10家） → 中游大模型与云平台（10家） → 下游行业应用与终端（10家），支持悬停/点击动态流光贝塞尔路径高亮。
- **实时股价同步 (`/api/quotes`)**：后端自动抓取全球 30 家公司实时股价与当日涨跌幅（Yahoo Finance + 腾讯财经 A/H 股双源兜底），每 60 秒自动刷新。
- **实时资讯抓取 (`/api/news`)**：自动拉取中英文财经与科技 RSS 源，智能识别产业链环节、市场情绪标签与关联股票代码，并附带原文跳转链接。
- **五大投研模块**：财经分析（季报/半年报/年报 + SVG 图表）、政策变动、主要产品及应用领域、研报重点、每日资讯中心。

## 本地运行
需要 Node.js 18+（零第三方依赖）：
```bash
node server.js
# 打开 http://localhost:3000
```

## Render 一键部署
仓库根目录已内置 `render.yaml` Blueprint 配置：
- Runtime: `node` (Node 20)
- Start Command: `node server.js`
- Health Check: `/api/health`
