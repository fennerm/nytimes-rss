import { Flex, FlexProps, Link } from "@chakra-ui/react";
import { Fragment, ReactElement, useContext } from "react";

import { LOCALE_TZ, LocaleContext } from "@lib/contexts/LocaleContext";

export const LocalePicker = (props: FlexProps): ReactElement => {
  const localeContext = useContext(LocaleContext)!;

  return (
    <Flex className="locale-picker" align="right" {...props}>
      {Array.from(LOCALE_TZ).map(([localeName, _], i) => {
        return (
          <Fragment key={localeName}>
            <Link
              onClick={(_) => localeContext.updateLocale(localeName)}
              fontWeight={localeName === localeContext.locale.name ? "extrabold" : "normal"}
            >
              {localeName}
            </Link>
            {i < LOCALE_TZ.size - 1 && (
              <span>
                {"\u00A0"}\{"\u00A0"}
              </span>
            )}
          </Fragment>
        );
      })}
    </Flex>
  );
};
