import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: InputProps) => {
  const style: React.CSSProperties = {
    width: '100%',
    padding: '12px 15px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    boxSizing: 'border-box',
  };

  return (
    <input style={style} {...props} />
  );
};

export default Input;