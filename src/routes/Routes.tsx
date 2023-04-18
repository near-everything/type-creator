import { createStackNavigator } from "near-social-bridge/navigation";
import { NavigationProps } from "./NavigationProps";

import Loading from "../components/Loading";
import CreateNew from "../screens/CreateNew";
import Home from "../screens/Home";
import UseExisting from "../screens/UseExisting";

const { Navigator, Screen } = createStackNavigator<NavigationProps>(
  <Loading />
);

const Routes: React.FC = () => {
  return (
    <>
      <Navigator>
        <Screen name="Home" component={Home} iframeHeight={500} />
        <Screen name="CreateNew" component={CreateNew} iframeHeight={500} />
        <Screen name="UseExisting" component={UseExisting} iframeHeight={500} />
      </Navigator>
    </>
  );
};

export default Routes;
