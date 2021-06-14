const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const userRouter = require('./Routes/userRoute');
const blogRouter = require('./Routes/blogRoute');
require('./models/user');
require('./models/blog');


mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI,{
    useNewUrlParser: true });
const app=express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.use(userRouter)
app.use(blogRouter)
app.listen(3000,()=>
{
    console.log("Server listening")
})