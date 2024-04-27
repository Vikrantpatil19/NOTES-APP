import React, { useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios';

function Home() {

    //creating the use state variable
    const [notes , setNotes] = useState([]);

    //function to load the notes that we have fetch using the API calling
    const loadNotes = async() => {
      const response = await axios.get('http://localhost:5000/notes');

      console.log(response.data.data);
      setNotes(response.data.data);
    }
    //it is called when the page is load so we acn use the useEffect
    useEffect(()=>{
        loadNotes();
    }, [])

  return (
    <div>
        <h1>Home</h1>

        {
            //use the mapping 
            notes.map((note , index) => {
                return (
                    <div>
                        <h3>{note.title}</h3>
                        <p>{note.content}</p>
                        <span>{note.category}</span>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Home