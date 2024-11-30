// schema.js the database schema
import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    Name: String,
    Email:
    {
        type: String,
        required: true,
        unique: true
    },
    Password: String
});

export default mongoose.model('User', schema);
