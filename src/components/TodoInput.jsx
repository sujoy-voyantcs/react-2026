import { useState, useEffect } from "react";

function TodoInput({ onSubmit, editTodo }) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (editTodo) {
      setText(editTodo.text);
    }
  }, [editTodo]);

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit(text);
    setText("");
  };

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter task..."
      />
      <button onClick={handleSubmit}>
        {editTodo ? "Update" : "Add"}
      </button>
    </div>
  );
}

export default TodoInput;