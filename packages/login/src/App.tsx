import { useState } from 'react';
import { useUserStore, usePageTitle } from 'shell';

function App() {
  const [name, setName] = useState('');

  const login = useUserStore((state) => state.login);

  usePageTitle({
    title: 'Login',
    description: 'Faça login no sistema Teddy para gerenciar seus clientes'
  });

  const handleLogin = () => {
    if (name.trim()) {
      login(name);
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

        <input
          type="text"
          placeholder="Digite o seu nome:"
          className="w-full max-w-[521px] h-[60px] text-2xl font-normal text-[#AAAAAA] border-2 border-[#D9D9D9] rounded bg-[#f5f5f5] px-4 py-3 block mx-auto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
        />

        <button
          onClick={handleLogin}
          className="w-full max-w-[521px] h-[60px] bg-[#EC6724] text-white border-none rounded text-2xl font-bold cursor-pointer block mx-auto"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

export default App;