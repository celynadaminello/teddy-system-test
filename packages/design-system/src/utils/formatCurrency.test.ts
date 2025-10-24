import { describe, it, expect } from 'vitest';
import { formatCurrency } from './formatCurrency';

describe('formatCurrency', () => {
  it('should format positive numbers correctly', () => {
    expect(formatCurrency(1000)).toMatch(/R\$\s*1\.000,00/);
    expect(formatCurrency(1234.56)).toMatch(/R\$\s*1\.234,56/);
    expect(formatCurrency(0.99)).toMatch(/R\$\s*0,99/);
  });

  it('should format negative numbers correctly', () => {
    expect(formatCurrency(-1000)).toMatch(/-R\$\s*1\.000,00/);
    expect(formatCurrency(-1234.56)).toMatch(/-R\$\s*1\.234,56/);
    expect(formatCurrency(-0.99)).toMatch(/-R\$\s*0,99/);
  });

  it('should format zero correctly', () => {
    expect(formatCurrency(0)).toMatch(/R\$\s*0,00/);
  });

  it('should format large numbers correctly', () => {
    expect(formatCurrency(1000000)).toMatch(/R\$\s*1\.000\.000,00/);
    expect(formatCurrency(1234567.89)).toMatch(/R\$\s*1\.234\.567,89/);
  });

  it('should format decimal numbers correctly', () => {
    expect(formatCurrency(10.5)).toMatch(/R\$\s*10,50/);
    expect(formatCurrency(99.99)).toMatch(/R\$\s*99,99/);
    expect(formatCurrency(0.01)).toMatch(/R\$\s*0,01/);
  });

  it('should return N/A for null values', () => {
    expect(formatCurrency(null)).toBe('N/A');
  });

  it('should return N/A for undefined values', () => {
    expect(formatCurrency(undefined)).toBe('N/A');
  });

  it('should return N/A for non-number values', () => {
    expect(formatCurrency('string' as any)).toBe('N/A');
    expect(formatCurrency({} as any)).toBe('N/A');
    expect(formatCurrency([] as any)).toBe('N/A');
    expect(formatCurrency(true as any)).toBe('N/A');
  });

  it('should handle very small decimal numbers', () => {
    expect(formatCurrency(0.001)).toMatch(/R\$\s*0,00/);
    expect(formatCurrency(0.004)).toMatch(/R\$\s*0,00/);
    expect(formatCurrency(0.005)).toMatch(/R\$\s*0,01/);
  });

  it('should handle very large numbers', () => {
    expect(formatCurrency(999999999.99)).toMatch(/R\$\s*999\.999\.999,99/);
    expect(formatCurrency(1000000000)).toMatch(/R\$\s*1\.000\.000\.000,00/);
  });

  it('should maintain consistent formatting for edge cases', () => {
    expect(formatCurrency(0.1)).toMatch(/R\$\s*0,10/);
    expect(formatCurrency(0.9)).toMatch(/R\$\s*0,90/);
    expect(formatCurrency(1.0)).toMatch(/R\$\s*1,00/);
  });

  it('should handle scientific notation numbers', () => {
    expect(formatCurrency(1e6)).toMatch(/R\$\s*1\.000\.000,00/);
    expect(formatCurrency(1.5e3)).toMatch(/R\$\s*1\.500,00/);
  });

  it('should handle Infinity and -Infinity', () => {
    expect(formatCurrency(Infinity)).toMatch(/R\$\s*∞/);
    expect(formatCurrency(-Infinity)).toMatch(/-R\$\s*∞/);
  });

  it('should handle NaN values', () => {
    expect(formatCurrency(NaN)).toMatch(/R\$\s*NaN/);
  });
});
