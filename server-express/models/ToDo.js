const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ToDoSchema = new Schema(
    {
        title: {type: String, required: true},
        description: {type: String, required: true},
        author: {type: Schema.Types.ObjectId, ref: "User"},
        dateCreated:{type:String},
        dateCompleted:{type:String},
        complete: {type:Boolean, default: false},
    }
);

//Export model
module.exports = mongoose.model("ToDo", ToDoSchema);