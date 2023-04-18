import { Box, Button, VStack } from "@chakra-ui/react";
import { PreHomeScreenProps } from "../routes/NavigationProps";

const Home: React.FC<PreHomeScreenProps> = ({ navigation }) => {
  return (
    <Box maxWidth={500} margin={"auto"}>
      <VStack spacing={4}>
        <Box>
          <Button onClick={() => navigation.push("UseExisting")}>
            Use Existing
          </Button>
          <Button onClick={() => navigation.push("CreateNew")} ml={4}>
            Create New
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default Home;
