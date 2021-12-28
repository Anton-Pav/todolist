import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@material-ui/core";

type AddItemFormType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormType) => {
    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle);
        } else {
            setError(true);
        }
        setTitle("");
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false);
        if (e.key === 'Enter') {
            addItem();
        }
    }
    const errorMessage = <div style={{color: 'red'}}>Title is required!</div>
    return (
        <div>
            {/*<input value={title}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyPress={onKeyPressHandler}*/}
            {/*       className={error ? "error" : ""}*/}
            {/*/>*/}
            <TextField id="outlined-basic"
                       label={error ? "Title is required" : ''}
                       error={error}
                       variant="outlined"
                       size="small"
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}/>
            {/*<button onClick={addItem}>+</button>*/}
            <Button style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px'}} variant='contained' onClick={addItem} disabled={error}>+</Button>
            {/*{error && <div className='error-message'>{error}</div>}*/}
        </div>
    );
};

export default AddItemForm;