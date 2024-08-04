import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { WebSocketProvider } from './contexts/WebSocketContext';
import { AuthProvider } from './contexts/AuthContext';
import Chat from './components/Chat';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

const App = () => {
	  return (
		      <ThemeProvider theme={theme}>
		        <AuthProvider>
		          <WebSocketProvider>
		            <Router>
		              <Routes>
		                <Route path="/login" element={<Login />} />
		                <Route path="/register" element={<Register />} />
		                <Route path="/chat" element={<Chat />} />
		                <Route path="/" element={<Login />} />
		              </Routes>
		            </Router>
		          </WebSocketProvider>
		        </AuthProvider>
		      </ThemeProvider>
		    );
};

export default App;
