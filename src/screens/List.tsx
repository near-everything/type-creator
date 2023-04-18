import { DownloadIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Heading,
  HStack,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import Container from "../components/Container";
import ListElement from "../components/ListElement";
import Loading from "../components/Loading";
import { ModalContext } from "../components/ModalProvider";
import { PreListScreenProps } from "../routes/NavigationProps";
import getTypes, { Type } from "../services/getTypes";

const List: React.FC<PreListScreenProps> = ({ navigation }) => {
  const [accountId, setAccountId] = useState("");
  const [types, setTypes] = useState<Type[]>([]);
  const { onOpen, setModalMessage } = useContext(ModalContext);
  const [isLoading, setIsLoading] = useState(false);

  const searchTypes = () => {
    setIsLoading(true);
    getTypes({ accountId: accountId === "" ? null : accountId }).then(
      (response) => {
        if (response.error) {
          setModalMessage({ header: "Error", body: [<Text>response.error</Text>] });
          onOpen();
        } else {
          setTypes(response.types || []);
        }
      }
    );
    setIsLoading(false);
  };

  return (
    <>
      <Container
        navigation={navigation}
        iconRight={
          // could put in like a json type creator
          <IconButton
            icon={<DownloadIcon />}
            aria-label="Import Type"
            isDisabled={true}
          />
        }
      >
        <HStack>
          <Input
            placeholder="Enter account ID or search all"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
          />
          <IconButton
            icon={<SearchIcon />}
            aria-label="Search Types"
            onClick={searchTypes}
            isDisabled={accountId !== "" && !accountId.endsWith(".near")}
          />
        </HStack>
        <Heading size="md">Types:</Heading>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {types.length > 0 ? (
              types?.map((type: Type, index) => (
                <ListElement
                  key={index}
                  type={type}
                  onView={() => {
                    navigation.push("View", { type });
                  }}
                  onEdit={() => {
                    navigation.push("View", { type });
                  }}
                />
              ))
            ) : (
              <Alert status="info" onClick={searchTypes} cursor="pointer">
                <AlertIcon />
                Load some types! 
              </Alert>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default List;
