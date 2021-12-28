import React, {ChangeEvent} from 'react';
import {TaskType} from "./Todolist";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";

type PropsType = {
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    todolistID: string
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistID: string, taskId: string, title: string) => void

}

const MapTasks = ({tasks, removeTask, todolistID, changeTaskStatus, changeTaskTitle, ...props}: PropsType) => {
    return (
        <ul>
            {
                tasks.map(t => {
                    const changeTitleTasks = (newTitle: string) => {
                        changeTaskTitle(todolistID, t.id, newTitle)
                    }

                    const onClickHandler = () => removeTask(todolistID, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(todolistID, t.id, e.currentTarget.checked);
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditableSpan title={t.title} changeTitle={changeTitleTasks}/>
                        <IconButton onClick={onClickHandler}aria-label="delete">
                            <Delete/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
    );
};

export default MapTasks;