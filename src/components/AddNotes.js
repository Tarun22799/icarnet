import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';


const AddNote = () => {
    var context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNotes] = useState({title: "", description: "", tag: ""})

    const handleOnClick = async (e) => {
        e.preventDefault();
        await addNote(note.title, note.description, note.tag);
    }

    const handleOnChange = (event) => {
        setNotes({...note, [event.target.name] : event.target.value})
    }
    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={handleOnChange}  minLength={5} required /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={handleOnChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={handleOnChange}  minLength={5} required />
                </div>

                <button disabled={note.title.length < 5 && note.description.length < 5 && note.tag.length < 5} type="submit" className="btn btn-primary" onClick={(e) => handleOnClick(e)} >Add Note</button>
            </form>


        </div>
    )
}

export default AddNote;