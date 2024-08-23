// db.js
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Replace the URI with your MongoDB connection string
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/mern_project', {
            
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
