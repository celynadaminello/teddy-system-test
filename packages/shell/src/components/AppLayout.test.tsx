import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { AppLayout } from './AppLayout';

vi.mock('./Header', () => ({
  Header: () => <div data-testid="header">Header Component</div>,
}));


const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

const renderWithMemoryRouter = (component: React.ReactElement) => {
  return render(
    <MemoryRouter>
      {component}
    </MemoryRouter>
  );
};

describe('AppLayout', () => {
  it('should render header component', () => {
    renderWithRouter(<AppLayout />);
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByText('Header Component')).toBeInTheDocument();
  });

  it('should render outlet for routing', () => {
    renderWithRouter(<AppLayout />);
    
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('should have correct container structure', () => {
    renderWithRouter(<AppLayout />);
    
    const container = screen.getByTestId('header').parentElement;
    expect(container).toHaveClass('h-screen');
    expect(container).toHaveStyle({ backgroundColor: '#f5f5f5' });
  });

  it('should have correct main element styling', () => {
    renderWithRouter(<AppLayout />);
    
    const main = screen.getByRole('main');
    expect(main).toHaveClass('h-[calc(100vh-100px)]', 'overflow-y-auto', 'p-5');
  });

  it('should render with MemoryRouter', () => {
    renderWithMemoryRouter(<AppLayout />);
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('should have proper layout structure', () => {
    renderWithRouter(<AppLayout />);
    
    const container = screen.getByTestId('header').parentElement;
    const header = screen.getByTestId('header');
    const main = screen.getByRole('main');
    
    expect(container).toContainElement(header);
    expect(container).toContainElement(main);
  });

  it('should maintain proper height calculations', () => {
    renderWithRouter(<AppLayout />);
    
    const container = screen.getByTestId('header').parentElement;
    const main = screen.getByRole('main');
    
    expect(container).toHaveClass('h-screen');
    expect(main).toHaveClass('h-[calc(100vh-100px)]');
  });

  it('should have correct background color', () => {
    renderWithRouter(<AppLayout />);
    
    const container = screen.getByTestId('header').parentElement;
    expect(container).toHaveStyle({ backgroundColor: '#f5f5f5' });
  });

  it('should render without errors', () => {
    expect(() => renderWithRouter(<AppLayout />)).not.toThrow();
  });
});
