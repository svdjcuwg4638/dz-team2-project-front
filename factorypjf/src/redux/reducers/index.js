import { combineReducers } from "@reduxjs/toolkit";
import storageReducer from "./management/storageReducer";
import partnerReducer from "./management/partnerReducer";

export default combineReducers({
  storage : storageReducer,
  partner : partnerReducer,
})