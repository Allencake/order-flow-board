import { useEffect, useRef } from 'react';
import type { Flow, FlowAsset } from '../model/flow';
import { fill } from '../i18n/lang';
import { useI18n } from '../i18n/LocaleContext';
import { buildUpText, displayCheck, namedNote, namedSource, pick, sectorName } from '../i18n/display';
import { Candles } from './Candles';
import { compact, compactUsd, price, signedPct, signedPrice } from './format';

interface Props {
  flow: Flow;
  asset: FlowAsset;
  onClose: () => void;
  timeZone?: string;
}

export function Detail({ flow, asset: a, onClose, timeZone }: Props) {
  const { lang, m } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const key = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', key);
    ref.current?.focus();
    return () => window.removeEventListener('keydown', key);
  }, [onClose]);

  const sc = a.side === 'bullish' ? 'bull' : a.side === 'bearish' ? 'bear' : 'flat';
  const isCrypto = flow.market === 'crypto';
  const sideWord = a.side === 'bullish' ? m.sideBullish : a.side === 'bearish' ? m.sideBearish : m.sideRange;
  const levelKind = a.support?.kind ?? a.resistance?.kind;
  const scope = pick(flow.window.scope, m.windows[flow.window.id].scope, lang);
  const buildUp = buildUpText(a.buildUp.code, a.buildUp.label, 'full', m, lang);
  const sector = sectorName(flow.market, a.sector, a.sectorLabel, m, lang);
  const supportLegend = levelKind === 'options' ? m.legendSupportOptions : levelKind === 'volume' ? m.legendSupportVolume : m.legendSupport;
  const resistanceLegend = levelKind === 'options' ? m.legendResistanceOptions : levelKind === 'volume' ? m.legendResistanceVolume : m.legendResistance;
  const note = namedNote(flow.note, m, lang);
  const rankSide = a.side === 'bearish' ? m.rankSideBear : m.rankSideBull;

  return (
    <div className="overlay" onClick={onClose}>
      <div className={`detail side-${sc}`} role="dialog" aria-label={fill(m.detailAria, { symbol: a.symbol })} tabIndex={-1} ref={ref} onClick={e => e.stopPropagation()}>
        <header>
          <div className="id">
            <h2>{a.symbol}</h2>
            <span className="nm">{a.name} · {sector}</span>
          </div>
          <div className="quote">
            <span className="pct">{signedPct(a.changePct)}</span>
            <span className="px">{price(a.price)} <em>{signedPrice(a.price - a.base)}</em></span>
          </div>
          <span className={`badge ${sc}`}>{sideWord}</span>
          <button className="close" onClick={onClose} aria-label={m.close}>×</button>
        </header>

        <p className="lede">
          {a.side === 'rangebound'
            ? fill(m.ledeFlat, { floor: flow.window.floor, scope })
            : <RankSentence template={m.ledeRank} buildUp={buildUp} scope={scope} rank={a.rank} count={a.side === 'bullish' ? flow.bullish.length : flow.bearish.length} side={rankSide} held={a.checksHeld} counted={a.checksCounted} />}
        </p>

        <div className="chartbox">
          <Candles candles={a.candles} width={700} height={250} max={96} support={a.support} resistance={a.resistance} zone={a.zone} detailed timeZone={timeZone} />
          <div className="legend">
            <span><i className="sw sup" />{supportLegend}</span>
            <span><i className="sw res" />{resistanceLegend}</span>
            {a.zone && <span><i className="sw zone" />{isCrypto ? m.legendZoneCrypto : m.legendZoneStock}</span>}
          </div>
        </div>

        <div className="cols">
          <section>
            <h3>{m.whyRank}</h3>
            <ul className="checks">
              {a.checks.map(c => {
                const shown = displayCheck(c, a, flow, m, lang);
                return (
                  <li key={c.id} className={c.pass == null ? 'na' : c.pass ? 'ok' : 'no'}>
                    <i>{c.pass == null ? '–' : c.pass ? '✓' : '✕'}</i>
                    <div><b>{shown.label}</b><span>{shown.note}</span></div>
                  </li>
                );
              })}
            </ul>
          </section>
          <section>
            <h3>{m.readings}</h3>
            <dl className="stats">
              <dt>{m.statBuildUp}</dt><dd>{buildUp}</dd>
              {isCrypto ? <>
                <dt>{m.statOi}</dt><dd>{compactUsd(a.oiValue)} <em>{signedPct(a.oiChangePct)}</em></dd>
                <dt>{m.statFunding}</dt><dd>{a.funding == null ? '—' : `${(a.funding * 100).toFixed(4)}%`}</dd>
                <dt>{m.statTaker}</dt><dd>{a.takerBuyShare == null ? '—' : fill(m.takerShare, { pct: (a.takerBuyShare * 100).toFixed(1) })}</dd>
              </> : <>
                <dt>{m.statRvol}</dt><dd>{a.rvol == null ? '—' : `${a.rvol.toFixed(2)}×`}</dd>
                <dt>{m.statCallPut}</dt><dd>{a.callPutRatio == null ? '—' : a.callPutRatio.toFixed(2)}</dd>
                <dt>{m.statVolume}</dt><dd>{compact(a.candles.reduce((s, c) => s + c.v, 0))}</dd>
              </>}
              <dt>{m.statSupport}</dt><dd>{a.support ? <>{price(a.support.price)} <em>{signedPct(a.support.distancePct)}</em></> : '—'}</dd>
              <dt>{m.statResistance}</dt><dd>{a.resistance ? <>{price(a.resistance.price)} <em>{signedPct(a.resistance.distancePct)}</em></> : '—'}</dd>
              <dt>{m.statZone}</dt><dd>{a.zone ? `${price(a.zone.low)} – ${price(a.zone.high)}` : '—'}</dd>
              <dt>{m.statSector}</dt><dd>{sector}</dd>
            </dl>
          </section>
        </div>
        <footer>{m.notAdvice} {namedSource(flow.source, m, lang)}{note ? ` · ${note}` : ''}.</footer>
      </div>
    </div>
  );
}

/** Keeps the rank and the check count bold, the way the English sentence did. */
function RankSentence({ template, buildUp, scope, rank, count, side, held, counted }: { template: string; buildUp: string; scope: string; rank: number | null; count: number; side: string; held: number; counted: number }) {
  const text = fill(template, { buildUp, scope, rank: rank ?? '', count, side, held, counted });
  const rankMark = `#${rank ?? ''}`;
  const heldMark = `${held} of ${counted}`;
  const rankAt = text.indexOf(rankMark);
  const heldAt = text.indexOf(heldMark);
  if (rankAt < 0 || heldAt < 0 || heldAt < rankAt) return <>{text}</>;
  return (
    <>
      {text.slice(0, rankAt)}<b>{rankMark}</b>{text.slice(rankAt + rankMark.length, heldAt)}<b>{heldMark}</b>{text.slice(heldAt + heldMark.length)}
    </>
  );
}
