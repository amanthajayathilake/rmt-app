import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Switch from '@mui/material/Switch';
import { handleToast } from '../../helper/helper';
import { updateSubmissionType } from '../../api/submissionTypesApi';

const EditSubmissionType = (props) =>{
    const [submissionType, setSubmissionType] = useState(props.submissionType);
    const [checked, setChecked] = useState(!props.submissionType.published)


    const handleEditSubmission = () => {
        updateSubmissionType(`id=${submissionType._id}`, submissionType)
            .then((res) => {
                res.data.isSuccessful ? 
                props.handleFetchSubmissionTypes() :
                handleToast()
                props.setEditOpen(false)
            })
            .catch(() => handleToast());
    }


    const handleChange = (event) => {
        const {name, value} = event.target;
        switch(name) {
            case 'name': {
                setSubmissionType({...submissionType, name: value});
                break;
            }
            case 'folder': {
                setSubmissionType({...submissionType, folder: value});
                break;
            }
            case 'description': {
                setSubmissionType({...submissionType, description: value});
                break;
            }
            case 'published': {
                setChecked(!checked);
                setSubmissionType({...submissionType, published: value});
                break;
            }
            default: {}
        }
    }

    return (
        <div>
        <Dialog open={true} onClose={() => props.setEditOpen(false)}>
            <DialogTitle>Edit Submission Type</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    value={submissionType.name}
                    label="Submission name"
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="folder"
                    label="Upload folder"
                    value={submissionType.folder}
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="description"
                    label="Description"
                    value={submissionType.description}
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                />
                <br />
                <br />
                <span>Publish</span>
                {submissionType.published ? 
                <Switch value={checked} onChange={handleChange} size="small" name="published" defaultChecked/> :
                <Switch value={checked} onChange={handleChange} size="small" name="published" /> }
            </DialogContent>
            <DialogActions>
            <Button onClick={() => props.setEditOpen(false)}>Cancel</Button>
            <Button onClick={handleEditSubmission}>Edit</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}


export default EditSubmissionType;