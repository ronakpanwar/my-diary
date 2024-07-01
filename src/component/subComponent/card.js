import React, { useContext } from 'react';
import noteContext from '../../context/noteContext';

function Card(props) {
    const context = useContext(noteContext);
    const { deleteNote } = context;

    const handleDelete = () => {
        deleteNote(note._id); 
        window.location.reload();
    };
    const { note, updateNotes } = props;

    return (
        <div className="col-md-3">
            <div className="card my-3 shadow-lg rounded-lg overflow-hidden">
                <div className="card-body">
                    <div className="flex items-center mb-3">
                        <h5 className="card-title text-lg mx-10 font-bold">{note.title}</h5>
                        <i
                            className="fas fa-trash mx-2 text-red-500 cursor-pointer"
                            onClick={() => {
                                handleDelete() ;
                            }}
                        ></i>
                        <i
                            className="fas fa-edit mx-2 text-blue-500 cursor-pointer"
                            onClick={() => {
                                updateNotes(note);
                            }}
                        ></i>
                    </div>
                    <p className="card-text mx-10 my-5">{note.content}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;


