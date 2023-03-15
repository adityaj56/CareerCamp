const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    college: {
        type: String,
        required: true
    },
    placed: {
        type: String,
        enum: ['Placed', 'Not Placed'],
        default: 'Not Placed'
    },
    scores: {
        DSA: Number,
        wedD: Number,
        React: Number
    },
    interviews: [
        {
            type: mongoose.SchemaType.ObjectId,
            ref: 'Interview'
        }
    ]
},{
    timestamps: true
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;