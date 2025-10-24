import React, { useState } from 'react';
import { Button, ClientCard, Modal } from 'design-system';
import { useFetchClients } from './hooks/useFetchClients';
import { formatCurrency } from './utils/formatCurrency';
import { useUserStore } from 'shell';
import type { Client } from './types/client';
import { api } from './services/api';
import { CreateClientForm } from './components/CreateClientForm';

function App() {
  const [currentPageState, setCurrentPageState] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);

  const { clients, isLoading, error, totalPages, currentPage, refetch } = useFetchClients(
    currentPageState,
    itemsPerPage
  );

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const addClient = useUserStore((state) => state.addUser);

  const handleSelectClient = (client: Client) => {
    addClient(client);
    alert(`${client.name} adicionado aos selecionados!`);
  };

  const handleEditClient = (id: string) => { console.log('Editar cliente:', id); };
  const handleDeleteClient = (id: string) => { console.log('Excluir cliente:', id); };

  const handleCreateClient = () => { setIsCreateModalOpen(true); };
  const handleCloseCreateModal = () => { setIsCreateModalOpen(false); };
  const handleCreateSuccess = () => {
    handleCloseCreateModal();
    refetch();
    alert('Cliente criado com sucesso!');
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPageState(newPage);
    }
   };
  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPageState(1);
   };
  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded ${
            i === currentPage ? 'bg-orange-500 text-white font-bold' : 'hover:bg-gray-200'
          }`}
        >
          {i}
        </button>
      );
    }
    return buttons;
   };

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-semibold">
          {clients.length > 0 ? `${clients.length * currentPageState} ` : ''}clientes encontrados:
        </h2>
        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="limit-select">Clientes por página:</label>
          <select
            id="limit-select"
            value={itemsPerPage}
            onChange={handleLimitChange}
            className="rounded border border-gray-300 p-1"
          >
            <option value={8}>8</option>
            <option value={16}>16</option>
            <option value={24}>24</option>
          </select>
        </div>
      </div>

      {isLoading && <div className="text-center">Carregando clientes...</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}
      {!isLoading && !error && clients.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {clients.map((client) => (
            <ClientCard
              key={client.id}
              name={client.name}
              salary={formatCurrency(client.salary)}
              company={formatCurrency(client.companyValuation)}
              onSelect={() => handleSelectClient(client)}
              onEdit={() => handleEditClient(client.id)}
              onDelete={() => handleDeleteClient(client.id)}
            />
          ))}
        </div>
      )}
      {!isLoading && !error && clients.length === 0 && (
        <div className="text-center text-gray-500 mt-10">Nenhum cliente encontrado.</div>
      )}


      {!isLoading && !error && (
        <div className="mt-8 border-t pt-6">
          <Button
            onClick={handleCreateClient}
            className="w-full max-w-xs mb-6"
          >
            Criar cliente
          </Button>

          {totalPages > 1 && (
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {renderPaginationButtons()}
            </div>
          )}
        </div>
      )}

      <Modal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        title="Criar cliente"
      >
        <CreateClientForm
          onSuccess={handleCreateSuccess}
          onCancel={handleCloseCreateModal}
        />
      </Modal>
    </div>
  );
}

export default App;