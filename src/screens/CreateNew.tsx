import { Box, Button } from "@chakra-ui/react";
import FormBuilder from "../components/FormBuilder";
import { PreCreateNewScreenProps } from "../routes/NavigationProps";

const CreateNew: React.FC<PreCreateNewScreenProps> = ({ navigation }) => {
  return (
    <Box maxWidth={500} margin={"auto"}>
      <Button onClick={() => navigation.push("Home")}>Back</Button>
      <FormBuilder />
    </Box>
  );
};

export default CreateNew;
