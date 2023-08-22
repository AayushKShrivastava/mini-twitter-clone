import React, {useState} from "react";
import { TextField, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"
import API from "../api/api";
import { constants } from "../constants/constants";
 
export default function Signup() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)
  const navigate = useNavigate();

  const handleClose = () => {
    setUsername('')
    setPassword('')
    setConfirmPassword('')
    setUsernameError(false)
    setPasswordError(false)
    setConfirmPasswordError(false)
    navigate('/')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setUsernameError(false)
    setPasswordError(false)

    if (username === '') {
      setUsernameError(true)
    }
    if (password === '') {
      setPasswordError(true)
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(true)
    }

    if (username && password) {
        console.log(username, password)
    }

    let requestBody = {
      username : username,
      password : password
    }

    var response = await API.post(constants.SIGNUP_URL, requestBody)
    console.log(response)
    if(response.status === 'SUCCESS') {
      handleClose();
    }
    
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
     
  return ( 
    <div >
      <Box sx={{ ...style, width: 400 }}>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <h2>Signup Form</h2>
          <TextField 
            label="Username"
            onChange={e => setUsername(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="username"
            sx={{mb: 3}}
            fullWidth
            value={username}
            error={usernameError}
          />
          <TextField 
            label="Password"
            onChange={e => setPassword(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="password"
            value={password}
            error={passwordError}
            fullWidth
            sx={{mb: 3}}
          />
          <TextField 
            label="Confirm password"
            onChange={e => setConfirmPassword(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="password"
            value={confirmPassword}
            error={confirmPasswordError}
            fullWidth
            sx={{mb: 3}}
          />
          <Button variant="outlined" color="secondary" type="submit">Sign up</Button>
        </form>
        <small>Already have an account? <Link to="/login">Sign in here</Link></small>
      </Box>
    </div>
  );
}
