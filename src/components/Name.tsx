import {
  HStack, Input, Text
} from "@chakra-ui/react";

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

export default Name;
