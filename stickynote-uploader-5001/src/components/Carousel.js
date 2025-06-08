import React, { useContext, useState } from 'react';
import { NotesContext } from '../App';
import { Link } from 'react-router-dom';
import './Carousel.css';

export default function Carousel() {
  const { notes } = useContext(NotesContext);
  const images = notes.slice(0, 3);
  const [index, setIndex] = useState(0);
  if (!images.length) return null;

  const prev = () => setIndex(i => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex(i => (i + 1) % images.length);

  return (
    <div className="carousel">
      <button onClick={prev} aria-label="Prev">‹</button>
      <div className="carousel-image">
        <Link to={`/note/${images[index].id}`}>
          <img src={images[index].image} alt="sticky" />
        </Link>
      </div>
      <button onClick={next} aria-label="Next">›</button>
    </div>
  );
}
