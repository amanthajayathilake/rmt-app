import React, { useEffect, useState } from 'react'
import { getAuth } from '../../helper/helper.js';
import toast, { Toaster } from 'react-hot-toast';
import IconButton from '@mui/material/IconButton';
import { findUsers } from "../../api/usersApi";
import { deleteChatGroup, fetchAllChatGroups, sendMessage } from '../../api/chatApi';
import './chat.css'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CreateChatGroup from '../manage-chat/AddChatGroup.jsx';
import ChatNow from '../manage-chat/SendMessage.jsx';
import ChatIcon from '@mui/icons-material/Chat';
import RefreshIcon from '@mui/icons-material/Refresh';
import Tooltip from '@mui/material/Tooltip';
import EditChatGroup from '../manage-chat/EditChatGroup.jsx';


const MyChat = (props) => {
    const loggedUserId = getAuth().id;
    const [chat, setChat] = useState({});
    const [chats, setChats] = useState([]);
    const [user, setUser] = useState();
    const [chatOpen, setChatOpen] = useState(false);
    const [value, setValue] = React.useState('1');
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

    useEffect(() =>{
        function getUser() {
            findUsers(`id=${loggedUserId}`)
            .then((res) =>{
                setUser(res.data.responseData);
                console.log(loggedUserId)
                console.log(res.data.responseData);
            }).catch((err) =>{
                console.error(err);
            })
        }
        getUser();
    }, []);

    useEffect(() => {
        handleGetChats();
    }, []);

    const handleGetChats = () => {
        fetchAllChatGroups().then(res => {
            setChats(res.data.responseData);
            console.log(res.data.responseData);
        }).catch(() => {
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

    const handleDeleteChatGroup = (id) => {
        deleteChatGroup(id)
            .then((res) => {
                res.data.isSuccessful ?
                handleGetChats() + toast.success('Deleted Successfully!', {
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
                }) :
                toast.error('Only Supervisor or Authorized roles can delete the chat!', {
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
            })
            .catch(() => {
                toast.error('Only Supervisor or Authorized roles can delete the chat!', {
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
            })
    }

    const handleChangeTabs = (event, newValue) => {
        setValue(newValue);
    };
    
    const setAddChat = (payload) => {
        setAddOpen(true);
    }

    const sendMessage = (payload) => {
        setChat(payload);
        setChatOpen(true);
    }

    const setEditingChat = (payload) => {
        setChat(payload);
        setEditOpen(true);
    }

    const RefreshPage = () => {
        window.location.reload();
    }

  return (
    <div>
        <Toaster/>
        {chats.map((chat, index) => (
           chat.userIds.indexOf(loggedUserId) > -1 && (
               <>
                    <div className="chat_window" key={index}>
                        <div className="top_menu">
                            <div className="buttons">
                                <div className="button close"></div>
                                <div className="button minimize"></div>
                                <div className="button maximize"></div>
                            </div>
                            <div className="title">{chat.id}
                            <Tooltip title="Send a New Message">
                                <IconButton aria-label="chat" style={{color:"black", float:"right"}} onClick={() => sendMessage(chat)}>
                                    <ChatIcon /><span style={{fontSize:"14px"}}>Chat</span>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Get New Messages">
                                <IconButton aria-label="refresh" style={{color:"green", float:"right"}} onClick={() => RefreshPage()}>
                                    <RefreshIcon />
                                </IconButton>
                            </Tooltip>
                            </div>
                        </div>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChangeTabs} aria-label="lab API tabs example">
                                    <Tab label="Chat Now" value="1" />
                                    <Tab label="Group" value="2" />
                                    <Tab label="Settings" value="3" />
                                </TabList>
                            </Box>
                            <TabPanel value="1" style={scrollable}>
                                <ul id="chat">
                                    {chat.messages.map(( messages, index) => (
                                        messages.sender !== loggedUserId ?
                                        <>
                                            <li className="you">
                                                <div className="entete">
                                                    <span className="status green"></span>
                                                    <h2>{messages.sender}</h2>
                                                    <h3 style={{marginLeft:"5px"}}>{messages.createdAt.substring(messages.createdAt.indexOf('T') + 1).split(":", 2).join(":")}</h3>
                                                </div>
                                                <div className="triangle" style={{marginTop:"-15px"}}></div>
                                                <div className="message"> 
                                                    {messages.content}
                                                </div>
                                            </li>
                                        </> 
                                        : 
                                        <>
                                            <li className="me">
                                                <div className="entete">
                                                <h2>{messages.sender}(You)</h2>
                                                    <h3 style={{marginLeft:"5px"}}>{messages.createdAt.substring(messages.createdAt.indexOf('T') + 1).split(":", 2).join(":")}</h3>
                                                    <span className="status blue"></span>
                                                </div>
                                                <div className="triangle" style={{marginTop:"-15px"}}></div>
                                                <div className="message">
                                                    {messages.content}
                                                </div>
                                            </li>
                                        </> 
                                    ))}
                                </ul>
                                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                
                            </TabPanel>
                            <TabPanel value="2">
                                <h2><b>Group Details</b></h2><hr/><br/>
                                <span><b>Chat Group Name</b> - {chat.chatName}</span><br/><br/>
                                <span><b>User Ids</b> - {UsersDetails(chat)}</span><br/><br/>
                                <span><b>Group ID</b> - {chat.id}</span>
                            </TabPanel>
                            <TabPanel value="3">
                                <h2><b>Group Settings</b></h2><hr/><br/>
                                <Button onClick={() => setEditingChat(chat)} variant="outlined">Edit Chat</Button>
                                <Button onClick={() => handleDeleteChatGroup(chat.id)} variant="outlined" style={{marginLeft:"20px"}}>Delete Chat</Button>
                            </TabPanel>
                        </TabContext>
                    </div>
                </>
                )
           ))}
                    
            <center>
                <div style={{float:"right"}}>
                    <span>If your group don't have a chat group, Create Now!</span><br/>
                    <Button startIcon={<AddIcon />} variant="outlined" onClick={() => setAddChat(chat)} style={{float:"center"}}>Create Chat Group</Button> 
                </div>
            </center>
           {addOpen && (
                <CreateChatGroup
                    setAddOpen={setAddOpen}
                />
            )}
            {chatOpen && chat &&
                <ChatNow
                    chat={chat}
                    chatId={chat.id}
                    setChatOpen={setChatOpen}
                    handleGetChats={handleGetChats}
                />
            }
            {editOpen && chat &&
                <EditChatGroup
                    chat={chat}
                    chatId={chat.id}
                    usersIds={chat.userIds}
                    setEditOpen={setEditOpen}
                    handleGetChats={handleGetChats}
                />
            }
    </div>
  )
}

const UsersDetails = (chat) => {
    let chatUsers = (chat.userIds? chat.userIds + "\n" : "");
    return chatUsers && chatUsers.length > 1 ? chatUsers.substring(0 , chatUsers.length - 1) : chatUsers;
  }

const scrollable ={
    height: '600px',
    overflowY: 'scroll',
    paddingRight:'20px'
}

export default MyChat;