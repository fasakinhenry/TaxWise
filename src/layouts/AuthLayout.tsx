import { Outlet } from 'react-router-dom';
import AuthLeftPanel from '../components/auth/AuthLeftPanel';

const AuthLayout = () => {
  return (
    <div className='min-h-screen flex flex-col lg:flex-row'>
      {/* Left Panel - Hidden on mobile */}
      <div className='hidden lg:flex lg:w-1/2 bg-gray-50'>
        <AuthLeftPanel />
      </div>

      {/* Right Panel - Full width on mobile, half on desktop */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-gray-50'>
        <div className='w-full max-w-md'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
