import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Text,
  IconButton,
  Stack,
  FormErrorMessage,
} from "@chakra-ui/react";
import { AddIcon, CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { request, useInitialPayload } from "near-social-bridge";
import createType from "../services/createType";
import Loading from "./Loading";
import { InitialPayload } from "../screens/UseExisting";

enum ElementType {
  STRING = "string",
  NUMBER = "number",
  BOOLEAN = "boolean",
  DATE = "date",
  MARKDOWN = "markdown",
  // ADVANCED = "advanced",
}

export interface Property {
  name: string;
  type: ElementType;
}

const colors = {
  string: "blue.200",
  number: "green.200",
  boolean: "purple.200",
  date: "teal.200",
  markdown: "yellow.200",
  // advanced: "pink.200",
};

interface TypeBuilderProps {}

function TypeBuilder(props: TypeBuilderProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [message, setMessage] = useState<string>("");
  const [name, setName] = useState("");
  const [type, setType] = useState<ElementType>(ElementType.STRING);
  const [isEditing, setIsEditing] = useState(true);
  const [typeNameEditor, setTypeNameEditor] = useState("");
  const [typeName, setTypeName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const initialPayload: InitialPayload = useInitialPayload();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setTypeName(typeNameEditor);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  function handleCreateClick() {
    handlePropertyCreate({ name, type });
    setType(ElementType.STRING);
    setName("");
  }

  function handlePropertyCreate(property: Property) {
    if (properties.some((p) => p.name === property.name.trim())) {
      setMessage(`Property with name: "${property.name}" already exists.`);
      onOpen();
    } else {
      setProperties([...properties, property]);
    }
  }

  const handleDelete = (name: string) => {
    const updatedProperties = properties.filter(
      (property) => property.name !== name
    );
    setProperties(updatedProperties);
  };

  const SUCCESSFULLY_CREATED = "successfully created";

  const handlePublishType = async () => {
    setIsLoading(true);
    const response = await createType({
      name: typeName,
      properties,
    });
    if (response.error) {
      setMessage(response.error);
      onOpen();
    } else {
      setMessage(SUCCESSFULLY_CREATED);
      onOpen();
      setProperties([]);
      setTypeName("");
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  const isError = initialPayload.types?.includes(typeNameEditor);

  return (
    <>
      <Flex flexDirection="column" alignItems="left" mt={2}>
        <Box>
          <FormControl isInvalid={isError}>
            <Flex alignItems="center" justifyContent="space-between">
              {isEditing ? (
                <Input
                  value={typeNameEditor}
                  onChange={(e) => setTypeNameEditor(e.target.value)}
                  placeholder={"Enter Type Name"}
                />
              ) : (
                <Text fontSize="2xl" fontWeight="bold">
                  {typeName}
                </Text>
              )}
              {isEditing ? (
                <Stack direction="row" alignItems="center">
                  <IconButton
                    aria-label="Save"
                    icon={<CheckIcon />}
                    onClick={handleSaveClick}
                    ml={2}
                    isDisabled={typeNameEditor === "" || isError}
                  />
                  <IconButton
                    aria-label="Cancel"
                    icon={<CloseIcon />}
                    onClick={handleCancelClick}
                    ml={2}
                    isDisabled={typeName === ""}
                  />
                </Stack>
              ) : (
                <IconButton
                  aria-label="Edit"
                  icon={<EditIcon />}
                  onClick={handleEditClick}
                  ml={2}
                />
              )}
            </Flex>
            {isError ? (
              <FormErrorMessage>Type already exists</FormErrorMessage>
            ) : null}
          </FormControl>
          {typeName !== "" ? (
            <Box borderWidth="1px" p={4} borderRadius="md" mt={4}>
              <Text fontSize="xl" mb={4} fontWeight="bold">
                Create Property
              </Text>
              <Flex alignItems="flex-end" mr={2} gap={2}>
                <FormControl id="name" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
                <FormControl id="type" isRequired>
                  <FormLabel>Type</FormLabel>
                  <Select
                    value={type}
                    onChange={(e) => setType(e.target.value as ElementType)}
                  >
                    <option value={ElementType.STRING}>String</option>
                    <option value={ElementType.NUMBER}>Number</option>
                    <option value={ElementType.BOOLEAN}>Boolean</option>
                    <option value={ElementType.DATE}>Date</option>
                    <option value={ElementType.MARKDOWN}>Markdown</option>
                    {/* <option value={ElementType.ADVANCED}>Advanced</option> */}
                  </Select>
                </FormControl>
                <IconButton
                  aria-label="Add Property"
                  icon={<AddIcon />}
                  onClick={handleCreateClick}
                  isDisabled={name === ""}
                />
              </Flex>
            </Box>
          ) : null}
          {properties.map((property, index) => (
            <Box
              key={index}
              backgroundColor={colors[property.type]}
              borderRadius={5}
              px={4}
              py={2}
              mt={2}
              maxWidth="100%"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box mr={4}>
                <FormLabel display="inline-block" mb={0}>
                  {property.name}
                </FormLabel>
                <Box
                  bg="gray.100"
                  borderRadius="md"
                  px={2}
                  py={1}
                  ml={2}
                  display="inline-block"
                >
                  {property.type}
                </Box>
              </Box>
              <Button
                variant="outline"
                size="sm"
                colorScheme="red"
                ml={2}
                onClick={() => handleDelete(property.name)}
              >
                Remove
              </Button>
            </Box>
          ))}
          {typeName !== "" ? (
            <Button
              colorScheme="blue"
              isDisabled={properties.length < 1}
              onClick={handlePublishType}
              mt={4}
            >
              Publish Type
            </Button>
          ) : null}
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {message === SUCCESSFULLY_CREATED ? "Success" : "Error"}
          </ModalHeader>
          <ModalBody>
            <p>{message}</p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default TypeBuilder;
