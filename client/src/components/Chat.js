import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useWebSocket } from '../contexts/WebSocketContext';
import { useAuth } from '../contexts/AuthContext';
import { Box, Button, Container, TextField, Typography, List, ListItem, ListItemText } from '@mui/material';

const Chat = () => {
	  const { messages, sendMessage } = useWebSocket();
	  const { user } = useAuth();
	  const [input, setInput] = useState('');
	  const [allMessages, setMessages] = useState([]);  // Add this line

	  useEffect(() => {
		      const fetchMessages = async () => {
			            const token = localStorage.getItem('token');
			            const response = await axios.get('http://localhost:5000/messages', {
					            headers: { Authorization: token }
					          });
			            setMessages(response.data);
			          };

		      fetchMessages();
		    }, []);

	  const handleSubmit = (e) => {
		      e.preventDefault();
		      if (input.trim()) {
			            sendMessage({ user: user.username, message: input });
			            setInput('');
			          }
		    };

	  return (
		      <Container maxWidth="md">
		        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
		          <Typography component="h1" variant="h5">
		            Chat Room
		          </Typography>
		          <List sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: 400, overflow: 'auto', mt: 3, mb: 3 }}>
		            {allMessages.concat(messages).map((msg, index) => (
				                <ListItem key={index}>
				                  <ListItemText primary={`${msg.user}: ${msg.message}`} />
				                </ListItem>
				              ))}
		          </List>
		          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
		            <TextField
		              fullWidth
		              label="Type a message"
		              value={input}
		              onChange={(e) => setInput(e.target.value)}
		              variant="outlined"
		              sx={{ mb: 2 }}
		            />
		            <Button type="submit" fullWidth variant="contained">
		              Send
		            </Button>
		          </Box>
		        </Box>
		      </Container>
		    );
};

export default Chat;
