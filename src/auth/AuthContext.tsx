import { useEffect, useState, useRef, type ReactNode } from 'react';
import { AuthContext } from './AuthContextValue';
import type { AuthResponse } from '../api/types';
import { refreshToken } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import LoadingPage from '../components/loaderPage';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const hasRunRef = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const checkUserSession = async () => {
      try {
        const response = await refreshToken();
        login(response.data);
        navigate('/');
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkUserSession();
  }, []);

  const login = (userData: AuthResponse) => setUser(userData);
  const logout = () => setUser(null);

  const authContextValue = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {loading ? <LoadingPage /> : children}
    </AuthContext.Provider>
  );
};
