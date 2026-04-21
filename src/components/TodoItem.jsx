function TodoItem({ todo, onDelete, onToggle, onEdit }) {
  return (
    <li style={{ marginBottom: "10px" }}>
      <span
        onClick={() => onToggle(todo.id)}
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        {todo.text}
      </span>

      <button onClick={() => onEdit(todo)}>Edit</button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}

export default TodoItem;