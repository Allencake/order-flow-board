import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState, type ReactNode } from 'react';
import { LANG_KEY, queryRequestsLang, readInitialLang, readQueryLang, type Lang } from './lang';
import { en, zh, type Messages } from './messages';

interface I18n {
  lang: Lang;
  setLang: (lang: Lang) => void;
  m: Messages;
}

const LocaleContext = createContext<I18n>({ lang: 'en', setLang: () => {}, m: en });

const write = (lang: Lang) => { try { localStorage.setItem(LANG_KEY, lang); } catch { /* private mode */ } };

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const initial = readInitialLang();
    if (queryRequestsLang(readQueryLang())) write(initial);
    return initial;
  });
  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    write(next);
    // A ?lang= link would otherwise win over the toggle on the next load.
    try {
      const q = new URLSearchParams(location.search);
      if (!q.has('lang')) return;
      q.set('lang', next);
      history.replaceState(null, '', `${location.pathname}?${q.toString()}`);
    } catch { /* no history */ }
  }, []);
  useLayoutEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = (lang === 'zh' ? zh : en).docTitle;
  }, [lang]);
  const value = useMemo<I18n>(() => ({ lang, setLang, m: lang === 'zh' ? zh : en }), [lang, setLang]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useI18n() {
  return useContext(LocaleContext);
}
