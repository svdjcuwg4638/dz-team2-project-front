import { combineReducers } from "@reduxjs/toolkit";
import storageReducer from "./management/storageReducer";
import menuReducer from './menu';
import partnerReducer from "./management/partnerReducer";
import itemReducer from "./management/itemReducer";
import productReducer from "./management/productReducer";
import unitPriceReducer from "./management/unitPriceReducer";
import codeReducer from "./management/codeReducer";


  export default combineReducers({
  currentMenu:menuReducer,
  storage : storageReducer,
  partner : partnerReducer,
  item : itemReducer,
  product : productReducer,
  unitPrice : unitPriceReducer,
  code : codeReducer
})