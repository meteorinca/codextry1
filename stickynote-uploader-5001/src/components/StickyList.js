import React, { useContext } from 'react';
import { NotesContext } from '../App';
import { Link } from 'react-router-dom';

export default function StickyList() {
  const { notes } = useContext(NotesContext);
  if (!notes.length) return <p>No notes yet.</p>;
  return (
    <ul>
      {notes.map(note => (
        <li key={note.id}>
          <Link to={`/note/${note.id}`}>{note.content.slice(0, 30) || 'Untitled'}</Link>
        </li>
      ))}
    </ul>
  );
}
