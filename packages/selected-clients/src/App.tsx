import React from 'react';
import { Button, ClientCard } from 'design-system';
import { useClientStore } from 'shell';
import { formatCurrency } from 'design-system';
const MinusIcon = () => <span>-</span>;

function App() {
  const selectedClients = useClientStore((state) => state.selectedClients);
  const removeClient = useClientStore((state) => state.removeClient);
  const clearClients = useClientStore((state) => state.clearClients);

  return (
    <div className="w-full">
      <h2 className="mb-6 text-2xl font-semibold">Clientes selecionados:</h2>

      {selectedClients.length === 0 && (
        <p className="text-center text-gray-500">Nenhum cliente selecionado ainda.</p>
      )}

      {selectedClients.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {selectedClients.map((client) => (
            <div key={client.id} className="relative"> 
              <ClientCard
                name={client.name}
                salary={formatCurrency(client.salary)}
                company={formatCurrency(client.companyValuation)}
                hideSelectButton={true}
                onSelect={() => {}} 
              />
              <button
                onClick={() => removeClient(client.id)}
                title="Remover cliente"
                className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-white text-lg text-red-500 hover:bg-red-50"
              >
                <MinusIcon />
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedClients.length > 0 && (
         <div className="mt-8 border-t pt-6">
            <Button
                onClick={clearClients}
                className="w-full max-w-xs border border-orange-500 bg-transparent text-orange-500 hover:bg-orange-50" 
            >
                Limpar clientes selecionados
            </Button>
        </div>
      )}
    </div>
  );
}

export default App;