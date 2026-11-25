/* ==========================================================================
   AI Global Value Chain Research Terminal — Real-Time Node.js Server
   Zero external npm dependencies (requires Node.js 18/20+ built-in fetch)
   Features:
     - Static file hosting for index.html, css/, js/
     - GET /api/quotes  : Real-time stock prices for all 30 global AI companies
     - GET /api/news    : Real-time AI industry & market RSS intelligence feed
     - GET /api/health  : Render health check endpoint
   ========================================================================== */

const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const PORT = Number(process.env.PORT) || 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon"
};

/* ==================== 30 Global AI Supply-Chain Tickers ==================== */
const TICKER_MAP = [
  // Upstream (10)
  { id: "nvda", yahoo: "NVDA", market: "US", keywords: ["nvidia", "nvda", "英伟达", "blackwell", "rubin", "cuda"] },
  { id: "tsmc", yahoo: "2330.TW", market: "TW", keywords: ["tsmc", "2330", "台积电", "cowos", "台湾积体电路"] },
  { id: "avgo", yahoo: "AVGO", market: "US", keywords: ["broadcom", "avgo", "博通", "asic"] },
  { id: "asml", yahoo: "ASML.AS", market: "EU", keywords: ["asml", "阿斯麦", "光刻机", "euv"] },
  { id: "samsung", yahoo: "005930.KS", market: "KR", keywords: ["samsung", "三星", "005930"] },
  { id: "amd", yahoo: "AMD", market: "US", keywords: ["amd", "超威", "mi350", "mi355", "instinct"] },
  { id: "skhynix", yahoo: "000660.KS", market: "KR", keywords: ["sk hynix", "hynix", "海力士", "hbm4", "hbm3e", "000660"] },
  { id: "tel", yahoo: "8035.T", market: "JP", keywords: ["tokyo electron", "东京电子", "8035"] },
  { id: "fii", yahoo: "601138.SS", tencent: "sh601138", market: "CN", keywords: ["工业富联", "601138", "foxconn industrial", "液冷机柜"] },
  { id: "smic", yahoo: "688981.SS", tencent: "sh688981", market: "CN", keywords: ["中芯国际", "smic", "688981", "0981"] },

  // Midstream (10)
  { id: "msft", yahoo: "MSFT", market: "US", keywords: ["microsoft", "msft", "微软", "azure", "copilot", "openai"] },
  { id: "googl", yahoo: "GOOGL", market: "US", keywords: ["google", "alphabet", "googl", "谷歌", "gemini", "tpu"] },
  { id: "amzn", yahoo: "AMZN", market: "US", keywords: ["amazon", "amzn", "亚马逊", "aws", "bedrock", "trainium"] },
  { id: "meta", yahoo: "META", market: "US", keywords: ["meta", "llama", "扎克伯格"] },
  { id: "orcl", yahoo: "ORCL", market: "US", keywords: ["oracle", "orcl", "甲骨文", "stargate", "oci"] },
  { id: "tencent", yahoo: "0700.HK", tencent: "hk00700", market: "HK", keywords: ["tencent", "腾讯", "混元", "0700", "微信"] },
  { id: "cmcc", yahoo: "600941.SS", tencent: "sh600941", market: "CN", keywords: ["中国移动", "china mobile", "600941", "九天大模型", "智算中心"] },
  { id: "sap", yahoo: "SAP.DE", market: "EU", keywords: ["sap", "思爱普", "joule"] },
  { id: "baba", yahoo: "9988.HK", tencent: "hk09988", market: "HK", keywords: ["alibaba", "阿里", "阿里云", "通义千问", "qwen", "9988", "baba"] },
  { id: "pltr", yahoo: "PLTR", market: "US", keywords: ["palantir", "pltr", "aip", "ontology"] },

  // Downstream (10)
  { id: "aapl", yahoo: "AAPL", market: "US", keywords: ["apple", "aapl", "苹果", "iphone", "apple intelligence"] },
  { id: "tsla", yahoo: "TSLA", market: "US", keywords: ["tesla", "tsla", "特斯拉", "fsd", "optimus", "robotaxi"] },
  { id: "crm", yahoo: "CRM", market: "US", keywords: ["salesforce", "crm", "赛富时", "agentforce"] },
  { id: "now", yahoo: "NOW", market: "US", keywords: ["servicenow", "now assist"] },
  { id: "adbe", yahoo: "ADBE", market: "US", keywords: ["adobe", "adbe", "firefly"] },
  { id: "siemens", yahoo: "SIE.DE", market: "EU", keywords: ["siemens", "西门子", "数字孪生", "工业ai"] },
  { id: "byd", yahoo: "002594.SZ", tencent: "sz002594", market: "CN", keywords: ["byd", "比亚迪", "天神之眼", "002594"] },
  { id: "meituan", yahoo: "3690.HK", tencent: "hk03690", market: "HK", keywords: ["meituan", "美团", "3690", "低空无人机"] },
  { id: "sony", yahoo: "6758.T", market: "JP", keywords: ["sony", "索尼", "6758", "图像传感器"] },
  { id: "xiaomi", yahoo: "1810.HK", tencent: "hk01810", market: "HK", keywords: ["xiaomi", "小米", "1810", "雷军", "人车家"] }
];

const UPSTREAM_IDS = new Set(TICKER_MAP.slice(0, 10).map((t) => t.id));
const MIDSTREAM_IDS = new Set(TICKER_MAP.slice(10, 20).map((t) => t.id));
const DOWNSTREAM_IDS = new Set(TICKER_MAP.slice(20, 30).map((t) => t.id));

/* ==================== Caches ==================== */
const quotesCache = {
  data: {},
  updatedAt: null,
  lastFetchMs: 0,
  fetching: null
};

const newsCache = {
  items: [],
  updatedAt: null,
  lastFetchMs: 0,
  fetching: null
};

const QUOTES_TTL_MS = 60 * 1000;      // 60 seconds
const QUOTES_MIN_GAP_MS = 10 * 1000;  // 10s guard for manual refresh
const NEWS_TTL_MS = 5 * 60 * 1000;    // 5 minutes
const NEWS_MIN_GAP_MS = 20 * 1000;    // 20s guard for manual refresh

const COMMON_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  "Accept": "application/json, text/xml, application/rss+xml, */*"
};

async function fetchWithTimeout(url, timeoutMs = 7000, headers = COMMON_HEADERS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { headers, signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res;
  } finally {
    clearTimeout(timer);
  }
}

/* ==================== Live Stock Quotes Fetcher ==================== */
async function fetchYahooQuote(item) {
  const hosts = ["query1.finance.yahoo.com", "query2.finance.yahoo.com"];
  for (const host of hosts) {
    try {
      const url = `https://${host}/v8/finance/chart/${encodeURIComponent(item.yahoo)}?interval=1d&range=5d`;
      const res = await fetchWithTimeout(url, 6500);
      const json = await res.json();
      const result = json && json.chart && json.chart.result && json.chart.result[0];
      if (!result || !result.meta) continue;

      const meta = result.meta;
      const price = Number(meta.regularMarketPrice);
      const prevClose = Number(meta.chartPreviousClose || meta.previousClose || price);
      if (!Number.isFinite(price) || price <= 0) continue;

      const change = price - prevClose;
      const changePercent = prevClose > 0 ? (change / prevClose) * 100 : 0;
      const closes = (result.indicators && result.indicators.quote && result.indicators.quote[0] && result.indicators.quote[0].close) || [];
      const cleanCloses = closes.filter((v) => typeof v === "number" && Number.isFinite(v));

      return {
        id: item.id,
        symbol: item.yahoo,
        price: Number(price.toFixed(2)),
        prevClose: Number(prevClose.toFixed(2)),
        change: Number(change.toFixed(2)),
        changePercent: Number(changePercent.toFixed(2)),
        currency: meta.currency || "USD",
        exchangeName: meta.exchangeName || item.market,
        marketState: meta.marketState || "REGULAR",
        regularMarketTime: meta.regularMarketTime ? new Date(meta.regularMarketTime * 1000).toISOString() : new Date().toISOString(),
        sparkline: cleanCloses.slice(-5).map((v) => Number(v.toFixed(2))),
        source: "Yahoo Finance"
      };
    } catch (_) {
      // try next host
    }
  }
  return null;
}

async function fetchTencentFallback(items) {
  const targets = items.filter((t) => t.tencent);
  if (!targets.length) return {};
  try {
    const query = targets.map((t) => t.tencent).join(",");
    const res = await fetchWithTimeout(`https://qt.gtimg.cn/q=${query}`, 6000);
    const text = await res.text();
    const out = {};

    targets.forEach((item) => {
      const regex = new RegExp(`v_${item.tencent}="([^"]+)"`);
      const match = text.match(regex);
      if (!match) return;
      const fields = match[1].split("~");
      const price = Number(fields[3]);
      const prevClose = Number(fields[4]);
      const changePercent = Number(fields[32]);
      if (!Number.isFinite(price) || price <= 0) return;
      out[item.id] = {
        id: item.id,
        symbol: item.yahoo,
        price: Number(price.toFixed(2)),
        prevClose: Number.isFinite(prevClose) ? Number(prevClose.toFixed(2)) : price,
        change: Number((price - (prevClose || price)).toFixed(2)),
        changePercent: Number.isFinite(changePercent) ? Number(changePercent.toFixed(2)) : 0,
        currency: item.market === "HK" ? "HKD" : "CNY",
        exchangeName: item.market === "HK" ? "HKEX" : "SSE/SZSE",
        marketState: "REGULAR",
        regularMarketTime: new Date().toISOString(),
        sparkline: [],
        source: "Tencent Finance"
      };
    });
    return out;
  } catch (_) {
    return {};
  }
}

async function refreshQuotes(force = false) {
  const now = Date.now();
  if (quotesCache.fetching) return quotesCache.fetching;
  if (!force && now - quotesCache.lastFetchMs < QUOTES_TTL_MS && Object.keys(quotesCache.data).length > 0) {
    return quotesCache;
  }
  if (force && now - quotesCache.lastFetchMs < QUOTES_MIN_GAP_MS && Object.keys(quotesCache.data).length > 0) {
    return quotesCache;
  }

  quotesCache.fetching = (async () => {
    const nextData = { ...quotesCache.data };
    const missingForFallback = [];

    // Batch fetch 6 symbols concurrently to avoid rate-limiting
    const batchSize = 6;
    for (let i = 0; i < TICKER_MAP.length; i += batchSize) {
      const batch = TICKER_MAP.slice(i, i + batchSize);
      const results = await Promise.all(batch.map((item) => fetchYahooQuote(item)));
      results.forEach((q, idx) => {
        if (q) {
          nextData[q.id] = q;
        } else {
          missingForFallback.push(batch[idx]);
        }
      });
    }

    if (missingForFallback.length) {
      const fallbackQuotes = await fetchTencentFallback(missingForFallback);
      Object.assign(nextData, fallbackQuotes);
    }

    quotesCache.data = nextData;
    quotesCache.updatedAt = new Date().toISOString();
    quotesCache.lastFetchMs = Date.now();
    quotesCache.fetching = null;
    return quotesCache;
  })();

  return quotesCache.fetching;
}

/* ==================== Real-Time RSS News Fetcher ==================== */
const RSS_FEEDS = [
  {
    name: "Google 财经 · AI算力",
    url: "https://news.google.com/rss/search?q=%E8%8B%B1%E4%BC%9F%E8%BE%BE+OR+%E5%8F%B0%E7%A7%AF%E7%94%B5+OR+AI%E8%8A%AF%E7%89%87+OR+%E4%B8%AD%E8%8A%AF%E5%9B%BD%E9%99%85+OR+%E5%B7%A5%E4%B8%9A%E5%AF%8C%E8%81%94+when:3d&hl=zh-CN&gl=CN&ceid=CN:zh-Hans",
    defaultTier: "upstream"
  },
  {
    name: "Google 财经 · 大模型与云",
    url: "https://news.google.com/rss/search?q=%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD+%E5%A4%A7%E6%A8%A1%E5%9E%8B+OR+%E9%98%BF%E9%87%8C%E4%BA%91+OR+%E8%85%BE%E8%AE%AF+OR+%E5%BE%AE%E8%BD%AF+OR+%E8%B0%B7%E6%AD%8C+when:3d&hl=zh-CN&gl=CN&ceid=CN:zh-Hans",
    defaultTier: "midstream"
  },
  {
    name: "Google 财经 · 智驾与AI应用",
    url: "https://news.google.com/rss/search?q=%E7%89%B9%E6%96%AF%E6%8B%89+OR+%E6%AF%94%E4%BA%9A%E8%BF%AA+%E6%99%BA%E9%A9%BE+OR+%E5%B0%8F%E7%B1%B3+AI+OR+%E8%8B%B9%E6%9E%9C+AI+when:3d&hl=zh-CN&gl=CN&ceid=CN:zh-Hans",
    defaultTier: "downstream"
  },
  {
    name: "Google News · Global AI",
    url: "https://news.google.com/rss/search?q=(NVIDIA+OR+TSMC+OR+Broadcom+OR+ASML+OR+Microsoft+AI+OR+Palantir)+stock+when:3d&hl=en-US&gl=US&ceid=US:en",
    defaultTier: "upstream"
  },
  {
    name: "TechCrunch AI",
    url: "https://techcrunch.com/category/artificial-intelligence/feed/",
    defaultTier: "midstream"
  }
];

function decodeXmlEntities(str) {
  return String(str || "")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTag(block, tag) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = block.match(re);
  return m ? decodeXmlEntities(m[1]) : "";
}

function classifyNewsItem(title, summary, defaultTier) {
  const hay = `${title} ${summary}`.toLowerCase();

  const companies = [];
  TICKER_MAP.forEach((item) => {
    if (item.keywords.some((kw) => hay.includes(kw))) {
      companies.push(item.id);
    }
  });

  // Determine tier
  let tier = defaultTier;
  if (/出口管制|政策|法案|监管|补贴|关税|tariff|export control|ai act|regulation|antitrust/.test(hay)) {
    tier = "macro";
  } else if (companies.length) {
    if (companies.some((id) => UPSTREAM_IDS.has(id))) tier = "upstream";
    else if (companies.some((id) => MIDSTREAM_IDS.has(id))) tier = "midstream";
    else if (companies.some((id) => DOWNSTREAM_IDS.has(id))) tier = "downstream";
  }

  // Determine sentiment
  let sentiment = "neutral";
  const bullRe = /大涨|飙升|突破|新高|超预期|暴增|上调|获批|量产|买入|强劲|增长|合作|发布|surge|soar|beat|record|upgrade|rally|growth|launch|partnership|boost|bullish/;
  const bearRe = /大跌|暴跌|下调|管制|限制|起诉|反垄断|下滑|亏损|推迟|风险|警告|制裁|drop|plunge|cut|ban|restrict|lawsuit|antitrust|delay|risk|warning|decline|bearish|sanction/;
  if (bearRe.test(hay) && !bullRe.test(hay)) sentiment = "bearish";
  else if (bullRe.test(hay)) sentiment = "bullish";

  return { tier, sentiment, companies: companies.slice(0, 5) };
}

function formatDateParts(dateInput) {
  const d = new Date(dateInput);
  if (Number.isNaN(d.getTime())) {
    const now = new Date();
    return {
      ts: now.getTime(),
      date: now.toISOString().slice(0, 10),
      time: now.toTimeString().slice(0, 5)
    };
  }
  // Convert to UTC+8 (China Standard Time) for clean display
  const cn = new Date(d.getTime() + 8 * 3600 * 1000);
  return {
    ts: d.getTime(),
    date: cn.toISOString().slice(0, 10),
    time: cn.toISOString().slice(11, 16)
  };
}

async function fetchSingleFeed(feed) {
  try {
    const res = await fetchWithTimeout(feed.url, 7000);
    const xml = await res.text();
    const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) || [];
    const parsed = [];

    for (const blk of blocks.slice(0, 10)) {
      let rawTitle = extractTag(blk, "title");
      if (!rawTitle) continue;

      let sourceName = extractTag(blk, "source") || feed.name;
      // Google News titles often end with " - SourceName"
      const dashIdx = rawTitle.lastIndexOf(" - ");
      if (dashIdx > 12 && rawTitle.length - dashIdx < 36) {
        if (!extractTag(blk, "source")) sourceName = rawTitle.slice(dashIdx + 3).trim();
        rawTitle = rawTitle.slice(0, dashIdx).trim();
      }

      const link = extractTag(blk, "link");
      const rawDesc = extractTag(blk, "description");
      const pubDate = extractTag(blk, "pubDate");
      const dt = formatDateParts(pubDate);

      let summary = rawDesc && rawDesc.length > 20 && rawDesc !== rawTitle
        ? rawDesc.slice(0, 220) + (rawDesc.length > 220 ? "..." : "")
        : `来自 ${sourceName} 的最新 AI 产业链动态，点击原文链接查看完整报道。`;

      const { tier, sentiment, companies } = classifyNewsItem(rawTitle, summary, feed.defaultTier);
      parsed.push({
        id: "live-" + Buffer.from(rawTitle).toString("base64").replace(/[^a-zA-Z0-9]/g, "").slice(0, 14) + "-" + dt.ts,
        ts: dt.ts,
        date: dt.date,
        time: dt.time,
        tier,
        sentiment,
        source: sourceName,
        title: rawTitle,
        summary,
        link,
        companies,
        isLive: true
      });
    }
    return parsed;
  } catch (_) {
    return [];
  }
}

async function refreshNews(force = false) {
  const now = Date.now();
  if (newsCache.fetching) return newsCache.fetching;
  if (!force && now - newsCache.lastFetchMs < NEWS_TTL_MS && newsCache.items.length > 0) {
    return newsCache;
  }
  if (force && now - newsCache.lastFetchMs < NEWS_MIN_GAP_MS && newsCache.items.length > 0) {
    return newsCache;
  }

  newsCache.fetching = (async () => {
    const batches = await Promise.all(RSS_FEEDS.map((f) => fetchSingleFeed(f)));
    const merged = batches.flat();

    // Deduplicate by normalized title prefix
    const seen = new Set();
    const deduped = [];
    merged
      .sort((a, b) => b.ts - a.ts)
      .forEach((item) => {
        const key = item.title.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]/g, "").slice(0, 28);
        if (!key || seen.has(key)) return;
        seen.add(key);
        deduped.push(item);
      });

    if (deduped.length > 0) {
      newsCache.items = deduped.slice(0, 36);
    }
    newsCache.updatedAt = new Date().toISOString();
    newsCache.lastFetchMs = Date.now();
    newsCache.fetching = null;
    return newsCache;
  })();

  return newsCache.fetching;
}

/* ==================== HTTP Request Router ==================== */
function sendJson(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*"
  });
  res.end(body);
}

function serveStaticFile(reqPath, res) {
  let cleanPath = reqPath === "/" ? "/index.html" : reqPath;
  const resolved = path.normalize(path.join(ROOT_DIR, cleanPath));
  if (!resolved.startsWith(ROOT_DIR)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(resolved, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("404 Not Found");
      return;
    }
    const ext = path.extname(resolved).toLowerCase();
    res.writeHead(200, {
      "Content-Type": MIME_TYPES[ext] || "application/octet-stream",
      "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=300"
    });
    res.end(content);
  });
}

const server = http.createServer(async (req, res) => {
  try {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    const pathname = parsedUrl.pathname;

    if (pathname === "/api/health") {
      return sendJson(res, 200, {
        status: "ok",
        quotesLoaded: Object.keys(quotesCache.data).length,
        newsLoaded: newsCache.items.length,
        quotesUpdatedAt: quotesCache.updatedAt,
        newsUpdatedAt: newsCache.updatedAt,
        uptimeSec: Math.round(process.uptime())
      });
    }

    if (pathname === "/api/quotes") {
      const force = parsedUrl.searchParams.get("refresh") === "1";
      const result = await refreshQuotes(force);
      return sendJson(res, 200, {
        updatedAt: result.updatedAt,
        count: Object.keys(result.data).length,
        quotes: result.data
      });
    }

    if (pathname === "/api/news") {
      const force = parsedUrl.searchParams.get("refresh") === "1";
      const result = await refreshNews(force);
      return sendJson(res, 200, {
        updatedAt: result.updatedAt,
        count: result.items.length,
        items: result.items
      });
    }

    serveStaticFile(pathname, res);
  } catch (err) {
    sendJson(res, 500, { error: err.message || "Internal Server Error" });
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`[AI-Chain Server] Listening on http://0.0.0.0:${PORT}`);
  // Warm up caches on startup
  refreshQuotes(true).catch(() => {});
  refreshNews(true).catch(() => {});
  // Background auto-refresh intervals
  setInterval(() => refreshQuotes(true).catch(() => {}), 90 * 1000);
  setInterval(() => refreshNews(true).catch(() => {}), 10 * 60 * 1000);
});
