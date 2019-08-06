const INITIAL_STATE = {
  paneState: null,
  chosenUserId: null
};

export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "paneState":
      return {
        ...state,
        paneState: action.payload.value,
        chosenUserId: action.payload.chosenUserId
      };
    default:
      return state;
  }
};
