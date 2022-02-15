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
    const todos = await Todo.findOne({name:req.body.name});
    res.json(todos);
})

app.get("/todos/all",async(req,res)=>{
    const users = await Todo.find();
    res.json(users)
})
app.post('/todos/new', async (req,res) => {
   const newTodo= new Todo({
       name:req.body.name,
       todo:req.body.text,
       password:req.body.password
   })
   newTodo.save();
   res.json(newTodo);
})

app.put('/todos/update', async(req,res) =>{
    const user = await Todo.findOne({name:req.body.name});
    if(!user){
        res.status(404).send("No user found")
    }
    else{
        if(user.password===req.body.password){
            await user.todo.push(req.body.text);
            user.save();
            res.json(user);
        }
        else{
            res.status(404).send("Incorrect password")
        }
    }
})
app.delete("/todos",async(req,res)=>{
    const user = await Todo.findOne({name:req.body.name});
    if(!user){
        res.status(404).send("No user found")
    }
    else{
        if(user.password===req.body.password){
            await user.todo.pull(req.body.text);
            await user.save();
            res.json(user);
        }
        else{
            res.status(404).send("Incorrect password")
        }
    } 
})