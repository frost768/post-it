import React, { ReactNode, useContext, useEffect, useState } from 'react';
import connectToMetamask from '../utils/connectToMetamask';
import postItContract from '../utils/PostIt';
import ipfs from '../utils/ipfsClient';
import { BCUser, Post } from '../types';

interface IAuthContextFunctions {
  connect: Function,
  signOut: Function,
  signUp: (username: string, profilePic: string | undefined) => Promise<void>,
  post: (text: string, media: string | undefined) => Promise<void>,
  reply: (postId: number, text: string, media: string | undefined) => Promise<void>,
  getMyPosts: () => Promise<Post[]>,
  getUser: (userId: string) => Promise<BCUser | undefined>
  getUserPosts: (userId: string) => Promise<Post[]>
}
interface IAuthContext extends IAuthContextFunctions {
  address:string,
  signedIn: boolean | undefined,
  user: BCUser | undefined
}
if (window.ethereum) {
  window.ethereum.on('accountsChanged', async (accounts: string[]) => {
    console.log(accounts[0]);
    const AccountChangedEvent = new CustomEvent('AccountChanged', { detail: accounts[0]});
    window.dispatchEvent(AccountChangedEvent);
  });
}
const AuthenticationContext = React.createContext<IAuthContext>(null as any);
export function AuthProvider(props: { children: ReactNode }) {
  const [address, setAddress] = useState<string>('');
  const [signedIn, setSignedIn] = useState<boolean | undefined>(undefined);
  const [user, setUser] = useState<BCUser | undefined>(undefined);
  const connect = async (ad: string) => {
    if (!ad) {
      // @ts-ignore
      ad = await connectToMetamask();
    }
    localStorage.setItem('address', ad);
    postItContract.address = ad;
    setAddress(ad);
    try {
      console.log(ad);
      const user = await postItContract.getUserByAddress(ad);
      console.log(user);
      if (user) {
        setSignedIn(true);
        setUser(user);
      } else {
        setSignedIn(false);
      }
    } catch (error) {
      postItContract.address ='';
      setSignedIn(false);
    }
  };
  useEffect(() => {
    const onEvent = ({ detail }: CustomEvent): Promise<void> => connect(detail);
    // @ts-ignore
    window.addEventListener('AccountChanged', onEvent);
    return () => {
      // @ts-ignore
      window.removeEventListener('AccountChanged', onEvent);
    };
  }, []);
  
  const context: IAuthContext = {
    address,
    signedIn,
    user,
    async getUser(userId: string): Promise<BCUser | undefined> {
      return await postItContract.getUserByAddress(userId);
    },
    async getUserPosts(userId: string): Promise<Post[]> {
      return await postItContract.getUserPosts(userId);
    },
    async getMyPosts() {
      try {
        return await postItContract.getMyPosts();
      } catch (error) {
        return [];
      }
    },
    post: async (text: string, media: string | undefined) => {
      if (!address) {
        // TODO: snack bar message  "Önce giriş yapınız"
        return;
      }
      if (!text) {
        return;
      }
      try {
        const { cid } = await ipfs.add(text);
        text = cid.toString();
      } catch (error) {
        console.error(error);
        return;
      }
      if (media) {
        try {
          const { cid } = await ipfs.add(media);
          media = cid.toString();
        } catch (error) {
          return;
        }
      }
      return await postItContract.post(text, media);
    },
    reply: async (postId, text, media) => {
      console.log(postId, text, media);
      if (!address) {
        // TODO: snack bar message  "Önce giriş yapınız"
        return;
      }
      if (!text) {
        return;
      }
      try {
        const { cid } = await ipfs.add(text);
        text = cid.toString();
      } catch (error) {
        console.error(error);
        return;
      }
      if (media) {
        try {
          const { cid } = await ipfs.add(media);
          media = cid.toString();
        } catch (error) {
        }
      }
      return await postItContract.reply(postId, text, media);
    },
    connect,
    signUp: async (username: string, profilePic: string | undefined): Promise<void> => {
      if (!username) return;
      console.log(username, profilePic);
      
      return postItContract.signUp(username, profilePic).then(() => {
        postItContract.getUserByAddress(postItContract.address).then(userResponse => {
          if (userResponse) {
            setSignedIn(true);
            setUser(userResponse);
          }
        });
      }).catch(e => {
        console.error(e);
      });
    },
    signOut: () => {
      setAddress('');
      setSignedIn(undefined);
    }
  };

  return (
    <AuthenticationContext.Provider value={context}>
      {props.children}
    </AuthenticationContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthenticationContext);
}
