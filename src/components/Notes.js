import React, {useContext, useEffect, useRef, useState} from "react";
import noteContext from '../context/notes/noteContext';
import NoteItem from "./NoteItem";
import AddNotes from './AddNotes'

const Notes = (props) => {
    var context = useContext(noteContext);
    const {notes, getAllNotes, addNote, editNote} = context;

    useEffect(() => {
        getAllNotes();
        // eslint-disable-next-line
    }, [])

    const [note, setNotes] = useState({etitle: "", edescription: "", etag: ""})

    const ref = useRef(null);
    const refClose = useRef(null);

    const updateNote = (currentNote) => {
        editNote();
        ref.current.click();
        setNotes({id: currentNote._id, etitle : currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
    }

    const handleOnClick = (e) => {
        // e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        setNotes({etitle: "", edescription: "", etag: ""})
        // await addNote(note.title, note.description, note.tag);
    }

    const handleOnChange = (event) => {
        setNotes({...note, [event.target.name] : event.target.value})
    }
    return (
        <>
            <AddNotes />
            <button  type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle}  aria-describedby="emailHelp" onChange={handleOnChange} minLength={5}  required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={handleOnChange} minLength={5}  required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" onChange={handleOnChange} value={note.etag} minLength={5} required/>
                                </div>
 
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 && note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleOnClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h1>Added Notes</h1>
                {notes.map((element) => {
                    return <NoteItem key={element._id} updateNote= {updateNote} note={element} />;
                })}
            </div>
        </>
    )
}

export default Notes