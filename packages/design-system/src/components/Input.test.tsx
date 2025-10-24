import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';
import { describe, it, expect, vi } from 'vitest';

describe('Input Component', () => {

  it('should render an input element', () => {
    render(<Input data-testid="test-input" />);
    const inputElement = screen.getByTestId('test-input');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.tagName).toBe('INPUT');
  });

  it('should apply the correct inline styles', () => {
    render(<Input data-testid="test-input" />);
    const inputElement = screen.getByTestId('test-input');

    expect(inputElement).toHaveStyle('height: 40px');
    expect(inputElement).toHaveStyle('maxWidth: 100%');
    expect(inputElement).toHaveStyle('padding: 12px 15px');
    expect(inputElement).toHaveStyle('fontSize: 16px');
    expect(inputElement).toHaveStyle('fontWeight: 400');
    expect(inputElement).toHaveStyle('color: #AAAAAA');
    expect(inputElement).toHaveStyle('border: 2px solid #D9D9D9');
    expect(inputElement).toHaveStyle('borderRadius: 4px');
    expect(inputElement).toHaveStyle('boxSizing: border-box');
    expect(inputElement).toHaveStyle('display: block');
    expect(inputElement).toHaveStyle('margin: 0 auto');
  });

  it('should display the correct value and call onChange when typed into', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const initialValue = "Initial text";

    render(
      <Input
        data-testid="test-input"
        value={initialValue}
        onChange={handleChange}
      />
    );
    const inputElement = screen.getByTestId('test-input') as HTMLInputElement;

    expect(inputElement.value).toBe(initialValue);

    await user.type(inputElement, 'new');

    expect(handleChange).toHaveBeenCalledTimes(3);

    expect(inputElement.value).toBe(initialValue);
  });

  it('should accept standard input attributes like placeholder and type', () => {
    const placeholderText = "Enter email";
    render(
      <Input
        data-testid="test-input"
        placeholder={placeholderText}
        type="email"
      />
    );
    const inputElement = screen.getByTestId('test-input');
    expect(inputElement).toHaveAttribute('placeholder', placeholderText);
    expect(inputElement).toHaveAttribute('type', 'email');
  });

   it('should be disabled when the disabled prop is true', () => {
    render(<Input data-testid="test-input" disabled />);
    const inputElement = screen.getByTestId('test-input');
    expect(inputElement).toBeDisabled();
  });

});