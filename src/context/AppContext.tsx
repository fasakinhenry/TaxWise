import { createContext, useEffect, useState, type ReactNode } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

axios.defaults.withCredentials = true;

/**
 * Types
 */
interface UserData {
  // adjust based on your backend response
  _id: string;
  name: string;
  email: string;
  createdAt?: string;
}

interface AppContextType {
  backendUrl: string;
  isLoggedin: boolean;
  setIsLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  getUserData: () => Promise<void>;
}

interface AppContextProviderProps {
  children: ReactNode;
}

/**
 * Context
 */
export const AppContent = createContext<AppContextType | null>(null);

/**
 * Provider
 */
export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL as string;

  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  const getAuthState = async (): Promise<void> => {
    try {
      const { data } = await axios.get(`${backendUrl}/auth/is-auth`);

      if (data.success) {
        setIsLoggedin(true);
        await getUserData();
      }
    } catch (error) {
      const err = error as AxiosError<any>;
      toast.error(err.response?.data?.message || 'Auth check failed');
    }
  };

  const getUserData = async (): Promise<void> => {
    try {
      const { data } = await axios.get(`${backendUrl}/user/profile`);

      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      const err = error as AxiosError<any>;
      toast.error(err.response?.data?.message || 'Failed to fetch user');
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const value: AppContextType = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  };

  return <AppContent.Provider value={value}>{children}</AppContent.Provider>;
};
