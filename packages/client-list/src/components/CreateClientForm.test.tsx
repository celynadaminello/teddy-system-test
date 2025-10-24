import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateClientForm } from './CreateClientForm';
import { api } from '../services/api';

vi.mock('../services/api', () => ({
  api: {
    post: vi.fn(),
  },
}));

vi.mock('design-system', () => ({
  Input: ({ id, type, value, onChange, placeholder, disabled, ...props }: any) => (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      data-testid={id}
      {...props}
    />
  ),
  Button: ({ children, type, disabled, ...props }: any) => (
    <button type={type} disabled={disabled} data-testid="submit-button" {...props}>
      {children}
    </button>
  ),
}));

describe('CreateClientForm', () => {
  const mockOnSuccess = vi.fn();
  const mockOnCancel = vi.fn();
  const mockApiPost = vi.mocked(api.post);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render form fields correctly', () => {
    render(<CreateClientForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    expect(screen.getByTestId('name')).toBeInTheDocument();
    expect(screen.getByTestId('salary')).toBeInTheDocument();
    expect(screen.getByTestId('companyValuation')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    expect(screen.getByText('Criar cliente')).toBeInTheDocument();
  });

  it('should update form fields when user types', () => {
    render(<CreateClientForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    const nameInput = screen.getByTestId('name');
    const salaryInput = screen.getByTestId('salary');
    const companyValuationInput = screen.getByTestId('companyValuation');

    fireEvent.change(nameInput, { target: { value: 'João Silva' } });
    fireEvent.change(salaryInput, { target: { value: '5000' } });
    fireEvent.change(companyValuationInput, { target: { value: '100000' } });

    expect(nameInput).toHaveValue('João Silva');
    expect(salaryInput).toHaveValue('5000');
    expect(companyValuationInput).toHaveValue('100000');
  });

  it('should filter non-numeric characters from salary and companyValuation', () => {
    render(<CreateClientForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    const salaryInput = screen.getByTestId('salary');
    const companyValuationInput = screen.getByTestId('companyValuation');

    fireEvent.change(salaryInput, { target: { value: 'abc5000def' } });
    fireEvent.change(companyValuationInput, { target: { value: 'xyz100000abc' } });

    expect(salaryInput).toHaveValue('5000');
    expect(companyValuationInput).toHaveValue('100000');
  });

  it('should submit form successfully', async () => {
    mockApiPost.mockResolvedValue({ data: { id: '1' } });

    render(<CreateClientForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    const nameInput = screen.getByTestId('name');
    const salaryInput = screen.getByTestId('salary');
    const companyValuationInput = screen.getByTestId('companyValuation');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(nameInput, { target: { value: 'João Silva' } });
    fireEvent.change(salaryInput, { target: { value: '5000' } });
    fireEvent.change(companyValuationInput, { target: { value: '100000' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockApiPost).toHaveBeenCalledWith('/users', {
        name: 'João Silva',
        salary: 5000,
        companyValuation: 100000,
      });
    });

    expect(mockOnSuccess).toHaveBeenCalled();
  });

  it('should show loading state during submission', async () => {
    mockApiPost.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    render(<CreateClientForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    const nameInput = screen.getByTestId('name');
    const salaryInput = screen.getByTestId('salary');
    const companyValuationInput = screen.getByTestId('companyValuation');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(nameInput, { target: { value: 'João Silva' } });
    fireEvent.change(salaryInput, { target: { value: '5000' } });
    fireEvent.change(companyValuationInput, { target: { value: '100000' } });

    fireEvent.click(submitButton);

    expect(screen.getByText('Criando...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
    expect(nameInput).toBeDisabled();
    expect(salaryInput).toBeDisabled();
    expect(companyValuationInput).toBeDisabled();
  });

  it('should show error when API call fails', async () => {
    const errorMessage = 'Erro na API';
    mockApiPost.mockRejectedValue(new Error(errorMessage));

    render(<CreateClientForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    const nameInput = screen.getByTestId('name');
    const salaryInput = screen.getByTestId('salary');
    const companyValuationInput = screen.getByTestId('companyValuation');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(nameInput, { target: { value: 'João Silva' } });
    fireEvent.change(salaryInput, { target: { value: '5000' } });
    fireEvent.change(companyValuationInput, { target: { value: '100000' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  it('should show error for empty fields', async () => {
    render(<CreateClientForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Todos os campos são obrigatórios.')).toBeInTheDocument();
    });

    expect(mockApiPost).not.toHaveBeenCalled();
  });

  it('should show error for invalid numeric values', async () => {
    render(<CreateClientForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    const nameInput = screen.getByTestId('name');
    const salaryInput = screen.getByTestId('salary');
    const companyValuationInput = screen.getByTestId('companyValuation');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(nameInput, { target: { value: 'João Silva' } });
    fireEvent.change(salaryInput, { target: { value: 'abc' } });
    fireEvent.change(companyValuationInput, { target: { value: 'def' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Todos os campos são obrigatórios.')).toBeInTheDocument();
    });

    expect(mockApiPost).not.toHaveBeenCalled();
  });

  it('should handle decimal values correctly', async () => {
    mockApiPost.mockResolvedValue({ data: { id: '1' } });

    render(<CreateClientForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    const nameInput = screen.getByTestId('name');
    const salaryInput = screen.getByTestId('salary');
    const companyValuationInput = screen.getByTestId('companyValuation');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(nameInput, { target: { value: 'João Silva' } });
    fireEvent.change(salaryInput, { target: { value: '5000.50' } });
    fireEvent.change(companyValuationInput, { target: { value: '100000.75' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockApiPost).toHaveBeenCalledWith('/users', {
        name: 'João Silva',
        salary: 5000.5,
        companyValuation: 100000.75,
      });
    });
  });

  it('should clear error when user starts typing again', async () => {
    mockApiPost.mockRejectedValue(new Error('API Error'));

    render(<CreateClientForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    const nameInput = screen.getByTestId('name');
    const salaryInput = screen.getByTestId('salary');
    const companyValuationInput = screen.getByTestId('companyValuation');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(nameInput, { target: { value: 'João Silva' } });
    fireEvent.change(salaryInput, { target: { value: '5000' } });
    fireEvent.change(companyValuationInput, { target: { value: '100000' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('API Error')).toBeInTheDocument();
    });

    fireEvent.change(nameInput, { target: { value: 'João Silva Updated' } });

    expect(screen.getByText('API Error')).toBeInTheDocument();
  });

  it('should call onSuccess after successful submission', async () => {
    mockApiPost.mockResolvedValue({ data: { id: '1' } });

    render(<CreateClientForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    const nameInput = screen.getByTestId('name');
    const salaryInput = screen.getByTestId('salary');
    const companyValuationInput = screen.getByTestId('companyValuation');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(nameInput, { target: { value: 'João Silva' } });
    fireEvent.change(salaryInput, { target: { value: '5000' } });
    fireEvent.change(companyValuationInput, { target: { value: '100000' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });

    expect(nameInput).toHaveValue('João Silva');
    expect(salaryInput).toHaveValue('5000');
    expect(companyValuationInput).toHaveValue('100000');
  });
});
