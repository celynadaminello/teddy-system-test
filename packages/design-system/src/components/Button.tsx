import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export const Button = ({ children, ...props }: ButtonProps) => {
  const style = {
    backgroundColor: '#F5821E',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  return (
    <button style={style} {...props}>
      {children}
    </button>
  );
};

export default Button;