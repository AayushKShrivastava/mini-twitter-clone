import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Avatar, IconButton, Typography, Menu, MenuItem } from '@mui/material';
// import CardMedia from '@mui/material/CardMedia';
import { red } from '@mui/material/colors';
import { MoreVert as MoreVertIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import PostModal from './PostModal';
import API from '../api/api';
import { constants } from '../constants/constants';

export default function Post({ post, profile, reload }) {

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  const [menuOpen, setMenuOpen] = useState(false)
  const [postModalOpen, setPostModalOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuOpen(true)
  }

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handlePostModalOpen = () => {
    handleMenuClose()
    setPostModalOpen(true);
  }

  const handleDelete = async() => {
    var response = await API.delete(constants.DELETE_POST_URL+post._id)
    if (response.status !== 'SUCCESS') {
      alert('Tweet deletion failed!')
    }
    handleMenuClose()
    reload()
  }

  const renderMenu = (
    <Menu
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
      open={menuOpen}
      onClose={handleMenuClose}
      sx={{position: 'absolute', top: '0px', right: '0px'}}
    >
      <MenuItem onClick={handlePostModalOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <EditIcon />
        </IconButton>
        <p>Edit</p>
      </MenuItem>
      <MenuItem onClick={handleDelete}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <DeleteIcon />
        </IconButton>
        <p>Delete</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', m:"50px 0px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {post.username[0]}
          </Avatar>
        }
        action={ profile && 
          <IconButton aria-label="settings" onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
        }
        title={post.username}
        subheader={formatDate(post.createdAt)}
      />
      {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.content}
        </Typography>
      </CardContent>
      {renderMenu}
      {postModalOpen && <PostModal mode='edit' toggle = {()=>setPostModalOpen(false)} text={post.content} post_id={post._id} reload={() => reload()}/>}
    </Card>
  );
}
