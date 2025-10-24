import React from 'react';
import closeIcon from '../../../shell/src/assets/close.png';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const CloseIcon = () => (
  <img 
    src={closeIcon} 
    alt="Close" 
    title="Fechar modal"
    style={{ width: '12px', height: '12px' }}
  />
);

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        className="relative rounded-lg bg-white p-6 shadow-xl"
        style={{ 
          width: '400px',
          maxWidth: '90vw',
          margin: '0 16px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b pb-3">
          <h3 style={{ fontSize: '16px', fontWeight: 700 }}>{title}</h3>
          <button
            onClick={onClose}
            className="flex items-center justify-center hover:opacity-70 transition-opacity"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;