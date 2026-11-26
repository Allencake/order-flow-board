import type { Check, Flow, FlowAsset, WindowId } from '../model/flow';
import { windowDef } from '../model/flow';
import type { MarketId } from '../data/types';
import { SHORT_BUILDUP } from '../ui/format';
import type { Lang } from './lang';
import type { Messages } from './messages';

/** English stays on the model's own words. Chinese replaces them at render time. */
export function pick(english: string, translated: string | undefined, lang: Lang): string {
  return lang === 'zh' ? (translated || english) : english;
}

export function sectorName(market: MarketId, id: string, fallback: string, m: Messages, lang: Lang): string {
  if (lang !== 'zh') return fallback;
  return m.sectors[market][id] ?? fallback;
}

export function buildUpText(code: string, english: string, variant: 'short' | 'full', m: Messages, lang: Lang): string {
  if (lang !== 'zh') return variant === 'short' ? (SHORT_BUILDUP[code] ?? english) : english;
  const table = variant === 'short' ? m.buildUp.short : m.buildUp.full;
  return table[code as keyof typeof table] ?? english;
}

export function namedSource(source: string, m: Messages, lang: Lang): string {
  if (lang !== 'zh') return source;
  return m.sources[source] ?? source;
}

export function namedNote(note: string | undefined, m: Messages, lang: Lang): string | undefined {
  if (!note || lang !== 'zh') return note;
  return m.notes[note] ?? note;
}

/** Known server reasons. Anything else is shown unchanged, in the language it arrived in. */
export function explainReason(reason: string, m: Messages, lang: Lang): string {
  const trimmed = reason.replace(/\.+$/, '');
  if (lang !== 'zh') return trimmed;
  if (m.reasons[trimmed]) return m.reasons[trimmed];
  if (trimmed.startsWith('the exchanges are not reachable from this network')) {
    const inner = trimmed.slice('the exchanges are not reachable from this network'.length).trim().replace(/^\(/, '').replace(/\)$/, '');
    return inner ? `当前网络连不上交易所（${inner}）` : '当前网络连不上交易所';
  }
  if (trimmed.startsWith('Yahoo Finance is not answering')) return '当前网络连不上 Yahoo Finance，将定期重试';
  return trimmed;
}

const CONFIRM_ZH: Record<WindowId, string> = {
  '1h': '过去 1 小时',
  '15m': '过去 15 分钟',
  '24h': '过去 24 小时',
  '4h': '过去 4 小时',
  day: '当日',
};

function stripTail(note: string, tail: string): string | null {
  const mark = ` ${tail}`;
  return note.endsWith(mark) ? note.slice(0, note.length - mark.length) : null;
}

/**
 * Check sentences are built in English by the model (and stay English in the API).
 * The Chinese board reuses the numbers already inside those sentences.
 */
export function displayCheck(c: Check, a: FlowAsset, flow: Flow, m: Messages, lang: Lang): { label: string; note: string } {
  if (lang !== 'zh') return { label: c.label, note: c.note };
  const dir = a.side === 'bearish' || (a.side === 'rangebound' && a.changePct < 0) ? 'bearish' : 'bullish';
  const zhScope = (id: WindowId) => m.windows[id]?.scope ?? windowDef(flow.market, id).scope;

  if (c.id === 'fresh') {
    if (flow.market === 'crypto') {
      const label = '价格变动伴随新开仓';
      if (c.note === 'no open interest history from the venue') return { label, note: '交易所没有未平仓量历史' };
      const match = c.note.match(/^open interest (.+) with price (.+)$/);
      return { label, note: match ? `未平仓量 ${match[1]}，价格 ${match[2]}` : c.note };
    }
    const label = '放量推动这次变动';
    if (c.note === 'no volume history to compare with') return { label, note: '没有成交量历史可供比较' };
    const match = c.note.match(/^volume at (.+?)× its usual pace for this time of day$/);
    return { label, note: match ? `成交量是该时段常态的 ${match[1]} 倍` : c.note };
  }

  if (c.id === 'confirm') {
    const label = `${CONFIRM_ZH[flow.window.confirm] ?? flow.window.confirm}方向一致`;
    if (c.note === 'not enough bars yet') return { label, note: 'K 线还不够' };
    const head = stripTail(c.note, windowDef(flow.market, flow.window.confirm).scope);
    return { label, note: head == null ? c.note : `${head}，${zhScope(flow.window.confirm)}` };
  }

  if (c.id === 'flow') {
    if (flow.market === 'crypto') {
      const label = dir === 'bullish' ? '主动买方占优' : '主动卖方占优';
      if (c.note === 'this venue does not report taker volume') return { label, note: '该交易所不提供主动成交量' };
      const match = c.note.match(/^(.+) of volume was market buys$/);
      return { label, note: match ? `成交量中有 ${match[1]} 为主动买入` : c.note };
    }
    const label = '期权交易者方向一致';
    if (c.note === 'no options volume for this name') return { label, note: '该标的没有期权成交量' };
    const match = c.note.match(/^call\/put volume (.+) against a board median of (.+)$/);
    return { label, note: match ? `认购/认沽成交量 ${match[1]}，看板中位数 ${match[2]}` : c.note };
  }

  if (c.id === 'market') {
    const bench = c.label.endsWith(' moves the same way') ? c.label.slice(0, -' moves the same way'.length) : (flow.benchmark?.symbol ?? '');
    const label = `${bench} 同向变动`;
    if (c.note === 'this is the benchmark') return { label, note: '这是基准' };
    const missing = c.note.match(/^(.+) is not on the board$/);
    if (missing) return { label, note: `${missing[1]} 不在看板上` };
    const head = stripTail(c.note, flow.window.scope);
    return { label, note: head == null ? c.note : `${head}，${zhScope(flow.window.id)}` };
  }

  if (c.id === 'sector') {
    const label = '所属板块方向一致';
    if (c.note === 'too few names in the sector to say') return { label, note: '板块内标的太少，无法判断' };
    const match = c.note.match(/^(.+) median (.+)$/);
    const name = sectorName(flow.market, a.sector, a.sectorLabel, m, lang);
    return { label, note: match ? `${name} 中位数 ${match[2]}` : c.note };
  }

  return { label: c.label, note: c.note };
}
