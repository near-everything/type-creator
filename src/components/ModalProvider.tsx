import {
  Button, Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import React, { useState } from "react";

type ModalMessage = {
  header?: string;
  body?: string;
};

type ModalContextType = {
  onOpen: () => void;
  setModalMessage: (message: ModalMessage) => void;
};

export const ModalContext = React.createContext<ModalContextType>({
  onOpen: () => {},
  setModalMessage: () => {},
});

type ModalProviderProps = {
  children: React.ReactNode;
};

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalMessage, setModalMessage] = useState<ModalMessage>({});

  const contextValue = React.useMemo(
    () => ({
      onOpen,
      setModalMessage,
    }),
    [onOpen, setModalMessage]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalMessage.header ?? "Attention"}</ModalHeader>
          <ModalBody>
            <Text>{modalMessage.body ?? "Something went wrong..."}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ModalContext.Provider>
  );
};

export default ModalProvider;
