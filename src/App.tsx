import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { AuthLayout } from './components/layout/AuthLayout';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Users } from './pages/Users';
import { Transactions } from './pages/Transactions';
import { Services } from './pages/Services';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes (Auth) */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
        </Route>

        {/* Protected Routes (Dashboard) */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="services" element={<Services />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
