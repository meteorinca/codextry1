import React, { useState, useContext, useEffect } from 'react';
import "./StickyUpload.css";
import { NotesContext } from '../App';

export default function StickyUpload({ existing, onUpdate }) {
  const { addNote } = useContext(NotesContext);
  const [image, setImage] = useState(existing ? existing.image : null);
  const [content, setContent] = useState(existing ? existing.content : '');

  useEffect(() => {
    if (existing) {
      setImage(existing.image);
      setContent(existing.content);
    }
  }, [existing]);

  const handleImage = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setImage(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!image) return;
    if (existing && onUpdate) {
      onUpdate({ ...existing, image, content });
    } else {
      const note = { id: Date.now().toString(), image, content, liked: false };
      addNote(note);
    }
    setImage(null);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImage}
        aria-label="Sticky image"
      />
      {image && <img src={image} alt="preview" className="preview" />}
      <textarea
        placeholder="Your sticky note content"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button type="submit">{existing ? 'Save' : 'Upload'}</button>
    </form>
  );
}
