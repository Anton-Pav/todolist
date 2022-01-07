import React, {ChangeEvent, useState} from 'react';

export type EditablePropsType = {
    title: string
    changeTitle:(newTitle: string) => void
}

function EditableSpan(props: EditablePropsType) {
    const[title, setTitle] = useState<string>(props.title)
    const[editSpan, setEditSpan] = useState<boolean>(false);
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.currentTarget.value
        setTitle(newTitle)
    }
    const offEditMode = () => {
        setEditSpan(false)
        props.changeTitle(title)
    }
    const onEditMode = () => {
        setEditSpan(true)
    }

    return(
            editSpan
            ? <input
                value={title}
                onChange={onChangeTitle}
                autoFocus
                onBlur={offEditMode}/>
            : <span onDoubleClick={onEditMode}>{title}</span>
    )
}

export default EditableSpan;
