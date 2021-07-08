import { RDKitActionTypes } from "./actions";

export const rdKitStateReducer = (state = "NOT_LOADED", action = {}) => {
  return action.type === RDKitActionTypes.set ? action.payload : state;
};
