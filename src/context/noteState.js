import NoteContext from "./noteContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const NoteState = (props) => {


 const navigate = useNavigate();




 const notesInitial = []

  const [notes, setNotes] = useState(notesInitial);

  const getNote = async () => {
    // todo : api call
    const response = await fetch(`http://localhost:4000/api/notes/fetch-all-notes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        'auth-token' : localStorage.getItem('token')
      }
    });
    const json = await response.json()
   
    setNotes(json)
  }

  // add note 
  const addNote = async (title, content, tag) => {
    // todo : api call
    const response = await fetch(`http://localhost:4000/api/notes/add-note`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        'auth-token' :localStorage.getItem('token')
      },
      body: JSON.stringify({title , content , tag}),
    });
    const note = await response.json()
    setNotes(notes.concat(note))
    console.log(note);
   
  }

  // delete note 
  const deleteNote = async(id) => {
    // todo : api call
    const response = await fetch(`http://localhost:4000/api/notes/delete-note/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
         'auth-token' :localStorage.getItem('token')
      }
    });
    const json = await response.json()



    const newNote = notes.filter((note) => { return note.id !== id });
    setNotes(newNote);
  }

  //update notes
  const updateNote = async (id, title, content, tag) => {
    try {
      // API call to update the note
      const response = await fetch(`http://localhost:4000/api/notes/update-note/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, content, tag }),
      });
  
      // Parse the JSON response
      const json = await response.json();
      console.log("Updated note:", json); // Log the response for debugging
  
      // Update the notes state with the updated note
      const updatedNotes = notes.map((note) => {
        if (note._id === id) {
          return { ...note, title, content, tag }; // Update the specific note
        }
        return note; // Return unchanged notes
      });
  
      setNotes(updatedNotes); // Update the state with the modified notes array
    } catch (error) {
      console.error("Error updating note:", error);
      // Handle errors as needed (e.g., show error message)
    }

  }



  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote , getNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
