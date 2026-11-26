import { describe, expect, it } from 'vitest';
import { US_SECTORS } from '../data/sectors';
import { CRYPTO_SECTORS } from '../data/universe';
import { BUILDUPS, windowDef, WINDOWS, type Check, type Flow, type FlowAsset } from '../model/flow';
import { UNIVERSES } from '../model/universe';
import { SHORT_BUILDUP } from '../ui/format';
import { buildUpText, displayCheck, explainReason, namedNote, namedSource, sectorName } from './display';
import { fill, initialLang } from './lang';
import { en, zh } from './messages';

describe('language choice', () => {
  it('prefers an explicit query, then a saved choice, then a Chinese browser', () => {
    expect(initialLang({ query: 'zh-CN', saved: 'en', languages: ['en-US'] })).toBe('zh');
    expect(initialLang({ query: 'en', saved: 'zh', languages: ['zh-CN'] })).toBe('en');
    expect(initialLang({ query: null, saved: 'zh', languages: ['en-US'] })).toBe('zh');
    expect(initialLang({ query: null, saved: null, languages: ['zh-Hans', 'en'] })).toBe('zh');
    expect(initialLang({ query: null, saved: null, languages: ['en-US', 'zh-CN'] })).toBe('en');
    expect(initialLang({ query: null, saved: null, languages: ['zh-CN'] })).toBe('zh');
    expect(initialLang({ query: 'nope', saved: null, languages: [] })).toBe('en');
  });
});

describe('English catalog matches the model', () => {
  it('keeps window, universe, sector and build-up words aligned', () => {
    for (const market of ['us', 'crypto'] as const) {
      for (const w of WINDOWS[market]) {
        expect(en.windows[w.id].label).toBe(w.label);
        expect(en.windows[w.id].scope).toBe(w.scope);
      }
      for (const u of UNIVERSES[market]) {
        expect(en.universes[u.id].label).toBe(u.label);
        expect(en.universes[u.id].hint).toBe(u.hint);
      }
    }
    expect(en.windows['15m'].scope).toBe(windowDef('us', '15m').scope);
    for (const s of US_SECTORS) expect(en.sectors.us[s.id]).toBe(s.label);
    for (const s of CRYPTO_SECTORS) expect(en.sectors.crypto[s.id]).toBe(s.label);
    for (const code of Object.keys(BUILDUPS) as Array<keyof typeof BUILDUPS>) {
      expect(en.buildUp.full[code]).toBe(BUILDUPS[code].label);
      expect(en.buildUp.short[code]).toBe(SHORT_BUILDUP[code]);
    }
  });
});

describe('status sentences', () => {
  it('keeps the closed-market line and its Chinese version', () => {
    const closed = fill(en.sessionLine, {
      state: en.lastSession,
      date: 'Wed, Nov 25',
      bars: fill(en.barsTo, { time: '16:00', zone: 'EST' }),
    });
    expect(closed).toBe('showing the last session: Wed, Nov 25, bars to 16:00 EST');
    expect(`${en.marketClosed} ${closed}`).toContain('Market closed');
    const zhClosed = fill(zh.sessionLine, {
      state: zh.lastSession,
      date: '11月25日',
      bars: fill(zh.barsTo, { time: '16:00', zone: 'EST' }),
    });
    expect(zhClosed).toBe('显示上一交易时段：11月25日，K 线截至 16:00 EST');
    expect(zh.marketClosed).toBe('市场休市');
  });
});

describe('Chinese display', () => {
  const asset = { sector: 'tech', sectorLabel: 'Technology', side: 'bullish', changePct: 1.2 } as FlowAsset;
  const flow = { market: 'us', window: windowDef('us', 'day'), benchmark: { symbol: 'SPY' } } as Flow;

  it('leaves model sentences untouched in English and translates the same numbers', () => {
    const check: Check = {
      id: 'fresh', label: 'Heavy volume behind the move', pass: true,
      note: 'volume at 1.80× its usual pace for this time of day',
    };
    expect(displayCheck(check, asset, flow, en, 'en')).toEqual({ label: check.label, note: check.note });
    expect(displayCheck(check, asset, flow, zh, 'zh')).toEqual({
      label: '放量推动这次变动',
      note: '成交量是该时段常态的 1.80 倍',
    });
    expect(check.note).toBe('volume at 1.80× its usual pace for this time of day');
  });

  it('translates sector names, build-up and known sources without inventing unknown ones', () => {
    expect(sectorName('us', 'utilities', 'Utilities', zh, 'zh')).toBe('公用事业');
    expect(sectorName('us', 'utilities', 'Utilities', en, 'en')).toBe('Utilities');
    expect(sectorName('crypto', 'missing', 'Other', zh, 'zh')).toBe('Other');
    expect(buildUpText('ACCUMULATION', 'Bought on heavy volume', 'short', zh, 'zh')).toBe('放量买入');
    expect(buildUpText('ACCUMULATION', 'Bought on heavy volume', 'full', en, 'en')).toBe('Bought on heavy volume');
    expect(namedSource('Binance perps', zh, 'zh')).toBe('币安永续');
    expect(namedSource('A new venue', zh, 'zh')).toBe('A new venue');
    expect(namedNote('simulated prices', zh, 'zh')).toBe('模拟价格');
    expect(explainReason('the US board is turned off in the settings', zh, 'zh')).toBe('设置里关闭了美股看板');
    expect(explainReason('Yahoo Finance is not answering from this network (timeout).', zh, 'zh')).toBe('当前网络连不上 Yahoo Finance，将定期重试');
    expect(explainReason('something new failed.', en, 'en')).toBe('something new failed');
  });

  it('translates a sector check with the sector id, keeping the median figure', () => {
    const check: Check = { id: 'sector', label: 'The sector agrees', pass: true, note: 'Technology median +0.42%' };
    expect(displayCheck(check, asset, flow, zh, 'zh').note).toBe('科技 中位数 +0.42%');
    const market: Check = { id: 'market', label: 'SPY moves the same way', pass: true, note: 'SPY +0.15% since the previous close' };
    expect(displayCheck(market, asset, flow, zh, 'zh')).toEqual({ label: 'SPY 同向变动', note: 'SPY +0.15%，自前一收盘以来' });
  });
});
