import React, { useState, useEffect } from 'react';

import './Text.css';

type Props = {
  side: string;
  finished: boolean;
};

let timeoutID = 0;
const Text = ({ side, finished }: Props) => {
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
    // Animation func
    const setAnimation = () => {
      let texts = document.querySelectorAll('.text');
      if (texts !== undefined && texts !== null) {
        if (side === 'left' && texts[0] !== undefined) {
          texts[0].animate(
            [
              // keyframes
              {
                offset: 0.0,
                transform: `translateX(-100%) translateY(-50%)`,
              },
              {
                offset: 0.1,
                transform: `translateX(-100%) translateY(-50%)`,
              },
              {
                offset: 0.3,
                transform: `translateX(-100%) translateY(calc(-50% - 20px))`,
              },
              {
                offset: 0.5,
                transform: ` translateX(-100%) translateY(-50%)`,
              },
              {
                offset: 0.57,
                transform: `translateX(-100%) translateY(calc(-50% - 7px))`,
              },
              {
                offset: 0.64,
                transform: `translateX(-100%) translateY(-50%)`,
              },
              {
                offset: 1.0,
                transform: `translateX(-100%) translateY(-50%)`,
              },
            ],
            {
              // timing options
              duration: 2000,
              easing: 'cubic-bezier(0.280, 0.840, 0.420, 1)',
              iterations: Infinity,
            }
          );
        }
        if (side === 'right' && texts[1] !== undefined) {
          texts[1].animate(
            [
              // keyframes
              {
                offset: 0.0,
                transform: `translateX(100%) translateY(-50%)`,
              },
              {
                offset: 0.1,
                transform: `translateX(100%) translateY(-50%)`,
              },
              {
                offset: 0.3,
                transform: `translateX(100%) translateY(calc(-50% - 20px))`,
              },
              {
                offset: 0.5,
                transform: ` translateX(100%) translateY(-50%)`,
              },
              {
                offset: 0.57,
                transform: `translateX(100%) translateY(calc(-50% - 7px))`,
              },
              {
                offset: 0.64,
                transform: `translateX(100%) translateY(-50%)`,
              },
              {
                offset: 1.0,
                transform: `translateX(100%) translateY(-50%)`,
              },
            ],
            {
              // timing options
              duration: 2000,
              easing: 'cubic-bezier(0.280, 0.840, 0.420, 1)',
              iterations: Infinity,
            }
          );
        }
      }
    };

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

    if (finished) setAnimation();

    return () => {
      // Clear timeout and remove EventListener
      clearTimeout(timeoutID);
      window.removeEventListener('resize', resize);
    };
  }, [setPosition, finished, side]);

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
