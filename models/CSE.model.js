const  mongoose  = require('mongoose');
const schema = mongoose.Schema;

const cse_subject = new schema({
    Subjects: {
        type: String,
        required: true,
        unique: true
    }
},{
    timestamps: true
});
var CSE_subject = mongoose.model('CSE_SUBJECT', cse_subject);

module.exports = CSE_subject;