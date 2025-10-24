import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock do shell
vi.mock('shell', () => ({
  useClientStore: vi.fn(() => ({
    selectedClients: [],
    removeClient: vi.fn(),
    clearClients: vi.fn(),
  })),
  usePageTitle: vi.fn(),
}));

// Mock do design-system
vi.mock('design-system', () => ({
  Button: ({ children, ...props }: any) => (
    <button data-testid="clear-button" {...props}>
      {children}
    </button>
  ),
  ClientCard: ({ name, ...props }: any) => (
    <div data-testid="client-card" data-client-name={name} {...props}>
      {name}
    </div>
  ),
  formatCurrency: (value: number) => `R$ ${value.toFixed(2).replace('.', ',')}`,
}));

describe('App - Selected Clients', () => {
  it('should render basic structure', () => {
    render(<App />);

    expect(screen.getByText('Clientes selecionados:')).toBeInTheDocument();
  });

  it('should render with mocked components', () => {
    render(<App />);

    // Should render the main heading
    expect(screen.getByText('Clientes selecionados:')).toBeInTheDocument();
    
    // Should not render client cards or clear button when no clients
    expect(screen.queryByTestId('client-card')).not.toBeInTheDocument();
    expect(screen.queryByTestId('clear-button')).not.toBeInTheDocument();
  });
});