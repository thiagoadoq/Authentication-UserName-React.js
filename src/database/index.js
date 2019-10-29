const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://thiagoaadb:13234578@cluster0-owogr.mongodb.net/test?retryWrites=true&w=majority', { userMongoClient: true });

mongoose.Promise = global.Promise;

module.exports = mongoose;