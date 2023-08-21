import React, { useState, useRef } from 'react';
import { TextField, Button, Typography, IconButton } from '@mui/material';
import { Collections } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export default function PostTextContainer({ callback, postId }: { postId?: number | undefined, callback: () => void }) {
  const [localPost, setLocalPost] = useState<{
    text: string | undefined,
    media: any,
    fileName:string | undefined,
  }>({
    text: '',
    media: undefined,
    fileName: undefined
  });
  const fileInput = useRef<HTMLInputElement>(null);
  const { post, reply } = useAuth();
  function handlePost() {
    if (!localPost.text) return;
    if(postId) {
      reply(postId, localPost.text, localPost.media).then(() => {
        callback();
      });
    } else {
      post(localPost.text, localPost.media).then(() => {
        callback();
      });
    }
  }
  
  const handleFileUpload = () => {
    if (!fileInput.current) return;
    fileInput.current.onchange = async e => {
      if (!(e.target as any)?.files[0]) {
        setLocalPost({ ...localPost, media: undefined, fileName: undefined });
        return;
      }
      const file = (e.target as any).files[0];
      setLocalPost({ ...localPost, media: file, fileName: file.name });
    };
    
    fileInput.current.click();
  };
  return <Dialog open onClose={callback}>
    <DialogTitle>{postId ? 'Cevap Yaz' : 'Gönderi Paylaş'}</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        id="post"
        placeholder={'Bir şeyler yaz'}
        type="text"
        fullWidth
        value={localPost.text}
        onChange={(e) => setLocalPost(l => ({ ...l, text: e.target.value.toString()}))}
        variant="standard"
      />
    </DialogContent>
    <DialogActions>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleFileUpload}
        color="inherit"
      >
        {localPost.fileName && 
        <Typography>{localPost.fileName}</Typography>}
        <Collections />
      </IconButton>
      <input hidden ref={fileInput} type="file" name="file" id="file" accept="image/*" />
      <Button onClick={callback}>İptal</Button>
      <Button onClick={handlePost}>Gönder</Button>
    </DialogActions>
  </Dialog>;
}