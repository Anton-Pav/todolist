import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state:Array<TodolistType>, action: mainType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":{
            let newState=[...state]
            return newState.filter(f=> f.id!==action.payload.id)
        }
        case "ADD-TODOLIST":{
            return [...state, {id: action.payload.id,title: action.payload.title, filter: 'all' as FilterValuesType} ]
        }
        case "CHANGE-TODOLIST-TITLE":{
            let newState=[...state]
            return newState.map(m=> m.id === action.payload.id ? {...m, title:action.payload.title}:m)
        }
        case "CHANGE-TODOLIST-FILTER":{
            let newState=[...state]
            return newState.map(m=>m.id===action.payload.todolistId? {...m, filter: action.payload.value}: m)
        }
        default: return state
    }
}

type mainType = RemoveTodolistACType | AddTodolistACType | ChangeTitleTodolistACType | ChangeFilterTodolistACType
export type RemoveTodolistACType = ReturnType<typeof RemoveTodolistAC>
export type AddTodolistACType = ReturnType<typeof AddTodolistAC>
type ChangeTitleTodolistACType = ReturnType<typeof ChangeTitleTodolistAC>
type ChangeFilterTodolistACType = ReturnType<typeof ChangeFilterTodolistAC>

export const RemoveTodolistAC = (id: string) => {
    return{
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    } as const

}
export const AddTodolistAC = (title: string,) => {
    return{
        type: 'ADD-TODOLIST',
        payload: {
            title,
            id: v1(),

        }
    } as const
}
export const ChangeTitleTodolistAC = (todoListId2: string, newTodolistTitle: string) => {
    return{
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id: todoListId2,
            title: newTodolistTitle
        }
    } as const
}
export const ChangeFilterTodolistAC = (value: FilterValuesType, todolistId: string) => {
    return{
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            value,
            todolistId
        }
    } as const
}