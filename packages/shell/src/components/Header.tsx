import { Link, useLocation } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';
import teddyLogo from '../assets/teddy-logo.png';
import menuIcon from '../assets/menu.png';
import { SidebarMobile } from './SidebarMobile';
import { useState } from 'react';

export function Header() {
  const userName = useUserStore((state) => state.name);
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <header 
      className="w-full h-[100px] flex items-center justify-between px-4 lg:px-12"
      style={{ 
        backgroundColor: '#fff', 
        width: '100%',
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.1)'
      }}
    >
      <div className="flex items-center">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="mr-6"
        >
          <img 
            src={menuIcon} 
            alt="Menu" 
            title="Abrir menu de navegação"
            className="w-6 h-5"
            style={{ 
              width: '24px',
              height: '20px'
            }}
          />
        </button>
        
        <img 
          src={teddyLogo} 
          alt="Teddy Logo" 
          title="Logo da empresa Teddy"
          className="lg:hidden"
          style={{ 
            width: '100px',
            height: '48.98px'
          }}
        />
      </div>

      <img 
        src={teddyLogo} 
        alt="Teddy Logo" 
        title="Logo da empresa Teddy"
        className="hidden lg:block mx-auto"
        style={{ 
          width: '100px',
          height: '48.98px'
        }}
      />

      <nav className="hidden lg:flex flex-1 justify-center gap-8">
        <Link 
          to="/clients" 
          className={`text-base font-normal leading-none transition-colors duration-200 ${
            location.pathname === '/clients' 
              ? 'text-[#EC6724] underline' 
              : 'text-black hover:text-[#EC6724] hover:underline'
          }`}
          style={{ fontSize: '16px', lineHeight: '100%' }}
        >
          Clientes
        </Link>
        <Link 
          to="/selected" 
          className={`text-base font-normal leading-none transition-colors duration-200 ${
            location.pathname === '/selected' 
              ? 'text-[#EC6724] underline' 
              : 'text-black hover:text-[#EC6724] hover:underline'
          }`}
          style={{ fontSize: '16px', lineHeight: '100%' }}
        >
          Clientes Selecionados
        </Link>
        <Link 
          to="/" 
          className="text-base font-normal leading-none text-black hover:text-[#EC6724] hover:underline transition-colors duration-200"
          style={{ fontSize: '16px', lineHeight: '100%' }}
        >
          Sair
        </Link>
      </nav>

      <div 
        className="text-base"
        style={{ fontSize: '16px' }}
      >
        <span className="font-normal">Olá, </span>
        <span className="font-bold">{userName || 'Usuário'}!</span>
      </div>

      {/* Mobile Sidebar */}
      <SidebarMobile 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
    </header>
  );
}
