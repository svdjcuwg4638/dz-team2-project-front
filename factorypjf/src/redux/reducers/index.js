import { combineReducers } from "@reduxjs/toolkit";
import storageReducer from "./management/storageReducer";
import partnerReducer from "./management/partnerReducer";
import itemReducer from "./management/itemReducer";
import productReducer from "./management/productReducer";
import unitPriceReducer from "./management/unitPriceReducer";

export default combineReducers({
  storage : storageReducer,
  partner : partnerReducer,
  item : itemReducer,
  product : productReducer,
  unitPrice : unitPriceReducer,
})