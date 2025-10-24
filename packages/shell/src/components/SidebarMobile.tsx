import { Link, useLocation } from 'react-router-dom';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { GoHomeFill } from 'react-icons/go';
import { BsFillPersonFill, BsFillPersonCheckFill } from 'react-icons/bs';
import teddyLogo from '../assets/teddy-logo.png';
import { useUserStore } from '../stores/useUserStore';

interface SidebarMobileProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SidebarMobile({ isOpen, onClose }: SidebarMobileProps) {
  const location = useLocation();
  const logout = useUserStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${
      isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      {/* Overlay */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`relative w-[260px] h-full bg-white flex flex-col transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Logo Section */}
        <div 
          className="w-full h-[128px] flex items-center justify-center transition-all duration-300"
          style={{ backgroundColor: '#363636' }}
        >
          <button onClick={handleLogout}>
            <img 
              src={teddyLogo} 
              alt="Teddy Logo" 
              title="Logo da empresa Teddy"
              className="w-full h-full object-cover cursor-pointer"
              style={{ 
                filter: 'brightness(0) invert(1)',
                width: '100px',
                height: '50px'
              }}
            />
          </button>
        </div>

        {/* Collapse Button */}
        <button
          onClick={onClose}
          className="w-[42px] h-[42px] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{ 
            backgroundColor: '#1f1f1f',
            position: 'absolute',
            right: '-20px',
            top: '105px'
          }}
        >
          <FaArrowCircleLeft className="text-white" size={16} />
        </button>

        {/* Navigation Links */}
        <div 
          className="flex-1 px-4 py-4"
          style={{ 
            backgroundColor: '#fff'
          }}
        >
          <nav className="flex flex-col transition-all duration-300 delay-100" style={{ gap: '11.96px' }}>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 py-2 text-black hover:text-[#EE7D46] transition-colors"
              style={{ 
                fontFamily: 'Geologica, sans-serif',
                fontSize: '16px',
                fontWeight: '500'
              }}
            >
              <GoHomeFill size={20} />
              Home
            </button>

            <Link 
              to="/clients" 
              onClick={onClose}
              className={`flex items-center gap-3 py-2 transition-colors ${
                location.pathname === '/clients' 
                  ? 'text-[#EE7D46]' 
                  : 'text-black hover:text-[#EE7D46]'
              }`}
              style={{ 
                fontFamily: 'Geologica, sans-serif',
                fontSize: '16px',
                fontWeight: '500'
              }}
            >
              <BsFillPersonFill size={20} />
              Clientes
            </Link>

            <Link 
              to="/selected" 
              onClick={onClose}
              className={`flex items-center gap-3 py-2 transition-colors ${
                location.pathname === '/selected' 
                  ? 'text-[#EE7D46]' 
                  : 'text-black hover:text-[#EE7D46]'
              }`}
              style={{ 
                fontFamily: 'Geologica, sans-serif',
                fontSize: '16px',
                fontWeight: '500'
              }}
            >
              <BsFillPersonCheckFill size={20} />
              Clientes Selecionados
            </Link>
          </nav>
        </div>

        {/* Footer */}
        <div 
          className="w-full h-16 bg-white"
          style={{ 
            boxShadow: '0 0 32px 0 rgba(0, 0, 0, 0.1)'
          }}
        />
      </div>
    </div>
  );
}
