// src/components/Donate.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid } from '@mui/material';
import DonationService from '../services/DonationService';
import { useNavigate } from 'react-router-dom'; 

const Donate = ({ token }) => {
  const [amount, setAmount] = useState('');
  const [donorAddress, setDonorAddress] = useState('');
  const [senderAddress, setSenderAddress] = useState('');  // New state for sender address
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleDonate = async (e) => {
    e.preventDefault();
    try {
      const response = await DonationService.donate(donorAddress, amount, token);
      setMessage('Payment successful! You now have access to the video.');
      // Redirect to the video page
      navigate(`/video-access?address=${donorAddress}`);  // Redirect with donor address
    } catch (error) {
      setMessage('Error: ' + (error.response ? error.response.data.message : 'Unknown error'));
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '100px' }}>
      <Typography variant="h4" gutterBottom>
        Content Buy
      </Typography>
      <form onSubmit={handleDonate}>
        <TextField
          label="Sender Address"  // New field for showing sender address
          variant="outlined"
          fullWidth
          margin="normal"
          value={senderAddress}
          onChange={(e) => setSenderAddress(e.target.value)}  // Only for show, won't be sent to backend
        />
        <TextField
          label="Your Address"
          variant="outlined"
          fullWidth
          margin="normal"
          value={donorAddress}
          onChange={(e) => setDonorAddress(e.target.value)}
        />
        <TextField
          label="Amount"
          variant="outlined"
          fullWidth
          margin="normal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              Buy
            </Button>
          </Grid>
        </Grid>
      </form>
      {message && <Typography color="error">{message}</Typography>}
    </Container>
  );
};

export default Donate;
