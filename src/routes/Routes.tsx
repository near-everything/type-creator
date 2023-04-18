import { createMock } from "near-social-bridge";
import { createStackNavigator } from "near-social-bridge/navigation";
import Loading from "../components/Loading";
import Home from "../screens/Home";
import List from "../screens/List";
import View from "../screens/View";
import { Type } from "../services/getTypes";
import { NavigationProps } from "./NavigationProps";


const { Navigator, Screen } = createStackNavigator<NavigationProps>(
  <Loading />
);

// const types = [
//   { accountId: "hack.near", name: "Post" },
//   { accountId: "hack.near", name: "Page" },
//   { accountId: "evrything.near", name: "Idea" },
//   { accountId: "evrything.near", name: "Event" },
//   { accountId: "evrything.near", name: "Image" },
//   { accountId: "evrything.near", name: "Video" },
//   { accountId: "evrything.near", name: "Note" },
// ];

// const getTypesMock = (payload: { accountId?: string }) => {
//   return {
//     types,
//   };
// };

// const getTypeDetailsMock = (payload: { type: Type }) => {
//   return {
//     details: {
//       properties: [
//         {
//           name: "field1",
//           type: "string",
//         },
//         {
//           name: "field2",
//           type: "number",
//         },
//         {
//           name: "field3",
//           type: "date",
//         },
//         {
//           name: "field4",
//           type: "boolean",
//         },
//         {
//           name: "field5",
//           type: "markdown",
//         },
//       ],
//       widgets: {
//         view: "evrything.near/widget/Everything.View.Thing",
//         summary: "evrything.near/widget/Everything.Summary.Thing",
//         create: "evrything.near/widget/Everything.Create.Thing",
//       },
//     },
//   };
// };

// // Create mock
// createMock("get-types", getTypesMock);
// createMock("get-type-details", getTypeDetailsMock);

const Routes: React.FC = () => {
  return (
    <>
      <Navigator>
        <Screen name="Home" component={Home} iframeHeight={800} />
        <Screen name="List" component={List} iframeHeight={800} />
        <Screen name="View" component={View} iframeHeight={800} />
      </Navigator>
    </>
  );
};

export default Routes;
