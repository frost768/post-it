import { encode, decode } from 'bs58';

function getBytes32FromIpfsHash(ipfsListing: string): string {
  const bytes = decode(ipfsListing).slice(2);
  const hexString = Array.from(bytes).map(byte => byte.toString(16).padStart(2, '0')).join('');
  return '0x' + hexString;
}

function getIpfsHashFromBytes32(bytes32Hex: string): string {
  const hashHex = '1220' + bytes32Hex.slice(2);
  const hashBytes = new Uint8Array(hashHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
  const hashStr = encode(hashBytes);
  return hashStr;
}

export {
  getBytes32FromIpfsHash,
  getIpfsHashFromBytes32
};

