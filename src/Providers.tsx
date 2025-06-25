import { type ReactNode } from 'react';
import { AuthProvider } from './auth/AuthContext';
import { PostProvider } from './post/PostContext';

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <AuthProvider>
      <PostProvider>{children}</PostProvider>
    </AuthProvider>
  );
};

export default Providers;
