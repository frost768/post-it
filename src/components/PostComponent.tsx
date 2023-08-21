import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import { Post } from '../types';
import { AttachMoney, Reply } from '@mui/icons-material';
import PostTextContainer from './PostTextContainer';
import { useAuth } from '../contexts/AuthContext';
import { usePosts } from '../contexts/PostsContext';

export default function PostComponent({ post }: { post: Post }) {
  const { address } = useAuth();
  const { getReplies } = usePosts();
  const [replies, setReplies] = React.useState<Post[]>([]);
  const [modal, setModal] = React.useState(false);
  function handleReply(): void {
    setModal(true);
  }
  React.useEffect(() => {
    getReplies(post.id)
      .then((d) => {
        setReplies(d);
      })
      .catch(() => setReplies([]));
  }, []);
  const handleModal = React.useCallback(() => {
    setModal(false);
  }, []);

  function handleTip(): void {
    console.log('tip');
  }

  return (
    <>
      {modal && <PostTextContainer postId={post.id} callback={handleModal} />}
      <Card sx={{ minWidth: '100%' }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: red[500] }}>{post.authorName}</Avatar>}
        />
        {post.mediaCid ? (
          <CardMedia component="img" image={post.mediaCid} alt="image" />
        ) : null}
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.content}
          </Typography>
          {replies.length > 0 && (
            <Card
              sx={{
                marginTop: '10px',
                marginBottom: '10px',
                padding: '20px',
                borderWidth: '1px',
                borderColor: 'black',
                borderStyle: 'solid',
              }}
            >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }}>{post.content}</Avatar>
                }
              />
              {replies[0].mediaCid ? (
                <CardMedia
                  component="img"
                  image={replies[0].mediaCid}
                  alt="image"
                />
              ) : null}
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {replies[0].content}
                </Typography>
              </CardContent>
            </Card>
          )}
        </CardContent>
        {address && (
          <CardActions>
            <IconButton onClick={handleReply} aria-label="Reply">
              <Reply />
            </IconButton>
          </CardActions>
        )}
      </Card>
    </>
  );
}
