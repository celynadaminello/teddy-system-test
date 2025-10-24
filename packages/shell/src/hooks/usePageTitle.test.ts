import { renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { usePageTitle } from './usePageTitle';

describe('usePageTitle', () => {
  beforeEach(() => {
    document.title = '';
    
    const existingMeta = document.querySelector('meta[name="description"]');
    if (existingMeta) {
      existingMeta.remove();
    }
  });

  it('should set document title with default format', () => {
    renderHook(() => usePageTitle({ title: 'Home' }));

    expect(document.title).toBe('Home - Teddy System');
  });

  it('should set document title for different pages', () => {
    const { rerender } = renderHook(
      ({ title }) => usePageTitle({ title }),
      { initialProps: { title: 'Clientes' } }
    );

    expect(document.title).toBe('Clientes - Teddy System');

    rerender({ title: 'Dashboard' });
    expect(document.title).toBe('Dashboard - Teddy System');
  });

  it('should update meta description when provided', () => {
    const metaElement = document.createElement('meta');
    metaElement.name = 'description';
    metaElement.content = 'Old description';
    document.head.appendChild(metaElement);

    renderHook(() => usePageTitle({ 
      title: 'Home', 
      description: 'Página inicial do sistema' 
    }));

    const updatedMeta = document.querySelector('meta[name="description"]');
    expect(updatedMeta).toBeInTheDocument();
    expect(updatedMeta?.getAttribute('content')).toBe('Página inicial do sistema');
  });

  it('should create new meta description element when none exists', () => {
    renderHook(() => usePageTitle({ 
      title: 'About', 
      description: 'Sobre o sistema' 
    }));

    const metaElement = document.querySelector('meta[name="description"]');
    expect(metaElement).toBeInTheDocument();
    expect(metaElement?.getAttribute('content')).toBe('Sobre o sistema');
  });

  it('should not manipulate meta description when not provided', () => {
    renderHook(() => usePageTitle({ title: 'Home' }));

    const metaElement = document.querySelector('meta[name="description"]');
    expect(metaElement).not.toBeInTheDocument();
  });

  it('should update title and description when dependencies change', () => {
    const { rerender } = renderHook(
      ({ title, description }) => usePageTitle({ title, description }),
      { 
        initialProps: { 
          title: 'Page 1', 
          description: 'Description 1' 
        } 
      }
    );

    expect(document.title).toBe('Page 1 - Teddy System');

    rerender({ title: 'Page 2', description: 'Description 2' });
    expect(document.title).toBe('Page 2 - Teddy System');
  });

  it('should handle empty title', () => {
    renderHook(() => usePageTitle({ title: '' }));

    expect(document.title).toBe('- Teddy System');
  });

  it('should handle special characters in title', () => {
    renderHook(() => usePageTitle({ title: 'Página & Teste' }));

    expect(document.title).toBe('Página & Teste - Teddy System');
  });

  it('should handle long descriptions', () => {
    const longDescription = 'Esta é uma descrição muito longa que pode ser usada para testar se o hook funciona corretamente com textos extensos que podem aparecer em meta descriptions de páginas web.';

    renderHook(() => usePageTitle({ 
      title: 'Long Page', 
      description: longDescription 
    }));

    const metaElement = document.querySelector('meta[name="description"]');
    expect(metaElement).toBeInTheDocument();
    expect(metaElement?.getAttribute('content')).toBe(longDescription);
  });

  it('should work with different meta description formats', () => {
    renderHook(() => usePageTitle({ 
      title: 'SEO Test', 
      description: 'Test description with <html> tags' 
    }));

    const metaElement = document.querySelector('meta[name="description"]');
    expect(metaElement).toBeInTheDocument();
    expect(metaElement?.getAttribute('content')).toBe('Test description with <html> tags');
  });
});
