//This file includes unit testing for chat group service
import axios from 'axios';
import { fetchChatGroup, fetchAllChatGroups, createChatGroup, updateChatGroup, deleteChatGroup, sendMessage } from './chatApi';

jest.mock('axios');

//create a chat group
test('create a chat group', () => {
    const chatObj = {
        id: "G001",
        chatName: "chat001",
        userIds: ["S001", "IT001", "IT003"],
        messages: [{
            id: "",
            content: "chat001",
            sender: "",
        }]
    }

    const res = {
        data: {
            isSuccessful: true,
            responseData: chatObj
        }
    }
  axios.post.mockResolvedValue(res);
  return createChatGroup(chatObj).then(data => expect(data).toEqual(res));
});

//fetch all chat groups
test('fetch all chat groups', () => {
    const chatObj = [
        {
            id: "G001",
            chatName: "chat001",
            userIds: ["S001", "IT001", "IT003"],
            messages: [{
                id: "",
                content: "chat001",
                sender: "",
            }]
        },
        {
            id: "G002",
            chatName: "chat001",
            userIds: ["S001", "IT001", "IT003"],
            messages: [{
                id: "",
                content: "",
                sender: "",
            }]
        }];
    const res = {
        data: {
            isSuccessful: true,
            responseData: chatObj
        }
    }
  axios.get.mockResolvedValue(res);
  return fetchAllChatGroups().then(data => {expect(data).toEqual(res)});
});

//fetch a chatgroup
test('fetch a chatgroup', () => {
    const chatObj = {
        id: "G001",
        chatName: "chat001",
        userIds: ["S001", "IT001", "IT003"],
        messages: [{
            id: "",
            content: "chat001",
            sender: "",
        }]
    }
    const res = {
        data: {
            isSuccessful: true,
            responseData: chatObj
        }
    }
  axios.get.mockResolvedValue(res);
  return fetchChatGroup("G001").then(data => expect(data).toEqual(res));
});

//update a chatgroup
test('update a chatgroup', () => {
    const chatObj = {
        id: "G001",
        chatName: "chat001",
        userIds: ["S001", "IT001", "IT003"],
        messages: [{
            id: "",
            content: "",
            sender: "",
        }]
    }
    const res = {
        data: {
            isSuccessful: true,
            responseData: chatObj
        }
    }
  axios.put.mockResolvedValue(res);
  return updateChatGroup("G001").then(data => expect(data).toEqual(res));
});

//delete a chatgroup
test('delete a chatgroup', () => {
    const chatObj = {
        id: "G001",
        chatName: "chat001",
        userIds: ["S001", "IT001", "IT003"],
        messages: [{
            id: "",
            content: "",
            sender: "",
        }]
    }
    const res = {
        data: {
            isSuccessful: true,
            responseData: chatObj
        }
    }
  axios.delete.mockResolvedValue(res);
  return deleteChatGroup("G001").then(data => expect(data).toEqual(res));
});

//send a message
test('send a message', () => {
    const msgObj = {
        messages: [{
            id: "",
            content: "",
            sender: "",
        }]
    }
    const res = {
        data: {
            isSuccessful: true,
            responseData: msgObj
        }
    }
  axios.put.mockResolvedValue(res);
  return updateChatGroup("G001").then(data => expect(data).toEqual(res));
});
