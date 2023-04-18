import { AddIcon, CheckIcon, EditIcon, RepeatIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import Container from "../components/Container";
import Loading from "../components/Loading";
import { ModalContext } from "../components/ModalProvider";
import { PreViewScreenProps } from "../routes/NavigationProps";
import createType from "../services/createType";
import getTypeDetails from "../services/getTypeDetails";
import { Type } from "../services/getTypes";

enum ElementType {
  STRING = "string",
  NUMBER = "number",
  BOOLEAN = "boolean",
  DATE = "date",
  MARKDOWN = "markdown",
  // ADVANCED = "advanced",
}

const colors = {
  string: "blue.200",
  number: "green.200",
  boolean: "purple.200",
  date: "teal.200",
  markdown: "yellow.200",
  // advanced: "pink.200",
};

export interface Property {
  name: string;
  type: ElementType;
}

export interface Widgets {
  view?: string;
  summary?: string;
  create?: string;
}

const View: React.FC<PreViewScreenProps> = ({ navigation, route }) => {
  const { type } = route.params;
  const [properties, setProperties] = useState<Property[] | null>(null);
  const [widgets, setWidgets] = useState<Widgets>({});
  const [typeName, setTypeName] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { onOpen, setModalMessage } = useContext(ModalContext);
  const [isChangesMade, setIsChangesMade] = useState(false);

  useEffect(() => {
    if (type !== undefined) {
      initializeTypeDetails(type);
    } else {
      setTypeName("");
      setProperties([]);
      setWidgets({});
    }
  }, [type]);

  const initializeTypeDetails = (type: Type) => {
    getTypeDetails({ type })?.then((resp) => {
      if (resp.error) {
        setModalMessage({
          header: "Error",
          body: `Type details not found for type: ${type?.name}`,
        });
        onOpen();
      } else {
        setTypeName(type?.name ?? "");
        setProperties(resp?.details?.properties ?? []);
        setWidgets(resp?.details?.widgets ?? {});
      }
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleResetClick = () => {
    setProperties(null);
    setIsEditing(false);
    if (type) {
      initializeTypeDetails(type);
    } else {
      setTypeName("");
      setProperties([]);
      setWidgets({});
    }
    setIsChangesMade(false);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setIsChangesMade(true);
  };

  const handleSubmitType = () => {
    createType({
      name: typeName,
      properties: properties ?? [],
      widgets: widgets,
    });
  };

  return (
    <Container
      navigation={navigation}
      iconRight={
        <HStack>
          <IconButton
            aria-label="Reset"
            icon={<RepeatIcon />}
            onClick={handleResetClick}
            ml={2}
          />
          {isEditing ? (
            <IconButton
              aria-label="Save"
              icon={<CheckIcon />}
              onClick={handleSaveClick}
              ml={2}
            />
          ) : (
            <IconButton
              aria-label="Edit"
              icon={<EditIcon />}
              onClick={handleEditClick}
              ml={2}
            />
          )}
        </HStack>
      }
    >
      <>
        <Name
          isEditActive={isEditing}
          typeName={typeName}
          setTypeName={setTypeName}
        />
        {properties ? (
          <Properties
            isEditActive={isEditing}
            properties={properties}
            setProperties={setProperties}
          />
        ) : (
          <Loading />
        )}
        {widgets ? (
          <Widgets
            isEditActive={isEditing}
            widgets={widgets}
            setWidgets={setWidgets}
          />
        ) : (
          <Loading />
        )}
      </>
      {isChangesMade ? (
        <Button colorScheme="teal" variant="solid" onClick={handleSubmitType}>
          Submit
        </Button>
      ) : null}
    </Container>
  );
};

export default View;

interface NameProps {
  isEditActive: boolean;
  typeName: string;
  setTypeName: React.Dispatch<React.SetStateAction<string>>;
}

const Name = ({
  isEditActive,
  typeName,
  setTypeName,
}: NameProps): JSX.Element => {
  return (
    <>
      <HStack>
        <Text fontSize="2xl">Name:</Text>
        {isEditActive ? (
          <>
            <Input
              value={typeName}
              onChange={(e) => setTypeName(e.target.value)}
              placeholder={"Enter Type Name"}
            />
          </>
        ) : (
          <Text fontSize="2xl" fontWeight="bold">
            {typeName}
          </Text>
        )}
      </HStack>
    </>
  );
};

interface PropertiesProps {
  isEditActive: boolean;
  properties: Property[];
  setProperties: React.Dispatch<React.SetStateAction<Property[] | null>>;
}

const Properties = ({
  isEditActive,
  properties,
  setProperties,
}: PropertiesProps): JSX.Element => {
  function handlePropertyCreate(property: Property) {
    if (properties.some((p) => p.name === property.name.trim())) {
      // DO SOMETHING
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

  return (
    <>
      <Text fontSize="2xl">Properties:</Text>
      {isEditActive && (
        <PropertyCreator handlePropertyCreate={handlePropertyCreate} />
      )}
      {properties?.map((property: Property, index: number) => (
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
          {isEditActive ? (
            <Button
              variant="outline"
              size="sm"
              colorScheme="red"
              ml={2}
              onClick={() => handleDelete(property.name)}
            >
              Remove
            </Button>
          ) : null}
        </Box>
      ))}
    </>
  );
};

interface PropertyCreatorProps {
  handlePropertyCreate: (property: Property) => void;
}

const PropertyCreator = ({
  handlePropertyCreate,
}: PropertyCreatorProps): JSX.Element => {
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<ElementType>(ElementType.STRING);

  function handleCreateClick() {
    handlePropertyCreate({ name, type });
    setType(ElementType.STRING);
    setName("");
  }

  return (
    <>
      <Box borderWidth="1px" p={4} borderRadius="md" mt={4}>
        <Text fontSize="xl" mb={4} fontWeight="bold">
          Create Property
        </Text>
        <Flex alignItems="flex-end" mr={2} gap={2}>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
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
    </>
  );
};

export interface Widgets {
  view?: string;
  summary?: string;
  create?: string;
}

interface WidgetsProps {
  isEditActive: boolean;
  widgets: Widgets;
  setWidgets: React.Dispatch<React.SetStateAction<Widgets>>;
}

const Widgets = ({
  isEditActive,
  widgets,
  setWidgets,
}: WidgetsProps): JSX.Element => {
  return (
    <>
      <Text fontSize="2xl">Widgets:</Text>
      <VStack align="left">
        <HStack>
          <Text fontWeight={"bold"}>View:</Text>
          {isEditActive ? (
            <Input
              value={widgets.view}
              onChange={(e) => setWidgets({ ...widgets, view: e.target.value })}
              placeholder={"Enter View Widget"}
            />
          ) : (
            <Text>{widgets.view}</Text>
          )}
        </HStack>
        <HStack>
          <Text fontWeight={"bold"}>Summary:</Text>
          {isEditActive ? (
            <Input
              value={widgets.summary}
              onChange={(e) =>
                setWidgets({ ...widgets, summary: e.target.value })
              }
              placeholder={"Enter Summary Widget"}
            />
          ) : (
            <Text> {widgets.summary}</Text>
          )}
        </HStack>
        <HStack>
          <Text fontWeight={"bold"}>Create:</Text>
          {isEditActive ? (
            <Input
              value={widgets.create}
              onChange={(e) =>
                setWidgets({ ...widgets, create: e.target.value })
              }
              placeholder={"Enter Create Widget"}
            />
          ) : (
            <Text>{widgets.create}</Text>
          )}
        </HStack>
      </VStack>
    </>
  );
};
