import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (emailOrUsername, password) => {
    // Temporary superadmin login bypass
    if (emailOrUsername === 'admin@nyinimu.com' && password === '123456Pp') {
      const fakeToken = 'superadmin_temp_token';
      const fakeUser = {
        id: 1,
        username: 'superadmin',
        email: 'admin@nyinimu.com',
        role: 'superadmin'
      };
      localStorage.setItem('token', fakeToken);
      setToken(fakeToken);
      setUser(fakeUser);
      return { success: true, data: { access_token: fakeToken, user: fakeUser } };
    }

    try {
      // Try to determine if it's email or username
      const isEmail = emailOrUsername.includes('@');

      // Our backend uses username for login, but we'll try to find user by email first if email provided
      const username = isEmail ? emailOrUsername.split('@')[0] : emailOrUsername;

      const response = await axios.post(`${API_URL}/api/auth/login`, {
        username: emailOrUsername, // Backend expects username field
        password
      });
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      setToken(access_token);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Login failed:', error);
      return {
        success: false,
        error: error.response?.data?.detail || 'Invalid credentials. Please try again.'
      };
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        username,
        email,
        password
      });
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Registration failed:', error);
      return {
        success: false,
        error: error.response?.data?.detail || 'Registration failed. Please try again.'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export { AuthContext };
