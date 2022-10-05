const mongoose =  require('mongoose');
const monogURI = "mongodb://localhost:27017"

const connectToMongo = ()=>{
    mongoose.connect(monogURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;