const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port= 3000;

app.use(express.json());


console.log('Connecting to DB ');
mongoose.connect('mongodb://mongodb/key-value-db', {
    auth:{
        username: 'key-value-user',
        password: 'key-value-password'
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

