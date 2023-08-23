import { combineReducers } from "@reduxjs/toolkit";
import storageReducer from "./management/storageReducer";
import menuReducer from './menu';


export default combineReducers({
  storage : storageReducer,
  currentMenu:menuReducer
})