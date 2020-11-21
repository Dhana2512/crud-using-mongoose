'use strict';
const express = require('express');
const bodyParser =require('body-parser');
const { v4: uuid} = require('uuid');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 3000;

const app = express();
app.use(bodyParser.json());
const user = mongoose.model('user', {
     name: String,
     id : { type:String, default:uuid }
    });

//create new user
app.post('/users', (req,res)  =>{
    user.create(req.body)
    .then( (result) => {
        res.json(result);
    })
    .catch((error) => {
        res.status(500).json(error);
    });
}); 

//retrive the list of users
app.get('/users',(req,res) => {
    user.find({})
    .then((results) => {
        res.json({
            data : results,
            totalcount :results.length
        });
    })
    .catch((error) => {
        res.status(500).json(error);
    });
});

//update new user by id
app.put('/users/:id', (req,res)  =>{
    user.findOneAndUpdate({ id: req.params.id }, req.body, { new: true})
    .then( (result) => {
        res.json(result);
    })
    .catch((error) => {
        res.status(500).json(error);
    });
}); 

//delete user by id
app.delete('/users/:id', (req,res)  =>{
    user.findOneAndDelete({ id:  req.params.id})
    .then( (result) => {
        res.json(result);
    })
    .catch((error) => {
        res.status(500).json(error);
    });
}); 

app.listen(port,() => {
    console.log(`server listening at port ${port}`);
});
