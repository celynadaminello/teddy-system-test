import React, { useState } from 'react';
import { Input, Button } from 'design-system';
import { api } from '../services/api';

interface CreateClientFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const CreateClientForm: React.FC<CreateClientFormProps> = ({ onSuccess }) => {
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
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite o nome:"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <Input
          id="salary"
          type="text"
          value={salary}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9.,]/g, '');
            setSalary(value);
          }}
          placeholder="Digite o salário:"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <Input
          id="companyValuation"
          type="text"
          value={companyValuation}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9.,]/g, '');
            setCompanyValuation(value);
          }}
          placeholder="Digite o valor da empresa:"
          disabled={isSubmitting}
        />
      </div>

      <div className="pt-4">
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