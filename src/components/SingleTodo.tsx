import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '../model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import './SingleTodo.css';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
    todo: Todo,
    todos: Array<Todo>,
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    index: number
};

const SingleTodo: React.FC<Props> = (props) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(props.todo.todo);
    const inputRef = useRef<HTMLInputElement>(null)

    const handleDone = (id: number) => {
        const index = props.todos.findIndex((t) => t.id === id);

        const newTodos = props.todos.slice();
        newTodos[index].isDone = !newTodos[index].isDone;

        props.setTodos(newTodos);
    }

    const handleDelete = (id: number) => {
        const newTodos = props.todos.filter((t) => t.id !== id);
        props.setTodos(newTodos);
    }

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        const index = props.todos.findIndex((t) => t.id === id);

        const newTodos = props.todos.slice();
        newTodos[index].todo = editTodo;

        props.setTodos(newTodos);

        setEdit(false);
    }

    useEffect(() => {
        inputRef.current?.focus();

    }, [edit])


    return (
        <Draggable draggableId={props.todo.id.toString()} index={props.index}>
            {(provided, snapshot) => (
                <form
                    className={`todos__single ${snapshot.isDragging ? 'drag' : ''}`}
                    onSubmit={(e) => handleEdit(e, props.todo.id)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {edit ? (
                        <input
                            ref={inputRef}
                            value={editTodo}
                            onChange={(e) => { setEditTodo(e.target.value) }}
                            className='todos__single--text'
                        />
                    ) : (
                        <span className={`todos__single--text ${props.todo.isDone ? 'todo__done' : ''}`}>{props.todo.todo}</span>

                    )}
                    <div>
                        <span
                            className='icon'
                            onClick={(e) => {
                                if (!edit && !props.todo.isDone) {
                                    setEdit(!edit)
                                }
                            }}
                        ><AiFillEdit /></span>
                        <span className='icon' onClick={() => handleDelete(props.todo.id)}><AiFillDelete /></span>
                        <span className='icon' onClick={() => handleDone(props.todo.id)}><MdDone /></span>
                    </div>
                </form>
            )}
        </Draggable>
    )
};

export default SingleTodo;