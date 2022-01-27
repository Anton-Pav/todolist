import React, {ChangeEvent, useCallback} from 'react';
import {TaskType} from "./Todolist";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasksReducer";


export type TaskPropsType = {
    todolistId: string
    taskId: string
}

export const TaskRedux = React.memo(({todolistId, taskId}: TaskPropsType) => {

    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todolistId]
        .filter(task => task.id === task.id)[0])

    const dispatch = useDispatch()

    const newChangeTaskTitle = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    }, [task.id, todolistId])

    const onClickHandler = useCallback(() => dispatch(removeTaskAC(taskId, todolistId)), [taskId, todolistId])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(taskId, newIsDoneValue, todolistId));
    }, [taskId, todolistId])

    return <div key={task.id} className={task.isDone ? "is-done" : ""}>
        <Checkbox checked={task.isDone} onChange={onChangeHandler} color='primary'/>
        <EditableSpan title={task.title} changeTitle={newChangeTaskTitle}/>
        <IconButton onClick={onClickHandler} aria-label="delete">
            <Delete/>
        </IconButton>
    </div>
})