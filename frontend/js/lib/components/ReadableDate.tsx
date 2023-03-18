import { Text, TextProps } from "@chakra-ui/react";
import { format } from "date-fns";
import { ReactElement, useContext } from "react";

import { LocaleContext } from "@lib/contexts/LocaleContext";

export interface ReadableDateProps extends TextProps {
  date: Date;
  dateFormat: string;
}

export const ReadableDate = ({ date, dateFormat, ...props }: ReadableDateProps): ReactElement => {
  const localeContext = useContext(LocaleContext)!;

  const formatDate = (): string => {
    return format(date, dateFormat, { locale: localeContext.locale.tz });
  };

  return (
    <Text className="current-date" align="left" {...props}>
      {formatDate()}
    </Text>
  );
};
