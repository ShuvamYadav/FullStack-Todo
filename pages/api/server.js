const mongoose = require('mongoose');
const Todo = require('./models/data');
const express = require("express");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

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
   const newTodo= new Todo({
       todo:req.body.text
   })
   newTodo.save();
   res.json(newTodo);
})

app.put('/todos/update', async(req,res) =>{
    const user = await Todo.find();
    await user.todo.push(req.body.text);
    user.save();
    res.json(user);
})
app.delete("/todos",async(req,res)=>{
    const user = await Todo.find();
    await user.todo.pull(req.body.text);
    await user.save();
    res.json(user);
})