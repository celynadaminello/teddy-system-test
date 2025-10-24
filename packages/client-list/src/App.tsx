import React, { useState } from 'react';
import { Button, ClientCard, Modal } from 'design-system';
import { HiOutlineChevronDown } from 'react-icons/hi2';
import { useFetchClients } from './hooks/useFetchClients';
import { formatCurrency } from 'design-system';
import { useClientStore, usePageTitle } from 'shell';
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

  usePageTitle({
    title: 'Lista de Clientes',
    description: 'Visualize e gerencie todos os seus clientes no sistema Teddy'
  });

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
    const maxVisiblePages = 5;
    const sidePages = 2;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(createPageButton(i));
      }
    } else {
      buttons.push(createPageButton(1));
      const startPage = Math.max(2, currentPage - sidePages);
      const endPage = Math.min(totalPages - 1, currentPage + sidePages);

      if (startPage > 2) {
        buttons.push(createEllipsis());
      }

      for (let i = startPage; i <= endPage; i++) {
        if (i !== 1 && i !== totalPages) {
          buttons.push(createPageButton(i));
        }
      }

      if (endPage < totalPages - 1) {
        buttons.push(createEllipsis());
      }

      if (totalPages > 1) {
        buttons.push(createPageButton(totalPages));
      }
    }

    return buttons;
  };

  const createPageButton = (pageNumber: number) => {
    const isActive = pageNumber === currentPage;
    return (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        style={{
          width: '35px',
          height: '35px',
          fontSize: '14px',
          fontWeight: 700,
          borderRadius: '4px',
          backgroundColor: isActive ? '#EC6724' : 'transparent',
          color: isActive ? 'white' : 'black',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = '#f5f5f5';
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        {pageNumber}
      </button>
    );
  };

  const createEllipsis = () => {
    return (
      <span
        key="ellipsis"
        style={{
          width: '35px',
          height: '35px',
          fontSize: '14px',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'black'
        }}
      >
        ...
      </span>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="mb-6 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <h1 style={{ fontSize: '18px', fontWeight: 400 }}>
          {clients.length > 0 ? (
            <>
              <span style={{ fontSize: '18px', fontWeight: 700 }}>{clients.length * currentPageState}</span> clientes encontrados:
            </>
          ) : (
            'clientes encontrados:'
          )}
        </h1>
        <div className="flex items-center gap-2">
          <label htmlFor="limit-select" style={{ fontSize: '18px' }}>Clientes por página:</label>
          <div className="relative">
            <select
              id="limit-select"
              value={itemsPerPage}
              onChange={handleLimitChange}
              style={{
                width: '50px',
                height: '25px',
                border: '1px solid #D9D9D9',
                fontSize: '12px',
                fontWeight: 400,
                paddingLeft: '8px',
                paddingRight: '20px',
                appearance: 'none',
                borderRadius: '4px',
                backgroundColor: '#f5f5f5'
              }}
            >
              <option value={8}>8</option>
              <option value={16}>16</option>
              <option value={24}>24</option>
            </select>
            <HiOutlineChevronDown 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
              style={{ fontSize: '12px', color: '#666' }}
            />
          </div>
        </div>
      </div>

      {isLoading && <div className="text-center">Carregando clientes...</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}
      {!isLoading && !error && clients.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
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
          <div className="mb-6">
            <Button
              onClick={handleCreateClient}
              className="w-full"
              style={{
                backgroundColor: 'transparent',
                border: '2px solid #EC6724',
                fontSize: '14px',
                fontWeight: 700,
                color: '#EC6724',
                padding: '12px 24px',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#EC6724';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#EC6724';
              }}
            >
              Criar cliente
            </Button>
          </div>

          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center gap-2">
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
          title="Excluir cliente"
        >
          <div className="space-y-4">
            <p className="text-gray-700">
              Você está prestes a excluir o cliente: <span style={{ fontWeight: 700 }}>{deletingClient.name}</span>
            </p>
            <div className="pt-4">
              <Button
                type="button"
                onClick={confirmDeleteClient}
                style={{
                  backgroundColor: '#EC6724',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'block',
                  margin: '0 auto',
                  height: '40px',
                  width: '100%'
                }}
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