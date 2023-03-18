import { Heading, Link, LinkProps } from "@chakra-ui/react";
import { ReactElement } from "react";

export interface ArticleTitleProps extends LinkProps {
  text: string;
  url: string;
}

export const ArticleTitle = ({ text, url, ...props }: ArticleTitleProps): ReactElement => {
  return (
    <Link href={url} isExternal {...props}>
      <Heading size="md">{text}</Heading>
    </Link>
  );
};
