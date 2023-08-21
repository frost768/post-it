import { create } from 'kubo-rpc-client';
import env from '../config';

const projectId = 'fc3223f98c06a9a78a1295636b06dc2a';
const projectSecret = '2UI3hTQOWiUNmuNkc1fqns2xPvy';
const ipfsUri = new URL(env.IPFS_HOST);
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const ipfs = create({
  protocol: ipfsUri.protocol,
  host: ipfsUri.hostname,
  port: process.env.NODE_ENV === 'development' ? Number(ipfsUri.port): 5001,
  headers: {
    authorization: auth,
  },
});


export default ipfs;
