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
  isLoading: boolean;
}

export const AppContent = createContext<AppContextType>({} as AppContextType);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState<User | false>(false);
  const [isLoading, setIsLoading] = useState(true);

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/auth/is-auth');
      
      if (data.success) {
        setIsLoggedin(true);
        await getUserData();
      }
    } catch (error: any) {
      setIsLoggedin(false);
      setUserData(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/user/profile');
      
      if (data.success) {
        setUserData(data.data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AppContent.Provider
      value={{
        backendUrl,
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        getUserData,
        isLoading,
      }}
    >
      {children}
    </AppContent.Provider>
  );
};
