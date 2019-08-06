import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import booleanReducer from "./booleanReducer";
import rightSidePaneReducer from "./rightSidePaneReducer";

const rootReducer = combineReducers({
  boolean: booleanReducer as any,
  form: formReducer,
  rightPaneState: rightSidePaneReducer
});

export default rootReducer;
