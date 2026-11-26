import type { BuildUpCode, WindowId } from '../model/flow';
import type { UniverseId } from '../model/universe';

/**
 * Every user-visible label. English strings match the board's original copy.
 * Trading data, ticker symbols and the author credit are not translated here.
 */
export interface Messages {
  language: string;
  docTitle: string;
  markets: { us: string; usLong: string; crypto: string; cryptoLong: string };
  windows: Record<WindowId, { label: string; scope: string }>;
  universes: Record<UniverseId, { label: string; hint: string }>;
  sectors: { us: Record<string, string>; crypto: Record<string, string> };
  buildUp: { short: Record<BuildUpCode, string>; full: Record<BuildUpCode, string> };
  copyAi: string;
  copyAiTitle: string;
  saveImage: string;
  saving: string;
  toggleTheme: string;
  searchPlaceholder: string;
  searchAria: string;
  toastImageFail: string;
  toastCopied: string;
  toastClipboard: string;
  timesIn: string;
  hint: string;
  demoTitle: string;
  demoNoServerLead: string;
  demoNoServerMid: string;
  demoNoServerUs: string;
  demoNoServerCrypto: string;
  demoNoServerTail: string;
  demoNoServerEnd: string;
  demoAskedLead: string;
  demoAskedMid: string;
  demoAskedEnd: string;
  demoFailLead: string;
  demoFailMid: string;
  demoFailEnd: string;
  demoRunLead: string;
  demoRunMid: string;
  demoRunEnd: string;
  sessionLine: string;
  marketOpen: string;
  marketClosed: string;
  liveSession: string;
  lastSession: string;
  barsTo: string;
  namesMeta: string;
  updatedNow: string;
  updatedMin: string;
  optionWalls: string;
  live: string;
  cryptoLine: string;
  loadingSp: string;
  loadingProgress: string;
  loadingCrypto: string;
  loadingConnect: string;
  up: string;
  flat: string;
  down: string;
  ofCount: string;
  asOf: string;
  windowLine: string;
  leading: string;
  lagging: string;
  spread: string;
  beyond: string;
  sectorTip: string;
  now: string;
  bullishCount: string;
  bearishCount: string;
  rangeboundCount: string;
  moreCount: string;
  noneMoved: string;
  moreBullish: string;
  moreBearish: string;
  benchmarkTitle: string;
  convictionTip: string;
  sideBullish: string;
  sideBearish: string;
  sideRange: string;
  rankSideBull: string;
  rankSideBear: string;
  support: string;
  zone: string;
  resistance: string;
  puts: string;
  calls: string;
  noProfile: string;
  close: string;
  detailAria: string;
  ledeFlat: string;
  ledeRank: string;
  whyRank: string;
  readings: string;
  statBuildUp: string;
  statOi: string;
  statFunding: string;
  statTaker: string;
  takerShare: string;
  statRvol: string;
  statCallPut: string;
  statVolume: string;
  statSupport: string;
  statResistance: string;
  statZone: string;
  statSector: string;
  legendSupportOptions: string;
  legendSupportVolume: string;
  legendResistanceOptions: string;
  legendResistanceVolume: string;
  legendSupport: string;
  legendResistance: string;
  legendZoneCrypto: string;
  legendZoneStock: string;
  notAdvice: string;
  checksWord: string;
  levelLine: string;
  footerHowTitle: string;
  footerHow: string;
  footerHowCrypto: string;
  footerHowStocks: string;
  footerData: string;
  footerDataCrypto: string;
  footerDataStocks: string;
  footerDisclaimer: string;
  footerOss: string;
  footerInspiredBefore: string;
  footerInspiredAfter: string;
  sources: Record<string, string>;
  notes: Record<string, string>;
  reasons: Record<string, string>;
}

export const en: Messages = {
  language: 'Language',
  docTitle: 'Global Order Flow · where the money is flowing',
  markets: { us: 'US Stocks', usLong: 'US stocks', crypto: 'Crypto', cryptoLong: 'Crypto perpetual futures' },
  windows: {
    '24h': { label: '24h', scope: 'over the last 24 hours' },
    '4h': { label: '4h', scope: 'over the last 4 hours' },
    '1h': { label: '1h', scope: 'over the last hour' },
    day: { label: 'Day', scope: 'since the previous close' },
    '15m': { label: '15m', scope: 'over the last 15 minutes' },
  },
  universes: {
    top50: { label: 'Top 50', hint: 'the 50 most-traded names today' },
    top100: { label: 'Top 100', hint: 'the 100 most-traded names today' },
    sp500: { label: 'S&P 500', hint: 'every S&P 500 stock plus the index ETFs' },
    all: { label: 'All', hint: 'the S&P 500 plus popular names outside it' },
    top20: { label: 'Top 20', hint: 'the 20 most-traded perpetuals' },
    top40: { label: 'Top 40', hint: 'the 40 most-traded perpetuals' },
    top80: { label: 'Top 80', hint: 'the 80 most-traded perpetuals' },
  },
  sectors: {
    us: {
      tech: 'Technology',
      comm: 'Communication',
      discretionary: 'Discretionary',
      staples: 'Staples',
      financials: 'Financials',
      health: 'Health Care',
      industrials: 'Industrials',
      energy: 'Energy',
      materials: 'Materials',
      utilities: 'Utilities',
      realestate: 'Real Estate',
      etf: 'Index ETFs',
      popular: 'Popular (non-S&P)',
    },
    crypto: {
      majors: 'Majors',
      l1: 'Layer 1',
      l2: 'Layer 2',
      defi: 'DeFi',
      meme: 'Memes',
      ai: 'AI',
      rwa: 'RWA & Oracles',
      exchange: 'Exchange',
      payments: 'Payments',
      other: 'Other',
    },
  },
  buildUp: {
    short: {
      LONG_BUILD: 'Long build-up',
      SHORT_COVER: 'Short covering',
      SHORT_BUILD: 'Short build-up',
      LONG_UNWIND: 'Long unwinding',
      ACCUMULATION: 'Heavy buying',
      DRIFT_UP: 'Quiet rise',
      DISTRIBUTION: 'Heavy selling',
      DRIFT_DOWN: 'Quiet dip',
      NEUTRAL: 'No new positions',
    },
    full: {
      LONG_BUILD: 'Long build-up',
      SHORT_COVER: 'Short covering',
      SHORT_BUILD: 'Short build-up',
      LONG_UNWIND: 'Long unwinding',
      ACCUMULATION: 'Bought on heavy volume',
      DRIFT_UP: 'Rising on light volume',
      DISTRIBUTION: 'Sold on heavy volume',
      DRIFT_DOWN: 'Falling on light volume',
      NEUTRAL: 'No change in participation',
    },
  },
  copyAi: 'Copy for AI',
  copyAiTitle: 'Copy the board as text for an AI chat',
  saveImage: 'Save image',
  saving: 'Saving…',
  toggleTheme: 'Toggle theme',
  searchPlaceholder: 'Search ticker  /',
  searchAria: 'Search a ticker or company',
  toastImageFail: 'Could not make the image in this browser. A screenshot works just as well.',
  toastCopied: 'Copied. Paste it into ChatGPT, Claude or any AI chat and ask your question.',
  toastClipboard: 'Your browser blocked the clipboard. Open /api/flow/{market}?format=text instead.',
  timesIn: 'times in {zone}',
  hint: 'Hover any line, tile or sector · click for the full reading · press / to search',
  demoTitle: 'simulated demo market',
  demoNoServerLead: 'This is the ',
  demoNoServerMid: '. For live ',
  demoNoServerUs: 'S&P 500',
  demoNoServerCrypto: 'crypto',
  demoNoServerTail: ' data, start the board with ',
  demoNoServerEnd: ' (see the README).',
  demoAskedLead: 'This is the ',
  demoAskedMid: ' (prices are made up). Remove ',
  demoAskedEnd: ' from the address for live data.',
  demoFailLead: 'This is the ',
  demoFailMid: ' because live data could not be loaded: ',
  demoFailEnd: '.',
  demoRunLead: 'This is the ',
  demoRunMid: ' (made-up prices). For live data, stop it and run ',
  demoRunEnd: '.',
  sessionLine: '{state}: {date}, {bars}',
  marketOpen: 'Market open',
  marketClosed: 'Market closed',
  liveSession: 'live session',
  lastSession: 'showing the last session',
  barsTo: 'bars to {time} {zone}',
  namesMeta: '{count} names · {updated}',
  updatedNow: 'updated just now',
  updatedMin: 'updated {min} min ago',
  optionWalls: 'option walls for {count}',
  live: 'Live',
  cryptoLine: '{source} · {count} perpetuals · trading 24/7',
  loadingSp: 'Loading the S&P 500',
  loadingProgress: '{loaded} of {total} names. The first start takes a minute or two; after that the board opens instantly.',
  loadingCrypto: 'Reading the most-traded perpetual futures…',
  loadingConnect: 'Connecting to the local server…',
  up: 'up',
  flat: 'flat',
  down: 'down',
  ofCount: 'of {count}',
  asOf: 'As of {time}',
  windowLine: '{label} window {scope}',
  leading: 'Leading',
  lagging: 'Lagging',
  spread: 'SPREAD OF THE {label}',
  beyond: '{count} beyond',
  sectorTip: '{label}: {up} up, {flat} flat, {down} down',
  now: 'now',
  bullishCount: '▲ BULLISH {count}',
  bearishCount: '▼ BEARISH {count}',
  rangeboundCount: 'Rangebound {count}',
  moreCount: '+{count} more',
  noneMoved: 'every name moved past ±{floor}%',
  moreBullish: 'more bullish',
  moreBearish: 'more bearish',
  benchmarkTitle: '{symbol}, the benchmark',
  convictionTip: '{held} of {counted} checks of conviction hold',
  sideBullish: 'Bullish',
  sideBearish: 'Bearish',
  sideRange: 'Rangebound',
  rankSideBull: 'bullish',
  rankSideBear: 'bearish',
  support: 'Support',
  zone: 'Zone',
  resistance: 'Resistance',
  puts: 'PUTS',
  calls: 'CALLS',
  noProfile: 'no profile',
  close: 'Close',
  detailAria: '{symbol} detail',
  ledeFlat: 'Moved less than ±{floor}% {scope}, so it sits on the zero bar.',
  ledeRank: '{buildUp} {scope}. Rank #{rank} of {count} {side}; {held} of {counted} checks of conviction hold.',
  whyRank: 'Why it ranks here',
  readings: 'Readings',
  statBuildUp: 'Build-up',
  statOi: 'Open interest',
  statFunding: 'Funding',
  statTaker: 'Taker buys',
  takerShare: '{pct}% of volume',
  statRvol: 'Relative volume',
  statCallPut: 'Call / put volume',
  statVolume: 'Volume (window)',
  statSupport: 'Support',
  statResistance: 'Resistance',
  statZone: 'Zone',
  statSector: 'Sector',
  legendSupportOptions: 'Support (put wall)',
  legendSupportVolume: 'Support (volume shelf)',
  legendResistanceOptions: 'Resistance (call wall)',
  legendResistanceVolume: 'Resistance (volume shelf)',
  legendSupport: 'Support',
  legendResistance: 'Resistance',
  legendZoneCrypto: 'Zone: where the most open interest was added with the move',
  legendZoneStock: 'Zone: where the most volume traded with the move',
  notAdvice: 'Readings, not advice.',
  checksWord: 'checks',
  levelLine: 'S {support} · R {resistance}',
  footerHowTitle: 'How to read it.',
  footerHow: 'Every name starts at 0% at the beginning of the window. Names going up rise above the zero line and run through the green tunnel; names going down fall below it through the red one; names that barely moved end on the middle bar.',
  footerHowCrypto: 'For crypto, the build-up label compares price with open interest (how many futures positions are open): long build-up = price up and new positions; short covering = price up as shorts close; short build-up = price down and new positions; long unwinding = price down as longs close.',
  footerHowStocks: 'For stocks, the build-up label compares the move with relative volume (today’s volume against what the stock normally trades by this time). Support and resistance are the strikes with the most option open interest: the put wall below, the call wall above.',
  footerData: 'Data:',
  footerDataCrypto: 'Binance, Bybit or OKX public market data; Deribit options for BTC and ETH.',
  footerDataStocks: 'Yahoo Finance 5-minute bars and Cboe delayed options, fetched by your local server. Prices can be a few minutes behind.',
  footerDisclaimer: 'For information only, not investment advice.',
  footerOss: 'Free and open source (MIT):',
  footerInspiredBefore: 'Board idea inspired by',
  footerInspiredAfter: ' by Mr. Chartist (Indian F&O).',
  sources: {},
  notes: {},
  reasons: {},
};

export const zh: Messages = {
  language: '语言',
  docTitle: 'Global Order Flow · 资金正在流向哪里',
  markets: { us: '美股', usLong: '美股', crypto: '加密货币', cryptoLong: '加密永续合约' },
  windows: {
    '24h': { label: '24小时', scope: '过去 24 小时' },
    '4h': { label: '4小时', scope: '过去 4 小时' },
    '1h': { label: '1小时', scope: '过去 1 小时' },
    day: { label: '当日', scope: '自前一收盘以来' },
    '15m': { label: '15分钟', scope: '过去 15 分钟' },
  },
  universes: {
    top50: { label: '前50', hint: '今日成交最活跃的 50 只' },
    top100: { label: '前100', hint: '今日成交最活跃的 100 只' },
    sp500: { label: '标普500', hint: '全部标普 500 成分股及指数 ETF' },
    all: { label: '全部', hint: '标普 500，加上指数外的热门标的' },
    top20: { label: '前20', hint: '成交最活跃的 20 个永续合约' },
    top40: { label: '前40', hint: '成交最活跃的 40 个永续合约' },
    top80: { label: '前80', hint: '成交最活跃的 80 个永续合约' },
  },
  sectors: {
    us: {
      tech: '科技',
      comm: '通信',
      discretionary: '可选消费',
      staples: '必需消费',
      financials: '金融',
      health: '医疗',
      industrials: '工业',
      energy: '能源',
      materials: '材料',
      utilities: '公用事业',
      realestate: '房地产',
      etf: '指数ETF',
      popular: '指数外热门',
    },
    crypto: {
      majors: '主流',
      l1: '一层',
      l2: '二层',
      defi: 'DeFi',
      meme: '模因',
      ai: 'AI',
      rwa: 'RWA',
      exchange: '交易所',
      payments: '支付',
      other: '其他',
    },
  },
  buildUp: {
    short: {
      LONG_BUILD: '多头增仓',
      SHORT_COVER: '空头回补',
      SHORT_BUILD: '空头增仓',
      LONG_UNWIND: '多头平仓',
      ACCUMULATION: '放量买入',
      DRIFT_UP: '缩量上涨',
      DISTRIBUTION: '放量卖出',
      DRIFT_DOWN: '缩量下跌',
      NEUTRAL: '无新仓',
    },
    full: {
      LONG_BUILD: '多头增仓',
      SHORT_COVER: '空头回补',
      SHORT_BUILD: '空头增仓',
      LONG_UNWIND: '多头平仓',
      ACCUMULATION: '放量买入',
      DRIFT_UP: '缩量上涨',
      DISTRIBUTION: '放量卖出',
      DRIFT_DOWN: '缩量下跌',
      NEUTRAL: '参与度不变',
    },
  },
  copyAi: '复制给 AI',
  copyAiTitle: '把看板复制成文本，粘贴到 AI 对话',
  saveImage: '保存图片',
  saving: '保存中…',
  toggleTheme: '切换主题',
  searchPlaceholder: '搜索代码  /',
  searchAria: '搜索代码或公司',
  toastImageFail: '当前浏览器无法生成图片。截图同样可用。',
  toastCopied: '已复制。粘贴到 ChatGPT、Claude 或任意 AI 对话里再提问。这份简报是英文，方便模型阅读。',
  toastClipboard: '浏览器拦截了剪贴板。请改为打开 /api/flow/{market}?format=text。',
  timesIn: '时间为 {zone}',
  hint: '悬停线条、卡片或板块 · 点击查看完整解读 · 按 / 搜索',
  demoTitle: '模拟行情',
  demoNoServerLead: '这是',
  demoNoServerMid: '。要看实时的',
  demoNoServerUs: '标普 500 ',
  demoNoServerCrypto: '加密货币',
  demoNoServerTail: '数据，请用 ',
  demoNoServerEnd: ' 启动看板（见 README）。',
  demoAskedLead: '这是',
  demoAskedMid: '（价格为虚构）。去掉地址中的 ',
  demoAskedEnd: ' 即可查看实时数据。',
  demoFailLead: '这是',
  demoFailMid: '，因为实时数据未能载入：',
  demoFailEnd: '。',
  demoRunLead: '这是',
  demoRunMid: '（虚构价格）。要看实时数据，请先停掉，再运行 ',
  demoRunEnd: '。',
  sessionLine: '{state}：{date}，{bars}',
  marketOpen: '市场开盘',
  marketClosed: '市场休市',
  liveSession: '当前交易时段',
  lastSession: '显示上一交易时段',
  barsTo: 'K 线截至 {time} {zone}',
  namesMeta: '{count} 只标的 · {updated}',
  updatedNow: '刚刚更新',
  updatedMin: '{min} 分钟前更新',
  optionWalls: '期权墙覆盖 {count} 只',
  live: '实时',
  cryptoLine: '{source} · {count} 个永续合约 · 全天交易',
  loadingSp: '正在加载标普 500',
  loadingProgress: '已加载 {loaded} / {total}。首次启动需要一两分钟，之后会立即打开。',
  loadingCrypto: '正在读取成交最活跃的永续合约…',
  loadingConnect: '正在连接本地服务…',
  up: '上涨',
  flat: '持平',
  down: '下跌',
  ofCount: '· 共 {count}',
  asOf: '截至 {time}',
  windowLine: '{label}窗口 · {scope}',
  leading: '领涨',
  lagging: '落后',
  spread: '{label}涨跌分布',
  beyond: '{count} 超出',
  sectorTip: '{label}：{up} 上涨，{flat} 持平，{down} 下跌',
  now: '现在',
  bullishCount: '▲ 看涨 {count}',
  bearishCount: '▼ 看跌 {count}',
  rangeboundCount: '区间震荡 {count}',
  moreCount: '另有 {count}',
  noneMoved: '所有标的涨跌都超过 ±{floor}%',
  moreBullish: '更多看涨',
  moreBearish: '更多看跌',
  benchmarkTitle: '{symbol}，基准',
  convictionTip: '{counted} 项确信检查中有 {held} 项成立',
  sideBullish: '看涨',
  sideBearish: '看跌',
  sideRange: '区间震荡',
  rankSideBull: '看涨',
  rankSideBear: '看跌',
  support: '支撑',
  zone: '区间',
  resistance: '阻力',
  puts: '认沽',
  calls: '认购',
  noProfile: '暂无分布',
  close: '关闭',
  detailAria: '{symbol} 详情',
  ledeFlat: '在{scope}内涨跌不足 ±{floor}%，因此落在零轴。',
  ledeRank: '{buildUp}，{scope}。在 {count} 只{side}标的中排名第 {rank}；{counted} 项确信检查里有 {held} 项成立。',
  whyRank: '为何排在这里',
  readings: '读数',
  statBuildUp: '增减仓',
  statOi: '未平仓量',
  statFunding: '资金费率',
  statTaker: '主动买入',
  takerShare: '占成交量 {pct}%',
  statRvol: '相对成交量',
  statCallPut: '认购/认沽成交量',
  statVolume: '成交量（窗口）',
  statSupport: '支撑',
  statResistance: '阻力',
  statZone: '区间',
  statSector: '板块',
  legendSupportOptions: '支撑（认沽墙）',
  legendSupportVolume: '支撑（成交密集区）',
  legendResistanceOptions: '阻力（认购墙）',
  legendResistanceVolume: '阻力（成交密集区）',
  legendSupport: '支撑',
  legendResistance: '阻力',
  legendZoneCrypto: '区间：顺向变动时新增未平仓量最多的一段',
  legendZoneStock: '区间：顺向变动时成交最多的一段',
  notAdvice: '以上为解读，不构成建议。',
  checksWord: '项检查',
  levelLine: '支撑 {support} · 阻力 {resistance}',
  footerHowTitle: '怎么读。',
  footerHow: '每只标的在窗口起点都是 0%。上涨的从零轴上方穿过绿色通道；下跌的从零轴下方穿过红色通道；几乎没动的停在中间那条上。',
  footerHowCrypto: '加密货币的增减仓，是把价格和未平仓量（还有多少期货仓位开着）放在一起看：多头增仓 = 价格上涨且新开仓；空头回补 = 价格上涨是因为空头平仓；空头增仓 = 价格下跌且新开仓；多头平仓 = 价格下跌是因为多头离场。',
  footerHowStocks: '股票没有对应的个股期货，所以增减仓比较的是相对成交量（今天的成交量，相对于这只股票通常到这个钟点会有的成交量）。支撑和阻力取未平仓量最大的期权行权价：下方是认沽墙，上方是认购墙。',
  footerData: '数据：',
  footerDataCrypto: '币安、Bybit 或 OKX 的公开行情；BTC 与 ETH 使用 Deribit 期权。',
  footerDataStocks: '由你的本地服务抓取的 Yahoo Finance 5 分钟 K 线，以及 Cboe 延迟期权。价格可能晚几分钟。',
  footerDisclaimer: '仅供参考，不构成投资建议。',
  footerOss: '免费开源（MIT）：',
  footerInspiredBefore: '看板思路来自',
  footerInspiredAfter: '，作者 Mr. Chartist（印度期货期权）。',
  sources: {
    'Demo market': '模拟市场',
    'Demo session': '模拟行情',
    'Binance perps': '币安永续',
    'Bybit perps': 'Bybit 永续',
    'Gate.io perps': 'Gate.io 永续',
  },
  notes: {
    'simulated prices': '模拟价格',
    'Yahoo Finance 5-min bars · Cboe options': 'Yahoo Finance 5 分钟 K 线 · Cboe 期权',
  },
  reasons: {
    'the server could not load this market': '服务器未能载入这个市场',
    'the US board is turned off in the settings': '设置里关闭了美股看板',
    'the crypto board is turned off in the settings': '设置里关闭了加密看板',
    'no source': '没有数据源',
    'demo mode (simulated prices)': '演示模式（模拟价格）',
  },
};
