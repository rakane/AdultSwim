import React, { useState, useEffect } from 'react';

import './Bracket.css';

type Props = {
  side: string;
};

// Timeout ID
let timeoutID = 0;

const Bracket = ({ side }: Props) => {
  // Position state
  const [position, setPosition] = useState(0);
  // Opacity state
  const [opacity, setOpacity] = useState('0');

  // Format positions
  let leftPos = `${side === 'left' ? `${position}px` : ''}`;
  let rightPos = `${side === 'right' ? `${position}px` : ''}`;

  // Transform style
  // For left, this sets transform point to right edge of bracket
  // For right, this sets trasnform point to left edge of bracket
  let transform = `${
    side === 'left'
      ? 'translateX(-100%) translateY(-50%)'
      : 'translateX(calc(100% + 26px)) translateY(-50%)'
  }`;

  useEffect(() => {
    // Resize func
    const resize = () => {
      let seperator = 32;
      let width = window.innerWidth;

      let textWidth = 400;
      let texts = document.querySelectorAll('.text p');
      if (texts !== undefined && texts !== null) {
        if (side === 'left' && texts[0] !== undefined) {
          textWidth = texts[0].clientWidth;
        } else if (side === 'right' && texts[1] !== undefined) {
          textWidth = texts[1].clientWidth - 24;
        }
      }
      if (width <= 500) seperator = 4;
      else if (width <= 710) seperator = 8;
      else if (width <= 950) seperator = 12;
      else if (width <= 1100) seperator = 16;

      setPosition(window.innerWidth / 2.0 - textWidth - seperator);
    };

    timeoutID = window.setTimeout(() => {
      resize();
      setOpacity('1');
    }, 100);
    window.addEventListener('resize', resize);

    return () => {
      clearTimeout(timeoutID);
      window.removeEventListener('resize', resize);
    };
  }, [side]);

  return (
    <div
      className="bracket"
      style={{
        left: leftPos,
        right: rightPos,
        opacity,
        transform,
      }}
    >
      <p>
        {side === 'left' && '['}
        {side === 'right' && ']'}
      </p>
    </div>
  );
};

export default Bracket;
