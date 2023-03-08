import { combineReducers, createStore } from "redux";
import { constumerfunction } from "./sesion.hooks";

// const reducer = combineReducers({
//     constumerfunction,
// });

const sesionhook = createStore(constumerfunction);
export {sesionhook};
