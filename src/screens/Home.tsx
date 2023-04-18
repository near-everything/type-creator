import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { PreHomeScreenProps } from "../routes/NavigationProps";

const Home: React.FC<PreHomeScreenProps> = ({ navigation }) => {
  return (
    <Box maxWidth={500} margin={"auto"} padding={4}>
      <Box mb={4} >
        <Text fontSize="2xl" fontWeight="bold">
          Type Creator
        </Text>
      </Box>
      <HStack spacing={4}>
        <Button onClick={() => navigation.push("List")} size="lg">
          Browse Existing
        </Button>
        <Button
          onClick={() => navigation.push("View", { type: undefined })}
          size="lg"
        >
          Create New
        </Button>
      </HStack>
    </Box>
  );
};

export default Home;
