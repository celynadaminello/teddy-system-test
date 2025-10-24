import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useFetchClients } from './useFetchClients';
import { api } from '../services/api';
import type { Client } from '../types/client';

vi.mock('../services/api', () => ({
  api: {
    get: vi.fn(),
  },
}));

describe('useFetchClients', () => {
  const mockApiGet = vi.mocked(api.get);

  const mockClients: Client[] = [
    {
      id: '1',
      name: 'João Silva',
      salary: 5000,
      companyValuation: 100000,
    },
    {
      id: '2',
      name: 'Maria Santos',
      salary: 7000,
      companyValuation: 150000,
    },
  ];

  const mockApiResponse = {
    clients: mockClients,
    totalPages: 3,
    currentPage: 1,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should fetch clients successfully', async () => {
    mockApiGet.mockResolvedValue({ data: mockApiResponse });

    const { result } = renderHook(() => useFetchClients(1, 10));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.clients).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.clients).toEqual(mockClients);
    expect(result.current.totalPages).toBe(3);
    expect(result.current.currentPage).toBe(1);
    expect(result.current.error).toBeNull();
    expect(mockApiGet).toHaveBeenCalledWith('/users', {
      params: { page: 1, limit: 10 },
    });
  });

  it('should handle API error', async () => {
    const errorMessage = 'Network Error';
    mockApiGet.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useFetchClients(1, 10));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.clients).toEqual([]);
    expect(result.current.error).toBe('Não foi possível carregar os clientes.');
    expect(result.current.totalPages).toBe(1);
    expect(result.current.currentPage).toBe(1);
  });

  it('should refetch when page or limit changes', async () => {
    mockApiGet.mockResolvedValue({ data: mockApiResponse });

    const { result, rerender } = renderHook(
      ({ page, limit }) => useFetchClients(page, limit),
      { initialProps: { page: 1, limit: 10 } }
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockApiGet).toHaveBeenCalledTimes(1);

    rerender({ page: 2, limit: 10 });

    await waitFor(() => {
      expect(mockApiGet).toHaveBeenCalledTimes(2);
    });

    expect(mockApiGet).toHaveBeenLastCalledWith('/users', {
      params: { page: 2, limit: 10 },
    });

    rerender({ page: 2, limit: 20 });

    await waitFor(() => {
      expect(mockApiGet).toHaveBeenCalledTimes(3);
    });

    expect(mockApiGet).toHaveBeenLastCalledWith('/users', {
      params: { page: 2, limit: 20 },
    });
  });

  it('should provide refetch function', async () => {
    mockApiGet.mockResolvedValue({ data: mockApiResponse });

    const { result } = renderHook(() => useFetchClients(1, 10));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockApiGet).toHaveBeenCalledTimes(1);

    result.current.refetch();

    await waitFor(() => {
      expect(mockApiGet).toHaveBeenCalledTimes(2);
    });
  });

  it('should handle empty clients array', async () => {
    const emptyResponse = {
      clients: [],
      totalPages: 0,
      currentPage: 1,
    };

    mockApiGet.mockResolvedValue({ data: emptyResponse });

    const { result } = renderHook(() => useFetchClients(1, 10));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.clients).toEqual([]);
    expect(result.current.totalPages).toBe(0);
    expect(result.current.currentPage).toBe(1);
    expect(result.current.error).toBeNull();
  });

  it('should handle different page sizes', async () => {
    const smallPageResponse = {
      clients: [mockClients[0]],
      totalPages: 2,
      currentPage: 1,
    };

    mockApiGet.mockResolvedValue({ data: smallPageResponse });

    const { result } = renderHook(() => useFetchClients(1, 5));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.clients).toEqual([mockClients[0]]);
    expect(result.current.totalPages).toBe(2);
    expect(mockApiGet).toHaveBeenCalledWith('/users', {
      params: { page: 1, limit: 5 },
    });
  });

  it('should reset state on error', async () => {
    mockApiGet.mockResolvedValueOnce({ data: mockApiResponse });

    const { result, rerender } = renderHook(
      ({ page, limit }) => useFetchClients(page, limit),
      { initialProps: { page: 1, limit: 10 } }
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.clients).toEqual(mockClients);

    mockApiGet.mockRejectedValueOnce(new Error('API Error'));

    rerender({ page: 2, limit: 10 });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.clients).toEqual([]);
    expect(result.current.error).toBe('Não foi possível carregar os clientes.');
    expect(result.current.totalPages).toBe(1);
    expect(result.current.currentPage).toBe(1);
  });

  it('should maintain loading state during fetch', async () => {
    let resolvePromise: (value: any) => void;
    const promise = new Promise(resolve => {
      resolvePromise = resolve;
    });

    mockApiGet.mockReturnValue(promise);

    const { result } = renderHook(() => useFetchClients(1, 10));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.clients).toEqual([]);
    expect(result.current.error).toBeNull();

    resolvePromise!({ data: mockApiResponse });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.clients).toEqual(mockClients);
  });

  it('should handle API response with different structure', async () => {
    const customResponse = {
      clients: mockClients,
      totalPages: 5,
      currentPage: 2,
    };

    mockApiGet.mockResolvedValue({ data: customResponse });

    const { result } = renderHook(() => useFetchClients(2, 10));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.clients).toEqual(mockClients);
    expect(result.current.totalPages).toBe(5);
    expect(result.current.currentPage).toBe(2);
  });

  it('should not refetch when dependencies do not change', async () => {
    mockApiGet.mockResolvedValue({ data: mockApiResponse });

    const { rerender } = renderHook(
      ({ page, limit }) => useFetchClients(page, limit),
      { initialProps: { page: 1, limit: 10 } }
    );

    await waitFor(() => {
      expect(mockApiGet).toHaveBeenCalledTimes(1);
    });

    rerender({ page: 1, limit: 10 });

    expect(mockApiGet).toHaveBeenCalledTimes(1);
  });
});
