import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import EditableSpan from "./EditableSpan";
import AddItemForm from "./AddItemForm";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    changeTodoTitle: (todoListID: string, title: string) => void
    changeTaskTitle: (todoListID: string, taskID: string, title: string) => void
}

export function Todolist(props: PropsType) {
    const addTask = (title: string) => props.addTask(title, props.id)
    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const removeTodolist = () => props.removeTodolist(props.id)

    const changeTodoTitle = (newTitle: string) => {
        props.changeTodoTitle(props.id, newTitle)
    }

    return <div>
        <h3><EditableSpan title={props.title} changeTitle={changeTodoTitle}/>
            <IconButton onClick={removeTodolist} aria-label="delete">
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const changeTaskTitle = (newTitle: string) => {
                        props.changeTaskTitle(props.id, t.id, newTitle)
                    }
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox checked={t.isDone} onChange={onChangeHandler} color='primary'/>
                        <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                        <IconButton onClick={onClickHandler} aria-label="delete">
                            <Delete/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button
                onClick={onAllClickHandler}
                color='primary'
                variant={props.filter === 'all' ? "contained" : 'outlined'}>All

            </Button>
            <Button
                onClick={onActiveClickHandler}
                color='primary'
                variant={props.filter === 'active' ? "contained" : 'outlined'}>Active
            </Button>
            <Button
                onClick={onCompletedClickHandler}
                color='primary'
                variant={props.filter === 'completed' ? "contained" : 'outlined'}>Completed
            </Button>
        </div>
    </div>
}


