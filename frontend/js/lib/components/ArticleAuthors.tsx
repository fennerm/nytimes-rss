import { Text, TextProps } from "@chakra-ui/react";
import { ReactElement, useContext } from "react";

import { LocaleContext } from "@lib/contexts/LocaleContext";

export interface ArticleAuthorsProps extends TextProps {
  authors: string | null;
}

export const ArticleAuthors = ({ authors, ...props }: ArticleAuthorsProps): ReactElement => {
  const localeContext = useContext(LocaleContext);

  return (
    <Text textTransform="uppercase" fontSize="xs" color="brand.lightGrey" {...props}>
      {localeContext!.locale.name === "ENG" ? "BY" : "POR"}:{" "}
      {authors !== null ? authors : "Unknown"}
    </Text>
  );
};
