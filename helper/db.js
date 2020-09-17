const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://samedbicer:888999000@cluster0.5no4a.mongodb.net/FH?retryWrites=true&w=majority', {
        useMongoClient: true
    });
    mongoose.connection.on('open', () => {
        console.log("MongoDB Connected **");
    });
    mongoose.connection.on('error', (err) => {
        console.log("**MongoDB Error ", err);
    });

    mongoose.Promise = global.Promise;
}