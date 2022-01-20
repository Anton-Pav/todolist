import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";


const initialState: Array<TodolistType> = []

export const todolistsReducer = (state = initialState, action: mainType) => {
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

export type mainType = RemoveTodolistACType | AddTodolistACType | ChangeTitleTodolistACType | ChangeFilterTodolistACType
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type ChangeTitleTodolistACType = ReturnType<typeof changeTitleTodolistAC>
export type ChangeFilterTodolistACType = ReturnType<typeof changeFilterTodolistAC>

export const removeTodolistAC = (id: string) => {
    return{
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    } as const

}
export const addTodolistAC = (title: string) => {
    return{
        type: 'ADD-TODOLIST',
        payload: {
            title,
            id: v1()
        }
    } as const
}
export const changeTitleTodolistAC = (todoListId2: string, newTodolistTitle: string) => {
    return{
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id: todoListId2,
            title: newTodolistTitle
        }
    } as const
}
export const changeFilterTodolistAC = (value: FilterValuesType, todolistId: string) => {
    return{
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            value,
            todolistId
        }
    } as const
}