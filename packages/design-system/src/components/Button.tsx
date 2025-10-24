import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export const Button = ({ children, ...props }: ButtonProps) => {
  const style: React.CSSProperties = {
    height: '40px',
    width: '100%',
    backgroundColor: '#EC6724',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
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