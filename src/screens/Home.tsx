import { Alert, AlertIcon, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import Container from "../components/Container";
import Content from "../components/Content";
import CreateForm from "../components/FormBuilder";
import { PreHomeScreenProps } from "../routes/NavigationProps";

const Home: React.FC<PreHomeScreenProps> = ({ navigation }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isReady, setIsReady] = useState(true);
  const [showError, setShowError] = useState(false);
  const [roomId, setRoomId] = useState("");

  return (
    <Container>
      {showError && (
        <Alert status="error">
          <AlertIcon />
          Room not found!
        </Alert>
      )}

      <Content>
        
        {/* {isReady ? (
          <>
            <Text
              size="xs"
              mt={16}
              color="gray.700"
              maxW="sm"
              textAlign="center"
            >
              Join or create a room to chat with your friends
            </Text>

            <Stack spacing={4} mt={4} width="sm">
              <InputGroup>
                <InputLeftAddon children="Room:" />
                <Input
                  placeholder="type the room id you want to join"
                  maxW="md"
                  onChange={(e) => setRoomId(e.target.value)}
                />
                {roomId && (
                  <InputRightAddon width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={joinClickHandler}>
                      Join
                    </Button>
                  </InputRightAddon>
                )}
              </InputGroup>
            </Stack>
          </>
        ) : (
          <Box mt={250}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="teal.500"
              size="xl"
            />
          </Box>
        )} */}
      </Content>
    </Container>
  );
};

export default Home;
