import { Button, Input } from 'design-system';

import './Login.css';

function App() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Olá, seja bem-vindo!</h2>
        <p>Digite o seu nome:</p>

        <Input 
          type="text" 
          placeholder="Digite o seu nome:" 
        />

        <Button 
          onClick={() => { }}
          style={{ width: '100%', marginTop: '15px' }}
        >
          Entrar
        </Button>
      </div>
    </div>
  );
}

export default App;