import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Post from './Post';
import People from './People';
import Profile from './Profile';
import API from '../api/api';
import { constants } from '../constants/constants';
import {useNavigate} from "react-router-dom";

export default function PostsContainer({showPeople, people, profile, searchQuery, current_user}) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const [reload, setReload] = useState(false)

  useEffect(() => {
    if (profile) {
      async function fetchUserTweets() {
        var response = await API.get(constants.USER_POSTS_URL)
        if(response.status === 'SUCCESS')
          setPosts(response.data)
        else if (response.error.code === 4003) 
          navigate('/login')
      }
      fetchUserTweets();

      async function fetchFolloweesData() {
        var response = await API.get(constants.FOLLOWEES_URL)
        if(response.status === 'SUCCESS')
          setUsers(response.data)
        else if (response.error.code === 4003) 
          navigate('/login')
      }
      fetchFolloweesData();
    }
    else if(!profile && !people){
      async function fetchData() {
        var response = await API.get(constants.FEED_URL)
        if(response.status === 'SUCCESS')
          setPosts(response.data)
        else if (response.error.code === 4003) 
          navigate('/login')
      }
      fetchData();
    }
    else if(!profile && people) {
      async function fetchUsersData() {
        const requestBody = {
          query: searchQuery
        }
        var response = await API.post(constants.GET_USERS_URL, requestBody)
        if(response.status === 'SUCCESS') {
          setUsers(response.data)
        }
      }
      fetchUsersData();
    }
  }, [searchQuery, reload, people, profile, current_user])

  return (
    <div style={{display: 'flex'}}>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm" sx={{marginTop: "100px"}}>
          {profile && <Profile showFollowees={(val) => showPeople(val)} posts_count={posts.length} current_user={current_user} followees_count={users.length}/>}
          {people && users.map((user) => <People user={user} reload={() => setReload(!reload)}/>)}
          {!people && posts.map((post) => <Post post={post} profile={profile}/>)}
        </Container>
      </React.Fragment>
    </div>
  );
}