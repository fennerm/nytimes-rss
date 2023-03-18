import { Box, BoxProps } from "@chakra-ui/react";
import { ReactElement } from "react";

export const Divider = (props: BoxProps): ReactElement => {
  return <Box height="1px" width="full" backgroundColor="brand.black" {...props} />;
};
