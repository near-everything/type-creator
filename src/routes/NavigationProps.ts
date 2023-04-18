import { IFrameStackScreenProps } from "near-social-bridge/navigation";
import { Type } from "../services/getTypes";

// Navigation props
export type NavigationProps = {
  Home: undefined;
  CreateNew: undefined;
  UseExisting: undefined;
  List: undefined;
  View: {
    type?: Type;
  };
  LoggedOut: undefined;
};

// Screen props
export type PreHomeScreenProps = IFrameStackScreenProps<
  NavigationProps,
  "Home"
>;

export type PreCreateNewScreenProps = IFrameStackScreenProps<
  NavigationProps,
  "CreateNew"
>;

export type PreUseExistingScreenProps = IFrameStackScreenProps<
  NavigationProps,
  "UseExisting"
>;

export type PreListScreenProps = IFrameStackScreenProps<
  NavigationProps,
  "List"
>;

export type PreViewScreenProps = IFrameStackScreenProps<
  NavigationProps,
  "View"
>;

export type LoggedOutScreenProps = IFrameStackScreenProps<
  NavigationProps,
  "LoggedOut"
>;
