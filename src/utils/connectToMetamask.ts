export default async function connectMetamask(): Promise<string | null> {
  try {
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      return accounts[0];
    } else {
      // Metamask is not available or not installed
      console.error('Please install Metamask to use this feature.');
      return null;
    }
  } catch (error) {
    console.error('Error connecting to Metamask:', error);
    return null;
  }
}