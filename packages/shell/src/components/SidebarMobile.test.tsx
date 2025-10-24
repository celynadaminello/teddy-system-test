import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SidebarMobile } from './SidebarMobile';

vi.mock('../assets/teddy-logo.png', () => ({
  default: 'mocked-teddy-logo.png',
}));

vi.mock('react-icons/fa', () => ({
  FaArrowCircleLeft: () => <div data-testid="arrow-icon">Arrow</div>,
}));

vi.mock('react-icons/go', () => ({
  GoHomeFill: () => <div data-testid="home-icon">Home</div>,
}));

vi.mock('react-icons/bs', () => ({
  BsFillPersonFill: () => <div data-testid="person-icon">Person</div>,
  BsFillPersonCheckFill: () => <div data-testid="person-check-icon">PersonCheck</div>,
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('SidebarMobile', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render sidebar when isOpen is true', () => {
    const { container } = renderWithRouter(<SidebarMobile isOpen={true} onClose={mockOnClose} />);
    
    const sidebar = container.firstChild as HTMLElement;
    expect(sidebar).toBeInTheDocument();
    expect(sidebar).toHaveClass('opacity-100');
  });

  it('should not render sidebar when isOpen is false', () => {
    const { container } = renderWithRouter(<SidebarMobile isOpen={false} onClose={mockOnClose} />);
    
    const sidebar = container.firstChild as HTMLElement;
    expect(sidebar).toHaveClass('opacity-0', 'pointer-events-none');
  });

  it('should call onClose when overlay is clicked', () => {
    const { container } = renderWithRouter(<SidebarMobile isOpen={true} onClose={mockOnClose} />);
    
    const overlay = container.querySelector('div[class*="absolute inset-0 bg-black"]');
    expect(overlay).toBeInTheDocument();
    
    fireEvent.click(overlay!);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when close button is clicked', () => {
    renderWithRouter(<SidebarMobile isOpen={true} onClose={mockOnClose} />);
    
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should render logo with correct attributes', () => {
    renderWithRouter(<SidebarMobile isOpen={true} onClose={mockOnClose} />);
    
    const logo = screen.getByAltText('Teddy Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('title', 'Logo da empresa Teddy');
    expect(logo).toHaveAttribute('src', 'mocked-teddy-logo.png');
  });

  it('should render navigation links', () => {
    renderWithRouter(<SidebarMobile isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /person clientes/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /clientes selecionados/i })).toBeInTheDocument();
  });

  it('should render navigation icons', () => {
    renderWithRouter(<SidebarMobile isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    expect(screen.getByTestId('person-icon')).toBeInTheDocument();
    expect(screen.getByTestId('person-check-icon')).toBeInTheDocument();
    expect(screen.getByTestId('arrow-icon')).toBeInTheDocument();
  });

  it('should call onClose when navigation links are clicked', () => {
    renderWithRouter(<SidebarMobile isOpen={true} onClose={mockOnClose} />);
    
    const homeLink = screen.getByRole('link', { name: /home/i });
    fireEvent.click(homeLink);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    
    const clientsLink = screen.getByRole('link', { name: /person clientes/i });
    fireEvent.click(clientsLink);
    expect(mockOnClose).toHaveBeenCalledTimes(2);
    
    const selectedLink = screen.getByRole('link', { name: /clientes selecionados/i });
    fireEvent.click(selectedLink);
    expect(mockOnClose).toHaveBeenCalledTimes(3);
  });

  it('should have correct CSS classes for open state', () => {
    const { container } = renderWithRouter(<SidebarMobile isOpen={true} onClose={mockOnClose} />);
    
    const sidebar = container.firstChild as HTMLElement;
    expect(sidebar).toHaveClass('opacity-100');
    
    const sidebarContent = sidebar.querySelector('div[class*="w-[260px]"]');
    expect(sidebarContent).toHaveClass('translate-x-0');
  });

  it('should have correct CSS classes for closed state', () => {
    const { container } = renderWithRouter(<SidebarMobile isOpen={false} onClose={mockOnClose} />);
    
    const sidebar = container.firstChild as HTMLElement;
    expect(sidebar).toHaveClass('opacity-0', 'pointer-events-none');
    
    const sidebarContent = sidebar.querySelector('div[class*="w-[260px]"]');
    expect(sidebarContent).toHaveClass('-translate-x-full');
  });

  it('should render footer section', () => {
    const { container } = renderWithRouter(<SidebarMobile isOpen={true} onClose={mockOnClose} />);
    
    const footer = container.querySelector('div[class*="w-full h-16 bg-white"]');
    expect(footer).toBeInTheDocument();
  });

  it('should have correct structure and styling', () => {
    const { container } = renderWithRouter(<SidebarMobile isOpen={true} onClose={mockOnClose} />);
    
    const sidebar = container.firstChild as HTMLElement;
    expect(sidebar).toHaveClass('fixed', 'inset-0', 'z-50');
    
    const sidebarContent = sidebar.querySelector('div[class*="w-[260px]"]');
    expect(sidebarContent).toHaveClass('w-[260px]', 'h-full', 'bg-white', 'flex', 'flex-col');
  });
});
