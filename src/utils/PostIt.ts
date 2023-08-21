import { Numbers, Web3, Contract } from 'web3';
import env from '../config';
import { Post, BCUser } from '../types';
import { getBytes32FromIpfsHash, getIpfsHashFromBytes32 } from './ipfsHashConverter';
const abi = [
  {
    'inputs': [],
    'stateMutability': 'nonpayable',
    'type': 'constructor'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'id',
        'type': 'uint256'
      },
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'postedBy',
        'type': 'address'
      }
    ],
    'name': 'PostCreated',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'postId',
        'type': 'uint256'
      },
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'replier',
        'type': 'address'
      }
    ],
    'name': 'UserReplied',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'id',
        'type': 'uint256'
      },
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'userAddress',
        'type': 'address'
      }
    ],
    'name': 'UserSignedUp',
    'type': 'event'
  },
  {
    'inputs': [],
    'name': 'postCount',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'name': 'postReplies',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'name': 'posts',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'id',
        'type': 'uint256'
      },
      {
        'internalType': 'bytes32',
        'name': 'contentHash',
        'type': 'bytes32'
      },
      {
        'internalType': 'bytes32',
        'name': 'mediaCid',
        'type': 'bytes32'
      },
      {
        'internalType': 'uint256',
        'name': 'tip',
        'type': 'uint256'
      },
      {
        'internalType': 'address payable',
        'name': 'postedBy',
        'type': 'address'
      }
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true
  },
  {
    'inputs': [],
    'name': 'userCount',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'name': 'userPosts',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address'
      }
    ],
    'name': 'users',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'id',
        'type': 'uint256'
      },
      {
        'internalType': 'bytes',
        'name': 'name',
        'type': 'bytes'
      },
      {
        'internalType': 'bytes32',
        'name': 'profilePicture',
        'type': 'bytes32'
      },
      {
        'internalType': 'bool',
        'name': 'signedUp',
        'type': 'bool'
      }
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'newOwner',
        'type': 'address'
      }
    ],
    'name': 'changeOwner',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'bytes32',
        'name': 'contentHash',
        'type': 'bytes32'
      },
      {
        'internalType': 'bytes32',
        'name': 'mediaCid',
        'type': 'bytes32'
      }
    ],
    'name': 'post',
    'outputs': [],
    'stateMutability': 'payable',
    'type': 'function',
    'payable': true
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'postId',
        'type': 'uint256'
      },
      {
        'internalType': 'bytes32',
        'name': 'contentHash',
        'type': 'bytes32'
      },
      {
        'internalType': 'bytes32',
        'name': 'mediaCid',
        'type': 'bytes32'
      }
    ],
    'name': 'reply',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'bytes',
        'name': 'name',
        'type': 'bytes'
      },
      {
        'internalType': 'bytes32',
        'name': 'profilePicture',
        'type': 'bytes32'
      }
    ],
    'name': 'signUp',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'from',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'to',
        'type': 'uint256'
      }
    ],
    'name': 'getPosts',
    'outputs': [
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'id',
            'type': 'uint256'
          },
          {
            'internalType': 'bytes32',
            'name': 'contentHash',
            'type': 'bytes32'
          },
          {
            'internalType': 'bytes32',
            'name': 'mediaCid',
            'type': 'bytes32'
          },
          {
            'internalType': 'uint256',
            'name': 'tip',
            'type': 'uint256'
          },
          {
            'internalType': 'address payable',
            'name': 'postedBy',
            'type': 'address'
          }
        ],
        'internalType': 'struct PostIt.Post[]',
        'name': '_posts',
        'type': 'tuple[]'
      }
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'postId',
        'type': 'uint256'
      }
    ],
    'name': 'getReplies',
    'outputs': [
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'id',
            'type': 'uint256'
          },
          {
            'internalType': 'bytes32',
            'name': 'contentHash',
            'type': 'bytes32'
          },
          {
            'internalType': 'bytes32',
            'name': 'mediaCid',
            'type': 'bytes32'
          },
          {
            'internalType': 'uint256',
            'name': 'tip',
            'type': 'uint256'
          },
          {
            'internalType': 'address payable',
            'name': 'postedBy',
            'type': 'address'
          }
        ],
        'internalType': 'struct PostIt.Post[]',
        'name': '_replies',
        'type': 'tuple[]'
      }
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'user',
        'type': 'address'
      }
    ],
    'name': 'getUserPosts',
    'outputs': [
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'id',
            'type': 'uint256'
          },
          {
            'internalType': 'bytes32',
            'name': 'contentHash',
            'type': 'bytes32'
          },
          {
            'internalType': 'bytes32',
            'name': 'mediaCid',
            'type': 'bytes32'
          },
          {
            'internalType': 'uint256',
            'name': 'tip',
            'type': 'uint256'
          },
          {
            'internalType': 'address payable',
            'name': 'postedBy',
            'type': 'address'
          }
        ],
        'internalType': 'struct PostIt.Post[]',
        'name': '_posts',
        'type': 'tuple[]'
      }
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'id',
        'type': 'uint256'
      }
    ],
    'name': 'getPostById',
    'outputs': [
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'id',
            'type': 'uint256'
          },
          {
            'internalType': 'bytes32',
            'name': 'contentHash',
            'type': 'bytes32'
          },
          {
            'internalType': 'bytes32',
            'name': 'mediaCid',
            'type': 'bytes32'
          },
          {
            'internalType': 'uint256',
            'name': 'tip',
            'type': 'uint256'
          },
          {
            'internalType': 'address payable',
            'name': 'postedBy',
            'type': 'address'
          }
        ],
        'internalType': 'struct PostIt.Post',
        'name': '_post',
        'type': 'tuple'
      }
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'user',
        'type': 'address'
      }
    ],
    'name': 'getUserByAddress',
    'outputs': [
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'id',
            'type': 'uint256'
          },
          {
            'internalType': 'bytes',
            'name': 'name',
            'type': 'bytes'
          },
          {
            'internalType': 'bytes32',
            'name': 'profilePicture',
            'type': 'bytes32'
          },
          {
            'internalType': 'bool',
            'name': 'signedUp',
            'type': 'bool'
          }
        ],
        'internalType': 'struct PostIt.User',
        'name': '_user',
        'type': 'tuple'
      }
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true
  },
  {
    'inputs': [],
    'name': 'getProfile',
    'outputs': [
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'id',
            'type': 'uint256'
          },
          {
            'internalType': 'bytes',
            'name': 'name',
            'type': 'bytes'
          },
          {
            'internalType': 'bytes32',
            'name': 'profilePicture',
            'type': 'bytes32'
          },
          {
            'internalType': 'bool',
            'name': 'signedUp',
            'type': 'bool'
          }
        ],
        'internalType': 'struct PostIt.User',
        'name': '_user',
        'type': 'tuple'
      }
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true
  },
  {
    'inputs': [],
    'name': 'getMyPosts',
    'outputs': [
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'id',
            'type': 'uint256'
          },
          {
            'internalType': 'bytes32',
            'name': 'contentHash',
            'type': 'bytes32'
          },
          {
            'internalType': 'bytes32',
            'name': 'mediaCid',
            'type': 'bytes32'
          },
          {
            'internalType': 'uint256',
            'name': 'tip',
            'type': 'uint256'
          },
          {
            'internalType': 'address payable',
            'name': 'postedBy',
            'type': 'address'
          }
        ],
        'internalType': 'struct PostIt.Post[]',
        'name': '_userPosts',
        'type': 'tuple[]'
      }
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'user',
        'type': 'address'
      }
    ],
    'name': 'getUserPostIds',
    'outputs': [
      {
        'internalType': 'uint256[]',
        'name': '_postIds',
        'type': 'uint256[]'
      }
    ],
    'stateMutability': 'view',
    'type': 'function',
    'constant': true
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'postId',
        'type': 'uint256'
      }
    ],
    'name': 'tipUser',
    'outputs': [],
    'stateMutability': 'payable',
    'type': 'function',
    'payable': true
  }
] as const;

const EMPTY_BYTES_32 = '0x0000000000000000000000000000000000000000000000000000000000000000';
interface PostItContract {
  postCount(): Promise<number>;
  userCount(): Promise<number>;
  changeOwner(newOwner: string): Promise<void>;
  post(contentHash: string, mediaCid: string | undefined): Promise<void>;
  reply(postId: number, contentHash: string, mediaCid: string | undefined): Promise<void>;
  signUp(name: string, profilePicture: string): Promise<void>;
  getPosts(from: number, to: number): Promise<Post[]>;
  getReplies(postId: number): Promise<Post[]>;
  getUserPosts(user: string): Promise<Post[]>;
  getPostById(id: number): Promise<Post>;
  getUserByAddress(user: string): Promise<BCUser>;
  getProfile(): Promise<BCUser>;
  getMyPosts(): Promise<Post[]>;
  getUserPostIds(user: string): Promise<number[]>;
  tipUser(postId: number): Promise<void>;
}

const web3 = new Web3(env.NETWORK_RPC);

function onUserSignedUp(e: any) {
  const UserSignedUpEvent = new CustomEvent('UserSignedUp', { detail: e });
  window.dispatchEvent(UserSignedUpEvent);
}
function onUserReplied(e: any) {
  const UserRepliedEvent = new CustomEvent('UserReplied', { detail: e });
  window.dispatchEvent(UserRepliedEvent);
}
function onPostCreated(e: any) {
  const PostCreatedEvent = new CustomEvent('PostCreated', { detail: e });
  window.dispatchEvent(PostCreatedEvent);
}
class PostItContract implements PostItContract {
  public address: string = localStorage.getItem('address') as string;
  private contractAddress: string = env.CONTRACT_ADDRESS;
  private contract: Contract<typeof abi>;
  public events: typeof this.contract.events;

  constructor(contractAddress: string = env.CONTRACT_ADDRESS) {
    this.contractAddress = contractAddress;
    this.contract = new Contract(abi, contractAddress, web3);
    web3.eth.subscribe('logs').then((val) => {
      console.log(val);
      val.on('data', console.log);
    });
    this.events = this.contract.events;
    this.contract.events.UserReplied().on('data', onUserReplied);
    this.contract.events.UserSignedUp().on('data', onUserSignedUp);
    this.contract.events.PostCreated().on('data', onPostCreated);
    this.contract.events.UserReplied().on('data', console.info);
    this.contract.events.UserReplied().on('changed', console.info);
    this.contract.events.UserSignedUp().on('changed', console.info);
    this.contract.events.PostCreated().on('changed', console.info);
    this.contract.events.UserReplied().on('changed', console.info);
  }
  
  async post(contentHash: string, mediaCid: string | undefined): Promise<void> {
    if (!this.address) throw Error('Address is empty');
    const contentHex = getBytes32FromIpfsHash(contentHash);
    let mediaHex = EMPTY_BYTES_32;
    if (mediaCid) {
      mediaHex = getBytes32FromIpfsHash(mediaCid);
    }
    console.log(contentHash, contentHex, mediaHex.length);

    try {
      const tx = this.contract.methods.post(contentHex, mediaHex);
      const gas = (await tx.estimateGas({ from: this.address })).toString();
      console.log(gas);
      
      await tx.send({ from: this.address, gas });
    } catch (error) {
      console.error(error);
    }
  }

  async reply(postId: number, contentHash: string, mediaCid: string | undefined): Promise<void> {
    if (!this.address) throw Error('Address is empty');
    const contentHex = getBytes32FromIpfsHash(contentHash);
    let mediaHex = EMPTY_BYTES_32;
    if (mediaCid) {
      mediaHex = getBytes32FromIpfsHash(mediaCid);
    }
    const tx = this.contract.methods.reply(postId, contentHex, mediaHex);
    const gas = (await tx.estimateGas({ from: this.address })).toString();
    try {
      await tx.send({ from: this.address, gas });
    } catch (error) {
      console.error(error);
    }

  }

  async getReplies(postId: number): Promise<Post[]> {
    if (!this.address) throw Error('Address is empty');
    let result: Post[] = [];
    result = await this.contract.methods.getReplies(postId).call();
    try {
      if (!result) return [];
      result = result.map(this.toPostModel.bind(this));
      result = await Promise.all(result.map(x => { 
        return fetch(this.toIpfsMediaUrl(x.content)).then(y => y.text().then(c => x.content = c).then(res => {
          return x;
        }));
      }));
      return result;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async signUp(name: string, profilePicture: string |undefined): Promise<void> {
    const nameHex = web3.utils.asciiToHex(name);
    let profileHex = EMPTY_BYTES_32;
    if(profilePicture) {
      profileHex = getBytes32FromIpfsHash(profilePicture);
    }
    
    try {
      const tx = this.contract.methods.signUp(nameHex, profileHex);
      const gas = (await tx.estimateGas({ from: this.address })).toString();
      console.log(gas);
      await tx.send({ gas, from: this.address });
    } catch (error) {
      console.error(error);
    }
  }

  async changeOwner(newOwner: string): Promise<void> {
    await this.contract.methods.changeOwner(newOwner).send({
      from: this.address,
    });
  }

  async getPosts(from: number, to: number): Promise<Post[]> {
    try {
      let postCount = await this.contract.methods.postCount().call();
      postCount = web3.utils.toNumber(postCount) as number;
      let result: Post[] = [];
      if (postCount === 0) return result;
      if (postCount <= 10) {
        result = await this.contract.methods.getPosts(1, postCount + 1).call();
      } else {
        result = await this.contract.methods.getPosts(1, postCount + 1).call();
      }
      if (!result) return [];
      result = result.map(this.toPostModel.bind(this));
      result = await Promise.all(result.map(x => { 
        return fetch(this.toIpfsMediaUrl(x.content)).then(y => y.text().then(c => x.content = c).then(res => {
          return x;
        }));
      }));
      return result;
    } catch (error) {
      console.error(error);
    }
    return [];
  }

  async getUserPosts(user: string): Promise<Post[]> {
    let result: Post[] = [];
    result = await this.contract.methods.getUserPosts(user).call();
    if (!result) return [];
    result = result.map(this.toPostModel.bind(this));
    
    result = await Promise.all(result.map(x => { 
      return fetch(this.toIpfsMediaUrl(x.content)).then(y => y.text().then(c => x.content = c).then(res => {
        return x;
      }));
    }));
    return result;
  }

  async getPostById(id: number): Promise<Post | null> {
    const result = await this.contract.methods.getPostById(id).call();
    if (!result) return null;
    const postResponse = this.toPostModel(result);
    return postResponse;
  }
  
  async getUserByAddress(user: string): Promise<BCUser | undefined> {
    try {
      const result = await this.contract.methods.getUserByAddress(user).call();
      if (!result) return undefined;
      const userResponse = this.toUserModel.bind(this)(result);
      return userResponse;
      
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }

  async getProfile(): Promise<BCUser> {
    const result = await this.contract.methods.getProfile().call();
    const userResponse = this.toUserModel.bind(this)(result);
    return userResponse;
  }

  async getMyPosts(): Promise<Post[]> {
    let result : Post[] = [];
    try {
      const response = await this.contract.methods.getMyPosts().call();
      console.log(response, 'dfkjhgfjkdgfkdghdfjkhgfd');
      
      if (!response) return [];
      result = response.map(this.toPostModel.bind(this));
      result = await Promise.all(result.map(x => { 
        return fetch(this.toIpfsMediaUrl(x.content)).then(y => y.text().then(c => x.content = c).then(res => {
          return x;
        }));
      }));
      console.log(result);
      
      return result;
    } catch (error) {
      console.error(error);
    }
    return result;
  }

  async getUserPostIds(user: string): Promise<number[]> {
    let result : number[] = [];
    try {
      const response = await this.contract.methods.getUserPostIds(user).call();
      result = response.map((c: Numbers) => web3.utils.toNumber(c) as number);
    } catch (error) {
      console.error(error);
    }
    return result;
  }

  async tipUser(postId: number): Promise<void> {
    await this.contract.methods.tipUser(postId).send({
      from: this.address,
      value: web3.utils.toWei('0.01', 'ether'), // Example value, adjust as needed
    });
  }

  toPostModel(blockPost: any): Post {
    const post = {
      id: blockPost.id,
      author: blockPost.postedBy,
      authorName: '',
      tip: blockPost.tip,
      content: getIpfsHashFromBytes32(blockPost.contentHash),
      mediaCid: blockPost.mediaCid.startsWith('0x00') ? '' : getIpfsHashFromBytes32(blockPost.mediaCid),
    };

    if (post.mediaCid) {
      post.mediaCid = this.toIpfsMediaUrl(post.mediaCid);
    }
    
    return post;
  }
  
  toUserModel(user: any): BCUser {
    user.name = web3.utils.hexToAscii(user.name);
    user.profilePicture = web3.utils.hexToAscii(user.profilePicture);
    return user;
  }

  toIpfsMediaUrl(mediaCid: string) {
    return `${env.IPFS_GATEWAY}/ipfs/${mediaCid}`;
  }
}

const postItContract = new PostItContract();
export default postItContract;