const mongoose = require('mongoose');

const mongooseURI = 'mongodb://localhost:27017/icarnet';

const mongooseToConnect = async() => {
    mongoose.connect(mongooseURI, await
        console.log('connection successful')
    )}

module.exports = mongooseToConnect