import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Textarea,
  VStack
} from "@chakra-ui/react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

enum ElementTypes {
  STRING = "string",
  NUMBER = "number",
  BOOLEAN = "boolean",
  DATE = "date",
  TEXTAREA = "textarea",
  DROPDOWN = "dropdown",
}

type Element = {
  type: ElementTypes;
  value: any;
};

function FormBuilder() {
  const [elements, setElements] = useState<Element[]>([]);
  const [selectedType, setSelectedType] = useState<ElementTypes>(
    ElementTypes.STRING
  );

  const handleAddElement = () => {
    switch (selectedType) {
      case ElementTypes.NUMBER:
        setElements([...elements, { type: selectedType, value: 0 }]);
        break;
      case ElementTypes.BOOLEAN:
        setElements([...elements, { type: selectedType, value: false }]);
        break;
      case ElementTypes.DATE:
        setElements([...elements, { type: selectedType, value: new Date() }]);
        break;
      case ElementTypes.TEXTAREA:
        setElements([...elements, { type: selectedType, value: "" }]);
        break;
      case ElementTypes.DROPDOWN:
        setElements([...elements, { type: selectedType, value: "" }]);
        break;
      default:
        setElements([...elements, { type: selectedType, value: "" }]);
        break;
    }
  };

  const handleChange = (index: number, value: any) => {
    const updatedElements = [...elements];
    updatedElements[index].value = value;
    setElements(updatedElements);
  };

  const renderElement = (element: Element, index: number) => {
    switch (element.type) {
      case ElementTypes.NUMBER:
        return (
          <FormControl key={index}>
            <FormLabel>Element {index + 1}</FormLabel>
            <NumberInput
              value={element.value}
              onChange={(value) => handleChange(index, value)}
            >
              <NumberInputField />
            </NumberInput>
          </FormControl>
        );
      case ElementTypes.BOOLEAN:
        return (
          <FormControl key={index}>
            <FormLabel>Element {index + 1}</FormLabel>
            <Checkbox
              isChecked={element.value}
              onChange={(e) => handleChange(index, e.target.checked)}
            >
              Value
            </Checkbox>
          </FormControl>
        );
      case ElementTypes.DATE:
        return (
          <FormControl key={index}>
            <FormLabel>Element {index + 1}</FormLabel>
            <DatePicker
              selected={element.value}
              onChange={(value) => handleChange(index, value)}
            />
          </FormControl>
        );
      case ElementTypes.TEXTAREA:
        return (
          <FormControl key={index}>
            <FormLabel>Element {index + 1}</FormLabel>
            <Textarea
              value={element.value}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </FormControl>
        );
      case ElementTypes.DROPDOWN:
        return (
          <FormControl key={index}>
            <FormLabel>Element {index + 1}</FormLabel>
            <Select
              value={element.value}
              onChange={(e) => handleChange(index, e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </Select>
          </FormControl>
        );
      case ElementTypes.STRING:
        return (
          <FormControl key={index}>
            <FormLabel>String Input</FormLabel>
            <Input
              type="text"
              value={element.value as string}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </FormControl>
        );
      default:
        return null;
    }
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
          <option value={ElementTypes.NUMBER}>Number</option>
          <option value={ElementTypes.BOOLEAN}>Boolean</option>
          <option value={ElementTypes.DATE}>Date</option>
          <option value={ElementTypes.TEXTAREA}>Text Area</option>
          <option value={ElementTypes.DROPDOWN}>Dropdown</option>
        </Select>
      </FormControl>
      <Button onClick={handleAddElement}>Add {selectedType} Input</Button>
      {elements.map((element, index) => renderElement(element, index))}
    </VStack>
  );
}

export default FormBuilder;
