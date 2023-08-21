import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Container,
  Fab,
  Typography,
} from '@mui/material';
import PostFeed from '../components/PostFeed';
import { BCUser, Post } from '../types';
import { useParams } from 'react-router-dom';
import PostTextContainer from '../components/PostTextContainer';
import { Edit } from '@mui/icons-material';

export default function Profile() {
  const { userId } = useParams<{ userId: string }>();
  const { signedIn, getUser, user, getUserPosts, getMyPosts, address } =
    useAuth();
  const [localUser, setLocalUser] = useState<BCUser | undefined>(user);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const isMe = address === userId;
  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);

  const handleOpenPostModal = () => {
    setIsPostModalOpen(true);
  };
  const handleClose = () => {
    setIsPostModalOpen(false);
  };

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const handleRefresh = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    const localUser = await getUser(userId);
    const posts = await getUserPosts(userId);
    setLocalUser(localUser);
    setUserPosts(posts);
    setIsLoading(false);
  }, [getMyPosts, getUser, getUserPosts, isMe, signedIn, userId]);
  useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  return isLoading ? (
    <span>Yükleniyor...</span>
  ) : (
    <>
      <Container maxWidth="md">
        <Card>
          <CardHeader avatar={<Avatar />}>{localUser?.name}</CardHeader>
          {localUser?.profilePicture ? (
            <img alt={localUser.name} src={localUser.profilePicture} />
          ) : null}
          <CardContent>
            <Typography color={'black'} variant="h5">
              <div>{localUser?.id}</div>
            </Typography>
          </CardContent>
        </Card>
      </Container>
      <Container maxWidth="sm">
        <PostFeed posts={userPosts} onRefresh={handleRefresh} />
      </Container>
      {signedIn && isMe ? (
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
