import React, { useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Avatar, Box, CardHeader, Dialog, DialogTitle, DialogContent, DialogActions, Button, LinearProgress } from '@mui/material';

const crowdfundingOffers = [
  {
    id: 1,
    name: 'Project Alpha',
    goal: '5000 USD',
    raised: '1500 USD',
    tiers: [
      { amount: '50 USD', reward: 'Thank You Shoutout' },
      { amount: '100 USD', reward: 'Exclusive Video Content' },
      { amount: '200 USD', reward: 'Personalized Thank You Shoutout + Exclusive Video Content' }
    ],
    address: '0xA1B2C3D4E5F678901234567890ABCDEF12345678'
  },
  {
    id: 2,
    name: 'Project Beta',
    goal: '10000 USD',
    raised: '4000 USD',
    tiers: [
      { amount: '100 USD', reward: 'Exclusive Webinar' },
      { amount: '500 USD', reward: 'One-on-One Consultation' },
    ],
    address: '0x1234ABCDEF5678901234567890ABCDEF12345678'
  },
  {
    id: 3,
    name: 'CryptoArt NFT Series',
    goal: '15000 USD',
    raised: '5000 USD',
    tiers: [
      { amount: '200 USD', reward: 'Limited Edition NFT' },
      { amount: '500 USD', reward: 'NFT + Early Access to the Next Collection' },
      { amount: '1000 USD', reward: 'Personalized NFT + Artist Video Message' }
    ],
    address: '0x123456789ABCDEF9876543210FEDCBA98765432'
  },
  {
    id: 4,
    name: 'Personalized Video Shoutout Campaign',
    goal: '2000 USD',
    raised: '1200 USD',
    tiers: [
      { amount: '50 USD', reward: 'Personalized Shoutout Video' },
      { amount: '100 USD', reward: 'Shoutout Video + Custom Video Content' },
      { amount: '250 USD', reward: 'Custom Video Content + Exclusive Video Call' }
    ],
    address: '0x9876543210FEDCBA1234567890ABCDEF98765432'
  },
  {
    id: 5,
    name: 'Live Streaming Crypto Event',
    goal: '10000 USD',
    raised: '4000 USD',
    tiers: [
      { amount: '100 USD', reward: 'Access to the Live Stream' },
      { amount: '500 USD', reward: 'VIP Access + Q&A with Host' },
      { amount: '1000 USD', reward: 'Exclusive Post-Event Content + NFT Ticket' }
    ],
    address: '0xFEDCBA987654321001234567890ABCDEF1234567'
  },
  {
    id: 6,
    name: 'Blockchain Gaming Tournament',
    goal: '20000 USD',
    raised: '7000 USD',
    tiers: [
      { amount: '50 USD', reward: 'Exclusive Game Content NFT' },
      { amount: '200 USD', reward: 'Tournament Pass + NFT' },
      { amount: '500 USD', reward: 'VIP Access + Personalized In-Game Item' }
    ],
    address: '0xABCDEF12345678901234567890ABCDEF12345678'
  }
];

const CrowdfundingOffers = () => {
  const [open, setOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  // Open the dialog with the selected offer's details
  const handleClickOpen = (offer) => {
    setSelectedOffer(offer);
    setOpen(true);
  };

  // Close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container sx={{ paddingTop: '30px', paddingBottom: '30px' }}>
      <Typography variant="h4" align="center" sx={{ marginBottom: '20px', fontWeight: 'bold', color: '#3f51b5' }}>
        Crowdfunding Campaigns
      </Typography>
      <Grid container spacing={4}>
        {crowdfundingOffers.map((offer) => (
          <Grid item xs={12} sm={6} md={4} key={offer.id}>
            <Card onClick={() => handleClickOpen(offer)} sx={{ cursor: 'pointer' }}>
              <CardHeader
                avatar={<Avatar alt={offer.name} src={`https://i.pravatar.cc/150?img=${offer.id}`} />}
                title={offer.name}
                subheader={`Goal: ${offer.goal}`}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Raised: {offer.raised}
                </Typography>
                {/* Progress bar for how much has been raised */}
                <LinearProgress variant="determinate" value={(parseInt(offer.raised) / parseInt(offer.goal)) * 100} />
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: '10px' }}>
                  Progress: {Math.round((parseInt(offer.raised) / parseInt(offer.goal)) * 100)}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for showing full details */}
      {selectedOffer && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{selectedOffer.name}</DialogTitle>
          <DialogContent>
            <Box display="flex" alignItems="center" flexDirection="column">
              <Avatar alt={selectedOffer.name} src={`https://i.pravatar.cc/150?img=${selectedOffer.id}`} sx={{ width: 100, height: 100, marginBottom: 2 }} />
              <Typography variant="body1">{selectedOffer.name}</Typography>
              <Typography variant="body2" sx={{ marginTop: 2 }}>
                Goal: {selectedOffer.goal}
              </Typography>
              <Typography variant="body2">
                Raised: {selectedOffer.raised}
              </Typography>
              <Typography variant="body2" sx={{ marginTop: 2 }}>Rewards:</Typography>
              {selectedOffer.tiers.map((tier, idx) => (
                <Typography key={idx} variant="body2">
                  {tier.amount}: {tier.reward}
                </Typography>
              ))}
              <Typography variant="body2" sx={{ marginTop: 2 }}>
                Address: {selectedOffer.address}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default CrowdfundingOffers;
