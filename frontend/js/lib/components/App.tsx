import { Flex } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactElement } from "react";

import { Header } from "@lib/components/Header";
import { RSSFeed } from "@lib/components/RSSFeed";
import { LocaleContextProvider } from "@lib/contexts/LocaleContext";
import THEME from "@lib/theme";

const App = (): ReactElement => {
  return (
    <ChakraProvider theme={THEME}>
      <LocaleContextProvider>
        <Flex className="app" flexDirection="column" width="full" height="full">
          <Header />
          <RSSFeed />
        </Flex>
      </LocaleContextProvider>
    </ChakraProvider>
  );
};

export default App;
