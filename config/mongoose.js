const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/careercamp_dev');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error occured while connecting to the database'));

db.on('open', function(){
    console.log('Database connected successfully!!');
});
