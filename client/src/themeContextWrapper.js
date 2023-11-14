import React, { useState, useEffect } from 'react';
import { ThemeContext, themes } from './themeContext';

export default function ThemeContextWrapper(props) {
  const [theme, setTheme] = useState(themes.dark); // Default theme is dark

  function changeTheme(themeValue) {
    setTheme(themeValue);
  }

  useEffect(() => {
    const className = theme === themes.dark ? 'dark-content' : 'white-content';
    document.documentElement.className = className; 
    document.documentElement.style.backgroundImage = `url(${theme === themes.dark ? 'dark_mode_background.jpg' : 'light_mode_background.jpeg'})`;
  }, [theme]);  

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
