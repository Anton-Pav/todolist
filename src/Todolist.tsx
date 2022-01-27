import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from './App';
import EditableSpan from "./EditableSpan";
import AddItemForm from "./AddItemForm";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {TaskRedux} from "./TaskRedux";

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

export const Todolist = React.memo((props: PropsType) => {

    console.log('todolist is called')

    const addTask = useCallback((title: string) => props.addTask(title, props.id), [props.addTask, props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);

    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);

    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);

    const removeTodolist = () => props.removeTodolist(props.id)

    const changeTodoTitle = useCallback((newTitle: string) => {
        props.changeTodoTitle(props.id, newTitle)
    }, [props.changeTodoTitle, props.id])

    let tasksForTodolist = props.tasks;
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
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
                   return <TaskRedux
                       todolistId={props.id}
                       taskId={t.id}
                       key={t.id}
                   />
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
})


