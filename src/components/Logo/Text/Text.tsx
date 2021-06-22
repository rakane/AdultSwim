import React, { useState, useEffect } from 'react';

import './Text.css';

type Props = {
  side: string;
};

let timeoutID = 0;
const Text = ({ side }: Props) => {
  // Position state
  const [position, setPosition] = useState(0);
  // Opacity state
  const [opacity, setOpacity] = useState('0');

  // Format styles
  let leftPos = `${side === 'left' ? `${position}px` : ''}`;
  let rightPos = `${side === 'right' ? `${position}px` : ''}`;

  // Transform style
  // For left, this sets transform point to right edge of text
  // For right, this sets trasnform point to left edge of text
  let transform = `${
    side === 'left'
      ? 'translateX(-100%) translateY(-50%)'
      : 'translateX(100%) translateY(-50%)'
  }`;

  useEffect(() => {
    // Window resize func
    const resize = () => {
      // Space between left and right text
      let seperator = 32;
      let width = window.innerWidth;

      if (width <= 500) seperator = 4;
      else if (width <= 710) seperator = 8;
      else if (width <= 950) seperator = 12;
      else if (width <= 1100) seperator = 16;

      setPosition(width / 2.0 - seperator);
    };

    // Set Timeout to start animation
    timeoutID = window.setTimeout(() => {
      resize();
      setOpacity('1');
    }, 100);

    window.addEventListener('resize', resize);

    return () => {
      // Clear timeout and remove EventListener
      clearTimeout(timeoutID);
      window.removeEventListener('resize', resize);
    };
  }, [setPosition]);

  return (
    <div
      className="text"
      style={{
        left: leftPos,
        right: rightPos,
        opacity,
        transform,
      }}
    >
      <p>
        {side === 'left' && window.innerWidth > 500 && 'adult'}
        {side === 'left' && window.innerWidth <= 500 && 'a'}
        {side === 'right' && window.innerWidth > 500 && 'swim'}
        {side === 'right' && window.innerWidth <= 500 && 's'}
      </p>
    </div>
  );
};

export default Text;
