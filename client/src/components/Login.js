import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button, TextField, Container, Typography, Box } from '@mui/material';

const Login = () => {
	  const { login } = useAuth();
	  const [username, setUsername] = useState('');
	  const [password, setPassword] = useState('');

	  const handleSubmit = async (e) => {
		      e.preventDefault();
		      try {
			            await login(username, password);
			          } catch (err) {
					        console.error(err);
					      }
		    };

	  return (
		      <Container maxWidth="sm">
		        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
		          <Typography component="h1" variant="h5">
		            Sign in
		          </Typography>
		          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
		            <TextField
		              margin="normal"
		              required
		              fullWidth
		              label="Username"
		              value={username}
		              onChange={(e) => setUsername(e.target.value)}
		            />
		            <TextField
		              margin="normal"
		              required
		              fullWidth
		              label="Password"
		              type="password"
		              value={password}
		              onChange={(e) => setPassword(e.target.value)}
		            />
		            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
		              Sign In
		            </Button>
		          </Box>
		        </Box>
		      </Container>
		    );
};

export default Login;
