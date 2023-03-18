import { Flex, FlexProps, Spacer } from "@chakra-ui/react";
import { parseISO } from "date-fns";
import { ReactElement } from "react";

import { ArticleAuthors } from "@lib/components/ArticleAuthors";
import { ArticleSummary } from "@lib/components/ArticleSummary";
import { ArticleTitle } from "@lib/components/ArticleTitle";
import { ReadableDate } from "@lib/components/ReadableDate";
import { Thumbnail } from "@lib/components/Thumbnail";

export interface RSSEntryData {
  title: string;
  summary: string | null;
  url: string;
  authors: string;
  thumbnail_url: string | null;
  publish_date: string;
}

export interface RSSEntryProps extends FlexProps {
  readonly entry: RSSEntryData;
}

export const RSSEntry = ({ entry, ...props }: RSSEntryProps): ReactElement => {
  return (
    <Flex paddingY="2%" gap="1em" {...props}>
      <Flex flexDirection="column" gap="0.5em">
        <ReadableDate
          textTransform="uppercase"
          date={parseISO(entry.publish_date)}
          dateFormat="MMM. d, Y"
          fontSize="xs"
        />
        <ArticleTitle text={entry.title} url={entry.url} />
        {entry.summary !== null && <ArticleSummary text={entry.summary} />}
        <ArticleAuthors authors={entry.authors} />
      </Flex>
      <Spacer />
      <Thumbnail url={entry.thumbnail_url} />
    </Flex>
  );
};
