const  mongoose  = require('mongoose');
const schema = mongoose.Schema;

const mech_subject = new schema({
    Subjects: {
        type: String,
        required: true,
        unique: true
    }
},{
    timestamps: true
});
var MECH_subject = mongoose.model('MECH_SUBJECT', mech_subject);

module.exports = MECH_subject;