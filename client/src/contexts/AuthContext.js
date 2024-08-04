import React, { createContext, useState, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	  const [user, setUser] = useState(null);

	  const login = async (username, password) => {
		      const response = await axios.post('http://localhost:5000/login', { username, password });
		      const token = response.data.token;
		      localStorage.setItem('token', token);
		      setUser(jwtDecode(token));
		    };

	  const register = async (username, password) => {
		      await axios.post('http://localhost:5000/register', { username, password });
		    };

	  const logout = () => {
		      localStorage.removeItem('token');
		      setUser(null);
		    };

	  return (
		      <AuthContext.Provider value={{ user, login, register, logout }}>
		        {children}
		      </AuthContext.Provider>
		    );
};

export const useAuth = () => useContext(AuthContext);
