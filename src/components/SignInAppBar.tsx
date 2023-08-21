import React, { useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Avatar,
  Box,
  Card,
  CardActions,
  IconButton,
  Menu,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
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
export default function SignInAppBar() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { signedIn, connect, signOut, signUp, user, address } = useAuth();
  const [isSignUpPostModalOpen, setIsSignUpPostModalOpen] =
    useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const handleConnect = () => {
    connect();
  };

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = (e: any) => {
    setAnchorElUser(null);
    if (!e) {
      signOut();
    }
  };

  const handleSignUp = () => {
    setIsSignUpPostModalOpen(true);
  };

  const handleSignUpButton = () => {
    signUp(username, undefined).then(() => {
      setIsSignUpPostModalOpen(false);
    });
  };

  const handleSignUpClose = () => {
    setIsSignUpPostModalOpen(false);
  };

  const connectWallet = (
    <Button onClick={handleConnect}>
      <Typography color={'white'}>Cüzdanı Bağla</Typography>
    </Button>
  );

  const signUpButton = (
    <Button onClick={handleSignUp}>
      <Typography color={'white'}>Üye Ol</Typography>
    </Button>
  );
  return signedIn === undefined ? (
    connectWallet
  ) : signedIn === false ? (
    <>
      {signUpButton}
      <Modal open={isSignUpPostModalOpen} onClose={handleSignUpClose}>
        <Card sx={modalStyle}>
          <TextField
            placeholder="Kullanıcı adı"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <CardActions>
            <Button onClick={handleSignUpButton}>Üye Ol</Button>
          </CardActions>
        </Card>
      </Modal>
    </>
  ) : (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              alt={user?.name}
              key={user?.id}
              src={user?.profilePicture}
            />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem component={Link} to={`/profile/${address}`}>
            {user?.name}
          </MenuItem>
          <MenuItem
            key={'logout'}
            onClick={() => handleCloseUserMenu(undefined)}
          >
            <Typography textAlign="center">Çıkış Yap</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
}
