import React from 'react';
import { Button, ClientCard } from 'design-system';
import { useFetchClients } from './hooks/useFetchClients';
import { formatCurrency } from './utils/formatCurrency';

const handleSelectClient = (id: string) => {
  console.log('Selecionar cliente:', id);
};
const handleEditClient = (id: string) => {
  console.log('Editar cliente:', id);
};
const handleDeleteClient = (id: string) => {
  console.log('Excluir cliente:', id);
};
const handleCreateClient = () => {
  console.log('Criar novo cliente');
};

function App() {
  const { clients, isLoading, error } = useFetchClients();

  if (isLoading) {
    return <div className="text-center">Carregando clientes...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          {clients.length} clientes encontrados:
        </h2>
        <div className="text-sm">
          Clientes por página: <strong>16</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {clients.map((client) => (
          <ClientCard
            key={client.id}
            name={client.name}
            company={client.company}
            salary={formatCurrency(client.salary)}
            onSelect={() => handleSelectClient(client.id)}
            onEdit={() => handleEditClient(client.id)}
            onDelete={() => handleDeleteClient(client.id)}
          />
        ))}
      </div>

      <div className="mt-8 border-t pt-6">
        <Button
          onClick={handleCreateClient}
          className="w-full max-w-xs"
        >
          Criar cliente
        </Button>

        <div className="mt-6 flex justify-center gap-2">
          <span>1</span>
          <span>...</span>
          <span className="font-bold text-orange-500">3</span>
          <span>4</span>
          <span>5</span>
          <span>...</span>
          <span>12</span>
        </div>
      </div>
    </div>
  );
}

export default App;