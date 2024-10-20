import React, { useState } from 'react';
import { Container, Typography, Button, Grid, Fab } from '@mui/material';
import { Link } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import ChatModal from './ChatModal'; // Import ChatModal

// Inline styles for the background
const styles = {
  backgroundImage: `url('/landing.jpg')`, // Use the futuristic background image path
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column', // Align content vertically
  padding: '0 20px',
};

// Title and button styles with updated color scheme
const titleStyle = {
  color: '#FFDD44', // Brighter gold color to align with the futuristic background
  fontWeight: 'bold',
  textShadow: '2px 2px 5px #000', // Add text shadow for contrast
  marginBottom: '80px',
};

const subTitleStyle = {
  color: '#ffffff', // White for subtitle
  fontSize: '1.2rem',
  textShadow: '1px 1px 3px #000', // Text shadow for readability
  marginBottom: '10px',
};

const buttonStyles = {
  loginButton: {
    backgroundColor: '#1976d2', // Default blue for Login
    color: '#fff',
    fontWeight: 'bold',
    marginRight: '10px',
  },
  registerButton: {
    backgroundColor: '#f44336', // Custom Register button (red)
    color: '#fff',
    fontWeight: 'bold',
    marginRight: '10px',
  },
  donateButton: {
    backgroundColor: '#4caf50', // Custom Donate button (green)
    color: '#fff',
    fontWeight: 'bold',
    marginRight: '10px',
  },
  contentOffersButton: {
    backgroundColor: '#ff9800', // Custom color for content offers button (orange)
    color: '#fff',
    fontWeight: 'bold',
    marginRight: '10px',
  },
  crowdfundingButton: {
    backgroundColor: '#9c27b0', // Purple for Crowdfunding button
    color: '#fff',
    fontWeight: 'bold',
    marginRight: '10px',
  },
};

const Home = () => {
  const [isChatOpen, setIsChatOpen] = useState(false); // Chat state

  return (
    <div style={styles}>
      <Container maxWidth="sm" style={{ textAlign: 'center' }}>
        {/* Title */}
        <Typography variant="h3" gutterBottom style={titleStyle}>
          Elevyn
        </Typography>

        {/* Subtitle */}
        <Typography variant="body1" style={subTitleStyle}>
          Unlocking the Future of Decentralized Funding and Content Ownership.
        </Typography>

        {/* Buttons for Login, Register, Buy Content, View Content Offers, and Crowdfunding */}
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              style={buttonStyles.loginButton}
              component={Link}
              to="/login"
            >
              Login
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              style={buttonStyles.registerButton}
              component={Link}
              to="/register"
            >
              Register
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              style={buttonStyles.donateButton}
              component={Link}
              to="/donate"
            >
              Buy Content
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              style={buttonStyles.contentOffersButton}
              component={Link}
              to="/content-offers"
            >
              Content Offers
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              style={buttonStyles.crowdfundingButton}
              component={Link}
              to="/crowdfunding"
            >
              Crowdfunding
            </Button>
          </Grid>
        </Grid>

        {/* Chat Button */}
        {!isChatOpen && (
          <Fab
            color="primary"
            aria-label="chat"
            onClick={() => setIsChatOpen(true)}
            style={{ position: 'fixed', bottom: '20px', right: '20px' }}
          >
            <ChatIcon />
          </Fab>
        )}

        {/* Render ChatModal */}
        {isChatOpen && <ChatModal onClose={() => setIsChatOpen(false)} />}
      </Container>
    </div>
  );
};

export default Home;
