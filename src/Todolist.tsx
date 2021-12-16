import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import MapTasks from "./MapTasks";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    todolistID: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (todolistID: string, taskId: string, title: string) => void
    changeTodoTitle: (todolistID: string, title: string) => void
}

export function Todolist(props: PropsType) {

    const addTask = (title: string) => props.addTask(props.todolistID, title)
    const onAllClickHandler = () => props.changeFilter(props.todolistID, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistID, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID, "completed");
    const changeTitleTodoLists = (newTitle: string) => {
        props.changeTodoTitle(props.todolistID, newTitle)
    }

    return <div>

        <h3>
            <EditableSpan title={props.title} changeTitle={changeTitleTodoLists}/>
            <button onClick={() => props.removeTodolist(props.todolistID)}>X</button>
        </h3>
        <AddItemForm addItem={addTask}/>

        <MapTasks tasks={props.tasks}
                  removeTask={props.removeTask}
                  todolistID={props.todolistID}
                  changeTaskTitle={props.changeTaskTitle}
                  changeTaskStatus={props.changeTaskStatus}
        />

        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
