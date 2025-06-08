import React, { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import StickyUpload from './components/StickyUpload';
import Carousel from './components/Carousel';
import StickyList from './components/StickyList';
import StickyBlog from './components/StickyBlog';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

export const ThemeContext = createContext();
export const NotesContext = createContext();

const EDIT_ENABLED = true; // simulate backend flag

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });
  const [uploadDisabled, setUploadDisabled] = useState(false);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

  const addNote = note => setNotes(n => [note, ...n]);
  const updateNote = updated =>
    setNotes(n => n.map(note => (note.id === updated.id ? updated : note)));

  const likeNote = id => {
    setNotes(n => n.map(note => (note.id === id ? { ...note, liked: true } : note)));
    setUploadDisabled(true);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <NotesContext.Provider value={{ notes, addNote, updateNote, likeNote, uploadDisabled, EDIT_ENABLED }}>
        <div className="App">
          <header>
            <Link to="/" className="logo">StickyNote Uploader 5001</Link>
            <ThemeToggle />
          </header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/note/:id" element={<StickyBlog />} />
          </Routes>
        </div>
      </NotesContext.Provider>
    </ThemeContext.Provider>
  );
}

function Home() {
  const { EDIT_ENABLED, uploadDisabled } = useContext(NotesContext);
  const navigate = useNavigate();
  return (
    <div>
      <Carousel />
      {EDIT_ENABLED && !uploadDisabled && <StickyUpload />}
      <StickyList />
    </div>
  );
}
