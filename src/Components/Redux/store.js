import {legacy_createStore as createStore } from "redux";
import productReducer from "./productReducer";

const store = createStore(productReducer);

export const dispatchAction = store.dispatch;
export default store