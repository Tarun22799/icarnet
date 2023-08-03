import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext"


const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        {/* <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                        <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i> */}
                    </div>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash-can fa-bounce fa-sm delete-icon" style={{"color": "#f02c0a"}} onClick = {() => deleteNote(note._id)}></i>
                    {/* <i class="fa-solid fa-trash-can fa-sm" style="color: #f02c0a;"></i> */}
                    <i className="fa-sharp fa-solid fa-user-pen fa-beat-fade edit-icon" onClick = {() => updateNote(note)} style={{"color": "#17ee1a"}}></i>
                    {/* <i class="fa-sharp fa-solid fa-user-pen fa-sm" style="color: #17ee1a;"></i> */}

                </div>
            </div>
        </div>
    )
}

export default Noteitem