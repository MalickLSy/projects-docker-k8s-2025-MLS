const express = require('express');
const mongoose = require('mongoose');
const { keyValueRouter } = require('./routes/store');
const { healthRouter } = require('./routes/health');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/health', healthRouter);
app.use('/store', keyValueRouter);

console.log('Connecting to DB...');
mongoose.connect(`mongodb://mongodb/${process.env.KEY_VALUE_DB}`, {
    user: process.env.KEY_VALUE_USER,
    pass: process.env.KEY_VALUE_PASSWORD,
    authSource: process.env.KEY_VALUE_DB, 
    connectTimeoutMS: 5000
})
.then(() => { 
    console.log('Connected to DB');
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
})
.catch(err => {
    console.error('ERROR DETECTED:', err);
});
