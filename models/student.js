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
    placement: {
        type: String,
        enum: ['Placed', 'Not Placed'],
        default: 'Not Placed'
    },
    scores: {
        dsa: Number,
        webD: Number,
        react: Number
    },
    interviews: [
        {
            interview: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Interview'
            },
            status: {
                type: String,
                enum: ['pass', 'fail', 'on hold', 'did not attempt']
            },
            dateApplied: {
                type: Date,
                default: Date.now()
            },
            dateOfInterview: {
                type: Date,
                required: true
            }
        }
    ]
},{
    timestamps: true
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;