import { createStackNavigator } from "near-social-bridge/navigation";
import { NavigationProps } from "./NavigationProps";

import Loading from "../components/Loading";
import Home from "../screens/Home";
import LoggedOut from "../screens/LoggedOut";
import { useAuth } from "near-social-bridge";

const { Navigator, Screen } = createStackNavigator<NavigationProps>(
  <Loading />
);

const Routes: React.FC = () => {
  const auth = useAuth();

  return (
    <>
      <Navigator>
        {/* {auth.user && auth.ready ? (
          <> */}
            <Screen name="Home" component={Home} iframeHeight={500} />
          {/* </>
        ) : (
          <Screen name="LoggedOut" component={LoggedOut} iframeHeight={600} />
        )} */}
      </Navigator>
    </>
  );
};

export default Routes;
