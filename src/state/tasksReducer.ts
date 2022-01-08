import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType} from "./todolistReducer";

export const tasksReducer = (state:TasksStateType, action: mainType):TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state,[action.todolistId]:state[action.todolistId].filter(task=> task.id!==action.id)}
        case "ADD-TASK":
            return {...state,[action.todolistId]:[{id:v1(),title:action.title,isDone:false}, ...state[action.todolistId] ]}
        case "CHANGE-TASK-STATUS":
            return {...state,[action.todoListId]:state[action.todoListId].map(task=>task.id===action.taskId ?{...task,isDone:action.isDone}:task )}
        case "CHANGE-TASK-TITLE":
            return {...state,[action.todolistId]:state[action.todolistId].map(task=>task.id===action.taskId?{...task,title:action.title}:task)}
        case "ADD-TODOLIST":
            return {...state, [action.payload.id]: []}
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete state[action.payload.id]
            return copyState
        default: return state
    }
}

type mainType = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType | ChangeTaskTitleACType | AddTodolistACType| RemoveTodolistACType
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

export const removeTaskAC = (id: string, todolistId: string) => {
    return{
        type: 'REMOVE-TASK',
        id,
        todolistId

    } as const

}
export const addTaskAC = (title: string, todolistId: string) => {
    return{
        type: 'ADD-TASK',
        title,
        todolistId

    } as const
}
export const changeTaskStatusAC = (taskId:string, isDone: boolean,todoListId: string) => {
    return{
        type: 'CHANGE-TASK-STATUS',
        taskId,
        todoListId,
        isDone
    } as const
}
export const changeTaskTitleAC = (taskId:string,title:string,todolistId:string) => {
    return{
        type: 'CHANGE-TASK-TITLE',
        taskId,
        title,
        todolistId

    } as const
}
