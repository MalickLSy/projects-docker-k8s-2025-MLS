const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port= process.env.PORT;

app.use(express.json());


console.log('Connecting to DB ');
mongoose.connect(`mongodb://mongodb/${process.env.KEY_VALUE_DB}`, {
    auth:{
        username: process.env.KEY_VALUE_USER,
        password: process.env.KEY_VALUE_PASSWORD
    },
    connectTimeoutMS : 500
})
.then(()=> { 
    app.listen(port , ()=>{
        console.log(`Server Listening on port ${port}`);
    });
    console.log('Connected to DB ');
  })
.catch(err => {
    console.log('ERROR DETECTED');
    console.error(err);
});

