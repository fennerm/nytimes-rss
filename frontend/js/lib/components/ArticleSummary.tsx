import { Text, TextProps } from "@chakra-ui/react";
import { ReactElement } from "react";

export interface ArticleSummaryProps extends TextProps {
  text: string;
}

export const ArticleSummary = ({ text, ...props }: ArticleSummaryProps): ReactElement => {
  return (
    <Text fontSize="sm" {...props}>
      {text}
    </Text>
  );
};
