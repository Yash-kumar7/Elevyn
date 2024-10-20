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


async function logDonationOnSui(donorAddress, amount, xrpTransactionHash) {
  try {
    // Create a new transaction
    const tx = new Transaction();

    // Convert the XRP transaction hash to bytes (vector<u8> BCS type)
    const xrpHashBytes = new TextEncoder().encode(xrpTransactionHash);

    // Add a move call for logging the donation
    tx.moveCall({
      target: `${process.env.SUI_PACKAGE_OBJECT_ID}::place::log_donation`,
      arguments: [
        tx.object(donorAddress),  // Donor address as an object reference
        tx.pure(BigInt(amount), 'u64'),    // Amount as 'u64' BCS type
        tx.pure(BigInt(Math.floor(Date.now() / 1000)), 'u64'),  // Timestamp as 'u64' BCS type
        tx.pure(xrpHashBytes, 'vector<u8>')  // XRP transaction hash as vector<u8>
      ],
    });

    // Sign and execute the transaction
    const response = await provider.signAndExecuteTransaction({
      transaction: tx,
      requestType: 'WaitForLocalExecution',  // Wait for transaction confirmation
    });

    console.log('Donation logged on Sui:', response);
    return response;
  } catch (error) {
    console.error('Error logging donation on Sui:', error.message);
    throw error;
  }
}

export { logDonationOnSui };
