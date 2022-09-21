import React, { useRef } from 'react'
import './InputField.css'

type Props = {
    todo: string,
    setTodo: React.Dispatch<React.SetStateAction<string>>,
    handleAdd: (e: React.FormEvent) => void
}

const InputField: React.FC<Props> = (props) => {
    const inputRef = useRef<HTMLInputElement>(null);


    return (
        <form
            className='input'
            onSubmit={(e) => {
                props.handleAdd(e);
                inputRef.current?.blur();
            }}>
            <input
                ref={inputRef}
                type={'text'}
                placeholder={"Enter a task"}
                className='input__box'
                value={props.todo}
                onChange={(e) => props.setTodo(e.target.value)}
            />
            <button className='input__submit' type='submit'>Go</button>
        </form>
    )
}

export default InputField