import * as React from 'react';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Profile from './pages/Profile';
import Home from './pages/Home';
import PostsProvider from './contexts/PostsContext';
import NotificationProvider from './contexts/NotificationContext';

export default function App() {
  return (
    <AuthProvider>
      <PostsProvider>
        <NotificationProvider>
          <BrowserRouter>
            <ResponsiveAppBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile/:userId" element={<Profile />} />
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </PostsProvider>
    </AuthProvider>
  );
}
