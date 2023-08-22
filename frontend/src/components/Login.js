import React, {useState} from "react";
import { TextField, Button, Box } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom"
import { constants } from "../constants/constants";
import API from "../api/api";
 
export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => {
    setUsername('')
    setPassword('')
    setUsernameError(false)
    setPasswordError(false)
    if (location.pathname === '/login') 
      navigate('/')
    window.location.reload()
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

    if (username && password) {
        console.log(username, password)
    }

    let requestBody = {
      username : username,
      password : password
    }

    var response = await API.post(constants.LOGIN_URL, requestBody)
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
          <h2>Login Form</h2>
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
          <Button variant="outlined" color="secondary" type="submit">Login</Button>
        </form>
        <small>Need an account? <Link to="/signup">Register here</Link></small>
      </Box>
    </div>
  );
}
