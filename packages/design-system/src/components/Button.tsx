import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export const Button = ({ children, ...props }: ButtonProps) => {
  const style: React.CSSProperties = {
    height: '60px',
    backgroundColor: '#EC6724',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '24px',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'block',
    margin: '0 auto',
  };

  return (
    <button style={style} {...props}>
      {children}
    </button>
  );
};

export default Button;