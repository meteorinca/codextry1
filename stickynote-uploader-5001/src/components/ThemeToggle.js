import React, { useContext } from 'react';
import { ThemeContext } from '../App';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
}
