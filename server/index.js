import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Note from './models/Note.js';

const app = express();
app.use(cors());
app.use(express.json());

//connection with MongoDB
const connectDB = async() =>{
   await mongoose.connect(process.env.MONGODB_URL)
   console.log("Database connected")
}
connectDB();



const PORT = process.env.PORT || 5000;





app.get("/health" , (req , res)=>{
  res.json({
    success:true,
    message: "server is running",
    data: null
  })
})

//creating the resource or adding the data from the body
app.post("/notes" , async( req , res )=>{
    const {title , content , category} = req.body;

    
    //Adding the validations
    if(!title){
      return res.json({
        success:false,
        message:"title is required",
        data:null
      })
    }

    if(!content){
      return res.json({
        success:false,
        message:"content is required",
        data:null
      })
    }

    if(!category){
      return res.json({
        success:false,
        message:"category is required",
        data:null
      })
    }
    
    
    
    
    
    
    //creating the document from the model...
  const newNote = await Note.create({
        "title":title,
        "content":content,
        "category":category
    })
   

    //pushing this object to the array
   

    res.json({
        success: true,
        message: "Notes added successfully",
        data: newNote
    })
})

//api for reading the notes
app.get("/notes", async(req , res)=>{
  
  //for finding the note from the database
  const notes = await Note.find();
  
    res.json({
    success:true,
    message:"Notes fetched successfully",
    data: notes
   })
})

//API for finding the specific notes using the id
app.get("/notes/:id", async(req , res)=>{
   const {id} = req.params;

   const notes = await Note.findOne({
    _id: id
   });

   res.json({
    success:true,
    message:"Notes fetched successfully",
    data:notes
   })
})

//API for Updating the notes
app.put("/notes/:id", async(req , res) =>{
  const {id} = req.params;

  const {title , content , category} = req.body;

 const notes = await Note.updateOne({_id: id},{$set:{
    title:title,
    content:content,
    category:category
  }})

  res.json({
    success:true,
    message:"Notes Updated successfully",
    data:notes
  })
})

//API for deleting the notes
app.delete("/notes/:id" , async(req , res) =>{
  const {id} = req.params;

  await Note.deleteOne({_id: id})

  res.json({
    success:true,
    message:"Notes deleted successfully",
    data:null
  })
})

app.listen(PORT , () =>{
    console.log(`server is running on the port ${PORT}`);
})

