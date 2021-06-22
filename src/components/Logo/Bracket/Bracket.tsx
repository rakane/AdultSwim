import React, { useState, useEffect } from 'react';

import './Bracket.css';

type Props = {
  side: string;
  finished: boolean;
};

// Timeout ID
let timeoutID = 0;

const Bracket = ({ side, finished }: Props) => {
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
    // Animation func
    const setAnimation = () => {
      let brackets = document.querySelectorAll('.bracket');
      if (brackets !== undefined && brackets !== null) {
        if (side === 'left' && brackets[0] !== undefined) {
          brackets[0].animate(
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
        if (side === 'right' && brackets[1] !== undefined) {
          brackets[1].animate(
            [
              // keyframes
              {
                offset: 0.0,
                transform: `translateX(calc(100% + 26px)) translateY(-50%)`,
              },
              {
                offset: 0.1,
                transform: `translateX(calc(100% + 26px)) translateY(-50%)`,
              },
              {
                offset: 0.3,
                transform: `translateX(calc(100% + 26px)) translateY(calc(-50% - 20px))`,
              },
              {
                offset: 0.5,
                transform: ` translateX(calc(100% + 26px)) translateY(-50%)`,
              },
              {
                offset: 0.57,
                transform: `translateX(calc(100% + 26px)) translateY(calc(-50% - 7px))`,
              },
              {
                offset: 0.64,
                transform: `translateX(calc(100% + 26px)) translateY(-50%)`,
              },
              {
                offset: 1.0,
                transform: `translateX(calc(100% + 26px)) translateY(-50%)`,
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
    }, 400);
    window.addEventListener('resize', resize);

    if (finished) setAnimation();

    return () => {
      clearTimeout(timeoutID);
      window.removeEventListener('resize', resize);
    };
  }, [side, finished]);

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
