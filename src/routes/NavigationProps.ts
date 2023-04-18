import { IFrameStackScreenProps } from "near-social-bridge/navigation";
import { Type } from "../services/getTypes";

// Navigation props
export type NavigationProps = {
  Home: undefined;
  List: undefined;
  View: {
    type: Type;
  };
};

// Screen props
export type PreHomeScreenProps = IFrameStackScreenProps<
  NavigationProps,
  "Home"
>;

export type PreListScreenProps = IFrameStackScreenProps<
  NavigationProps,
  "List"
>;

export type PreViewScreenProps = IFrameStackScreenProps<
  NavigationProps,
  "View"
>;
