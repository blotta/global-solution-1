import React from 'react';
import { LinearProgress } from '@mui/material';

const PasswordStrengthMeter = ({password}) => {

  const calculatePasswordStrength = () => {
    let strength = 0;

    if (password.match(/[a-zA-Z0-9]+/)) {
      strength += 1;
    }

    if (password.match(/[!@#$%^&*(),.?":{}|<>]+/)) {
      strength += 1;
    }

    if (password.match(/[A-Z]+/)) {
      strength += 1;
    }

    if (password.match(/[0-9]+/)) {
      strength += 1;
    }

    if (password.length >= 8) {
      strength += 1;
    }

    return strength;
  };

  const strengthColor = (s) => {
    if (s >= 5) return "success"
    if (s>= 3 && s < 5) return "warning"
    return "error"
  }

  const passwordStrength = calculatePasswordStrength();

  return (
    <div>
      <LinearProgress
        variant="determinate"
        value={(passwordStrength / 5) * 100}
        color={strengthColor(passwordStrength)}
      />
    </div>
  );
};

export default PasswordStrengthMeter;
