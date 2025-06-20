import { useState, type ReactNode } from 'react';
import { AuthContext } from './AuthContextValue';
import type { AuthResponse } from '../api/types';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthResponse| null>(null);

  const login = (userData: AuthResponse) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
