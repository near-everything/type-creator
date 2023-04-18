import { Text } from "@chakra-ui/react";
import { LoggedOutScreenProps } from "../routes/NavigationProps";
import Container from "../components/ModalProvider";
import Content from "../components/Content";
import { ChatIcon } from "@chakra-ui/icons";

const LoggedOut: React.FC<LoggedOutScreenProps> = () => {
  return (
    <Container>
      <Content>
        <ChatIcon boxSize={12} mt={16} color="teal" />
        <Text size="xs" mt={4} color="gray.700" maxW="sm" textAlign="center">
          You need to sign in to use this chat!
        </Text>
      </Content>
    </Container>
  );
};

export default LoggedOut;
