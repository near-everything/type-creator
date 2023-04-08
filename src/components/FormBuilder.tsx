import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

interface FormElement {
  type: string;
  value: string;
}

enum ElementTypes {
  STRING = "string",
}

function FormBuilder() {
  const [formElements, setFormElements] = useState<FormElement[]>([]);
  const [selectedType, setSelectedType] = useState<ElementTypes>(
    ElementTypes.STRING
  );

  const handleAddElement = () => {
    const newElement = { type: selectedType, value: '' };
    setFormElements([...formElements, newElement]);
  };
  
  const handleChange = (index: number, value: string) => {
    const updatedElements = [...formElements];
    updatedElements[index].value = value;
    setFormElements(updatedElements);
  };

  return (
    <VStack spacing={4} align="flex-start">
      <FormControl>
        <FormLabel>Select Element Type</FormLabel>
        <Select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value as ElementTypes)}
        >
          <option value={ElementTypes.STRING}>String</option>
          {/* add options for other element types */}
        </Select>
      </FormControl>
      <Button onClick={handleAddElement}>Add {selectedType} Input</Button>
      <form>
        {formElements.map((element, index) => {
          switch (element.type) {
            case ElementTypes.STRING:
              return (
                <FormControl key={index}>
                  <FormLabel>String Input</FormLabel>
                  <Input
                    type="text"
                    value={element.value}
                    onChange={(e) => handleChange(index, e.target.value)}
                  />
                </FormControl>
              );
            // add more cases for other element types
            default:
              return null;
          }
        })}
      </form>
    </VStack>
  );
}

export default FormBuilder;
