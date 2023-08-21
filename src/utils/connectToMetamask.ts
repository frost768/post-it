export default async function connectMetamask(): Promise<string | null> {
  try {
    // Check if the Ethereum provider is available
    if (typeof window.ethereum !== 'undefined') {
      // Request access to the user's accounts
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      // The user's accounts are now available in the 'accounts' array
      // For example, you can log the first account:
      console.log('Connected to Metamask with account:', accounts[0]);

      // Return the connected account address
      return accounts[0];
    } else {
      // Metamask is not available or not installed
      console.error('Please install Metamask to use this feature.');
      return null;
    }
  } catch (error) {
    // User denied access or some other error occurred
    console.error('Error connecting to Metamask:', error);
    return null;
  }
}