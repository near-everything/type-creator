import { HStack, Input, Text, VStack } from "@chakra-ui/react";

export interface Widgets {
  viewAll?: string;
  view?: string;
  summary?: string;
  create?: string;
}

interface WidgetsProps {
  isEditActive: boolean;
  widgets: Widgets;
  setWidgets: React.Dispatch<React.SetStateAction<Widgets>>;
}

const WidgetsList = ({
  isEditActive,
  widgets,
  setWidgets,
}: WidgetsProps): JSX.Element => {
  return (
    <>
      <Text fontSize="2xl">Widgets:</Text>
      <VStack align="left">
        <HStack>
          <Text fontWeight={"bold"}>ViewAll:</Text>
          {isEditActive ? (
            <Input
              value={widgets.viewAll}
              onChange={(e) =>
                setWidgets({ ...widgets, viewAll: e.target.value })
              }
              placeholder={"Enter ViewAll Widget"}
            />
          ) : (
            <Text>{widgets.viewAll}</Text>
          )}
        </HStack>
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

export default WidgetsList;
