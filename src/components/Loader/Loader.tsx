import React, { useState, useEffect } from 'react';

// Circular Progress bar
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import './Loader.css';

type Props = {
  onComplete: Function;
  darkMode: boolean;
};

// Interval and Timeout IDs
let intervalID = 0;
let timeoutID = 0;

const Loader = ({ onComplete, darkMode }: Props) => {
  // Loading progress state
  const [progress, setProgress] = useState(0.0);

  useEffect(() => {
    // Interval function
    const progressIncrement = () => {
      // If progress is at 100, call onComplete prop
      if (progress >= 100) {
        // Fade loader out
        let loader = document.getElementById('loader');
        if (loader) {
          loader.style.opacity = '0';
        }
        timeoutID = window.setTimeout(() => {
          onComplete();
        }, 1000);
      } else {
        // Increment progress
        setProgress(progress + 0.5);
      }
    };
    // Set Interval
    intervalID = window.setInterval(() => progressIncrement(), 16);
    return () => {
      // Clear Interval and Timeout
      clearInterval(intervalID);
      clearTimeout(timeoutID);
    };
  }, [progress, onComplete]);

  return (
    <div id="loader">
      <CircularProgressbar
        value={progress}
        text={`${Math.floor(progress)}%`}
        styles={{
          text: {
            fill: 'var(--primary)',
            transition: 'color 1s ease',
          },
          path: {
            stroke: `${darkMode ? '#ffffff' : '#000000'}`,
            transition: 'stroke 1s ease',
          },
          trail: {
            stroke: `${darkMode ? '#444444' : '#aaaaaa'}`,
            transition: 'stroke 1s ease',
          },
          background: {
            fill: `${darkMode ? '#e3e3e3' : '#000000'}`,
            transition: 'fill 1s ease',
          },
        }}
      />
    </div>
  );
};

export default Loader;
