import React, {useState} from "react";

import NoteContext from './noteContext';


const NoteState = (props) => {

    // let s1 = {
    //     "name": "ryu",
    //     "phn": "867856"
    // }
    // const [state, setState] = useState(s1);

    // const updateValue = () => {
    //     setTimeout(() => {
    //         setState({
    //             "name" : 'Lucifer',
    //             "phn": 9000
    //         })
    //     }, 2000)
    // }
  let initialNotes = [];
  var host = 'http://localhost:5000';
  const [notes, setNotes] = useState(initialNotes)

  // fetch all notes
  const getAllNotes = async () => {
    let response = await fetch (`${host}/api/auth/fetchallnotes` , {
      method : 'GET',
      headers : {
        "content-Type" : "application/json",
        "auth-token" : localStorage.getItem('token')
      },
      body : JSON.stringify()
    })
    let json = await response.json();
    console.log(json)
    setNotes(json);
  }


    const addNote = async(title, description, tag) => {
      console.log("Addingg.....");

      const response = await fetch(`${host}/api/auth/addnote` , {
        method : 'POST',
        headers : {
          "content-Type" : 'application/json',
        "auth-token" : localStorage.getItem('token')
        },
        body : JSON.stringify({title, description, tag})
    });


    const note = await response.json();
    setNotes(notes.concat(note))

    }

    const deleteNote = async (id) => {
      const response = await fetch(`${host}/api/auth/deletenote/${id}` , {
        method : 'DELETE',
        headers : {
          "content-Type" : 'application/json',
          "auth-token" : localStorage.getItem('token')
        },
      });
      // const json = await response.json();
      let newNote = notes.filter ((note) => {return note._id !== id} )
      setNotes(newNote);
    }

    const editNote = async (id, title, description, tag) => {

      const response = await fetch(`${host}/api/auth/updatenote/${id}` , {
          method : 'PUT',
          headers : {
            "content-Type" : 'application/json',
            "auth-token" : localStorage.getItem('token')
          },
          body : JSON.stringify({title, description, tag})
      });
      // return response.json()
      let newNotes = JSON.parse(JSON.stringify(notes));
      newNotes.forEach((note) => {
        if (note._id === id) {
          note.title = title;
          note.description = description;
          note.tag = tag
          // setNotes(newNotes)
        }
      })
      setNotes(newNotes)

      console.log(newNotes);

    }
    return(
        <NoteContext.Provider value = {{notes, addNote, deleteNote, editNote, getAllNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;