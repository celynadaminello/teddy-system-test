import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { LoginPage } from 'login';
import { ClientListPage } from 'client-list';
import { SelectedClientsPage } from 'selected-clients';

function App() {
  return (
    <div className="font-sans">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<AppLayout />}>
            <Route path="/clients" element={<ClientListPage />} />
            <Route path="/selected" element={<SelectedClientsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;