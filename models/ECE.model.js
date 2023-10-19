const  mongoose  = require('mongoose');
const schema = mongoose.Schema;

const ece_subject = new schema({
    Subjects: {
        type: String,
        required: true,
        unique: true
    }
},{
    timestamps: true
});
var ECE_subject = mongoose.model('ECE_SUBJECT', ece_subject);

module.exports = ECE_subject;