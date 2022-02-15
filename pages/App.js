import React, { useState } from "react";
// import fetch from "node-fetch";

const api_base = "http://localhost:3001";

function MyApp({ Component, pageProps }) {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = async () => {
    await setTodo([...todo, input]);

    if (todo.length > 0) {
      const data = await fetch(api_base + "/todos/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: input,
        }),
      })
        .then((res) => res.json())
        .catch((err) => {
          console.log(err);
        });

      console.log(todo.length);
      setInput("");
    } else {
      const data = await fetch(api_base + "/todos/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: [input],
        }),
      })
        .then((res) => res.json())
        .catch((err) => {
          console.log(err);
        });

      console.log(todo.length);
      setInput("");
    }
  };
  const deleteTodo = async (e) => {
    const data = await fetch(api_base + "/todos", {
      method: "DELETE",
      body: JSON.stringify({
        text: e,
      }),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });

    setTodo((todo) => todo.filter((i) => i != e));
    console.log(data);
  };

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
