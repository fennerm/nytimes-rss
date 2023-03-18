import { Box, Center, CenterProps, Image } from "@chakra-ui/react";
import { ReactElement } from "react";

export interface ThumbnailProps extends CenterProps {
  url: string | null;
}

export const Thumbnail = ({ url, ...props }: ThumbnailProps): ReactElement => {
  return (
    <Center {...props}>
      <Box width="151px" height="151px">
        {url !== null && <Image overflow="hidden" src={url} alt="Article Thumbnail" />}
      </Box>
    </Center>
  );
};
