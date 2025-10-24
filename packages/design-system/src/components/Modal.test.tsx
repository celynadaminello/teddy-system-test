import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';
import { describe, it, expect, vi } from 'vitest';

describe('Modal Component', () => {

  it('should not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    const modalElement = screen.queryByRole('dialog');
    expect(modalElement).not.toBeInTheDocument();
  });

  it('should render correctly when isOpen is true', () => {
    const modalTitle = "My Modal Title";
    const modalContent = "This is the content inside the modal.";
    render(
      <Modal isOpen={true} onClose={() => {}} title={modalTitle}>
        <p>{modalContent}</p>
      </Modal>
    );

    const modalContainer = screen.getByText(modalTitle).closest('div.fixed');
    const titleElement = screen.getByRole('heading', { level: 3, name: modalTitle });
    const contentElement = screen.getByText(modalContent);

    expect(modalContainer).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
  });

  it('should display the correct title', () => {
    const testTitle = "Specific Title";
    render(
      <Modal isOpen={true} onClose={() => {}} title={testTitle}>
        <div>Content</div>
      </Modal>
    );
    const titleElement = screen.getByRole('heading', { level: 3, name: testTitle });
    expect(titleElement).toHaveTextContent(testTitle);
  });

  it('should render the children content', () => {
    const childText = "Rendered Children";
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test">
        <strong>{childText}</strong>
      </Modal>
    );
    const childElement = screen.getByText(childText);
    expect(childElement).toBeInTheDocument();
    expect(childElement.tagName).toBe('STRONG');
  });

  it('should call onClose when the close button (image) is clicked', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={handleClose} title="Test Close">
        <div>Content</div>
      </Modal>
    );

    const closeImage = screen.getByAltText('Close');
    const closeButton = closeImage.closest('button');

    expect(closeButton).toBeInTheDocument();

    if (closeButton) {
        await user.click(closeButton);
    }

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});