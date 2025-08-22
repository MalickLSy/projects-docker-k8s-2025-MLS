const express = require('express');
const mongoose= require('mongoose');
const { noteRouter } = require('./routes');

const app = express();
app.use(express.json());

app.use('/api/notes',noteRouter);

const port = process.env.PORT;
mongoose.connect(process.env.DB_URL).then(()=>{
  console.log('Connect to MongoDB ! Starting server.');
  app.listen(port, ()=>{
    console.log(`Notes Server listening on port ${port}`);
});  
}).catch(err =>{
    console.error('Something went wront');
    console.log(err);
})

