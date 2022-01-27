import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

export type TaskPropsType = {
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (todoListID: string, taskID: string, title: string) => void
    task: TaskType
    todolistId: string
}

export const Task = React.memo(({task, todolistId, changeTaskTitle, changeTaskStatus, removeTask}: TaskPropsType) => {
    const NewTaskTitle = useCallback((newTitle: string) => {
        changeTaskTitle(todolistId, task.id, newTitle)
    }, [changeTaskTitle, todolistId, task.id])
    const onClickHandler = useCallback(() => removeTask(task.id, todolistId), [removeTask, task.id, todolistId])
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue, todolistId);
    }, [changeTaskStatus, task.id, todolistId])

    return <li key={task.id} className={task.isDone ? "is-done" : ""}>
        <Checkbox checked={task.isDone } onChange={onChangeHandler} color='primary'/>
        <EditableSpan title={task.title } changeTitle={NewTaskTitle}/>
        <IconButton onClick={onClickHandler} aria-label="delete">
            <Delete/>
        </IconButton>
    </li>

})
