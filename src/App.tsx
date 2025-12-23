import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import AuthLayout from './layouts/AuthLayout';
import LandingPage from './pages';
import Chat from './pages/Chat';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import WelcomePage from './pages/WelcomePage';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <ToastContainer position='top-right' autoClose={2500} />
      <Routes>
        {/* Main Layout Routes */}
        <Route element={<Layout />}>
          <Route path='/' element={<LandingPage />} />
          <Route path='/chat' element={<Chat />} />
        </Route>

        {/* Auth Layout Routes */}
        <Route path='/authentication' element={<AuthLayout />}>
          <Route path='signup' element={<Signup />} />
          <Route path='signin' element={<Signin />} />
        </Route>

        {/* Welcome Page (No Layout) */}
        <Route path='/authentication/welcome' element={<WelcomePage />} />
        {/* Protected routes - require authentication */}
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path='/settings'
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
