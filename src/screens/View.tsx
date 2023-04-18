import { CheckIcon, EditIcon, RepeatIcon } from "@chakra-ui/icons";
import { Button, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { useAuth } from "near-social-bridge";
import { useContext, useEffect, useState } from "react";
import Container from "../components/Container";
import Loading from "../components/Loading";
import { ModalContext } from "../components/ModalProvider";
import Name from "../components/Name";
import PropertiesList from "../components/PropertiesList";
import WidgetsList, { Widgets } from "../components/WidgetsList";
import { PreViewScreenProps } from "../routes/NavigationProps";
import createType from "../services/createType";
import getTypeDetails from "../services/getTypeDetails";
import { Type } from "../services/getTypes";

export enum ElementType {
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

const View: React.FC<PreViewScreenProps> = ({ navigation, route }) => {
  const { type } = route.params;
  const [properties, setProperties] = useState<Property[] | null>(null);
  const [widgets, setWidgets] = useState<Widgets>({});
  const [typeName, setTypeName] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { onOpen, setModalMessage } = useContext(ModalContext);
  const [isChangesMade, setIsChangesMade] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    initializeTypeDetails(type);
  }, [type]);

  const initializeTypeDetails = (type: Type) => {
    if (type.accountId === "nonce" && type.name === "nonce") {
      setTypeName("");
      setProperties([]);
      setWidgets({});
    } else {
      getTypeDetails({ type })?.then((resp) => {
        if (resp.error) {
          setModalMessage({
            header: "Error",
            body: [<Text>Type details not found for type: {type?.name}</Text>],
          });
          onOpen();
        } else {
          console.log(JSON.stringify(resp));
          setTypeName(type?.name ?? "");
          const details = JSON.parse(resp.details ?? "null");
          if (details) {
            setProperties(details.properties ?? []);
            setWidgets(details.widgets ?? {});
          }
        }
      });
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleResetClick = () => {
    setProperties(null);
    setIsEditing(false);
    initializeTypeDetails(type);
    setIsChangesMade(false);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setIsChangesMade(true);
  };

  const handleSubmitType = () => {
    const errors: JSX.Element[] = [];
    if (typeName === "") {
      errors.push(<Text>Type name is empty</Text>);
    }
    if (properties === null || properties.length === 0) {
      errors.push(<Text>Properties have not been provided</Text>);
    }
    // TODO: If name conflicts with existing type

    if (errors.length > 0) {
      setModalMessage({
        header: "Error",
        body: errors,
      });
    } else {
      const message: JSX.Element[] = [];
      if (type?.accountId !== auth.user?.accountId) {
        message.push(
          <VStack>
            <Text>
              You are not the original creator of this type. Committing will
              create a new type under your profile. Would you like to continue?
            </Text>
            <HStack>
              <Button
                onClick={() =>
                  createType({
                    name: typeName,
                    properties: properties!,
                    widgets: widgets,
                  })
                }
              >
                Continue
              </Button>
            </HStack>
          </VStack>
        );
      } else {
        message.push(
          <VStack>
            <Text>
              You are about to publish a new version of this type. Would you
              like to continue?
            </Text>
            <HStack>
              <Button
                onClick={() =>
                  createType({
                    name: typeName,
                    properties: properties!,
                    widgets: widgets,
                  })
                }
              >
                Continue
              </Button>
            </HStack>
          </VStack>
        );
      }
      setModalMessage({
        header: "Review",
        body: message,
      });
    }
    onOpen();
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
          <PropertiesList
            isEditActive={isEditing}
            properties={properties}
            setProperties={setProperties}
          />
        ) : (
          <Loading />
        )}
        {widgets ? (
          <WidgetsList
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
