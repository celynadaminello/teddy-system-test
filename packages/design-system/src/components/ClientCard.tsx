import React from 'react';

export interface ClientCardProps {
  name: string;
  salary: string;
  company: string;
  onSelect?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const PlusIcon = () => <span>+</span>;
const EditIcon = () => <span>✏️</span>;
const DeleteIcon = () => <span>🗑️</span>;


export const ClientCard: React.FC<ClientCardProps> = ({
  name,
  salary,
  company,
  onSelect,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex w-full max-w-sm flex-col rounded-lg border border-gray-200 bg-white p-4 shadow">
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <button
          onClick={onSelect}
          title="Selecionar cliente"
          className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 text-lg text-gray-500 hover:bg-gray-100"
        >
          <PlusIcon />
        </button>
      </div>

      <div className="my-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-500">Salário:</span>
          <span className="font-semibold text-gray-700">{salary}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-500">Empresa:</span>
          <span className="font-semibold text-gray-700">{company}</span>
        </div>
      </div>

      <div className="mt-auto flex justify-end gap-3 pt-3">
        <button
          onClick={onEdit}
          title="Editar cliente"
          className="text-gray-400 hover:text-blue-500"
        >
          <EditIcon />
        </button>
        <button
          onClick={onDelete}
          title="Excluir cliente"
          className="text-gray-400 hover:text-red-500"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default ClientCard;