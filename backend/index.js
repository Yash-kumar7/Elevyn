import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { router as authRouter } from './auth.js';
import { processRipplePayment } from './ripplePayment.js';
import { logDonationOnSui } from './suiDonationLogger.js';

config(); // Load environment variables

const app = express();
const accessData = {}; // In-memory storage for video access

app.use(cors());
app.use(express.json());

// User Authentication routes
app.use('/auth', authRouter);

// Route to check video access
app.get('/api/check-access', (req, res) => {
  const { address } = req.query;

  // Check if the user's address exists in the accessData object
  const userAccess = accessData[address];

  if (!userAccess) {
    return res.status(403).json({ accessGranted: false, message: "No access found." });
  }

  const now = new Date();

  // Check if the access has expired
  if (now > new Date(userAccess.expiresAt)) {
    return res.status(403).json({ accessGranted: false, message: "Access expired." });
  }

  // Access is valid, return the video URL
  res.json({ accessGranted: true, videoUrl: userAccess.videoUrl });
});

// Endpoint to handle donations and payments
app.post('/donate', async (req, res) => {
  const { donorAddress, amount } = req.body;

  try {
    // 1. Process Ripple Payment (XRP)
    const xrpResult = await processRipplePayment(donorAddress, amount);

    // Extract transaction hash and delivered amount from the XRP response
    const xrpTransactionHash = xrpResult.result.hash;
    const deliveredAmount = xrpResult.result.meta.delivered_amount;

    // Ensure valid transaction details
    if (!xrpTransactionHash || !deliveredAmount) {
      throw new Error('Failed to retrieve valid XRP transaction details.');
    }

    console.log("XRP Transaction Hash:", xrpTransactionHash);
    console.log("Delivered Amount:", deliveredAmount);

    // 2. Log donation on Sui (assuming success)
    await logDonationOnSui(process.env.PLATFORM_SUI_ADDRESS, xrpTransactionHash, deliveredAmount);

    // Set expiration time for video access (e.g., 24 hours)
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 24); // 24-hour access

    // Save access details (Replace this with DB logic if needed)
    accessData[donorAddress] = {
      expiresAt: expiryDate,
      videoUrl: "https://embed.v3.contentfabric.io/?p=&net=main&oid=iq__p9jpdHZ9Gigk4xLdb8itrzkxfh5&mt=v&ct=h"  // Replace with actual Eluv.io video URL
    };

    // Respond with a success message and expiration time
    res.json({
      message: 'Payment successful! You have 24-hour access to the video.',
      expiresAt: expiryDate,
      videoUrl: accessData[donorAddress].videoUrl // Sending the video URL back
    });

  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ message: 'Payment processing failed', error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
