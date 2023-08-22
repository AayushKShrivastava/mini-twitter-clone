import React from "react";
import { Avatar, Typography, Button } from '@mui/material';
import { red } from '@mui/material/colors';

export default function Profile({showFollowees, posts_count, current_user, followees_count}) {
  const handleFollowingClick = () => {
    showFollowees(true);
  };

  const handlePostClick = () => {
    showFollowees(false);
  }

  return (
    <div style={{ mx: 'auto', height: "200px", padding:'20px', display: 'flex', flexDirection: "column", justifyContent: "space-between", alignItems: "center", gap: "10px", border: "2px solid #3498db"}}>
      <Avatar sx={{ bgcolor: red[500] }}>
        {current_user && current_user.username[0]}
      </Avatar>
      <Typography variant="body2" color="text.secondary">
      {current_user?.username}
      </Typography>

      <Button variant="outlined" style={{display: "flex", justifyContent: 'space-between', width: '150px'}} onClick={handleFollowingClick}>
        <Typography variant="body2" color="text.secondary">
          Following
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {followees_count}
        </Typography>
      </Button>
      <Button variant="outlined" style={{display: "flex", justifyContent: 'space-between', width: '150px'}} onClick={handlePostClick}>
        <Typography variant="body2" color="text.secondary">
          Posts
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {posts_count}
        </Typography>
      </Button>
    </div>
  );
};
