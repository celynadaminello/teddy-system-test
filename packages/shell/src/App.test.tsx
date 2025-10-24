import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

vi.mock('login', () => ({
  LoginPage: () => <div data-testid="login-page">Login Page</div>,
}));

vi.mock('client-list', () => ({
  ClientListPage: () => <div data-testid="client-list-page">Client List Page</div>,
}));

vi.mock('selected-clients', () => ({
  SelectedClientsPage: () => <div data-testid="selected-clients-page">Selected Clients Page</div>,
}));

vi.mock('./components/AppLayout', () => ({
  AppLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="app-layout">
      <div data-testid="layout-content">{children}</div>
    </div>
  ),
}));

vi.mock('./stores/useUserStore', () => ({
  useUserStore: vi.fn(() => null),
}));

vi.mock('react-router-dom', () => ({
  HashRouter: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="hash-router">{children}</div>
  ),
  Routes: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="routes">{children}</div>
  ),
  Route: ({ element }: { element: React.ReactNode }) => (
    <div data-testid="route">{element}</div>
  ),
  useNavigate: () => vi.fn(),
  useLocation: () => ({ pathname: '/' }),
}));

describe('Shell App', () => {
  it('should render basic structure', () => {
    render(<App />);

    expect(screen.getByTestId('hash-router')).toBeInTheDocument();
    expect(screen.getByTestId('routes')).toBeInTheDocument();
  });

  it('should render without errors', () => {
    expect(() => render(<App />)).not.toThrow();
  });

  it('should have HashRouter wrapper', () => {
    render(<App />);

    expect(screen.getByTestId('hash-router')).toBeInTheDocument();
  });

  it('should render routes structure', () => {
    render(<App />);

    expect(screen.getByTestId('routes')).toBeInTheDocument();
  });

  it('should maintain routing structure', () => {
    render(<App />);

    expect(screen.getByTestId('hash-router')).toBeInTheDocument();
    expect(screen.getByTestId('routes')).toBeInTheDocument();
  });
});
