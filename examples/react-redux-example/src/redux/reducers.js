import { combineReducers } from "redux";
import { rdKitStateReducer } from "./rdkit/reducers";

export const rootReducer = combineReducers({
  rdKitState: rdKitStateReducer,
});
