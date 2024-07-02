import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/noteContext';
import Card from './subComponent/card';

function Notes() {
  const context = useContext(noteContext);
  const { notes = [], getNote, updateNote } = context; // Ensure notes is initialized to an empty array

  useEffect(() => {
    getNote();
  }, [getNote]); // Add getNote as a dependency to ensure it's called correctly

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [note, setNote] = useState({ id: "", etitle: "", econtent: "", etag: "" });

  const updateNotes = (currentNote) => {
    setShowUpdateForm(true);
    setNote({ id: currentNote._id, etitle: currentNote.title, econtent: currentNote.content, etag: currentNote.tag });
  };

  const handleUpdate = () => {
    updateNote(note.id, note.etitle, note.econtent, note.etag);
    setShowUpdateForm(false);
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto p-4">
      {showUpdateForm && (
        <div className="my-3 bg-white shadow-md rounded-lg overflow-hidden">
          <h2 className="text-xl font-semibold bg-gray-200 p-4 border-b">Update Note</h2>
          <form className="p-4 space-y-4">
            <div>
              <label htmlFor="etitle" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                id="etitle"
                name="etitle"
                value={note.etitle}
                onChange={onChange}
                minLength={5}
                required
                className="form-input mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="ediscription" className="block text-sm font-medium text-gray-700">Content</label>
              <textarea
                id="ediscription"
                name="ediscription"
                value={note.econtent}
                onChange={onChange}
                minLength={5}
                required
                className="form-input mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
            </div>
            <div>
              <label htmlFor="etag" className="block text-sm font-medium text-gray-700">Tag</label>
              <input
                type="text"
                id="etag"
                name="etag"
                value={note.etag}
                onChange={onChange}
                className="form-input mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                onClick={() => setShowUpdateForm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleUpdate}
                disabled={note.etitle.length < 5 || note.ediscription.length < 5}
              >
                Update Note
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="my-3 ">
        <h1 className="text-2xl font-bold mb-3 text-center">Your Notes</h1>
        {notes.length === 0 ? (
          <p className="text-gray-600 text-center">No notes to display</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {notes.map((note) => (
              <Card key={note._id} updateNotes={updateNotes} note={note} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notes;
