import {
  Box,
  Button, FormLabel, Text
} from "@chakra-ui/react";
import { Property } from "../screens/View";
import PropertyCreator from "./PropertyCreator";

const colors = {
  string: "blue.200",
  number: "green.200",
  boolean: "purple.200",
  date: "teal.200",
  markdown: "yellow.200",
  // advanced: "pink.200",
};

interface PropertiesProps {
  isEditActive: boolean;
  properties: Property[];
  setProperties: React.Dispatch<React.SetStateAction<Property[] | null>>;
}

const PropertiesList = ({
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

export default PropertiesList;
