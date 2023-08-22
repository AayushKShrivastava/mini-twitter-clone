import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PostModal from './PostModal';
import API from '../api/api';
import { constants } from '../constants/constants';

export default function Post({ post, profile }) {

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  const [menuOpen, setMenuOpen] = React.useState(false)
  const [postModalOpen, setPostModalOpen] = React.useState(false);

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
    window.location.reload()
    handleMenuClose()
  }

  const renderMenu = (
    <Menu
      // anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
      // id={menuId}
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
      {postModalOpen && <PostModal mode='edit' toggle = {()=>setPostModalOpen(false)} text={post.content} post_id={post._id}/>}
    </Card>
  );
}
