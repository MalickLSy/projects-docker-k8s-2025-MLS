const express = require('express');
const mongoose= require('mongoose');

const app = express();
const port= 3001;

app.use(express.json());

app.get('/', (req, res)=>{
    res.json({message : 'hello from notes-backend'});
});

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
});