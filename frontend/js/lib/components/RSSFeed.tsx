import { Box, BoxProps, Center, Flex, Spinner } from "@chakra-ui/react";
import { Fragment, ReactElement, useEffect, useState } from "react";

import { Divider } from "@lib/components/Divider";
import { RSSEntry, RSSEntryData } from "@lib/components/RSSEntry";

export interface RSSFeedProps {
  entries: RSSEntryData[];
}

export const RSSFeed = (props: BoxProps): ReactElement => {
  const [feed, setFeed] = useState<RSSFeedProps | null>(null);

  useEffect(() => {
    fetch("api/nytimes-rss/")
      .then((resp) => resp.json())
      .then((result) => setFeed(result as RSSFeedProps))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Box className="rss-feed-wrapper" paddingX="20%" paddingY="5em" width="full" height="full">
      <Flex
        className="rss-feed"
        paddingX="5%"
        flexDirection="column"
        boxShadow="md"
        backgroundColor="brand.lightWhite"
        {...props}
      >
        {feed === null ? (
          <Center display="flex" justifyContent="center" width="full" height="10em">
            <Spinner size="lg" />
          </Center>
        ) : (
          feed.entries.map((entry, i) => {
            return (
              <Fragment key={i}>
                <RSSEntry width="full" entry={entry} />
                {i < feed!.entries.length - 1 && <Divider backgroundColor="brand.grey" />}
              </Fragment>
            );
          })
        )}
      </Flex>
    </Box>
  );
};
