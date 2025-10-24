import React from 'react';
import plusIcon from '../../../shell/src/assets/plus.png';
import pencilIcon from '../../../shell/src/assets/pencil.png';
import trashIcon from '../../../shell/src/assets/trash.png';
import minusIcon from '../../../shell/src/assets/minus.png';

export interface ClientCardProps {
  name: string;
  salary: string;
  company: string;
  onSelect?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  hideSelectButton?: boolean;
  isRemovable?: boolean;
}

const PlusIcon = () => (
  <img 
    src={plusIcon} 
    alt="Plus" 
    title="Adicionar cliente"
    style={{ width: '17px', height: '17px' }}
  />
);

const EditIcon = () => (
  <img 
    src={pencilIcon} 
    alt="Edit" 
    title="Editar cliente"
    style={{ width: '17px', height: '17px' }}
  />
);

const DeleteIcon = () => (
  <img 
    src={trashIcon} 
    alt="Delete" 
    title="Excluir cliente"
    style={{ width: '17px', height: '17px' }}
  />
);

const MinusIcon = () => (
  <img 
    src={minusIcon} 
    alt="Minus" 
    title="Remover cliente"
    style={{ width: '17px', height: '17px' }}
  />
);


export const ClientCard: React.FC<ClientCardProps> = ({
  name,
  salary,
  company,
  onSelect,
  onEdit,
  onDelete,
  hideSelectButton,
  isRemovable,
}) => {
  return (
    <div className="flex w-full flex-col border border-gray-200 bg-white p-4 shadow-lg" style={{ maxWidth: '285px', borderRadius: '4px' }}>
      <div className="text-center pb-3">
        <h2 className="text-base font-bold text-gray-800" style={{ fontSize: '16px', fontWeight: 700 }}>
          {name}
        </h2>
      </div>

      <div className="space-y-2 text-center">
        <div className="text-sm" style={{ fontSize: '14px', fontWeight: 400 }}>
          <span className="text-gray-500">Salário: </span>
          <span className="text-gray-700">{salary}</span>
        </div>
        <div className="text-sm" style={{ fontSize: '14px', fontWeight: 400 }}>
          <span className="text-gray-500">Empresa: </span>
          <span className="text-gray-700">{company}</span>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        {isRemovable ? (
          <>
            <div></div>
            <button
              onClick={onDelete}
              title="Remover cliente"
              className="flex items-center justify-center hover:opacity-70 transition-opacity"
            >
              <MinusIcon />
            </button>
          </>
        ) : (
          <>
            {!hideSelectButton && (
              <button
                onClick={onSelect}
                title="Selecionar cliente"
                className="flex items-center justify-center hover:opacity-70 transition-opacity"
              >
                <PlusIcon />
              </button>
            )}
            
            <button
              onClick={onEdit}
              title="Editar cliente"
              className="flex items-center justify-center hover:opacity-70 transition-opacity"
            >
              <EditIcon />
            </button>
            
            <button
              onClick={onDelete}
              title="Excluir cliente"
              className="flex items-center justify-center hover:opacity-70 transition-opacity"
            >
              <DeleteIcon />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ClientCard;