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
import { updatePanel } from '../../api/panelApi';
import { fetchAllStudentGroups } from '../../api/studentGroupApi';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import { findUsers } from '../../api/usersApi';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

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

const EditPanel = (props) => {
    const [panel, setPanel] = useState(props.panel);
    const [panelMembersList, setPanelmembersList] = useState([]);
    const [studentGroups, setStudentGroups] = useState([]);
    const theme = useTheme();
    const [panelMembers, setPanelMembers] = React.useState(props.panelMembers);
    const [allocatedGroups, setAllocatedGroups] = React.useState(props.panelGroups);

    useEffect(() =>{
        handleGetStudentGroups();
        handleGetPanelMembers();
    },[])

    const handleGetPanelMembers = () =>{
        findUsers(`role=PanelMember`)
            .then((res) => {
                setPanelmembersList(res.data.responseData);
                console.log(res.data.responseData);
            }).catch((error) => {
                console.log(error);
            })
    }

    const handleGetStudentGroups = () =>{
        fetchAllStudentGroups()
        .then((res) =>{
            setStudentGroups(res.data.responseData)
        }).catch((err) => {
            console.error(err);
        })
    }

    const handleSubmit = () => {
        const panelObj = {
            id: panel.id,
            panelMembers: panelMembers,
            allocatedGroups: allocatedGroups
        }
        updatePanel(panel.id, panelObj)
        .then(res => {
            props.handleGetPanels();
            console.error(res.data);
            console.log(panelObj);
            props.setEditOpen(false);
            toast.success('Successfully Created!', {
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
            window.location.reload('/panels');
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
                setPanel({...panel, id: value});
                break;
            }
            default: {}
        }
    }

    const handleChangeMembers = (event) => {
        const {
          target: { value },
        } = event;
        setPanelMembers(
          typeof value === 'string' ? value.split(',') : value,
          console.log(value)
        );
      };

    const handleChangeAllocate = (event) => {
        const {
          target: { value },
        } = event;
        setAllocatedGroups(
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
            <DialogTitle>Edit Panel</DialogTitle>
            <DialogContent>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="id"
                            label="Panel ID"
                            type="text"
                            value={panel.id || ''}
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            disabled={true}
                        />
                        <FormControl variant="standard" sx={{  width: '100%' }} style={{marginTop: "20px"}}>
                            <InputLabel id="demo-multiple-chip-label">Panel Members</InputLabel>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={panelMembers}
                                name="allocatedGroups"
                                onChange={handleChangeMembers}
                                // input={<OutlinedInput id="select-multiple-chip" label="Panel Members" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                                >
                                {panelMembersList.map((member) => (
                                    <MenuItem
                                        key={member.id}
                                        value={member.name}
                                        style={getStyles(member.id, panelMembers, theme)}
                                    >
                                        <Checkbox checked={panelMembers.indexOf(member.name) > -1} />
                                        <ListItemText primary={member.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="standard" sx={{ width: '100%' }} style={{marginTop: "20px"}}>
                            <InputLabel id="demo-multiple-chip-label">Allocate Groups</InputLabel>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={allocatedGroups}
                                name="allocatedGroups"
                                onChange={handleChangeAllocate}
                                //input={<OutlinedInput id="select-multiple-chip" label="Allocate Groups" />}
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
                                    <MenuItem
                                        key={group.id}
                                        value={group.id}
                                        style={getStyles(group.id, allocatedGroups, theme)}
                                    >
                                        <Checkbox checked={allocatedGroups.indexOf(group.id) > -1} />
                                        <ListItemText primary={group.id} />
                                    </MenuItem>
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


export default EditPanel;