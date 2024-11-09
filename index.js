const mongoose = require('mongoose');
const config = require('./config');
const app = require('./app');


mongoose.connect(config.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');


        //start the server
        app.listen(config.PORT, () => {
            console.log(`Server is running on port ${config.PORT}`);
        })
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });