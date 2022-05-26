import { registerUser, findUsers, deleteUser } from '../usersApi';
import axios from 'axios';

jest.mock('axios');

// Unit test for registering a user
test('Should register user', () => {
    const user = {
        id: 'IT20274702',
        name: 'Shehan',
        role: 'Admin',
        email: 'it20274702@my.sliit.lk'
    }
    const response = {
        data: {
            isSuccessful: true,
            responseData: user
        }
    }
  axios.post.mockResolvedValue(response);
  return registerUser(user).then(data => expect(data).toEqual(response));
});

// Unit test for retrieving users
test('Should fetch users', () => {
    const users = [
        {
            id: 'IT20274702',
            name: 'Shehan',
            role: 'Admin',
            email: 'it20274702@my.sliit.lk'
        },
        {
            id: 'IT20274702',
            name: 'Shehan',
            role: 'Admin',
            email: 'it20274702@my.sliit.lk'
        }];
    const response = {
        data: {
            isSuccessful: true,
            responseData: users
        }
    }
  axios.get.mockResolvedValue(response);
  return findUsers().then(data => {expect(data).toEqual(response)});
});

// Unit test for deleting a user
test('Should update a user', () => {
    const user = {
        id: 'IT20274702',
        name: 'Shehan',
        role: 'Admin',
        email: 'it20274702@my.sliit.lk'
    }
    const response = {
        data: {
            isSuccessful: true,
            responseData: user
        }
    }
  axios.delete.mockResolvedValue(response);
  return deleteUser('IT20274702').then(data => expect(data).toEqual(response));
});

// Unit test for updating a user
test('Should update a user', () => {
    const user = {
        id: 'IT20274702',
        name: 'Shehan',
        role: 'Admin',
        email: 'it20274702@my.sliit.lk'
    }
    const response = {
        data: {
            isSuccessful: true,
            responseData: user
        }
    }
  axios.put.mockResolvedValue(response);
  return deleteUser('IT20274702', user).then(data => expect(data).toEqual(response));
});