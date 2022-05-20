import mongoose from "mongoose";

const connectDatabase = (databaseUrl) => {
    mongoose.connect(databaseUrl)
        .then((db) => console.log(`Connected to database : ${db.connection.host}`) )
        .catch(error => console.log(`Unable to connect to database: ${error.message}`))
};

export default connectDatabase;