import { Button, ClientCard } from 'design-system';
import { useClientStore } from 'shell';
import { formatCurrency } from 'design-system';

function App() {
  const selectedClients = useClientStore((state) => state.selectedClients);
  const removeClient = useClientStore((state) => state.removeClient);
  const clearClients = useClientStore((state) => state.clearClients);

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <h2 style={{ fontSize: '22px', fontWeight: 700 }} className="mb-6">
        {selectedClients.length > 0 ? (
          <>
            <span style={{ fontSize: '22px', fontWeight: 700 }}>{selectedClients.length}</span> clientes selecionados:
          </>
        ) : (
          'Clientes selecionados:'
        )}
      </h2>

      {selectedClients.length === 0 && (
        <p className="text-center text-gray-500">Nenhum cliente selecionado ainda.</p>
      )}

      {selectedClients.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
          {selectedClients.map((client) => (
            <ClientCard
              key={client.id}
              name={client.name}
              salary={formatCurrency(client.salary)}
              company={formatCurrency(client.companyValuation)}
              isRemovable={true}
              onDelete={() => removeClient(client.id)}
            />
          ))}
        </div>
      )}

      {selectedClients.length > 0 && (
         <div className="mt-8 border-t pt-6">
            <div className="mb-6">
              <Button
                onClick={clearClients}
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
                Limpar clientes selecionados
              </Button>
            </div>
        </div>
      )}
    </div>
  );
}

export default App;