import { PaneState } from "../interfaces";
import store from "./store";

export const openLeftSidePane = () => {
  store.dispatch({
    type: "openLeftSidePane",
    payload: { value: true }
  });
};

export const closeLeftSidePane = () => {
  store.dispatch({
    type: "openLeftSidePane",
    payload: { value: false }
  });
};

export const openRightSidePane = () => {
  store.dispatch({
    type: "openRightSidePane",
    payload: { value: true }
  });
};

export const closeRightSidePane = () => {
  store.dispatch({
    type: "openRightSidePane",
    payload: { value: false }
  });
};

export const showSignupForm = () => {
  store.dispatch({
    type: "showSignupForm",
    payload: { value: true }
  });
};

export const hideSignupForm = () => {
  store.dispatch({
    type: "showSignupForm",
    payload: { value: false }
  });
};

export const showLoginForm = () => {
  store.dispatch({
    type: "showLoginForm",
    payload: { value: true }
  });
};

export const hideLoginForm = () => {
  store.dispatch({
    type: "showLoginForm",
    payload: { value: false }
  });
};

export const setRightPaneState = (
  paneState: PaneState,
  chosenUserId?: number
) => {
  store.dispatch({
    type: "paneState",
    payload: { value: paneState, chosenUserId: chosenUserId }
  });
};
