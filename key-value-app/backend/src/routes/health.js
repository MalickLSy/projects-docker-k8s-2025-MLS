const express = require('express')

const healthRouter = express.Router(); 

healthRouter.post('/', (req,res)=>{
    res.status(200).json({ status: 'UP' });
});
healthRouter.get('/', (req,res)=>{});
healthRouter.put('/', (req,res)=>{});
healthRouter.delete('/', (req,res)=>{});

module.exports = {
    healthRouter,
}