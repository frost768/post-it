import { Snackbar } from '@mui/material';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { usePosts } from './PostsContext';
import { useAuth } from './AuthContext';

interface INotification {
  open: boolean;
  message: string;
}

const NotificationContext = createContext<INotification>({
  open: false,
  message: '',
});

export default function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getPosts } = usePosts();
  const { address } = useAuth();
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const onUserSignedUp = useCallback((e: CustomEvent, adres: string) => {
    if (adres === e.detail.returnValues.userAddress.toString()) return;
    setSnackbar({
      open: true,
      message: 'Yeni üye katıldı!',
    });
  }, []);
  const onPostCreated = useCallback(
    (e: CustomEvent, addres: string) => {
      if (addres === e.detail.returnValues.postedBy.toString()) return;
      getPosts();
      setSnackbar({
        open: true,
        message: 'Yeni gönderi!',
      });
    },
    [getPosts]
  );
  const onUserReplied = useCallback((e: CustomEvent) => {
    setSnackbar({
      open: true,
      message: 'Yeni cevap!',
    });
  }, []);
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar({ open: false, message: '' });
  };

  useEffect(() => {
    const sss = (e: CustomEvent): void => onUserSignedUp(e, address);
    const fff = (e: CustomEvent): void => onPostCreated(e, address);
    // @ts-ignore
    window.addEventListener('UserSignedUp', sss);
    // @ts-ignore
    window.addEventListener('PostCreated', fff);
    // @ts-ignore
    window.addEventListener('UserReplied', onUserReplied);
    return () => {
      // @ts-ignore
      window.removeEventListener('UserSignedUp', sss);
      // @ts-ignore
      window.removeEventListener('PostCreated', fff);
      // @ts-ignore
      window.removeEventListener('UserReplied', onUserReplied);
    };
  }, [onPostCreated, onUserReplied, onUserSignedUp, address]);

  return (
    <NotificationContext.Provider value={snackbar}>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={6000}
        onClose={handleClose}
        open={snackbar.open}
        message={snackbar.message}
      />
      {children}
    </NotificationContext.Provider>
  );
}
