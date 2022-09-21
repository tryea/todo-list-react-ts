import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Todo } from '../model';
import SingleTodo from './SingleTodo';
import './TodoList.css';

type Props = {
    todos: Array<Todo>,
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    completedTodos: Array<Todo>,
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>,


}

const TodoList: React.FC<Props> = (props) => {
    return (
        <div className='container'>
            <Droppable droppableId='TodosList'  >
                {(provided, snapshot) => (
                    <div className={`todos ${snapshot.isDraggingOver ? 'drag-active' : ''}`} {...provided.droppableProps} ref={provided.innerRef}>
                        <span className='todos__heading'>Active Tasks</span>
                        {props.todos.map((todo, index) => {
                            return (
                                <SingleTodo key={todo.id} index={index} todo={todo} todos={props.todos} setTodos={props.setTodos} />
                            )
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId='CompletedTodosList'>
                {(provided, snapshot) => (
                    <div className={`todos complete ${snapshot.isDraggingOver ? 'drag-complete' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
                        <span className='todos__heading'>Completed Tasks</span>
                        {props.completedTodos.map((todo, index) => {
                            return (
                                <SingleTodo key={todo.id} index={index} todo={todo} todos={props.completedTodos} setTodos={props.setCompletedTodos} />
                            )
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
};

export default TodoList;