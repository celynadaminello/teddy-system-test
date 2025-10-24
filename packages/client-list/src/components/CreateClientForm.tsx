import React, { useState } from 'react';
import { Input, Button } from 'design-system';
import { api } from '../services/api';

interface CreateClientFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const CreateClientForm: React.FC<CreateClientFormProps> = ({ onSuccess, onCancel }) => {
  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');
  const [companyValuation, setCompanyValuation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      await api.post('/users', {
        name,
        salary: salaryNum,
        companyValuation: companyValuationNum,
      });

      onSuccess();

    } catch (err: any) {
      console.error('Erro ao criar cliente:', err);
      setError(err.message || 'Falha ao criar cliente. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Digite o nome:
        </label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome completo"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
          Digite o salário:
        </label>
        <Input
          id="salary"
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="Ex: 5000"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="companyValuation" className="block text-sm font-medium text-gray-700 mb-1">
          Digite o valor da empresa:
        </label>
        <Input
          id="companyValuation"
          type="number"
          value={companyValuation}
          onChange={(e) => setCompanyValuation(e.target.value)}
          placeholder="Ex: 500000"
          disabled={isSubmitting}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Criando...' : 'Criar cliente'}
        </Button>
      </div>
    </form>
  );
};