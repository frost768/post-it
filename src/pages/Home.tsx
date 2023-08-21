import React, { useCallback, useEffect, useState } from 'react';
import { usePosts } from '../contexts/PostsContext';
import { Card, Container, Fab, Modal } from '@mui/material';
import PostFeed from '../components/PostFeed';
import { Edit } from '@mui/icons-material';
import PostTextContainer from '../components/PostTextContainer';
import { useAuth } from '../contexts/AuthContext';
const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 1,
};
export default function Home() {
  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);

  const handleOpenPostModal = () => {
    setIsPostModalOpen(true);
  };

  const handleClose = () => {
    setIsPostModalOpen(false);
  };
  const { signedIn } = useAuth();
  const { posts, getPosts } = usePosts();

  const handleRefresh = useCallback(() => {
    getPosts(posts.length === 0 ? 1 : posts.length, posts.length + 10);
  }, [getPosts, posts.length]);

  useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  return (
    <>
      <Container maxWidth="sm">
        <PostFeed posts={posts} onRefresh={handleRefresh} />
      </Container>
      {signedIn ? (
        <>
          <Fab
            onClick={handleOpenPostModal}
            style={{ position: 'fixed', bottom: 30, right: 30 }}
          >
            <Edit />
          </Fab>
        </>
      ) : null}
      {isPostModalOpen && <PostTextContainer callback={handleClose} />}
    </>
  );
}
