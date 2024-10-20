import { SuiClient } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';

// Connecting to the testnet
const provider = new SuiClient({
  url: 'https://fullnode.testnet.sui.io:443', // Sui testnet RPC URL
});

// Function to request SUI from the faucet
async function requestSuiFromFaucet(senderAddress) {
  try {
    console.log(`Requesting SUI from faucet for ${senderAddress}`);
    const response = await fetch('https://faucet.testnet.sui.io/gas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        FixedAmountRequest: { recipient: senderAddress }
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to request from the faucet.');
    }

    console.log(`SUI faucet request successful for ${senderAddress}`);
    return response.json();
  } catch (error) {
    console.error(`Error requesting from faucet: ${error.message}`);
    throw error;
  }
}

async function logDonationOnSui() {
  try {
    // Create a transaction
    const tx = new Transaction();

    // Set the sender address (replace with your valid Sui address)
    const senderAddress = '0xd0cf587cb18334404a4ab074f81c63500408059aaf1460d8f6d63f7f526b279a';
    tx.setSender(senderAddress);

    // Donor address (valid Sui address as an object ID)
    const donorAddress = '0x1bb61813baab59d08ff5538ef68974e882e3c2f85a5064c029432c3d7c962a7a';

    // Amount (u64) and timestamp (u64)
    const donationAmount = 1000; // Example donation amount (u64)
    const donationTimestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds (u64)

    // Fetch available gas coins for the sender
    let coins = await provider.getCoins({ owner: senderAddress });

    // If no gas coins are available, request from the faucet
    if (!coins || coins.data.length === 0) {
      console.log('No gas coins available, requesting from the faucet...');
      await requestSuiFromFaucet(senderAddress);

      // Wait for a few seconds to allow the faucet transaction to be processed
      await new Promise(resolve => setTimeout(resolve, 5000));

      // Re-fetch coins after requesting from the faucet
      coins = await provider.getCoins({ owner: senderAddress });
    }

    // Log the coin details to debug
    //Need to uncomment it
    // console.log('Fetched Coins:', coins);

    // Check if there are any valid gas coins after the faucet request
    if (!coins || coins.data.length === 0) {
      throw new Error('No gas coins available after faucet request.');
    }

    // Get the first gas coin and its details
    const gasCoin = coins.data[0]; // Using the first available gas coin

    // Ensure that gasCoin has version and digest fields
    if (!gasCoin.version || !gasCoin.digest) {
      throw new Error('Invalid gas coin data. Missing version or digest.');
    }

    // Log the gas coin details to debug
    console.log('Using Gas Coin:', gasCoin);

    // Set gas payment with the full details (objectId, version, digest)
    tx.setGasPayment([{
      objectId: gasCoin.coinObjectId,
      version: gasCoin.version,
      digest: gasCoin.digest
    }]);

    // Log donation with Sui Move call
    tx.moveCall({
      target: `${process.env.SUI_PACKAGE_OBJECT_ID}::place::log_donation`,
      arguments: [
        tx.object(donorAddress), // Donor address (Sui object ID)
        tx.pure.u64(donationAmount), // Donation amount (u64)
        tx.pure.u64(donationTimestamp), // Timestamp (u64)
      ],
    });

    // Get transaction bytes without signing or executing
    const transactionBytes = await tx.build({ client: provider });

    //Need to uncomment it
    // console.log('Transaction Bytes:', transactionBytes);
    return transactionBytes;
  } catch (error) {
    console.error('Error building transaction:', error.message);
    throw error;
  }
}

export { logDonationOnSui };
