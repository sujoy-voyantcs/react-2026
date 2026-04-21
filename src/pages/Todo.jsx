import { useState } from "react";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import Filter from "../components/Filter";
import "../App.css";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editTodo, setEditTodo] = useState(null);

  const handleAddOrUpdate = (text) => {
    if (editTodo) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editTodo.id ? { ...todo, text: text } : todo
      );
      setTodos(updatedTodos);
      setEditTodo(null);
    } else {
      const newTodo = {
        id: Date.now(),
        text: text,
        completed: false,
      };
      setTodos([...todos, newTodo]);
    }
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleToggle = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") {
      return todo.completed === false;
    }
    if (filter === "done") {
      return todo.completed === true;
    }
    return true;
  });

  return (
    <div className="todo">
      <h1>Todo App</h1>

      <TodoInput onSubmit={handleAddOrUpdate} editTodo={editTodo} />

      <Filter setFilter={setFilter} />

      <TodoList
        todos={filteredTodos}
        onDelete={handleDelete}
        onToggle={handleToggle}
        onEdit={setEditTodo}
      />
    </div>
  );
}

export default Todo;