const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema(
    {
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true,},
        toDo: [{type: Schema.Types.ObjectId, ref: 'ToDo'}]
    }
);
//Export Model
module.exports = mongoose.model('User', UserSchema);

