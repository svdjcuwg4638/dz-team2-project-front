import { combineReducers } from "@reduxjs/toolkit";
import storageReducer from "./management/storageReducer";
import menuReducer from "./menu";
import partnerReducer from "./management/partnerReducer";
import itemReducer from "./management/itemReducer";
import productReducer from "./management/productReducer";
import unitPriceReducer from "./management/unitPriceReducer";
import codeReducer from "./management/codeReducer";
import codehelperReducer from "./storage/codehelperReducer";
import inventoryReducer from "./storage/InventoryReducer";
import relationReducer from "./management/relationReducer";
import commonReducer from "./common/commonReducer";
import tabReducer from "./common/tabReducer";

export default combineReducers({
  currentMenu: menuReducer,
  storage: storageReducer,
  partner: partnerReducer,
  item: itemReducer,
  product: productReducer,
  unitPrice: unitPriceReducer,
  code: codeReducer,
  codehelper: codehelperReducer,
  relation: relationReducer,
  
  inventory: inventoryReducer,

  common: commonReducer,
  tab : tabReducer,
});
