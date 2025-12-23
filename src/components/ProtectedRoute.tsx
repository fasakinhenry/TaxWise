import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AppContent } from '../context/AppContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { userData, isLoading } = useContext(AppContent);
  const location = useLocation();

  // Show loading while checking auth state
  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-gray-600'>Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!userData) {
    return (
      <Navigate
        to='/authentication/signin'
        state={{ from: location }}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
