import {combineReducers, createStore} from "redux";
import {TasksReducer} from "../reducers/TasksReducer";
import {FilterReducer} from "../reducers/FilterReducer";

const rootReducer = combineReducers({
    tasks:TasksReducer,
    filter:FilterReducer
})

export type rootReducerType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer)