import React, { useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Avatar, Box, CardHeader, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const contentOffers = [
  { id: 1, name: 'John Doe', content: 'Exclusive Photography', amount: '100 USD', address: '0xA1B2C3D4E5F678901234567890ABCDEF12345678' },
  { id: 2, name: 'Jane Smith', content: 'Premium Video Tutorials', amount: '150 USD', address: '0x1234ABCDEF5678901234567890ABCDEF12345678' },
  { id: 3, name: 'Alice Johnson', content: 'E-book: Blockchain Guide', amount: '50 USD', address: '0x9876543210FEDCBA1234567890ABCDEF12345678' },
  { id: 4, name: 'Bob Lee', content: 'Illustration Pack', amount: '80 USD', address: '0xABCDEF12345678901234567890ABCDEF98765432' },
  { id: 5, name: 'Charlie Brown', content: 'Music Production Tips', amount: '60 USD', address: '0x0123456789ABCDEF1234567890FEDCBA98765432' },
  { id: 6, name: 'Diana Prince', content: 'Graphic Design Templates', amount: '120 USD', address: '0xFEDCBA987654321001234567890ABCDEF1234567' },
  { id: 7, name: 'Eve Adams', content: 'Advanced Coding Lessons', amount: '200 USD', address: '0xABC123DEF45678901234567890ABCDEF12345678' },
  { id: 8, name: 'Frank Wright', content: 'VR Environment Design', amount: '300 USD', address: '0xDEF789ABC01234567890ABCDEF1234567890ABCD' },
  { id: 9, name: 'Grace Hall', content: 'Fitness Coaching', amount: '90 USD', address: '0x1234567890FEDCBA9876543210ABCDEF12345678' },
  { id: 10, name: 'Henry Ford', content: 'Automotive Engineering Insights', amount: '140 USD', address: '0xABCDEF987654321001234567890FEDCBA9876543' },
  { id: 11, name: 'Isla Roberts', content: 'Photography Masterclass', amount: '130 USD', address: '0x1234567890ABCDEF9876543210ABCDEF12345678' },
  { id: 12, name: 'Jack Ryan', content: 'Writing Techniques for Beginners', amount: '70 USD', address: '0xFEDCBA987654321001234567890FEDCBA1234567' },
  { id: 13, name: 'Katherine Lee', content: 'Yoga & Meditation Course', amount: '110 USD', address: '0xABCDEF123456789001234567890FEDCBA9876543' },
  { id: 14, name: 'Liam Cooper', content: 'Mobile App Design Guide', amount: '95 USD', address: '0x0123456789ABCDEF1234567890FEDCBA98765432' },
  { id: 15, name: 'Mia Taylor', content: 'Baking Masterclass', amount: '85 USD', address: '0xFEDCBA98765432101234567890ABCDEF12345678' },
  { id: 16, name: 'Noah Harris', content: 'Photography Gear Guide', amount: '65 USD', address: '0xABCDEF12345678901234567890FEDCBA98765432' },
  { id: 17, name: 'Olivia Clark', content: 'Social Media Marketing', amount: '125 USD', address: '0x9876543210FEDCBA1234567890ABCDEF12345678' },
  { id: 18, name: 'Paul Davis', content: 'Real Estate Investment Guide', amount: '175 USD', address: '0x1234ABCDEF5678909876543210FEDCBA98765432' },
  { id: 19, name: 'Quinn Evans', content: 'Handcrafted Jewelry Designs', amount: '105 USD', address: '0xFEDCBA123456789001234567890ABCDEF9876543' },
  { id: 20, name: 'Rachel White', content: 'Fitness & Nutrition Plan', amount: '115 USD', address: '0x9876543210FEDCBA9876543210ABCDEF12345678' },
];

const ContentOffers = () => {
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
        Content Offers
      </Typography>
      <Grid container spacing={4}>
        {contentOffers.map((offer) => (
          <Grid item xs={12} sm={6} md={3} key={offer.id}>
            <Card onClick={() => handleClickOpen(offer)} sx={{ cursor: 'pointer' }}>
              <CardHeader
                avatar={<Avatar alt={offer.name} src={`https://i.pravatar.cc/150?img=${offer.id}`} />}
                title={offer.name}
                subheader={offer.content}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Amount: {offer.amount}
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
              <Typography variant="body1">{selectedOffer.content}</Typography>
              <Typography variant="body2" sx={{ marginTop: 2 }}>
                Amount: {selectedOffer.amount}
              </Typography>
              <Typography variant="body2" sx={{ marginTop: 1 }}>
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

export default ContentOffers;
