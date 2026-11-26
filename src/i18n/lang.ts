export type Lang = 'en' | 'zh';

export const LANG_KEY = 'gof.lang';

/** Query param, then a saved choice, then a Chinese browser, otherwise English. */
export function initialLang(input: { query: string | null; saved: string | null; languages: readonly string[] }): Lang {
  const q = (input.query ?? '').trim().toLowerCase();
  if (q === 'zh' || q === 'zh-cn' || q === 'zh-hans' || q === 'cn') return 'zh';
  if (q === 'en' || q === 'en-us' || q === 'en-gb') return 'en';
  if (input.saved === 'zh' || input.saved === 'en') return input.saved;
  if (/^zh\b/i.test(input.languages[0] ?? '')) return 'zh';
  return 'en';
}

export function queryRequestsLang(query: string | null): boolean {
  const q = (query ?? '').trim().toLowerCase();
  return q === 'zh' || q === 'zh-cn' || q === 'zh-hans' || q === 'cn' || q === 'en' || q === 'en-us' || q === 'en-gb';
}

export function readInitialLang(): Lang {
  let query: string | null = null;
  let saved: string | null = null;
  let languages: readonly string[] = [];
  try { query = new URLSearchParams(location.search).get('lang'); } catch { /* no location */ }
  try { saved = localStorage.getItem(LANG_KEY); } catch { /* private mode */ }
  try {
    languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  } catch { languages = []; }
  return initialLang({ query, saved, languages });
}

export function readQueryLang(): string | null {
  try { return new URLSearchParams(location.search).get('lang'); } catch { return null; }
}

export const fill = (template: string, vars: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => (vars[key] == null ? '' : String(vars[key])));
