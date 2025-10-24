import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from 'design-system';
import { useUserStore } from 'shell';

function App() {
  const [name, setName] = useState('');

  const login = useUserStore((state) => state.login);

  const navigate = useNavigate();

  const handleLogin = () => {
    if (name.trim()) {
      login(name);
      navigate('/clients');
    } else {
      alert('Por favor, digite seu nome.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-6 w-full max-w-[521px]">
        <h1 className="text-[36px] font-normal text-[#000000] text-center">
          Olá, seja bem-vindo!
        </h1>

        <Input
          type="text"
          placeholder="Digite o seu nome:"
          className="w-full bg-[#f5f5f5]"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
        />

        <Button
          onClick={handleLogin}
          className="w-full"
        >
          Entrar
        </Button>
      </div>
    </div>
  );
}

export default App;