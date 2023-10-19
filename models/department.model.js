const  mongoose  = require('mongoose');
const schema = mongoose.Schema;

const deptSchema = new schema({
    Deptname: {
        type: String,
        required: true,
        unique: true
    }
},{
    timestamps: true
});
var dept = mongoose.model('DEPT', deptSchema);

module.exports = dept;