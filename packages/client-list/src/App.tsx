import React, { useState } from 'react';
import { Button, ClientCard, Modal, Input } from 'design-system';
import { useFetchClients } from './hooks/useFetchClients';
import { formatCurrency } from 'design-system';
import { useClientStore } from 'shell';
import type { Client } from './types/client';
import { api } from './services/api';
import { CreateClientForm } from './components/CreateClientForm';
import { EditClientForm } from './components/EditClientForm';

function App() {
  const [currentPageState, setCurrentPageState] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);

  const { clients, isLoading, error, totalPages, currentPage, refetch } = useFetchClients(
    currentPageState,
    itemsPerPage
  );

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingClient, setDeletingClient] = useState<Client | null>(null);

  const addClient = useClientStore((state) => state.addClient);

  const handleSelectClient = (client: Client) => {
    addClient(client);
    alert(`${client.name} adicionado aos selecionados!`);
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setIsEditModalOpen(true);
  };

  const handleDeleteClient = (client: Client) => {
    setDeletingClient(client);
    setIsDeleteModalOpen(true);
  };

  const handleCreateClient = () => { setIsCreateModalOpen(true); };
  const handleCloseCreateModal = () => { setIsCreateModalOpen(false); };
  const handleCreateSuccess = () => {
    handleCloseCreateModal();
    refetch();
    alert('Cliente criado com sucesso!');
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingClient(null);
  };
  const handleEditSuccess = () => {
    handleCloseEditModal();
    refetch();
    alert('Cliente atualizado com sucesso!');
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingClient(null);
  };

  const confirmDeleteClient = async () => {
    if (!deletingClient) return;

    try {
      await api.delete(`/users/${deletingClient.id}`);
      handleCloseDeleteModal();
      refetch();
      alert('Cliente excluído com sucesso!');
    } catch (err: any) {
      console.error('Erro ao excluir cliente:', err);
      const apiErrorMessage = err.response?.data?.message || err.message;
      alert(`Falha ao excluir cliente: ${apiErrorMessage || 'Erro desconhecido'}`);
    }
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
              onEdit={() => handleEditClient(client)}
              onDelete={() => handleDeleteClient(client)}
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

      {editingClient && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          title={`Editar cliente: ${editingClient.name}`}
        >
          <EditClientForm
            client={editingClient}
            onSuccess={handleEditSuccess}
            onCancel={handleCloseEditModal}
          />
        </Modal>
      )}

      {deletingClient && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          title={`Excluir cliente: ${deletingClient.name}?`}
        >
          <div className="space-y-4">
            <p className="text-gray-700">
              Você tem certeza que deseja excluir o cliente "{deletingClient.name}"? Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                onClick={handleCloseDeleteModal}
                className="bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancelar
              </Button>
              <Button
                type="button"
                onClick={confirmDeleteClient}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                Excluir cliente
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;