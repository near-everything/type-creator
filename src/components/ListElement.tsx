import {
  HStack,
  Text,
  IconButton,
  IconButtonProps,
  Spacer,
} from "@chakra-ui/react";
import { ViewIcon, EditIcon } from "@chakra-ui/icons";
import { Type } from "../services/getTypes";

interface ListElementProps {
  type: Type;
  onView: IconButtonProps["onClick"];
  onEdit: IconButtonProps["onClick"];
}

function ListElement({ type, onView, onEdit }: ListElementProps) {
  return (
    <HStack
      align="center"
      borderWidth="1px"
      borderRadius="md"
      padding={2}
      _hover={{
        background: "gray.50",
      }}
    >
      <Text>{`${type.accountId}/type/${type.name}`}</Text>
      <Spacer />
      <IconButton
        icon={<ViewIcon />}
        aria-label={`View ${type.accountId}/type/${type.name}`}
        onClick={onView}
      />
      <IconButton
        icon={<EditIcon />}
        aria-label={`Edit ${type.accountId}/type/${type.name}`}
        onClick={onEdit}
      />
    </HStack>
  );
}

export default ListElement;
