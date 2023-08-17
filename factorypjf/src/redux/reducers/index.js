import { combineReducers } from "@reduxjs/toolkit";
import storageReducer from "./management/storageReducer";
import partnerReducer from "./management/partnerReducer";
import itemReducer from "./management/itemReducer";

export default combineReducers({
  storage : storageReducer,
  partner : partnerReducer,
  item : itemReducer,
})