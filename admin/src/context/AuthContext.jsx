import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { login as loginRequest, fetchProfile } from '../api/auth.js';
import { setUnauthorizedHandler } from '../api/axios.js';

const TOKEN_KEY = 'ty_admin_token';
const USER_KEY = 'ty_admin_user';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // verifying/restoring session on boot
  const [error, setError] = useState('');

  const clearSession = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  // If any request comes back 401, drop the session so the router redirects to /login.
  useEffect(() => {
    setUnauthorizedHandler(() => setUser(null));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setLoading(false);
      return;
    }
    fetchProfile()
      .then((res) => {
        if (res.success && res.data.role === 'admin') {
          setUser(res.data);
        } else {
          clearSession();
        }
      })
      .catch(() => clearSession())
      .finally(() => setLoading(false));
  }, [clearSession]);

  const login = useCallback(async (email, password) => {
    setError('');
    const res = await loginRequest(email, password);
    if (!res.success) {
      const msg = res.message || 'Login failed';
      setError(msg);
      throw new Error(msg);
    }
    if (res.data.role !== 'admin') {
      const msg = 'This account does not have admin access.';
      setError(msg);
      throw new Error(msg);
    }
    localStorage.setItem(TOKEN_KEY, res.data.token);
    const { token, ...profile } = res.data;
    localStorage.setItem(USER_KEY, JSON.stringify(profile));
    setUser(profile);
    return profile;
  }, []);

  const logout = useCallback(() => {
    clearSession();
  }, [clearSession]);

  const value = { user, loading, error, login, logout, isAdmin: !!user && user.role === 'admin' };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
