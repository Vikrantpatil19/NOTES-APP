import React, { useState } from 'react'
import './NewNote.css'
import axios from 'axios';
import toast from 'react-hot-toast';

function NewNote() {
  const [title , setTitle] = useState('');
  const [category , setCategory] = useState('');
  const [content , setContent] = useState('');


  const addNote = async () => {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/notes`,
    {
      title:title,
      content:content,
      category:category
    })

    toast.success(response.data.message)

    //set all the data empty after the new note is added 
    setTitle('')
    setCategory('')
    setContent('')
  }


  return (
    <div>
        <h1 className='app-header'>NewNote</h1>

        <form className='form-new-note'>

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
           onClick={addNote}
           className='button-save'>
            Save
          </button>

          </form>
    </div>
  )
}

export default NewNote