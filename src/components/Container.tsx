import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, HStack, IconButton, VStack, Spacer } from "@chakra-ui/react";
import React from "react";

const Container: React.FC<{ children: React.ReactNode; navigation: any, iconRight?: React.ReactNode }> = ({
  children,
  navigation,
  iconRight
}) => {
  return (
    <Box maxWidth={500} margin={"auto"}>
      <VStack spacing={2} align="stretch" padding={4}>
        <HStack>
          <IconButton
            icon={<ArrowBackIcon />}
            aria-label="Back"
            onClick={() => {
              navigation.goBack();
            }}
          />
          <Spacer />
          {iconRight}
        </HStack>
        {children}
      </VStack>
    </Box>
  );
};

export default Container;
