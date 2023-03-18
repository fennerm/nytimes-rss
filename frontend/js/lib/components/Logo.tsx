import { Box, BoxProps } from "@chakra-ui/react";
import { ReactElement } from "react";

import logo from "@images/logo.svg";

export const Logo = (props: BoxProps): ReactElement => {
  return (
    <Box className="logo-wrapper" {...props}>
      <img src={logo} alt="logo" />
    </Box>
  );
};
