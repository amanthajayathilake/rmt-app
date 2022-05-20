import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import toast, { Toaster } from 'react-hot-toast';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { fetchAllStudentGroups } from '../../api/studentGroupApi';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { findUsers } from '../../api/usersApi';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { getAuth } from '../../helper/helper.js';
import { updateChatGroup } from '../../api/chatApi';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function getStyles(name, allocatedGroups, theme) {
    return {
      fontWeight:
      allocatedGroups.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

const EditChatGroup = (props) => {
    const loggedUserId = getAuth().id
    const [chat, setChat] = useState(props.chat);
    const [studentGroups, setStudentGroups] = useState([]);
    const theme = useTheme();
    const [userIds, setUserIds] = React.useState(props.usersIds);
    const [allUsers, setAllUsers] = useState(props.usersIds);

    useEffect(() =>{
        function getUser() {
            findUsers(`id=${loggedUserId}`)
            .then((res) =>{
                console.log(loggedUserId);
            }).catch((err) =>{
                console.error(err);
            })
        }
        getUser();
    }, []);

    useEffect(() =>{
        function getAllUsers() {
            findUsers()
            .then((res) =>{
                setAllUsers(res.data.responseData);
                console.log(res.data.responseData);
            }).catch((err) =>{
                console.error(err);
            })
        }
        getAllUsers();
    }, []);

    useEffect(() =>{
        handleGetStudentGroups();
    },[])

    const handleGetStudentGroups = () =>{
        fetchAllStudentGroups()
        .then((res) =>{
            setStudentGroups(res.data.responseData)
        }).catch((err) => {
            console.error(err);
        })
    }

    const handleSubmit = () => {
        const chatObj = {
            id: chat.id,
            chatName: chat.chatName,
            userIds: userIds
        }
        updateChatGroup(chat.id, chatObj)
        .then(res => {
            console.error(res.data);
            console.log(chatObj);
            props.setEditOpen(false);
            toast.success('Successfully Updated!', {
                position: "top-right",
                style: {
                  border: '1px solid #713200',
                  padding: '16px',
                  color: 'white',
                  background: '#4BB543'
                },
                iconTheme: {
                  primary: 'green',
                  secondary: '#FFFAEE',
                },
            });
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
            case 'id': {
                setChat({...chat, id: value});
                break;
            }
            case 'chatName': {
                setChat({...chat, chatName: value});
                break;
            }
            default: {}
        }
    }

    const handleChangeUserIds = (event) => {
        const {
          target: { value },
        } = event;
        setUserIds(
          typeof value === 'string' ? value.split(',') : value,
          console.log(value)
        );
      };

    return (
        <div>
        <Toaster/>
        <Dialog 
            open={true} 
            onClose={() => props.setEditOpen(false)}
            TransitionComponent={Transition}
            keepMounted
        >
            <DialogTitle>Edit Chat Group</DialogTitle>
            <DialogContent>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                    <FormControl fullWidth style={{marginTop:"8px"}} variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Chat Group ID</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={chat.id || 0}
                                label="Chat Group ID"
                                onChange={handleChange}
                                name="id"
                                InputLabelProps={{ shrink: true, required: true }}
                                disabled={true}
                            >
                                {studentGroups.map((group) => (
                                    group.studentsId.indexOf(loggedUserId) > -1 && (
                                        <MenuItem value={group.id}>{group.id}</MenuItem>
                                    )
                                ))}
                            </Select>
                    </FormControl>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="chatName"
                        label="Chat Name"
                        type="text"
                        value={chat.chatName || ''}
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="standard" sx={{ width: '100%' }} style={{marginTop: "20px"}}>
                            <InputLabel id="demo-multiple-chip-label">Add Users</InputLabel>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={userIds}
                                name="userIds"
                                onChange={handleChangeUserIds}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                                >
                                {studentGroups.map((group) => (
                                    group.studentsId.indexOf(loggedUserId) > -1 && group.supervisorId !== "Not Assigned" &&(
                                        <MenuItem
                                            key={group.id}
                                            value={group.supervisorId}
                                            style={getStyles(group.supervisorId, userIds, theme)}
                                        >
                                            <Checkbox checked={userIds.indexOf(group.supervisorId) > -1} />
                                            <ListItemText primary={<span>Your Group Supervisor- {group.supervisorId}</span>} />
                                        </MenuItem>
                                    )
                                ))}
                                {allUsers.map((user) => (
                                    user.role === "Student" && (
                                        <MenuItem
                                            key={user.id}
                                            value={user.id}
                                            style={getStyles(user.id, userIds, theme)}
                                        >
                                            <Checkbox checked={userIds.indexOf(user.id) > -1} />
                                            <ListItemText primary={<span>{user.id} - {user.name}</span>} />
                                        </MenuItem>
                                    )
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => props.setEditOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}

export default EditChatGroup;