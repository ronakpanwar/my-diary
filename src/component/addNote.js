// components/AddNote.js
import React, { useState , useContext } from 'react';
import noteContext  from '../context/noteContext';
import { useNavigate } from 'react-router-dom';

function AddNote() {
    const navigate = useNavigate();
    const context = useContext(noteContext);
    const token = localStorage.getItem('token');
    if(!token){
        navigate('/sign-in')
    }
    const {addNote}= context;
    const note = {
        title:"",
        content:""
    }
  const [data, setData]= useState(note);


  const handleChange = (e) => {
    const {name , value} = e.target;
    setData({
        ...data,
        [name]:value,
    })
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submitting the note (e.g., saving to database, etc.)
    addNote(data.title , data.content )
      console.log(data);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter title"
            name='title'
            value={data.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
            Content
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
            id="content"
            name='content'
            placeholder="Enter note content"
            value={data.content}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNote;
