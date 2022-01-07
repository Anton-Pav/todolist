import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox, Delete} from "@material-ui/icons";

export type AddItemPropstype = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemPropstype) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<boolean>(false)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false);
        if (e.key=== 'Enter') {
            addItem();
        }
    }
    const addItem = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.addItem(newTitle);
            setTitle("");
        } else {
            setError(true);
        }
    }
    return (
        <div>

            <div>
                <TextField value={title}
                           variant='outlined'
                           size='small'
                           onChange={onChangeHandler}
                           onKeyPress={onKeyPressHandler}
                           error={error}
                           label={error ? 'Title is requied!' : ''}
                           id='outlined-basic'
                />
                <IconButton color='primary' onClick={addItem} aria-label="delete">
                    <AddBox/>
                </IconButton>
            </div>
        </div>
    );
}

export default AddItemForm;
