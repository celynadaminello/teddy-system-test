import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

vi.mock('./hooks/useFetchClients', () => ({
  useFetchClients: vi.fn(() => ({
    clients: [],
    isLoading: false,
    error: null,
    totalPages: 1,
    currentPage: 1,
    refetch: vi.fn(),
  })),
}));

vi.mock('shell', () => ({
  useClientStore: vi.fn(() => ({
    addClient: vi.fn(),
  })),
  usePageTitle: vi.fn(),
}));

vi.mock('design-system', () => ({
  Button: ({ children, ...props }: any) => (
    <button data-testid="button" {...props}>
      {children}
    </button>
  ),
  ClientCard: ({ name, ...props }: any) => (
    <div data-testid="client-card" data-client-name={name} {...props}>
      {name}
    </div>
  ),
  Modal: ({ isOpen, children }: any) => (
    isOpen ? <div data-testid="modal">{children}</div> : null
  ),
  formatCurrency: (value: number) => `R$ ${value.toFixed(2).replace('.', ',')}`,
}));

vi.mock('react-icons/hi2', () => ({
  HiOutlineChevronDown: () => <div data-testid="chevron-down">▼</div>,
}));

vi.mock('./services/api', () => ({
  api: {
    delete: vi.fn(),
  },
}));

vi.mock('./components/CreateClientForm', () => ({
  CreateClientForm: () => <div data-testid="create-client-form">Create Form</div>,
}));

vi.mock('./components/EditClientForm', () => ({
  EditClientForm: () => <div data-testid="edit-client-form">Edit Form</div>,
}));

describe('Client List App', () => {
  it('should render basic structure', () => {
    render(<App />);

    expect(screen.getByText('clientes encontrados:')).toBeInTheDocument();
  });

  it('should render without errors', () => {
    expect(() => render(<App />)).not.toThrow();
  });

  it('should have correct container structure', () => {
    render(<App />);

    const container = screen.getByText('clientes encontrados:').closest('div');
    expect(container).toHaveClass('mb-6', 'flex', 'flex-col', 'items-start', 'gap-4');
  });

  it('should render create button', () => {
    render(<App />);

    expect(screen.getByText('Criar cliente')).toBeInTheDocument();
  });

  it('should render with mocked components', () => {
    render(<App />);

    expect(screen.getByText('clientes encontrados:')).toBeInTheDocument();

    expect(screen.getByText('Criar cliente')).toBeInTheDocument();
  });
});