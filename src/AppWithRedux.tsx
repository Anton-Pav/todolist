import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import ButtonAppBar from "./AppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolistReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWitnRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>((state) => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks)

    const dispatch = useDispatch()
    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId))
        dispatch(removeTodolistAC(id))
    }, [dispatch])
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId));
    }, [dispatch])
    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(id, isDone, todolistId));
    },[dispatch])
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeFilterTodolistAC(value, todolistId))
    },[dispatch])
    const removeTodolist = useCallback((id: string) => {
        const action = removeTodolistAC(id)
        dispatch(action);
        dispatch(action);
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)

    }, [dispatch])
    const changeTaskTitle = useCallback((taskId: string, title: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todoListId))
    }, [dispatch])
    const changeTodoTitle = useCallback((todoListId: string, title: string) => {
        dispatch(changeTitleTodolistAC(todoListId, title))
    }, [dispatch])

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoTitle={changeTodoTitle}
                                    />
                                </Paper>
                            </Grid>

                        })
                    }
                </Grid>

            </Container>


        </div>
    );
}

export default AppWitnRedux;
