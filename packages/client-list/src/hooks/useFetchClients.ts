import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { Client } from '../types/client';

export function useFetchClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await api.get('/clients'); 

        setClients(response.data);
      } catch (err) {
        console.error('Erro ao buscar clientes:', err);
        setError('Não foi possível carregar os clientes.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, []);

  return { clients, isLoading, error };
}