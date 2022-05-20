import * as React from 'react';
import {useState} from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import toast, { Toaster } from 'react-hot-toast';
import { acceptRejectGroup } from '../../api/studentGroupApi';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditTopicStatus = (props) =>{
    const [group, setGroup] = useState(props.group);

    const handleSubmit = () => {
        acceptRejectGroup(group.id, group)
            .then((res) => {
                props.handleGetGroups();
                toast.success('Successfully Updated!', {
                    position: "top-right",
                    style: {
                      padding: '16px',
                      color: 'white',
                      background: '#4BB543'
                    },
                    iconTheme: {
                      primary: 'green',
                      secondary: '#FFFAEE',
                    },
                });
                props.setEditOpen(false);
            })
            .catch((e) => {
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
            case 'status': {
                setGroup({...group, status: value});
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
            onClose={() => props.setEditOpen(false)}
            TransitionComponent={Transition}
            keepMounted
        >
            <DialogTitle>Add Topic Status</DialogTitle>
            <br/>
            <DialogContent style={{width:"500px", height:"100px"}}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-standard-label">Topic Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={group.status}
                            name="status"
                            label="Topic Status"
                            onChange={handleChange}
                            variant="standard"
                        >
                            <MenuItem value="Topic Not Registered">Topic Not Registered</MenuItem>
                            <MenuItem value="Supervisor Accepted">Accept as a Supervisor</MenuItem>
                            <MenuItem value="Supervisor Rejected">Reject as a Supervisor</MenuItem>
                            <MenuItem value="Co-Supervisor Accepted">Accept as a Co-Supervisor</MenuItem>
                            <MenuItem value="Co-Supervisor Rejected">Reject as a Co-Supervisor</MenuItem>
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


export default EditTopicStatus;