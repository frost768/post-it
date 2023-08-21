import React from 'react';
import { Box, IconButton } from '@mui/material';
import PostComponent from './PostComponent';
import { Refresh } from '@mui/icons-material';
import { Post } from '../types';

export default function PostFeed({
  posts,
  onRefresh,
}: {
  posts: Post[];
  onRefresh: () => void;
}) {
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      flexDirection={'column'}
      minWidth={'100%'}
      rowGap={10}
    >
      <IconButton onClick={onRefresh}>
        <Refresh />
      </IconButton>
      {[...posts].map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </Box>
  );
}
