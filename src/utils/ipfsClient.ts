import { Options, create } from 'kubo-rpc-client';
import env from '../config';

const projectId = 'fc3223f98c06a9a78a1295636b06dc2a';
const projectSecret = '2UI3hTQOWiUNmuNkc1fqns2xPvy';
const ipfsUri = new URL(env.IPFS_HOST);
const authorization = 'Basic ' + btoa(projectId + ':' + projectSecret);
console.log('projectId',projectId);
console.log('projectSecret', projectSecret);

let config: Options = {
  protocol: ipfsUri.protocol,
  host: ipfsUri.hostname,
  port: Number(ipfsUri.port),
};

if(process.env.NODE_ENV !== 'development') {
  config.headers = { authorization };
  config.port = 5001;
}
console.log('config', config);

const ipfs = create(config);


export default ipfs;
