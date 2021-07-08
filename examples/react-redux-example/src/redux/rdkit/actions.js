export const RDKitActionTypes = {
  set: "SET_RDKIT_STATE",
};

export const setRDKitState = (state = "NOT_LOADED") => ({
  type: RDKitActionTypes.set,
  payload: state,
});
