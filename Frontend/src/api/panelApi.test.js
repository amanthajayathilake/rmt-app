//This file includes unit testing for panel service
import { createPanel, deletePanel, fetchAllPanels, fetchPanel, updatePanel } from "./panelApi";
import axios from 'axios';

jest.mock('axios');

//create a panel
test('Create a panel', () => {
    const panelObj = {
        id: "P1999",
        panelMembers: ["S001", "S002", "S003"],
        allocatedGroups: ["G001", "G002", "G003"]
    }

    const res = {
        data: {
            isSuccessful: true,
            responseData: panelObj
        }
    }
  axios.post.mockResolvedValue(res);
  return createPanel(panelObj).then(data => expect(data).toEqual(res));
});

//fetch all panels
test('Fetch all panels', () => {
    const panelObj = [
        {
            id: "P1999",
            panelMembers: ["S001", "S002", "S003"],
            allocatedGroups: ["G001", "G002", "G003"]
        },
        {
            id: "P1999",
            panelMembers: ["S001", "S002", "S003"],
            allocatedGroups: ["G001", "G002", "G003"]
        }];
    const res = {
        data: {
            isSuccessful: true,
            responseData: panelObj
        }
    }
  axios.get.mockResolvedValue(res);
  return fetchAllPanels().then(data => {expect(data).toEqual(res)});
});

//fetch a panel
test('Fetch one Panel', () => {
    const panelObj = {
        id: "P1999",
        panelMembers: ["S001", "S002", "S003"],
        allocatedGroups: ["G001", "G002", "G003"]
    }
    const res = {
        data: {
            isSuccessful: true,
            responseData: panelObj
        }
    }
  axios.get.mockResolvedValue(res);
  return updatePanel("P1999").then(data => expect(data).toEqual(res));
});

//update a panel
test('Update Panel', () => {
    const panelObj = {
        id: "P1999",
        panelMembers: ["S001", "S002", "S003"],
        allocatedGroups: ["G001", "G002", "G003"]
    }
    const res = {
        data: {
            isSuccessful: true,
            responseData: panelObj
        }
    }
  axios.put.mockResolvedValue(res);
  return updatePanel("P1999").then(data => expect(data).toEqual(res));
});

//delete a panel
test('Delete Panel', () => {
    const panelObj = {
        id: "P1999",
        panelMembers: ["S001", "S002", "S003"],
        allocatedGroups: ["G001", "G002", "G003"]
    }
    const res = {
        data: {
            isSuccessful: true,
            responseData: panelObj
        }
    }
  axios.delete.mockResolvedValue(res);
  return deletePanel("P1999").then(data => expect(data).toEqual(res));
});


