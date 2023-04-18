import { ChakraProvider } from "@chakra-ui/react";
import ModalProvider from "./components/ModalProvider";
import Routes from "./routes/Routes";

const App = () => {
  return (
    <ChakraProvider>
      <ModalProvider>
        <Routes />
      </ModalProvider>
    </ChakraProvider>
  );
};

export default App;
