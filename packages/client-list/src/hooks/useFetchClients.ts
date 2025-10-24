import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import type { Client } from '../types/client';

interface ApiResponse {
  clients: Client[];
  totalPages: number;
  currentPage: number;
}

export function useFetchClients(page: number, limit: number) {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchClients = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get<ApiResponse>('/users', {
        params: { page, limit },
      });
      console.log('Resposta da API:', response.data);
      setClients(response.data.clients);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (err) {
      console.error('Erro ao buscar clientes:', err);
      setError('Não foi possível carregar os clientes.');
      setClients([]);
      setTotalPages(1);
      setCurrentPage(1);
    } finally {
      setIsLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  return { clients, isLoading, error, totalPages, currentPage, refetch: fetchClients };
}