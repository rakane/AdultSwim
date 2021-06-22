import React, { useState, useEffect } from 'react';

import Bracket from './Bracket/Bracket';
import Text from './Text/Text';

import './Logo.css';

type Props = {
  onComplete: Function;
};

// Timeout ID
let timeoutID = 0;

const Logo = ({ onComplete }: Props) => {
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    // Set timeout for onComplete (based on animation time of 1 second)
    timeoutID = window.setTimeout(() => {
      onComplete();
      setFinished(true);
    }, 1500);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [onComplete]);

  return (
    <div className="logo">
      <Bracket side="left" finished={finished} />
      <Text side="left" finished={finished} />
      <Text side="right" finished={finished} />
      <Bracket side="right" finished={finished} />
    </div>
  );
};

export default Logo;
