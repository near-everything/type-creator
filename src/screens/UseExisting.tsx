import { Box, Button, SimpleGrid } from "@chakra-ui/react";
import { useInitialPayload } from "near-social-bridge";
import { PreUseExistingScreenProps } from "../routes/NavigationProps";

export interface InitialPayload {
  types: string[];
}

const UseExisting: React.FC<PreUseExistingScreenProps> = ({ navigation }) => {
  const initialPayload: InitialPayload = useInitialPayload();

  return (
    <Box maxWidth={500} margin={"auto"}>
      <Button onClick={() => navigation.push("Home")}>Back</Button>
      <SimpleGrid columns={4} spacing={4} mt={2}>
        {initialPayload?.types?.map((item) => (
          <Button key={item}>{item}</Button>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default UseExisting;
