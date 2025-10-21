import {Schema, model} from "mongoose"

const taskSchema = new Schema({
    FirstName: {
        type: String,
        required: true
    },

    Phone: {
        type: Number,
        required: true
    },

    Notes: {
        type: String,
        required: true
    },

    asignedTo: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

export const Task = model("Task", taskSchema);
