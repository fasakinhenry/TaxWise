import { createContext, useEffect, useState, type ReactNode } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.withCredentials = true;

interface User {
  _id: string;
  name: string;
  email: string;
  isVerified: boolean;
}

interface AppContextType {
  backendUrl: string;
  isLoggedin: boolean;
  setIsLoggedin: (v: boolean) => void;
  userData: User | false;
  setUserData: (u: User | false) => void;
  getUserData: () => Promise<void>;
}

export const AppContent = createContext<AppContextType>({} as AppContextType);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState<User | false>(false);

  const getAuthState = async () => {
    try {
      console.log('🔍 Checking auth state...');
      console.log('Backend URL:', backendUrl);

      const { data } = await axios.get(backendUrl + '/auth/is-auth');

      console.log('✅ Auth response:', data);

      if (data.success) {
        setIsLoggedin(true);
        console.log('✅ User is authenticated, fetching user data...');
        getUserData();
      } else {
        console.log('❌ Auth check returned success: false');
      }
    } catch (error: any) {
      console.log(
        '❌ Auth check failed:',
        error.response?.data || error.message
      );
      setIsLoggedin(false);
      setUserData(false);
    }
  };

  const getUserData = async () => {
    try {
      console.log('🔍 Fetching user profile...');

      const { data } = await axios.get(backendUrl + '/user/profile');

      console.log('✅ Profile response:', data);

      if (data.success) {
        // The user data is inside data.data.userData, not data.userData
        setUserData(data.data.userData);
        console.log('✅ User data set:', data.data.userData);
      } else {
        console.log('❌ Profile fetch returned success: false');
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log(
        '❌ Profile fetch failed:',
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    console.log('🚀 AppContext mounted, checking auth...');
    getAuthState();
  }, []);

  useEffect(() => {
    console.log(
      '📊 State updated - isLoggedin:',
      isLoggedin,
      'userData:',
      userData
    );
  }, [isLoggedin, userData]);

  return (
    <AppContent.Provider
      value={{
        backendUrl,
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        getUserData,
      }}
    >
      {children}
    </AppContent.Provider>
  );
};
