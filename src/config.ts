const CONTRACT_ADDRESS_DEV = '0x9f5e886C2Fbaa3Dd3467479E248F5A754062a555';
// const CONTRACT_ADDRESS_DEV = '0xd26CBBF0131a0197d10B55e28a4F09A6Fb608866';
const CONTRACT_ADDRESS_PROD = '0xCd20CE010dCe73e6E904e57619c97943799689c4';

const IPFS_HOST_DEV = 'http://127.0.0.1:5001';
const IPFS_HOST_PROD = 'https://ipfs.infura.io:5001';

const IPFS_GATEWAY_DEV = 'http://127.0.0.1:8080';
const IPFS_GATEWAY_PROD = 'https://ipfs.infura.io';

const NETWORK_RPC_DEV = 'ws://127.0.0.1:7545';
const NETWORK_RPC_PROD = 'wss://sepolia.infura.io/ws/v3/d6177f2a3f364b0a9e13954bb764fe70';

const env_vars = {
  CONTRACT_ADDRESS_DEV,
  IPFS_HOST_DEV,
  NETWORK_RPC_DEV,
  CONTRACT_ADDRESS_PROD,
  IPFS_HOST_PROD,
  NETWORK_RPC_PROD,
  IPFS_GATEWAY_DEV,
  IPFS_GATEWAY_PROD
} as any;

let env = 'PROD';
if (process.env.NODE_ENV === 'development') {
  env = 'DEV';
}

const vars = {
  CONTRACT_ADDRESS: env_vars[`CONTRACT_ADDRESS_${env}`] as string,
  IPFS_HOST: env_vars[`IPFS_HOST_${env}`] as string,
  NETWORK_RPC: env_vars[`NETWORK_RPC_${env}`] as string,
  IPFS_GATEWAY: env_vars[`IPFS_GATEWAY_${env}`] as string
};

export default vars;