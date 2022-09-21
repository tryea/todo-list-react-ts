import React, { useEffect, useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from './model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [completedTodos, setCompletedTodos] = useState<Array<Todo>>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), isDone: false, todo: todo }]);
      setTodo('');
    }
  }

  useEffect(() => {
    console.log(todo);
  }, [todo])

  useEffect(() => {
    console.log(todos);
  }, [todos])

  const onDragEnd = (result: DropResult) => {
    console.log(result)
    const newTodos = todos.slice();
    const newCompletedTodos = completedTodos.slice();

    if (result.destination) {

      let movedComponent = newTodos[result.source.index];

      if (result.source.droppableId === "TodosList") {
        newTodos.splice(result.source.index, 1)
      } else {
        movedComponent = newCompletedTodos[result.source.index]
        newCompletedTodos.splice(result.source.index, 1)
      }

      if (result.destination.droppableId === "TodosList") {
        newTodos.splice(result.destination.index, 0, movedComponent);
      } else {
        newCompletedTodos.splice(result.destination.index, 0, movedComponent);
      }

      setTodos(newTodos)
      setCompletedTodos(newCompletedTodos)
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className='heading'>Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} />
      </div>
    </DragDropContext>
  );
}

export default App;
