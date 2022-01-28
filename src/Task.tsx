import React, {ChangeEvent, useCallback} from 'react';
import {TaskType} from "./Todolist";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";


export type TaskPropsType = {
    todolistId: string
    task: TaskType
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId:string, newIsDoneValue: boolean, todolistId: string) => void
    changeTaskTitle:(todolistId:string, taskId:string, newTitle:string) => void
}

export const Task = React.memo(({task, removeTask, todolistId,changeTaskStatus, changeTaskTitle}:TaskPropsType)=>{
    console.log('task')
     const newChangeTaskTitle = useCallback((newTitle: string) => {
        changeTaskTitle(todolistId, task.id, newTitle)
    },[task.id, changeTaskTitle, todolistId])

    const onClickHandler = (() => removeTask(task.id, todolistId))

    const onChangeHandler =((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue, todolistId);
    })

    return  <div key={task.id} className={task.isDone ? "is-done" : ""}>
        <Checkbox checked={task.isDone} onChange={onChangeHandler} color='primary'/>
        <EditableSpan title={task.title} changeTitle={newChangeTaskTitle}/>
        <IconButton onClick={onClickHandler} aria-label="delete">
            <Delete/>
        </IconButton>
    </div>
})