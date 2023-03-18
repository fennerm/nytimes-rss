import { Locale } from "date-fns";
import { enUS, es } from "date-fns/locale";
import { ReactElement, ReactNode, createContext, useState } from "react";

export const ENG = "ENG";
export const ESP = "ESP";

export type SupportedLocale = typeof ENG | typeof ESP;

export interface LocaleInterface {
  name: string;
  readonly tz: Locale;
}

export interface LocaleContextInterface {
  readonly locale: LocaleInterface;
  readonly updateLocale: (locale: SupportedLocale) => void;
}

export const LOCALE_TZ = new Map<SupportedLocale, Locale>([
  ["ENG", enUS],
  ["ESP", es],
]);

export const LocaleContext = createContext<LocaleContextInterface | null>(null);

export const LocaleContextProvider = ({
  children,
}: {
  readonly children?: ReactNode;
}): ReactElement => {
  const [locale, setLocale] = useState<LocaleInterface>({ name: "ENG", tz: enUS });

  const updateLocale = (localeName: SupportedLocale): void => {
    setLocale({ name: localeName, tz: LOCALE_TZ.get(localeName)! });
  };

  const value = {
    locale,
    updateLocale,
  };
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};
