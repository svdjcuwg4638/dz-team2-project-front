import { combineReducers } from "@reduxjs/toolkit";
import storageReducer from "./management/storageReducer";


export default combineReducers({
  storage : storageReducer,
})