const express = require('express');
const mongoose= require('mongoose');

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/', (req,res)=>{
   res.json({message :'Hello from notebooks !'}); 
});

mongoose.connect(process.env.DB_URL).then(()=>{
  console.log('Connect to MongoDB ! Starting server.')
  app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
});  
}).catch(err =>{
    console.error('Something went wront');
    console.log(err);
})

