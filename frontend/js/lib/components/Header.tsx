import { Flex, FlexProps } from "@chakra-ui/react";
import { ReactElement } from "react";

import { Divider } from "@lib/components/Divider";
import { LocalePicker } from "@lib/components/LocalePicker";
import { Logo } from "@lib/components/Logo";
import { ReadableDate } from "@lib/components/ReadableDate";

export const Header = (props: FlexProps): ReactElement => {
  return (
    <Flex
      className="app-header"
      flexDirection="column"
      backgroundColor="brand.white"
      position="fixed"
      paddingX="10%"
      width="full"
      {...props}
    >
      <Flex justify="space-between" padding="10px 15px">
        <ReadableDate textTransform="capitalize" date={new Date()} dateFormat="eee, d MMM Y" />
        <Logo />
        <LocalePicker />
      </Flex>
      <Divider />
    </Flex>
  );
};
