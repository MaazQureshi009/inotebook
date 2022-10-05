import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props)=>{
  const host = "http://localhost:5000"
    const notesInitial = []
      const [notes, setNotes] = useState(notesInitial)
    
      // Get all Notes
      const getNotes = async ()=>{
        // API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzZjMzU4MzAwZWI3MzIxYmNkMWE1OCIsImlhdCI6MTY2NDYwMDY2Mn0.VsnNx7XjS6t0FMXa9YWVmUKFG9_5tPyO3eybObQEs3w'
          },
        });

        const json = response.json()
        console.log(json);
        setNotes(json);
      }

      // Add a Note
      const addNote = async (title, description, tag)=>{
        // API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzZjMzU4MzAwZWI3MzIxYmNkMWE1OCIsImlhdCI6MTY2NDYwMDY2Mn0.VsnNx7XjS6t0FMXa9YWVmUKFG9_5tPyO3eybObQEs3w'
          },
          body: JSON.stringify({title, description, tag})
        });

        console.log("Adding a new note");
        const note = {
          "_id": "6338027efaf09ecedc3397cd",
          "user": "6336c358300eb7321bcd1a58",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2022-10-01T09:03:58.324Z",
          "__v": 0
        };
        setNotes(notes.concat(note))
      }
      
      // Delete a Note
      const deleteNote = async (id)=>{
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzZjMzU4MzAwZWI3MzIxYmNkMWE1OCIsImlhdCI6MTY2NDYwMDY2Mn0.VsnNx7XjS6t0FMXa9YWVmUKFG9_5tPyO3eybObQEs3w'
          },
        });
        const json = response.json();
        console.log(json);
        console.log("Deleting the note with id" + id);
        const newNotes = notes.filter((note)=>{ return note._id!==id})
        setNotes(newNotes)
      }


      // Edit a Note
      const editNote = async (id, title, description, tag)=>{
        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzZjMzU4MzAwZWI3MzIxYmNkMWE1OCIsImlhdCI6MTY2NDYwMDY2Mn0.VsnNx7XjS6t0FMXa9YWVmUKFG9_5tPyO3eybObQEs3w'
          },
          body: JSON.stringify({title, description, tag})
        });
        const json = response.json();
      
        // Logic to edit in client
        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];
          if(element._id === id){
            element.title = title;
            element.description = description;
            element.tag = tag;
          }
            
        }
      }
    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;