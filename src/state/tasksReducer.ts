import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {addTodolistAC, AddTodolistACType, RemoveTodolistACType} from "./todolistReducer";

export type RemoveTaskACType = {
    type: 'REMOVE-TASK'
    taskId: string,
    todolistId: string
}
export type AddTaskACType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type changeTaskStatusACType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone:boolean
    todolistId: string
}
export type changeTaskTitleACType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title:string
    todolistId: string
}

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: mainType) => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}

        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        case "CHANGE-TASK-STATUS":
            return {...state,[action.todolistId]:state[action.todolistId]
                    .map(task=>task.id===action.taskId ? {...task, isDone:action.isDone}: task)}
        case "CHANGE-TASK-TITLE":
            return {...state,[action.todolistId]:state[action.todolistId]
                    .map(task=> task.id===action.taskId?{...task,title:action.title}:task)}
        case "ADD-TODOLIST":
            return {...state, [action.payload.id]:[]}
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
        default:
            return state
    }
}
export type mainType = RemoveTaskACType | AddTaskACType | changeTaskStatusACType | changeTaskTitleACType | AddTodolistACType | RemoveTodolistACType

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskACType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskACType => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId:string): changeTaskStatusACType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone,todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId:string): changeTaskTitleACType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title,todolistId}
}
