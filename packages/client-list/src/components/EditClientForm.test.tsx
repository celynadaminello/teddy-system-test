import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EditClientForm } from './EditClientForm';
import { api } from '../services/api';
import type { Client } from '../types/client';

vi.mock('../services/api', () => ({
  api: {
    patch: vi.fn(),
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

describe('EditClientForm', () => {
  const mockOnSuccess = vi.fn();
  const mockOnCancel = vi.fn();
  const mockApiPatch = vi.mocked(api.patch);

  const mockClient: Client = {
    id: '1',
    name: 'João Silva',
    salary: 5000,
    companyValuation: 100000,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render form fields with client data', () => {
    render(<EditClientForm client={mockClient} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    expect(screen.getByTestId('edit-name')).toHaveValue('João Silva');
    expect(screen.getByTestId('edit-salary')).toHaveValue('5000');
    expect(screen.getByTestId('edit-companyValuation')).toHaveValue('100000');
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    expect(screen.getByText('Salvar alterações')).toBeInTheDocument();
  });

  it('should update form fields when user types', () => {
    render(<EditClientForm client={mockClient} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    const nameInput = screen.getByTestId('edit-name');
    const salaryInput = screen.getByTestId('edit-salary');
    const companyValuationInput = screen.getByTestId('edit-companyValuation');

    fireEvent.change(nameInput, { target: { value: 'João Silva Atualizado' } });
    fireEvent.change(salaryInput, { target: { value: '6000' } });
    fireEvent.change(companyValuationInput, { target: { value: '120000' } });

    expect(nameInput).toHaveValue('João Silva Atualizado');
    expect(salaryInput).toHaveValue('6000');
    expect(companyValuationInput).toHaveValue('120000');
  });

  it('should filter non-numeric characters from salary and companyValuation', () => {
    render(<EditClientForm client={mockClient} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    const salaryInput = screen.getByTestId('edit-salary');
    const companyValuationInput = screen.getByTestId('edit-companyValuation');

    fireEvent.change(salaryInput, { target: { value: 'abc6000def' } });
    fireEvent.change(companyValuationInput, { target: { value: 'xyz120000abc' } });

    expect(salaryInput).toHaveValue('6000');
    expect(companyValuationInput).toHaveValue('120000');
  });

  it('should submit form successfully', async () => {
    mockApiPatch.mockResolvedValue({ data: { id: '1' } });

    render(<EditClientForm client={mockClient} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    const nameInput = screen.getByTestId('edit-name');
    const salaryInput = screen.getByTestId('edit-salary');
    const companyValuationInput = screen.getByTestId('edit-companyValuation');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(nameInput, { target: { value: 'João Silva Atualizado' } });
    fireEvent.change(salaryInput, { target: { value: '6000' } });
    fireEvent.change(companyValuationInput, { target: { value: '120000' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockApiPatch).toHaveBeenCalledWith('/users/1', {
        name: 'João Silva Atualizado',
        salary: 6000,
        companyValuation: 120000,
      });
    });

    expect(mockOnSuccess).toHaveBeenCalled();
  });

  it('should show loading state during submission', async () => {
    mockApiPatch.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    render(<EditClientForm client={mockClient} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    const nameInput = screen.getByTestId('edit-name');
    const salaryInput = screen.getByTestId('edit-salary');
    const companyValuationInput = screen.getByTestId('edit-companyValuation');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(nameInput, { target: { value: 'João Silva Atualizado' } });
    fireEvent.change(salaryInput, { target: { value: '6000' } });
    fireEvent.change(companyValuationInput, { target: { value: '120000' } });

    fireEvent.click(submitButton);

    expect(screen.getByText('Salvando...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
    expect(nameInput).toBeDisabled();
    expect(salaryInput).toBeDisabled();
    expect(companyValuationInput).toBeDisabled();
  });

  it('should show error when API call fails', async () => {
    const errorMessage = 'Erro na API';
    mockApiPatch.mockRejectedValue(new Error(errorMessage));

    render(<EditClientForm client={mockClient} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    const nameInput = screen.getByTestId('edit-name');
    const salaryInput = screen.getByTestId('edit-salary');
    const companyValuationInput = screen.getByTestId('edit-companyValuation');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(nameInput, { target: { value: 'João Silva Atualizado' } });
    fireEvent.change(salaryInput, { target: { value: '6000' } });
    fireEvent.change(companyValuationInput, { target: { value: '120000' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  it('should show error for empty fields', async () => {
    render(<EditClientForm client={mockClient} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    const nameInput = screen.getByTestId('edit-name');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(nameInput, { target: { value: '' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Todos os campos são obrigatórios.')).toBeInTheDocument();
    });

    expect(mockApiPatch).not.toHaveBeenCalled();
  });

  it('should show error for invalid numeric values', async () => {
    render(<EditClientForm client={mockClient} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    const nameInput = screen.getByTestId('edit-name');
    const salaryInput = screen.getByTestId('edit-salary');
    const companyValuationInput = screen.getByTestId('edit-companyValuation');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(nameInput, { target: { value: 'João Silva' } });
    fireEvent.change(salaryInput, { target: { value: 'abc' } });
    fireEvent.change(companyValuationInput, { target: { value: 'def' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Todos os campos são obrigatórios.')).toBeInTheDocument();
    });

    expect(mockApiPatch).not.toHaveBeenCalled();
  });

  it('should handle decimal values correctly', async () => {
    mockApiPatch.mockResolvedValue({ data: { id: '1' } });

    render(<EditClientForm client={mockClient} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    const nameInput = screen.getByTestId('edit-name');
    const salaryInput = screen.getByTestId('edit-salary');
    const companyValuationInput = screen.getByTestId('edit-companyValuation');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(nameInput, { target: { value: 'João Silva' } });
    fireEvent.change(salaryInput, { target: { value: '6000.50' } });
    fireEvent.change(companyValuationInput, { target: { value: '120000.75' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockApiPatch).toHaveBeenCalledWith('/users/1', {
        name: 'João Silva',
        salary: 6000.5,
        companyValuation: 120000.75,
      });
    });
  });

  it('should update form when client prop changes', () => {
    const { rerender } = render(<EditClientForm client={mockClient} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    const newClient: Client = {
      id: '2',
      name: 'Maria Santos',
      salary: 7000,
      companyValuation: 150000,
    };

    rerender(<EditClientForm client={newClient} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    expect(screen.getByTestId('edit-name')).toHaveValue('Maria Santos');
    expect(screen.getByTestId('edit-salary')).toHaveValue('7000');
    expect(screen.getByTestId('edit-companyValuation')).toHaveValue('150000');
  });

  it('should clear error when user starts typing again', async () => {
    mockApiPatch.mockRejectedValue(new Error('API Error'));

    render(<EditClientForm client={mockClient} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    const nameInput = screen.getByTestId('edit-name');
    const salaryInput = screen.getByTestId('edit-salary');
    const companyValuationInput = screen.getByTestId('edit-companyValuation');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(nameInput, { target: { value: 'João Silva Atualizado' } });
    fireEvent.change(salaryInput, { target: { value: '6000' } });
    fireEvent.change(companyValuationInput, { target: { value: '120000' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('API Error')).toBeInTheDocument();
    });

    fireEvent.change(nameInput, { target: { value: 'João Silva Novo' } });

    expect(screen.getByText('API Error')).toBeInTheDocument();
  });

  it('should handle API error with response data', async () => {
    const apiError = {
      response: {
        data: {
          message: 'Erro específico da API'
        }
      }
    };
    mockApiPatch.mockRejectedValue(apiError);

    render(<EditClientForm client={mockClient} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    const nameInput = screen.getByTestId('edit-name');
    const salaryInput = screen.getByTestId('edit-salary');
    const companyValuationInput = screen.getByTestId('edit-companyValuation');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(nameInput, { target: { value: 'João Silva Atualizado' } });
    fireEvent.change(salaryInput, { target: { value: '6000' } });
    fireEvent.change(companyValuationInput, { target: { value: '120000' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Erro específico da API')).toBeInTheDocument();
    });
  });

  it('should handle API error without response data', async () => {
    const apiError = {
      message: 'Erro genérico'
    };
    mockApiPatch.mockRejectedValue(apiError);

    render(<EditClientForm client={mockClient} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    const nameInput = screen.getByTestId('edit-name');
    const salaryInput = screen.getByTestId('edit-salary');
    const companyValuationInput = screen.getByTestId('edit-companyValuation');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(nameInput, { target: { value: 'João Silva Atualizado' } });
    fireEvent.change(salaryInput, { target: { value: '6000' } });
    fireEvent.change(companyValuationInput, { target: { value: '120000' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Erro genérico')).toBeInTheDocument();
    });
  });

  it('should handle API error with fallback message', async () => {
    mockApiPatch.mockRejectedValue({});

    render(<EditClientForm client={mockClient} onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    const nameInput = screen.getByTestId('edit-name');
    const salaryInput = screen.getByTestId('edit-salary');
    const companyValuationInput = screen.getByTestId('edit-companyValuation');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(nameInput, { target: { value: 'João Silva Atualizado' } });
    fireEvent.change(salaryInput, { target: { value: '6000' } });
    fireEvent.change(companyValuationInput, { target: { value: '120000' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Falha ao atualizar cliente.')).toBeInTheDocument();
    });
  });
});
