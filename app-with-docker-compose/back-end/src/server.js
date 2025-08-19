const express = require('express');
const mongoose = require('mongoose');
const { keyValueRouter } = require('./routes/store');
const { healthRouter } = require('./routes/health');

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use('/health', healthRouter);
app.use('/store', keyValueRouter);



console.log('Connecting to DB...');
mongoose.connect(`mongodb://mongodbsy/${process.env.KEY_VALUE_DB}`, {
   auth:{
        username: process.env.KEY_VALUE_USER,
        password: process.env.KEY_VALUE_PASSWORD
    },
    connectTimeoutMS: 500
})
.then(() => { 
    console.log('Connected to DB!   !');
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
})
.catch(err => {
    console.error('ERROR DETECTED:', err);
});
