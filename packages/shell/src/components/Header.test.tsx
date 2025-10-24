import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Header } from './Header';
import { useUserStore } from '../stores/useUserStore';

vi.mock('../stores/useUserStore', () => ({
  useUserStore: vi.fn(),
}));

vi.mock('../assets/teddy-logo.png', () => ({
  default: 'mocked-teddy-logo.png',
}));

vi.mock('../assets/menu.png', () => ({
  default: 'mocked-menu.png',
}));

vi.mock('./SidebarMobile', () => ({
  SidebarMobile: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
    <div data-testid="sidebar-mobile" data-is-open={isOpen}>
      <button onClick={onClose} data-testid="sidebar-close">Close</button>
    </div>
  ),
}));

const mockUseUserStore = vi.mocked(useUserStore);

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseUserStore.mockReturnValue('Test User');
  });

  it('should render header with logo and user name', () => {
    renderWithRouter(<Header />);
    
    const logos = screen.getAllByAltText('Teddy Logo');
    expect(logos).toHaveLength(2); // Mobile e desktop logos
    expect(screen.getByText((content, element) => {
      return element?.textContent === 'Olá, Test User!';
    })).toBeInTheDocument();
  });

  it('should display default user name when no user is logged in', () => {
    mockUseUserStore.mockReturnValue(null);
    
    renderWithRouter(<Header />);
    
    expect(screen.getByText((content, element) => {
      return element?.textContent === 'Olá, Usuário!';
    })).toBeInTheDocument();
  });

  it('should render navigation links for desktop', () => {
    renderWithRouter(<Header />);
    
    expect(screen.getByText('Clientes')).toBeInTheDocument();
    expect(screen.getByText('Clientes Selecionados')).toBeInTheDocument();
    expect(screen.getByText('Sair')).toBeInTheDocument();
  });

  it('should render menu button for mobile', () => {
    renderWithRouter(<Header />);
    
    const menuButton = screen.getByTitle('Abrir menu de navegação');
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveAttribute('alt', 'Menu');
  });

  it('should open sidebar when menu button is clicked', () => {
    renderWithRouter(<Header />);
    
    const menuButton = screen.getByTitle('Abrir menu de navegação');
    fireEvent.click(menuButton);
    
    const sidebar = screen.getByTestId('sidebar-mobile');
    expect(sidebar).toHaveAttribute('data-is-open', 'true');
  });

  it('should close sidebar when close button is clicked', () => {
    renderWithRouter(<Header />);
    
    const menuButton = screen.getByTitle('Abrir menu de navegação');
    fireEvent.click(menuButton);
    
    let sidebar = screen.getByTestId('sidebar-mobile');
    expect(sidebar).toHaveAttribute('data-is-open', 'true');
    
    const closeButton = screen.getByTestId('sidebar-close');
    fireEvent.click(closeButton);
    
    sidebar = screen.getByTestId('sidebar-mobile');
    expect(sidebar).toHaveAttribute('data-is-open', 'false');
  });

  it('should have correct styling and structure', () => {
    renderWithRouter(<Header />);
    
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('w-full', 'h-[100px]', 'flex', 'items-center', 'justify-between');
  });

  it('should render logo with correct attributes', () => {
    renderWithRouter(<Header />);
    
    const logos = screen.getAllByAltText('Teddy Logo');
    expect(logos).toHaveLength(2);
    
    logos.forEach(logo => {
      expect(logo).toHaveAttribute('title', 'Logo da empresa Teddy');
      expect(logo).toHaveAttribute('src', 'mocked-teddy-logo.png');
    });
  });

  it('should render menu icon with correct attributes', () => {
    renderWithRouter(<Header />);
    
    const menuIcon = screen.getByAltText('Menu');
    expect(menuIcon).toHaveAttribute('title', 'Abrir menu de navegação');
    expect(menuIcon).toHaveAttribute('src', 'mocked-menu.png');
  });
});
