import * as React from 'react';
import {useState} from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import toast, { Toaster } from 'react-hot-toast';
import { updateResearchTopicDetails } from '../../api/studentGroupApi';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddTopic = (props) =>{
    const [group, setGroup] = useState(props.group);

    const handleSubmit = () => {
        updateResearchTopicDetails(group.id, group)
            .then((res) => {
                props.groupDetails();
                toast.success('Successfully Saved!', {
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
                props.setResearchTopicAddOpen(false);
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
            case 'topic': {
                setGroup({...group, topic: value});
                break;
            }
            case 'area': {
                setGroup({...group, area: value});
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
            onClose={() => props.setResearchTopicAddOpen(false)}
            TransitionComponent={Transition}
            keepMounted
        >
            <DialogTitle>Enter Topic Details</DialogTitle>
            <DialogContent>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="topic"
                            label="Topic"
                            type="text"
                            value={group.topic || ''}
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                            InputLabelProps={{ required: true }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="area"
                            label="Area"
                            type="text"
                            value={group.area || ''}
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                            InputLabelProps={{ required: true }}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => props.setResearchTopicAddOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}


export default AddTopic;