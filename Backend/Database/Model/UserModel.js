import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,       
    },
    image: {
        type: {
            public_id : String,
            url : String
        }, 
        default: null,
    },
});



const User = mongoose.model('User', userSchema);

export default User;
