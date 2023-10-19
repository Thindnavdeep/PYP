const  mongoose  = require('mongoose');
const schema = mongoose.Schema;

const civil_subject = new schema({
    Subjects: {
        type: String,
        required: true,
        unique: true
    }
},{
    timestamps: true
});
var CIVIL_subject = mongoose.model('CIVIL_SUBJECT', civil_subject);

module.exports = CIVIL_subject;