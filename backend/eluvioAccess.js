import ElvClient from '@eluvio/elv-client-js';

// Initialize Eluvio client
async function initEluvioClient() {
  try {
    const client = await ElvClient.FromConfigurationUrl({
      configUrl: "https://demov3.net955210.contentfabric.io/config"
    });
    console.log("I was here Yash")
    const wallet = client.GenerateWallet();
    const signer = wallet.AddAccount({ privateKey: process.env.ELUVIO_PRIVATE_KEY });
    client.SetSigner({ signer });

    return client;
  } catch (err) {
    console.error('Error initializing Eluvio client:', err);
    throw err;
  }
}

// Generate Access Token for Eluvio content
export async function generateAccessToken(donorAddress, transactionHash) {
  try {
    const client = await initEluvioClient();

    // Assuming the entitlement logic is set up on Eluvio side, you will fetch access based on the donation
    const entitlement = {
      tenant_id: process.env.ELUVIO_TENANT_ID, // Your Eluvio tenant ID
      items: [{ sku: 'donation-content', amount: 1 }],
      user: donorAddress,
      purchase_id: transactionHash, // Map the access token to the transaction hash
    };

    // Create the signature for access entitlement
    const signature = await client.PersonalSign({ message: JSON.stringify(entitlement) });

    // Return the entitlement object and signature
    return { entitlement, signature };
  } catch (err) {
    console.error('Error generating access token:', err);
    throw err;
  }
}
