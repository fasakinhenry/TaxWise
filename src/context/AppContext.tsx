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
  userData: User | null;
  setUserData: (u: User | null) => void;
  getUserData: () => Promise<void>;
}

export const AppContent = createContext<AppContextType>({} as AppContextType);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/auth/is-auth`);
      if (data.success) {
        setIsLoggedin(true);
        await getUserData();
      }
    } catch {
      setIsLoggedin(false);
      setUserData(null);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/user/profile`);
      if (data.success) {
        setUserData(data.userData);
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
      }}
    >
      {children}
    </AppContent.Provider>
  );
};
