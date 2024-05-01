import React, { useEffect, useState } from 'react'
import './UpdateNote.css'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';


function UpdateNote() {

  const [title , setTitle] = useState('');
  const [category , setCategory] = useState('');
  const [content , setContent] = useState('');

  const loadNote = async (id) => {
    if(!id) return

    const response = await axios.get(`${process.env.REACT_APP_API_URL}/notes/${id}`)

    setTitle(response.data.data.title)
    setCategory(response.data.data.category)
    setContent(response.data.data.content)
  }

  const UpdateNote = async () => {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/notes/${id}`,{
        title:title,
        category:category,
        content:content
    })

    toast.success(response.data.message)

    //go to the home page after update
    window.location.href = "/"
  }

  const {id} = useParams();

  useEffect(()=>{
     loadNote(id)
  }, [id])


  

    return (
        <div>
            <h1 className='app-header'>UpdateNote</h1>
    
            <form className='form-new-note'>

                <input type='text'
                 value={id} 
                 disabled
                 className='input-id'/>
    
            <input  type='text'
            placeholder='Title'
            value={title}
            onChange={(e) =>{setTitle(e.target.value)}}
            className='input-title'/>
    
    
            <select value={category}
              onChange={(e) => {
                setCategory(e.target.value)
              }}
              
              className='input-category' >
              <option value="">select a category</option>
              <option value="general">General</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="learning">Learning</option>
              <option value="other">Other</option>
            </select>
    
            <input type='text'
              placeholder='Content'
              value={content}
              className='input-content'
              onChange={(e) => {
                setContent(e.target.value)
              }} />
    
              <button 
              type='button'
               onClick={UpdateNote}
               className='button-save'>
                Update
              </button>
    
              </form>
        </div>
      )
}

export default UpdateNote