// Button.js

import React from 'react';
import Button from '@mui/material/Button';

const Tasto = ({ onClick, label }) => {
  return (
    <Button  variant="contained" onClick={onClick}>
      {label}
    </Button>
  );
};

export default Tasto;
