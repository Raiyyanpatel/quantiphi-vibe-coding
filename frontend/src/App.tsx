import Dashboard from './pages/Dashboard';
import { DashboardProvider } from './context/DashboardContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <DashboardProvider>
      <Toaster position="top-right" toastOptions={{ className: 'rounded-xl shadow-lg font-medium' }} />
      <Dashboard />
    </DashboardProvider>
  )
}

export default App
