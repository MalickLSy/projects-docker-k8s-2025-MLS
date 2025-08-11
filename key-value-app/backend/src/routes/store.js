const express = require('express')

const keyValueRouter = express.Router(); 

keyValueRouter.post('/', (req,res)=>{
    return res.send('Creating keyvalue pair ');
});
keyValueRouter.get('/', (req,res)=>{});
keyValueRouter.put('/', (req,res)=>{});
keyValueRouter.delete('/', (req,res)=>{});

module.exports = {
    keyValueRouter,
}