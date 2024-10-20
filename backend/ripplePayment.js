import xrpl from "xrpl";
import dotenv from 'dotenv'; 

dotenv.config();  // Load environment variables

async function processRipplePayment(donorAddress, amount) {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");

  try {
    // Connect to XRPL client
    await client.connect();

    const wallet = xrpl.Wallet.fromSeed(process.env.RIPPLE_SOURCE_SECRET);
    if (!wallet) {
      throw new Error("Invalid Ripple secret");
    }

    // Prepare the payment transaction
    const payment = {
      TransactionType: "Payment",
      Account: wallet.address, 
      Amount: xrpl.xrpToDrops(amount.toString()), // Convert XRP to drops
      Destination: donorAddress
    };

    // Autofill and increase LastLedgerSequence for safety
    let preparedTx = await client.autofill(payment);
    preparedTx.LastLedgerSequence += 10;

    // Sign the transaction
    const signedTx = wallet.sign(preparedTx);

    // Submit the transaction and wait for confirmation
    const result = await client.submitAndWait(signedTx.tx_blob);

    await client.disconnect();  // Disconnect after transaction is complete

    console.log(result);
    return result;  // Return the result for further processing

  } catch (error) {
    console.error("Error processing Ripple payment:", error);
    throw error;  // Rethrow the error after logging
  } finally {
    if (client.isConnected()) {
      await client.disconnect();  // Ensure disconnection in case of error
    }
  }
}

export { processRipplePayment };
