import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SelectedClient {
  id: string;
  name: string;
  salary: number;
  companyValuation: number;
}

interface ClientState {
  selectedClients: SelectedClient[];
  addClient: (client: SelectedClient) => void;
  removeClient: (clientId: string) => void;
  clearClients: () => void;
}

export const useClientStore = create(
  persist<ClientState>(
    (set) => ({
      selectedClients: [],

      addClient: (client) =>
        set((state) => {
          if (!state.selectedClients.some((c) => c.id === client.id)) {
            return { selectedClients: [...state.selectedClients, client] };
          }
          return state; 
        }),

      removeClient: (clientId) =>
        set((state) => ({
          selectedClients: state.selectedClients.filter((c) => c.id !== clientId),
        })),

      clearClients: () => set({ selectedClients: [] }),
    }),
    {
      name: 'selected-clients-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);