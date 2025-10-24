import { useClientStore } from './useClientStore';
import { describe, it, expect, beforeEach } from 'vitest';
import { act } from '@testing-library/react';

const mockClientA = { 
    id: '1', 
    name: 'Cliente A', 
    salary: 1000, 
    companyValuation: 10000 
};
const mockClientB = { 
    id: '2', 
    name: 'Cliente B', 
    salary: 2000, 
    companyValuation: 20000 
};

describe('useClientStore', () => {

  beforeEach(() => {
    act(() => {
      useClientStore.getState().clearClients();
    });
  });

  it('should initialize with an empty array of selectedClients', () => {
    const clients = useClientStore.getState().selectedClients;
    expect(clients).toEqual([]);
  });

  it('should add a client correctly when addClient is called', () => {
    act(() => {
      useClientStore.getState().addClient(mockClientA);
    });

    const clients = useClientStore.getState().selectedClients;
    expect(clients).toHaveLength(1);
    expect(clients[0].id).toBe('1');
  });

  it('should not add the same client twice', () => {
    act(() => {
      useClientStore.getState().addClient(mockClientA);
      useClientStore.getState().addClient(mockClientA);
    });

    const clients = useClientStore.getState().selectedClients;
    expect(clients).toHaveLength(1);
  });

  it('should remove a client correctly by id', () => {
    act(() => {
      useClientStore.getState().addClient(mockClientA);
      useClientStore.getState().addClient(mockClientB);
    });

    act(() => {
      useClientStore.getState().removeClient('1');
    });

    const clients = useClientStore.getState().selectedClients;
    expect(clients).toHaveLength(1);
    expect(clients[0].id).toBe('2');
  });

  it('should clear all clients when clearClients is called', () => {
    act(() => {
      useClientStore.getState().addClient(mockClientA);
      useClientStore.getState().addClient(mockClientB);
    });

    act(() => {
      useClientStore.getState().clearClients();
    });

    const clients = useClientStore.getState().selectedClients;
    expect(clients).toEqual([]);
  });
});