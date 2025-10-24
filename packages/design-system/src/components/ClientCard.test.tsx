import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ClientCard } from './ClientCard';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../../shell/src/assets/plus.png', () => ({ default: 'plus-icon.png' }));
vi.mock('../../../shell/src/assets/pencil.png', () => ({ default: 'pencil-icon.png' }));
vi.mock('../../../shell/src/assets/trash.png', () => ({ default: 'trash-icon.png' }));
vi.mock('../../../shell/src/assets/minus.png', () => ({ default: 'minus-icon.png' }));

describe('ClientCard Component', () => {
  const mockOnSelect = vi.fn();
  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();

  const defaultProps = {
    name: 'João Silva',
    salary: 'R$ 5.000,00',
    company: 'R$ 500.000,00',
    onSelect: mockOnSelect,
    onEdit: mockOnEdit,
    onDelete: mockOnDelete,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render client name, salary, and company correctly', () => {
    render(<ClientCard {...defaultProps} />);

    expect(screen.getByRole('heading', { name: defaultProps.name })).toBeInTheDocument();
    expect(screen.getByText(defaultProps.salary)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.company)).toBeInTheDocument();
    expect(screen.getByText('Salário:')).toBeInTheDocument();
    expect(screen.getByText('Empresa:')).toBeInTheDocument();
  });

  it('should render select, edit, and delete buttons by default', () => {
    render(<ClientCard {...defaultProps} />);

    expect(screen.getByTitle('Selecionar cliente')).toBeInTheDocument();
    expect(screen.getByTitle('Editar cliente')).toBeInTheDocument();
    expect(screen.getByTitle('Excluir cliente')).toBeInTheDocument();
    expect(screen.queryByTitle('Remover cliente')).not.toBeInTheDocument();
  });

  it('should call onSelect when select button is clicked', async () => {
    render(<ClientCard {...defaultProps} />);
    await userEvent.click(screen.getByRole('button', { name: 'Selecionar cliente' }));
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });

  it('should call onEdit when edit button is clicked', async () => {
    render(<ClientCard {...defaultProps} />);
    await userEvent.click(screen.getByRole('button', { name: 'Editar cliente' }));
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  it('should call onDelete when delete button is clicked (default mode)', async () => {
    render(<ClientCard {...defaultProps} />);
    await userEvent.click(screen.getByRole('button', { name: 'Excluir cliente' }));
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it('should NOT render select button when hideSelectButton is true', () => {
    render(<ClientCard {...defaultProps} hideSelectButton={true} />);

    expect(screen.queryByTitle('Selecionar cliente')).not.toBeInTheDocument();
    expect(screen.getByTitle('Editar cliente')).toBeInTheDocument();
    expect(screen.getByTitle('Excluir cliente')).toBeInTheDocument();
  });

  it('should render ONLY remove button when isRemovable is true', () => {
    render(<ClientCard {...defaultProps} isRemovable={true} />);

    expect(screen.getByTitle('Remover cliente')).toBeInTheDocument();
    expect(screen.queryByTitle('Selecionar cliente')).not.toBeInTheDocument();
    expect(screen.queryByTitle('Editar cliente')).not.toBeInTheDocument();
    expect(screen.queryByTitle('Excluir cliente')).not.toBeInTheDocument();
  });

  it('should call onDelete when remove button is clicked (removable mode)', async () => {
    render(<ClientCard {...defaultProps} isRemovable={true} />);
    await userEvent.click(screen.getByRole('button', { name: 'Remover cliente' }));
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

});