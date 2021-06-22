import React, { useEffect, useState } from 'react';

// Components
import Loader from './components/Loader/Loader';
import Logo from './components/Logo/Logo';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';

// Styles
import './App.css';

// Animation stages
enum Stages {
  LOADING,
  ANIMATING,
  FINISHED,
}

const App = () => {
  // Animation Stage state
  const [stage, setStage] = useState(Stages.LOADING);
  // Dark mode
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Keyboard event function
    const onKeyboardPress = (e: KeyboardEvent) => {
      if (stage === Stages.FINISHED) setStage(Stages.LOADING);
    };

    window.addEventListener('keydown', onKeyboardPress);
    return () => {
      window.removeEventListener('keydown', onKeyboardPress);
    };
  }, [stage]);

  // Update css variables on dark mode change
  const handleDarkModeUpdate = (state: boolean) => {
    if (state) {
      document.documentElement.style.setProperty('--primary', '#ffffff');
      document.documentElement.style.setProperty('--background', '#000000');
    } else {
      document.documentElement.style.setProperty('--primary', '#000000');
      document.documentElement.style.setProperty('--background', '#ffffff');
    }
    // Update state
    setDarkMode(state);
  };

  return (
    <div className="adult-swim">
      <ThemeToggle
        checked={darkMode}
        onChange={(checked: boolean) => {
          handleDarkModeUpdate(checked);
        }}
      />
      {stage === Stages.LOADING && (
        <Loader
          onComplete={() => {
            setStage(Stages.ANIMATING);
          }}
          darkMode={darkMode}
        />
      )}
      {(stage === Stages.ANIMATING || stage === Stages.FINISHED) && (
        <Logo
          onComplete={() => {
            setStage(Stages.FINISHED);
          }}
        />
      )}
    </div>
  );
};

export default App;
