import React, { useState } from "react";
// import fetch from "node-fetch";

const api_base = "http://localhost:3001";

function MyApp() {
  const [todo, setTodo] = useState([]);
  const [NewTodo, setNewTodo] = useState("");
  const [PopupActive, setPopupActive] = useState(true);
  const [NewUsername, setNewUsername] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [CurrentUser, setCurrentUser] = useState("");
  const [CurrentPass, setCurrentPass] = useState("");

  const addTodo = async () => {
    const data = await fetch(api_base + "/todos/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: CurrentUser,
        password: CurrentPass,
        todo: NewTodo
      })
    }).then((res) => {
        if (res.status >= 400 && res.status < 600) {
          throw new Error(res.message);
        }
        res.json();
      })
      .catch((err) => {
        alert(err);
      });
    // setPopupActive(false);
    console.log(data);
    setTodo(data.todo);
  };


  const deleteTodo = async (toRemove) => {
    const data = await fetch(api_base + "/todos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: CurrentUser,
        password: CurrentPass,

      })
    }).then((res) => {
        if (res.status >= 400 && res.status < 600) {
          throw new Error(res.message);
        }
        res.json();
      })
      .catch((err) => {
        alert(err);
      });

    setTodo(data.todo);
    console.log(data);
  };


  const registerUser = async () => {
    const data = await fetch(api_base + "/todos/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: NewUsername,
        password: NewPassword,
      })
    })
      .then((res) => {
        if (res.status >= 400 && res.status < 600) {
          throw new Error(res.message);
        }
        res.json();
      })
      .catch((err) => {
        alert(err);
      });
    console.log(data);
    // (data.todo  ? setTodo(data.todo) : setTodo([]);
    // setPopupActive(false);
    setCurrentUser(NewUsername);
    setCurrentPass(NewPassword);
    // setNewPassword("");
    // setNewUsername("");
  };

  const loginUser = async () => {
    const data = await fetch(api_base + "/todos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: NewUsername,
        password: NewPassword,
      })
    })
      .then((res) => {
        if (res.status >= 400 && res.status < 600) {
          throw new Error(res.message);
        }
        res.json();
      })
      .catch((err) => {
        alert(err);
      });

    // setPopupActive(false);
    console.log(data);

    setCurrentUser(NewUsername);
    setCurrentPass(NewPassword);

    // setNewPassword("");
    // setNewUsername("");
  };

  return (
    <>
      <h1>Todo List</h1>
      <h2>Add Todo</h2>
      <input
        type="text"
        name="todo"
        value={NewTodo}
        onChange={(e) => {
          setNewTodo(e.target.value);
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

      {/* <div className="addPopup" onClick={() => setPopupActive(true)}>
        Login/Register
      </div> */}

      {PopupActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopupActive(false)}>
            X
          </div>
          <div className="content">
            <h3>Username</h3>
            <input
              type="text"
              className="add-todo-input"
              onChange={(e) => setNewUsername(e.target.value)}
              value={NewUsername}
            />
            <h3>Password</h3>
            <input
              type="text"
              className="add-todo-input"
              onChange={(e) => setNewPassword(e.target.value)}
              value={NewPassword}
            />
            <button className="button" onClick={registerUser}>
              Register
            </button>
            <button className="button" onClick={loginUser}>
              Login
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default MyApp;
