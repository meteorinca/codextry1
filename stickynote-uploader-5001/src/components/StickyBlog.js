import React, { useContext, useState } from 'react';
import "./StickyBlog.css";
import { useParams, useNavigate } from 'react-router-dom';
import { NotesContext } from '../App';
import StickyUpload from './StickyUpload';

export default function StickyBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notes, updateNote, EDIT_ENABLED, likeNote } = useContext(NotesContext);
  const note = notes.find(n => n.id === id);
  const [editing, setEditing] = useState(false);

  if (!note) return <p>Not found</p>;

  const handleLike = () => {
    likeNote(note.id);
    navigate('/');
  };

  return (
    <div className="blog">
      <img src={note.image} alt="sticky" className="blog-image" />
      <p>{note.content}</p>
      <button onClick={handleLike} disabled={note.liked}>Like</button>
      {EDIT_ENABLED && (
        <button onClick={() => setEditing(e => !e)}>{editing ? 'Cancel' : 'Edit'}</button>
      )}
      {editing && EDIT_ENABLED && <StickyUpload existing={note} onUpdate={updateNote} />}
    </div>
  );
}
