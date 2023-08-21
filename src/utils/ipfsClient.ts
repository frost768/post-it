import { Options, create } from 'kubo-rpc-client';
import env from '../config';

const projectId = process.env.INFURA_IPFS_PROJECT_KEY;
const projectSecret = process.env.INFURA_IPFS_PROJECT_SECRET;
const ipfsUri = new URL(env.IPFS_HOST);
const authorization = 'Basic ' + btoa(projectId + ':' + projectSecret);

let config: Options = {
  protocol: ipfsUri.protocol,
  host: ipfsUri.hostname,
  port: Number(ipfsUri.port),
};

if(process.env.NODE_ENV !== 'development') {
  config.headers = { authorization };
  config.port = 5001;
}
console.log(config);

const ipfs = create(config);


export default ipfs;
