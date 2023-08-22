import * as React from 'react';
import { Card, Avatar, CardContent, Typography, Button } from '@mui/material';
import { red } from '@mui/material/colors';
import API from '../api/api';
import { constants } from '../constants/constants';

export default function People({user, reload}) {
  const handleFollow = async () => {
    const requestBody = {
      followee_id: user._id 
    }
    if(user.followee) {
      var response = await API.post(constants.UNFOLLOW_URL, requestBody)
    }
    else {
      var response = await API.post(constants.FOLLOW_URL, requestBody)
    }
    if(response.status === 'SUCCESS'){
      reload();
    }
  }

  return(
    <Card sx={{ maxWidth: 1000, mx: 'auto', mt:"50px" }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
          <Avatar sx={{ bgcolor: red[500] }}>
            {user.username[0]}
          </Avatar>
          <Typography variant="body2" color="text.secondary">
            {user.username}
          </Typography>
        <Button 
          sx={{marginLeft: "auto"}} 
          onClick={handleFollow}
        >
          { user.followee ? 'Unfollow' : 'Follow' }
        </Button>
      </CardContent>
    </Card>
  )
};
