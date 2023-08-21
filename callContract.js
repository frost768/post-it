const { Contract, Web3 } = require('web3');
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
];
const CONTRACT_ADDRESS_DEV = '0xd4eeE4C4e26a34DA0Dd5747F1070B00998F51470';
const CONTRACT_ADDRESS_PROD = '0xd4eeE4C4e26a34DA0Dd5747F1070B00998F51470';

const IPFS_HOST_DEV = 'http://127.0.0.1:5001';
const IPFS_HOST_PROD = 'http://127.0.0.1:5001';

const IPFS_GATEWAY_DEV = 'http://127.0.0.1:8080';
const IPFS_GATEWAY_PROD = 'https://ipfs.io';

const NETWORK_RPC_DEV = 'ws://127.0.0.1:7545';
const NETWORK_RPC_PROD = 'ws://127.0.0.1:7545';

const web3 = new Web3(NETWORK_RPC_DEV);
const contract = new Contract(abi, CONTRACT_ADDRESS_DEV, web3);
(async () => {
  try {
    var f = contract.methods.postCount();
    var g = await f.call();
    console.log(g);
  } catch (error) {
    console.error(error);
  }
})();