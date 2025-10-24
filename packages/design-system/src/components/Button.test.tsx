import { render, screen } from '@testing-library/react';
import { Button } from './Button';
import { describe, it, expect } from 'vitest';

describe('Button Component', () => {

  it('should render the button with the correct children text', () => {
    const buttonText = 'Clique Aqui';
    render(<Button>{buttonText}</Button>);
    const buttonElement = screen.getByRole('button', { name: /clique aqui/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent(buttonText);
  });

  it('should apply the correct inline styles', () => {
    render(<Button>Test Styles</Button>);
    const buttonElement = screen.getByRole('button', { name: 'Test Styles' });

    expect(buttonElement).toHaveStyle('height: 40px');
    expect(buttonElement).toHaveStyle('width: 100%');
    expect(buttonElement).toHaveStyle('backgroundColor: #EC6724');
    expect(buttonElement).toHaveStyle('color: #fff');
    expect(buttonElement).toHaveStyle('borderRadius: 4px');
    expect(buttonElement).toHaveStyle('fontSize: 14px');
    expect(buttonElement).toHaveStyle('fontWeight: 700');
    expect(buttonElement).toHaveStyle('cursor: pointer');
  });

  it('should be disabled when the disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const buttonElement = screen.getByRole('button', { name: 'Disabled Button' });
    expect(buttonElement).toBeDisabled();
  });

});