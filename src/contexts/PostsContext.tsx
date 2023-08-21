import React, { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { Post } from '../types';
import PostItContract from '../utils/PostIt';
import { useAuth } from './AuthContext';

interface IPostsContext {
  getReplies: (postId: number) => Promise<Post[]>,
  getPosts: Function,
    posts: Post[]
}
const PostContext = React.createContext<IPostsContext>(null as any);
export default function PostsProvider(props: { children: ReactNode}) {
  const { address } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const getPosts = useCallback(async (from: number = 1, to:number = 10) => {
    const postsResponse = await PostItContract.getPosts(from, to);
    setPosts(posts => {
      return [...posts, ...postsResponse.filter(x => !posts.map(y => y.id).includes(x.id))].sort((a,b) => Number(b.id - a.id));
    });
  }, []);

  const context: IPostsContext = {
    getReplies: (postId: number) => PostItContract.getReplies(postId),
    getPosts,
    posts
  };

  useEffect(() => {
    if (address) {
      getPosts();
    }
  }, [address, getPosts]);

  return <PostContext.Provider value={context}>
    {props.children}
  </PostContext.Provider>;
}

export function usePosts() {
  return useContext(PostContext);
}