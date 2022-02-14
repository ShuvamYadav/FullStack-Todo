import React, { useState } from "react";

function MyApp({ Component, pageProps }) {
  function addTodo() {
    setTodo([...todo, input]);
    console.log(todo);
    setInput("");
  }
  function deleteTodo(e) {
    setTodo((todo) => todo.filter((i) => i != e));
    console.log("deleted");
  }
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");
  return (
    <>
      <h1>Todo List</h1>
      <h2>Add Todo</h2>
      <input
        type="text"
        name="todo"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <button name="submit" type="submit" onClick={addTodo}>
        Add
      </button>
      <div>
        <h3>Todos</h3>
        <ul>
          {todo.map((e) => (
            <li>
              {e}
              <button name="delete" type="submit" onClick={() => deleteTodo(e)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default MyApp;
