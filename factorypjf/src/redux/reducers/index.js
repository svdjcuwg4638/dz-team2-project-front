import { combineReducers } from "@reduxjs/toolkit";
import storageReducer from "./management/storageReducer";
import menuReducer from './menu';


export default combineReducers({
  storage : storageReducer,
  currentMenu:menuReducer
import partnerReducer from "./management/partnerReducer";
import itemReducer from "./management/itemReducer";
import productReducer from "./management/productReducer";

export default combineReducers({
  storage : storageReducer,
  partner : partnerReducer,
  item : itemReducer,
  product : productReducer
})