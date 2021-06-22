import React, { useEffect } from 'react';

import Bracket from './Bracket/Bracket';
import Text from './Text/Text';

import './Logo.css';

type Props = {
  onComplete: Function;
};

// Timeout ID
let timeoutID = 0;

const Logo = ({ onComplete }: Props) => {
  useEffect(() => {
    // Set timeout for onComplete (based on animation time of 1 second)
    timeoutID = window.setTimeout(() => {
      onComplete();
    }, 1500);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [onComplete]);

  return (
    <div className="logo">
      <Bracket side="left" />
      <Text side="left" />
      <Text side="right" />
      <Bracket side="right" />
    </div>
  );
};

export default Logo;
