import { describe, it, expect } from 'vitest';
import type { Client } from './client';

describe('Client type', () => {
  it('should have correct interface structure', () => {
    const client: Client = {
      id: '1',
      name: 'João Silva',
      salary: 5000,
      companyValuation: 100000,
    };

    expect(client.id).toBe('1');
    expect(client.name).toBe('João Silva');
    expect(client.salary).toBe(5000);
    expect(client.companyValuation).toBe(100000);
  });

  it('should accept string id', () => {
    const client: Client = {
      id: 'client-123',
      name: 'Maria Santos',
      salary: 7000,
      companyValuation: 150000,
    };

    expect(typeof client.id).toBe('string');
    expect(client.id).toBe('client-123');
  });

  it('should accept string name', () => {
    const client: Client = {
      id: '1',
      name: 'Pedro Oliveira',
      salary: 6000,
      companyValuation: 120000,
    };

    expect(typeof client.name).toBe('string');
    expect(client.name).toBe('Pedro Oliveira');
  });

  it('should accept number salary', () => {
    const client: Client = {
      id: '1',
      name: 'Ana Costa',
      salary: 8000,
      companyValuation: 200000,
    };

    expect(typeof client.salary).toBe('number');
    expect(client.salary).toBe(8000);
  });

  it('should accept number companyValuation', () => {
    const client: Client = {
      id: '1',
      name: 'Carlos Lima',
      salary: 9000,
      companyValuation: 300000,
    };

    expect(typeof client.companyValuation).toBe('number');
    expect(client.companyValuation).toBe(300000);
  });

  it('should handle decimal values', () => {
    const client: Client = {
      id: '1',
      name: 'Fernanda Silva',
      salary: 5500.50,
      companyValuation: 125000.75,
    };

    expect(client.salary).toBe(5500.50);
    expect(client.companyValuation).toBe(125000.75);
  });

  it('should handle zero values', () => {
    const client: Client = {
      id: '1',
      name: 'João Sem Salário',
      salary: 0,
      companyValuation: 0,
    };

    expect(client.salary).toBe(0);
    expect(client.companyValuation).toBe(0);
  });

  it('should handle large numbers', () => {
    const client: Client = {
      id: '1',
      name: 'Empresário Rico',
      salary: 100000,
      companyValuation: 1000000,
    };

    expect(client.salary).toBe(100000);
    expect(client.companyValuation).toBe(1000000);
  });

  it('should handle empty string name', () => {
    const client: Client = {
      id: '1',
      name: '',
      salary: 5000,
      companyValuation: 100000,
    };

    expect(client.name).toBe('');
  });

  it('should handle special characters in name', () => {
    const client: Client = {
      id: '1',
      name: 'José da Silva & Cia.',
      salary: 5000,
      companyValuation: 100000,
    };

    expect(client.name).toBe('José da Silva & Cia.');
  });

  it('should handle unicode characters in name', () => {
    const client: Client = {
      id: '1',
      name: 'José María González',
      salary: 5000,
      companyValuation: 100000,
    };

    expect(client.name).toBe('José María González');
  });

  it('should be compatible with array operations', () => {
    const clients: Client[] = [
      {
        id: '1',
        name: 'Cliente 1',
        salary: 5000,
        companyValuation: 100000,
      },
      {
        id: '2',
        name: 'Cliente 2',
        salary: 7000,
        companyValuation: 150000,
      },
    ];

    expect(clients).toHaveLength(2);
    expect(clients[0].name).toBe('Cliente 1');
    expect(clients[1].name).toBe('Cliente 2');
  });

  it('should be compatible with object destructuring', () => {
    const client: Client = {
      id: '1',
      name: 'João Silva',
      salary: 5000,
      companyValuation: 100000,
    };

    const { id, name, salary, companyValuation } = client;

    expect(id).toBe('1');
    expect(name).toBe('João Silva');
    expect(salary).toBe(5000);
    expect(companyValuation).toBe(100000);
  });

  it('should be compatible with spread operator', () => {
    const client: Client = {
      id: '1',
      name: 'João Silva',
      salary: 5000,
      companyValuation: 100000,
    };

    const updatedClient = {
      ...client,
      name: 'João Silva Atualizado',
    };

    expect(updatedClient.id).toBe('1');
    expect(updatedClient.name).toBe('João Silva Atualizado');
    expect(updatedClient.salary).toBe(5000);
    expect(updatedClient.companyValuation).toBe(100000);
  });

  it('should be compatible with JSON serialization', () => {
    const client: Client = {
      id: '1',
      name: 'João Silva',
      salary: 5000,
      companyValuation: 100000,
    };

    const json = JSON.stringify(client);
    const parsed = JSON.parse(json);

    expect(parsed.id).toBe('1');
    expect(parsed.name).toBe('João Silva');
    expect(parsed.salary).toBe(5000);
    expect(parsed.companyValuation).toBe(100000);
  });
});
