const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    company: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Company'
    },
    students: [
        {
            student:{
                type: mongoose.SchemaType.ObjectId,
                ref: 'Student',
                required: true
            },
            status: {
                type: String,
                enum: ['Pass', 'Fail', 'On Hold', 'Did not attempt']
            },
            dateApplied: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    dateOfInteview: {
        type: Date,
        required: true
    }
},{
    timestamps: true
});

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;