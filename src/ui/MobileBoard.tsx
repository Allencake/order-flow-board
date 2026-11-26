import type { Flow, FlowAsset } from '../model/flow';
import { fill } from '../i18n/lang';
import { useI18n } from '../i18n/LocaleContext';
import { buildUpText, namedSource, pick, sectorName } from '../i18n/display';
import { chartScale, thin } from './geometry';
import { Candles } from './Candles';
import { clock, price, signedPct } from './format';

interface Props {
  flow: Flow;
  onPick: (symbol: string) => void;
  timeZone?: string;
}

const sideClass = (a: FlowAsset) => (a.side === 'bullish' ? 'bull' : a.side === 'bearish' ? 'bear' : 'flat');

/** The phone layout: the same readings, stacked. */
export function MobileBoard({ flow, onPick, timeZone }: Props) {
  const { lang, m } = useI18n();
  const winLabel = pick(flow.window.label, m.windows[flow.window.id].label, lang);
  return (
    <div className="mobile">
      <div className="m-status">
        <span className={`src${flow.live ? ' live' : ''}`}><i />{namedSource(flow.source, m, lang)}</span>
        <span><b className="bull">{flow.bullish.length} {m.up}</b> · {flow.rangebound.length} {m.flat} · <b className="bear">{flow.bearish.length} {m.down}</b></span>
        <span className="muted">{clock(flow.asOf, timeZone)} · {winLabel}</span>
      </div>
      <MiniChart flow={flow} />
      <div className="m-sectors">
        {flow.sectors.map(s => (
          <span key={s.id} className={`m-sector ${s.lean === 'bullish' ? 'bull' : s.lean === 'bearish' ? 'bear' : 'flat'}`}>{sectorName(flow.market, s.id, s.label, m, lang)} <b>{signedPct(s.changePct, 1)}</b></span>
        ))}
      </div>
      {(['bullish', 'bearish'] as const).map(side => (
        <section key={side} className={`m-side ${side === 'bullish' ? 'bull' : 'bear'}`}>
          <h2>{side === 'bullish' ? `▲ ${m.sideBullish}` : `▼ ${m.sideBearish}`} <span>{flow[side].length}</span></h2>
          {flow.featured[side].map(a => (
            <button key={a.symbol} className={`m-card ${sideClass(a)}`} onClick={() => onPick(a.symbol)}>
              <span className="l">
                <b>{a.symbol}</b> <span className="nm">{a.name}</span>
                <span className="pct">{signedPct(a.changePct)}</span>
                <span className="bu">{buildUpText(a.buildUp.code, a.buildUp.label, 'full', m, lang)} · {a.checksHeld}/{a.checksCounted} {m.checksWord}</span>
                <span className="lv">{fill(m.levelLine, { support: a.support ? price(a.support.price) : '—', resistance: a.resistance ? price(a.resistance.price) : '—' })}</span>
              </span>
              <Candles candles={a.candles} width={110} height={64} max={28} support={a.support} resistance={a.resistance} zone={a.zone} className="mini" />
            </button>
          ))}
          <div className="m-tiles">
            {flow[side].filter(a => !flow.featured[side].includes(a)).map(a => (
              <button key={a.symbol} className={`m-tile ${sideClass(a)}`} onClick={() => onPick(a.symbol)}>
                <b>{a.isBenchmark ? '◆ ' : ''}{a.symbol}</b><span className="pct">{signedPct(a.changePct)}</span>
                <span className="bu">{buildUpText(a.buildUp.code, a.buildUp.label, 'short', m, lang)}</span>
              </button>
            ))}
          </div>
          {side === 'bullish' && flow.rangebound.length > 0 && (
            <div className="m-flat">
              <span className="cap">{m.sideRange}</span>
              {flow.rangebound.map(a => <button key={a.symbol} className="chip" onClick={() => onPick(a.symbol)}>{a.symbol} <span>{signedPct(a.changePct, 1)}</span></button>)}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

function MiniChart({ flow }: { flow: Flow }) {
  const w = 360;
  const h = 200;
  const s = chartScale(flow);
  const y = (pct: number) => h / 2 - (pct / s.max) * (h / 2 - 6);
  const x = (t: number) => ((t - flow.start) / Math.max(1, flow.end - flow.start)) * (w - 6);
  const named = new Set([...flow.bullish.slice(0, 3), ...flow.bearish.slice(0, 3)].map(a => a.symbol));
  const list = [...flow.assets].sort((a, b) => Number(named.has(a.symbol) || a.isBenchmark) - Number(named.has(b.symbol) || b.isBenchmark));
  return (
    <svg className="m-chart" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <line className="zero" x1={0} x2={w} y1={h / 2} y2={h / 2} />
      {list.map(a => (
        <path key={a.symbol} className={a.isBenchmark ? 'ln bench' : `ln ${sideClass(a)}${named.has(a.symbol) ? ' named' : ''}`}
          d={thin(a.points, 70).map((p, i) => `${i ? 'L' : 'M'}${x(p.t).toFixed(1)},${y(p.pct).toFixed(1)}`).join('')} />
      ))}
    </svg>
  );
}
