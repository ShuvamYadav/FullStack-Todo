const mongoose = require("mongoose");
const Todo = require("./models/data");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const app = express();
app.use(express.json());
app.use(cors());
mongoose
  .connect("mongodb://127.0.0.1:27017/full-stack-todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to full-stack-todo"))
  .catch(console.err);

app.listen(3001, () => {
  console.log("listening to client on port 3001");
});

app.put("/todos", async (req, res) => {
  const user = await Todo.findOne({ username: req.body.username });
  if (!user) {
    res.status(404).send("No user found");
  } else {
    bcrypt.compare(req.body.password, user.password).then(async (isMatch) => {
      if (isMatch) {
        res.json(user);
      } else {
        res.status(404).send("Incorrect password");
      }
    });
  }
});

app.get("/todos/all", async (req, res) => {
  const users = await Todo.find();
  res.json(users);
});


app.post("/todos/new", async (req, res) => {
  if (!(await Todo.findOne({ username: req.body.username }))) {
    const newTodo = new Todo({
      username: req.body.username,
      password: req.body.password,
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newTodo.password, salt, (err, hash) => {
        if (err) throw err;
        newTodo.password = hash;
        newTodo.save().catch((err) => console.log(err));
      });
    });
    res.json(newTodo);
  } else {
    // return next(new Error('Username exist'));
    res.status(400).send("Username exist backend");
  }
});


app.put("/todos/update", async (req, res) => {
  const user = await Todo.findOne({ username: req.body.username });
  if (!user) {
    res.status(404).send("No user found");
  } else {
    bcrypt.compare(req.body.password, user.password).then(async (isMatch) => {
      if (isMatch) {
        await user.todo.push(req.body.todo);
        await user.save();
        res.json(user);
      } else {
        res.status(404).send("Incorrect password");
      }
    });
  }
});


app.delete("/todos", async (req, res) => {
  const user = await Todo.findOne({ username: req.body.username });
  if (!user) {
    res.status(404).send("No user found");
  } else {
    bcrypt.compare(req.body.password, user.password).then(async (isMatch) => {
      if (isMatch) {
        await user.todo.pull(req.body.todo);
        await user.save();
        res.json(user);
      } else {
        res.status(404).send("Incorrect password");
      }
    });
  }
});
