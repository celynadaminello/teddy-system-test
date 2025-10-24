import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: InputProps) => {
  const style: React.CSSProperties = {
    height: '40px',
    width: '360px',
    maxWidth: '100%',
    padding: '12px 15px',
    fontSize: '16px',
    fontWeight: '400',
    color: '#AAAAAA',
    border: '2px solid #D9D9D9',
    borderRadius: '4px',
    boxSizing: 'border-box',
    display: 'block',
    margin: '0 auto',
  };

  return (
    <input style={style} {...props} />
  );
};

export default Input;