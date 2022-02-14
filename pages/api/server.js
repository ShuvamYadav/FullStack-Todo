const mongoose = require('mongoose');
const Todo = require('./models/data');
const express = require("express");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/full-stack-todo", {
	useNewUrlParser: true, 
	useUnifiedTopology: true 
}).then(()=>console.log("Connected to full-stack-todo")).catch(console.err);


app.listen(3001,()=>{console.log("listening to client on port 3001")});

app.get('/todos', async (req,res) => {
    const todos = await Todo.find();
    res.json(todos);
})

app.post('/todos/new', async (req,res) => {
    const data = req.body.text;
    const result = await Todo.find();
    result.todo.push(data);
    await result.save();

})

app.put('/todo/update', async(req,res) =>{
    const user = await Todo.find();
    user.todo = [...user.todo , req.body.text];
    user.save();
    res.json(user);
})

