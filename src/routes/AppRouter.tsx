import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import NotFound from '../pages/404';
import Login from '../pages/auth/login';
import Home from '../pages/home';
import SignUp from '../pages/auth/signup';
import { AuthProvider } from '../auth/AuthContext';

const AppRouter = () => {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;
