import React, { useState } from 'react';
import { Button, ClientCard } from 'design-system';
import { useFetchClients } from './hooks/useFetchClients';
import { useUserStore } from 'shell'; 
import { formatCurrency } from './utils/formatCurrency';

function App() {
  const [currentPageState, setCurrentPageState] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);

  const { clients, isLoading, error, totalPages, currentPage } = useFetchClients(
    currentPageState, 
    itemsPerPage
  );

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
      {!isLoading && !error && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {clients.map((client) => (
            <ClientCard 
              name={client.name}
              salary={formatCurrency(client.salary)}
              company={formatCurrency(client.companyValuation)}
            /> 
          ))}
        </div>
      )}

      {!isLoading && !error && totalPages > 0 && (
        <div className="mt-8 border-t pt-6">
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {renderPaginationButtons()}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;