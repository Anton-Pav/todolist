import axios from "axios";

const instance = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1',
    headers: {
        'API-KEY': '02966c83-5746-408b-bcc9-587459491eff'
    },
    withCredentials: true
})

export const todolistApi = {
    getTodos(){
        return instance.get<Array<TodoType>>('/todo-lists')
    },
    createTodo(title: string){
        return  instance.post<BaseResponseType<{item: TodoType}>>('/todo-lists', {title})

    },
    deleteTodo(todolistId: string){
        return  instance.delete<BaseResponseType>(`/todo-lists/${todolistId}`)

    },
    updateTodoTitle(todolistId: string, title: string){
        return instance.put<BaseResponseType>(`/todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string){
        return instance.get<GetTasksRes>(`/todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string){
        return  instance.delete<BaseResponseType>(`/todo-lists/${todolistId}/tasks${taskId}`)
    },
    createTask(todolistId:string ,title: string) {
        return instance.post<BaseResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId:string ,title: string, taskId: string) {
        return instance.put<BaseResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title})
    },
}

type BaseResponseType<T = {}> = {
    resultCode: number
    fieldsErrors: Array<string>
    messages: Array<string>
    data: T
}
type TodoType = {
    addedDate: string
    id: string
    order: number
    title: string
}
export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}
type GetTasksRes = {
    error: string | null
    totalCount: number
    items: TaskType[]
}



