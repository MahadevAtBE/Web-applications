import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50, // Limit to prevent overly long titles
    },
    email: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50, // Limit to prevent overly long titles
    },
    message: {
        type: String,
        required: true,
        trim: true,
        // maxlength: 300, // Limit to prevent overly long titles
    },
    company: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50, // Limit to prevent overly long titles
    },
});

// Exporting the model
const feedback = mongoose.models.feedback || mongoose.model('feedback', schema);
export default feedback;