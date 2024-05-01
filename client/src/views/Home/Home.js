import React, { useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios';
import NoteCard from '../../components/Note/NoteCard';

function Home() {

    //creating the use state variable
    const [notes , setNotes] = useState([]);

    //function to load the notes that we have fetch using the API calling
    const loadNotes = async() => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/notes`);

      console.log(response.data.data);
      setNotes(response.data.data);
    }
    //it is called when the page is load so we acn use the useEffect
    useEffect(()=>{
        loadNotes();
    }, [])

  return (
    <div>
        <h1 className='app-header'>All Notes</h1>

        {
            //use the mapping 
            notes.map((note) => {
                const {_id , title , content , category} = note;
                return ( <NoteCard key={_id} _id={_id} title={title} content={content} category={category} loadNotes={loadNotes}/>)
            })
        }
    </div>
  )
}

export default Home