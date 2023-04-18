import { AddIcon } from "@chakra-ui/icons";
import {
  Box, Flex,
  FormControl,
  FormLabel, IconButton,
  Input,
  Select,
  Text
} from "@chakra-ui/react";
import { useState } from "react";
import { ElementType, Property } from "../screens/View";

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

export default PropertyCreator;