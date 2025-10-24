import { describe, it, expect } from 'vitest';
import { api } from './api';

describe('api service', () => {
  it('should export api instance', () => {
    expect(api).toBeDefined();
  });

  it('should be an axios instance', () => {
    expect(api).toHaveProperty('get');
    expect(api).toHaveProperty('post');
    expect(api).toHaveProperty('put');
    expect(api).toHaveProperty('patch');
    expect(api).toHaveProperty('delete');
  });

  it('should have correct base URL', () => {
    expect(api.defaults.baseURL).toBe('https://boasorte.teddybackoffice.com.br');
  });

  it('should be configured for the correct environment', () => {
    expect(api.defaults.baseURL).toContain('boasorte.teddybackoffice.com.br');
    expect(api.defaults.baseURL).toContain('https://');
  });

  it('should have proper HTTPS configuration', () => {
    expect(api.defaults.baseURL).toMatch(/^https:\/\//);
  });

  it('should be configured for the Teddy system', () => {
    expect(api.defaults.baseURL).toContain('teddybackoffice.com.br');
  });

  it('should have axios methods available', () => {
    expect(typeof api.get).toBe('function');
    expect(typeof api.post).toBe('function');
    expect(typeof api.put).toBe('function');
    expect(typeof api.patch).toBe('function');
    expect(typeof api.delete).toBe('function');
  });

  it('should be configured with correct defaults', () => {
    expect(api.defaults).toBeDefined();
    expect(api.defaults.baseURL).toBeDefined();
  });
});
