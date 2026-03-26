import './App.css';
import { useAuth } from './contexts/AuthContext';
import 'antd/dist/reset.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';

const PrivateRoute = ({ children }) => {
  const { auth } = useAuth();
  return auth.accessToken ? children : <Navigate to="/login" replace />;
};

function App() {
  const { auth } = useAuth();

  return (
    <div className="min-h-full">
      {auth.accessToken && <Navbar />}

      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;