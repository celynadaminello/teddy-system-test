import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useClientStore } from 'shell';
import { act } from '@testing-library/react';

describe('useClientStore with localStorage persistence', () => {
  const mockClientA = {
    id: '1',
    name: 'João Silva',
    salary: 5000,
    companyValuation: 100000,
  };

  const mockClientB = {
    id: '2',
    name: 'Maria Santos',
    salary: 7000,
    companyValuation: 150000,
  };

  beforeEach(() => {
    localStorage.clear();
    act(() => {
      useClientStore.getState().clearClients();
    });
  });

  it('should add client and persist to localStorage', () => {
    act(() => {
      useClientStore.getState().addClient(mockClientA);
    });

    const store = useClientStore.getState();
    expect(store.selectedClients).toHaveLength(1);
    expect(store.selectedClients[0]).toEqual(mockClientA);

    const storedData = localStorage.getItem('selected-clients-storage');
    expect(storedData).toBeTruthy();
    
    const parsedData = JSON.parse(storedData!);
    expect(parsedData.state.selectedClients).toHaveLength(1);
    expect(parsedData.state.selectedClients[0]).toEqual(mockClientA);
  });

  it('should remove client and persist to localStorage', () => {
    act(() => {
      useClientStore.getState().addClient(mockClientA);
      useClientStore.getState().addClient(mockClientB);
    });

    act(() => {
      useClientStore.getState().removeClient(mockClientA.id);
    });

    const store = useClientStore.getState();
    expect(store.selectedClients).toHaveLength(1);
    expect(store.selectedClients[0]).toEqual(mockClientB);

    const storedData = localStorage.getItem('selected-clients-storage');
    expect(storedData).toBeTruthy();
    
    const parsedData = JSON.parse(storedData!);
    expect(parsedData.state.selectedClients).toHaveLength(1);
    expect(parsedData.state.selectedClients[0]).toEqual(mockClientB);
  });

  it('should clear all clients and persist to localStorage', () => {
    act(() => {
      useClientStore.getState().addClient(mockClientA);
      useClientStore.getState().addClient(mockClientB);
    });

    act(() => {
      useClientStore.getState().clearClients();
    });

    const store = useClientStore.getState();
    expect(store.selectedClients).toHaveLength(0);

    const storedData = localStorage.getItem('selected-clients-storage');
    expect(storedData).toBeTruthy();
    
    const parsedData = JSON.parse(storedData!);
    expect(parsedData.state.selectedClients).toHaveLength(0);
  });

  it('should persist data to localStorage with correct structure', () => {
    act(() => {
      useClientStore.getState().addClient(mockClientA);
    });

    const storedData = localStorage.getItem('selected-clients-storage');
    expect(storedData).toBeTruthy();
    
    const parsedData = JSON.parse(storedData!);
    expect(parsedData).toHaveProperty('state');
    expect(parsedData).toHaveProperty('version');
    expect(parsedData.state).toHaveProperty('selectedClients');
    expect(parsedData.state.selectedClients).toHaveLength(1);
    expect(parsedData.state.selectedClients[0]).toEqual(mockClientA);
  });

  it('should not add duplicate clients', () => {
    act(() => {
      useClientStore.getState().addClient(mockClientA);
      useClientStore.getState().addClient(mockClientA);
    });

    const store = useClientStore.getState();
    expect(store.selectedClients).toHaveLength(1);
    expect(store.selectedClients[0]).toEqual(mockClientA);
  });

  it('should handle corrupted localStorage data gracefully', () => {
    localStorage.setItem('selected-clients-storage', 'invalid-json');

    expect(() => {
      useClientStore.getState();
    }).not.toThrow();

    const store = useClientStore.getState();
    expect(store.selectedClients).toEqual([]);
  });

  it('should handle empty localStorage gracefully', () => {
    localStorage.clear();

    const store = useClientStore.getState();
    expect(store.selectedClients).toEqual([]);
  });

  it('should maintain data integrity across operations', () => {
    act(() => {
      useClientStore.getState().addClient(mockClientA);
      useClientStore.getState().addClient(mockClientB);
    });

    let store = useClientStore.getState();
    expect(store.selectedClients).toHaveLength(2);

    act(() => {
      useClientStore.getState().removeClient(mockClientA.id);
    });

    store = useClientStore.getState();
    expect(store.selectedClients).toHaveLength(1);
    expect(store.selectedClients[0]).toEqual(mockClientB);

    const mockClientC = {
      id: '3',
      name: 'Carlos Lima',
      salary: 6000,
      companyValuation: 120000,
    };

    act(() => {
      useClientStore.getState().addClient(mockClientC);
    });

    store = useClientStore.getState();
    expect(store.selectedClients).toHaveLength(2);
    expect(store.selectedClients).toEqual([mockClientB, mockClientC]);
  });
});