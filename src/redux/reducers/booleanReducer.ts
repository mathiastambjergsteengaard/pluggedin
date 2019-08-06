const INITIAL_STATE = {
  openLeftSidePane: false,
  openRightSidePane: false
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "openLeftSidePane":
      return {
        ...state,
        openLeftSidePane: action.payload.value
      };
    case "openRightSidePane":
      return {
        ...state,
        openRightSidePane: action.payload.value
      };

    default:
      return state;
  }
};
