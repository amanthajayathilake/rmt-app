import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import toast, { Toaster } from 'react-hot-toast';
import { getAuth } from '../../helper/helper.js';
import { sendMessage } from '../../api/chatApi';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ChatNow = (props) => {
    const [chat, setChat] = useState(props.chat);
    const loggedUserId = getAuth().id;

    const handleSubmitMessage = () => {
        const messageBody = {
            content: chat.content,
            sender: loggedUserId
        }
        sendMessage(chat.id, messageBody)
        .then(res => {
            console.error(res.data);
            console.log(messageBody);
            window.location.reload('/chat');
        }).catch((e) => {
            //console.log(e);
            toast.error('Error!', {
                position: "top-right",
                style: {
                  padding: '16px',
                  color: 'white',
                  background: '#FF0000'
                },
                iconTheme: {
                  primary: 'red',
                  secondary: '#FFFAEE',
                },
            });
        });
    }
    
    const handleChange = (event) => {
        const {name, value} = event.target;
        switch(name) {
            case 'content': {
                setChat({...chat, content: value});
                break;
            }
            case 'sender': {
                setChat({...chat, sender: value});
                break;
            }
            default: {}
        }
    }

    return (
        <div>
        <Toaster/>
        <Dialog 
            open={true} 
            onClose={() => props.setChatOpen(false)}
            TransitionComponent={Transition}
            keepMounted
            style={{zIndex:"10001"}}
        >
            <DialogTitle>Send Message</DialogTitle>
            <DialogContent>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="content"
                            label="Enter your message"
                            type="text"
                            value={chat.content || ''}
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                        />    
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => props.setChatOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitMessage}>Send</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}


export default ChatNow;