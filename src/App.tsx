import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './components/AppLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import { Splash } from './pages/Splash';
import { LoginSignUp } from './pages/LoginSignUp';
import { Dashboard } from './pages/Dashboard';
import { TournamentList } from './pages/TournamentList';
import { TournamentDetails } from './pages/TournamentDetails';
import { MyMatches } from './pages/MyMatches';
import { LiveResults } from './pages/LiveResults';
import { Leaderboard } from './pages/Leaderboard';
import { WalletDashboard } from './pages/WalletDashboard';
import { DepositFunds } from './pages/DepositFunds';
import { TransactionHistory } from './pages/TransactionHistory';
import { UserProfile } from './pages/UserProfile';
import { Settings } from './pages/Settings';
import { Notifications } from './pages/Notifications';
import { Shader } from './pages/Shader';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <AppLayout>
          <Routes>
            {/* Public routes — no auth required */}
            <Route path="/" element={<Splash />} />
            <Route path="/login" element={<LoginSignUp />} />

            {/* Protected routes — redirects to /login if user is null */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/tournaments" element={<ProtectedRoute><TournamentList /></ProtectedRoute>} />
            <Route path="/tournament/:id" element={<ProtectedRoute><TournamentDetails /></ProtectedRoute>} />
            <Route path="/my-matches" element={<ProtectedRoute><MyMatches /></ProtectedRoute>} />
            <Route path="/live-results" element={<ProtectedRoute><LiveResults /></ProtectedRoute>} />
            <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
            <Route path="/wallet" element={<ProtectedRoute><WalletDashboard /></ProtectedRoute>} />
            <Route path="/deposit" element={<ProtectedRoute><DepositFunds /></ProtectedRoute>} />
            <Route path="/transactions" element={<ProtectedRoute><TransactionHistory /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
            <Route path="/shader" element={<ProtectedRoute><Shader /></ProtectedRoute>} />
          </Routes>
        </AppLayout>
      </Router>
    </AppProvider>
  );
};

export default App;
