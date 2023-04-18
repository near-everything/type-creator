import { IFrameStackScreenProps } from "near-social-bridge/navigation";

// Navigation props
export type NavigationProps = {
  Home: undefined;
  CreateNew: undefined;
  UseExisting: undefined;
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

export type LoggedOutScreenProps = IFrameStackScreenProps<
  NavigationProps,
  "LoggedOut"
>;
