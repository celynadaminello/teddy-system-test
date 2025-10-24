import { useUserStore } from './useUserStore';
import { describe, it, expect, beforeEach } from 'vitest';
import { act } from '@testing-library/react';

beforeEach(() => {
    localStorage.clear();
    act(() => {
        useUserStore.getState().logout();
    });
});

describe('useUserStore', () => {

  it('should initialize with name as null', () => {
    const name = useUserStore.getState().name;
    expect(name).toBeNull();
  });

  it('should update name correctly when login is called', () => {
    const testName = 'Celyna';

    act(() => {
      useUserStore.getState().login(testName);
    });

    const name = useUserStore.getState().name;
    expect(name).toBe(testName);
  });

  it('should set name back to null when logout is called', () => {
    act(() => {
      useUserStore.setState({ name: 'Celyna' });
    });

    act(() => {
      useUserStore.getState().logout();
    });

    const name = useUserStore.getState().name;
    expect(name).toBeNull();
  });

  it('should persist and rehydrate the state from localStorage', () => {
      const testName = 'Persisted User';

      act(() => {
        useUserStore.getState().login(testName);
      });

      const storedItem = localStorage.getItem('user-storage');
      expect(storedItem).not.toBeNull();

      const parsedData = JSON.parse(storedItem!);
      expect(parsedData.state.name).toBe(testName);
  });
});