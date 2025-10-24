import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';

vi.mock('shell', () => ({
  useUserStore: vi.fn(() => vi.fn()),
  usePageTitle: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockAlert = vi.fn();
Object.defineProperty(window, 'alert', {
  value: mockAlert,
  writable: true,
});

describe('Login App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithRouter = (component: React.ReactElement) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  it('should render login form correctly', () => {
    renderWithRouter(<App />);

    expect(screen.getByText('Olá, seja bem-vindo!')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite o seu nome:')).toBeInTheDocument();
    expect(screen.getByText('Entrar')).toBeInTheDocument();
  });

  it('should update input value when user types', () => {
    renderWithRouter(<App />);

    const input = screen.getByPlaceholderText('Digite o seu nome:');
    fireEvent.change(input, { target: { value: 'João Silva' } });

    expect(input).toHaveValue('João Silva');
  });

  it('should show alert when trying to login with empty name', () => {
    renderWithRouter(<App />);

    const button = screen.getByText('Entrar');
    fireEvent.click(button);

    expect(mockAlert).toHaveBeenCalledWith('Por favor, digite seu nome.');
  });

  it('should handle Enter key press to submit form', () => {
    renderWithRouter(<App />);

    const input = screen.getByPlaceholderText('Digite o seu nome:');
    
    fireEvent.change(input, { target: { value: 'Maria Santos' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(mockAlert).not.toHaveBeenCalled();
  });

  it('should have correct styling and structure', () => {
    renderWithRouter(<App />);

    const container = screen.getByText('Olá, seja bem-vindo!').closest('div');
    expect(container).toHaveClass('flex', 'flex-col', 'items-center', 'gap-6', 'w-full', 'max-w-[521px]');
  });

  it('should render without errors', () => {
    expect(() => renderWithRouter(<App />)).not.toThrow();
  });
});