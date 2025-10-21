import { Schema, model } from "mongoose";

const listSchema = new Schema({
    totalList: {
        type: Number
    }
});

export const List = model("List", listSchema);