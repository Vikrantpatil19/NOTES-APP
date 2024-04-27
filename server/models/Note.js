import {model , Schema} from 'mongoose';

//creating the structure or the schema
const noteSchema = new Schema({
    title:String,
    content:String,
    category:String
})

//creating the model using schema
const Note = model("Note" , noteSchema);

export default Note;