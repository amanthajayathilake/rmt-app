import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { createSubmissionType, fetchSubmissionTypes } from '../../api/submissionTypesApi';
import Switch from '@mui/material/Switch';

const CreateSubmissionType = () => {
    const [submissionType, setSubmissionType] = useState({});
    const [checked, setChecked] = useState(true)

    const handleCreate = () => {
        createSubmissionType(submissionType)
            .then(res => {
                fetchSubmissionTypes();
            });
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
                console.log(checked)
                break;
            }
            default: {}
        }
    }

    return (
        <>
        <h1>Create new Submission</h1>
            <TextField
                autoFocus
                margin="dense"
                name="name"
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
                fullWidth
                variant="standard"
                onChange={handleChange}
            />
            <TextField
                autoFocus
                margin="dense"
                name="description"
                label="Description"
                fullWidth
                variant="standard"
                onChange={handleChange}
            />
            <br />
            <br />
            <span>Publish</span>
            <Switch onChange={handleChange} value={checked} size="small" name="published" />
            <Button onClick={handleCreate}> Create</Button>
            
        </>
    );
}

export default CreateSubmissionType;