import { ChakraProvider } from "@chakra-ui/react";
import Routes from "./routes/Routes";
import FormBuilder from "./components/FormBuilder";

const App = () => {
  return (
    <ChakraProvider>
      <FormBuilder />
    </ChakraProvider>
  );
};

export default App;
