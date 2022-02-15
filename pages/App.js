import React, { useState } from "react";
// import fetch from "node-fetch";

const api_base = "http://localhost:3001";

function MyApp({ Component, pageProps }) {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");
  const [popupActive, setPopupActive] = useState(true);
  const [NewUsername, setNewUsername] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [CurrentUser, setCurrentUser] = useState("");
  const [CurrentPass, setCurrentPass] = useState("");

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

  const registerUser = async () => {
    console.log(NewUsername);
    console.log(NewPassword);
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
        if(res.status >= 400 && res.status < 600){
          throw new Error(res.message);
        } 
        else{
          console.log("in Register user then");
          setPopupActive(false);
          res.json();
          // setTodo(res.todo);
          // var jsonObj = JSON.parse(res.json);
          setTodo(res.todo);
          setCurrentUser(NewUsername);
          setCurrentPass(NewPassword);
        }
      })
      .catch((err) => {
        // console.log(err);
        console.log("in catch");
        alert(err);
      });

      setNewPassword("");
      setNewUsername("");
  };

  const loginUser = async () => {
    // console.log(NewUsername);
    // console.log(NewPassword);
    const data = await fetch(api_base + "/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: NewUsername,
        password: NewPassword,
      })
    })
      .then((res) => {
        // res.json();
        console.log("in Loginuser then");
        setPopupActive(false);
        // setTodo(res.todo);
        var jsonObj = JSON.parse(res);
        setTodo(jsonObj.todo);
        setCurrentUser(NewUsername);
        setCurrentPass(NewPassword);
      })
      .catch((err) => {
        // console.log(err);
        console.log("in catch");
        alert("Username does not exist");
      });

      setNewPassword("");
      setNewUsername("");

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

      {/* <div className="addPopup" onClick={() => setPopupActive(true)}>
        Login/Register
      </div> */}

      {popupActive ? (
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
