const mongoose = require("mongoose")

const Mongoose_URI = "mongodb://localhost:27017"

const ConnectToMongo=async()=>{
    try {
        await mongoose.connect(Mongoose_URI)
        console.log("Connected To Mongo Successfully");
    }catch(err){
        console.error("Error connecting to MongoDB:", err);
    }
}

module.exports = ConnectToMongo