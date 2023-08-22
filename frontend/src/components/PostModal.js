import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import API from '../api/api';
import { constants } from '../constants/constants';

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

export default function PostModal({mode, toggle, text, post_id}) {
  const [open, setOpen] = React.useState(true);
  const [content, setContent] = React.useState(text)
  const [contentError, setContentError] = React.useState(false)

  const handleClose = () => {
    setOpen(false);
    toggle();
  };

  const handleSubmit = async () => {
    if(content === '') {
      setContentError(true);
    }
    else {
      var requestBody = {
        content: content
      }

      if (mode === 'create') {
        var response = await API.post(constants.CREATE_POST_URL, requestBody)
      }
      else if (mode === 'edit') {
        var response = await API.put(constants.EDIT_POST_URL+post_id, requestBody)
      }
      
      if(response.status === 'SUCCESS'){
        window.location.reload()
      }
      else{
        alert('Tweet update failed')
      }
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          {/* <CardMedia
            component="img"
            height="194"
            // image="/static/images/cards/paella.jpg"
            alt="Paella dish"
          /> */}
          <TextField
            placeholder="Write something..."
            multiline
            required
            rows={4}
            sx={{width: "100%", margin: '5px 0px'}}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            error={contentError}
          />
          <Button 
            variant="contained" 
            size="small" 
            sx={{marginLeft: "250px"}}
            onClick={handleSubmit}
          >
            Post
          </Button>
        </Box>
      </Modal>
    </div>
  );
}