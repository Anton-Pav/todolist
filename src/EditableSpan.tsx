import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}
const EditableSpan = (props: EditableSpanPropsType) => {
    const [title, setTitle] = useState<string>(props.title)

    const [editMode, setEditMode] = useState<boolean>(false)

    const onEditMode = () => setEditMode(true)

    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        editMode
            ? <input
                value={title}
                autoFocus
                onBlur={offEditMode}
                onChange={onChangeHandler}
            />
            : < span onDoubleClick={onEditMode}> {props.title} </span>
    );
};

export default EditableSpan;