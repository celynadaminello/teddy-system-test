import React, { useState, useEffect } from 'react';
import { Input, Button } from 'design-system';
import { api } from '../services/api';
import type { Client } from '../types/client'; 

interface EditClientFormProps {
  client: Client;
  onSuccess: () => void;
  onCancel: () => void;
}

export const EditClientForm: React.FC<EditClientFormProps> = ({ client, onSuccess }) => {
  const [name, setName] = useState(client.name);
  const [salary, setSalary] = useState(String(client.salary)); 
  const [companyValuation, setCompanyValuation] = useState(String(client.companyValuation)); 

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setName(client.name);
    setSalary(String(client.salary));
    setCompanyValuation(String(client.companyValuation));
  }, [client]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (!name || !salary || !companyValuation) {
        throw new Error('Todos os campos são obrigatórios.');
      }
      const salaryNum = parseFloat(salary);
      const companyValuationNum = parseFloat(companyValuation);
      if (isNaN(salaryNum) || isNaN(companyValuationNum)) {
        throw new Error('Salário e Valor da Empresa devem ser números.');
      }

      await api.patch(`/users/${client.id}`, {
        name,
        salary: salaryNum,
        companyValuation: companyValuationNum,
      });

      onSuccess(); 

    } catch (err: any) {
      console.error('Erro ao atualizar cliente:', err);
      setError(err.response?.data?.message || err.message || 'Falha ao atualizar cliente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div>
        <Input
          id="edit-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite o nome:"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <Input
          id="edit-salary"
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="Digite o salário:"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <Input
          id="edit-companyValuation"
          type="number"
          value={companyValuation}
          onChange={(e) => setCompanyValuation(e.target.value)}
          placeholder="Digite o valor da empresa:"
          disabled={isSubmitting}
        />
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Salvando...' : 'Salvar alterações'}
        </Button>
      </div>
    </form>
  );
};