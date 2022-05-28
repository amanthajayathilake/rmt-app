import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { handleToast } from "../../helper/helper";
import { createTemplate } from '../../api/templateApi';
import { createSubmission } from '../../api/submissionsApi';


const CreateTemplates = () => {
    const [template, setTemplate] = useState({});
    const [checked, setChecked] = useState(true);
    const [file, setFile] = useState(null);

    const fileSelected = event => {
        const file = event.target.files[0]
        setFile(file)
    }

    const handleUpload = async () => {
        handleToast('Uploading...', 'info');
        const formData = new FormData();
        formData.append("file", file);
        createSubmission(`folder=${template.folder}&type=default`, formData)
            .then(res => {
                template.key = res.data.responseData.Key;
                handleCreate();
            })
            .catch(err => console.log(err))
    }

    const handleCreate = () => {
        createTemplate(template)
            .then(res => {
                handleToast('Uploaded!', 'success');
                window.location.reload(true)
            });
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'name': {
                setTemplate({ ...template, name: value });
                break;
            }
            case 'folder': {
                setTemplate({ ...template, folder: value });
                break;
            }
            case 'description': {
                setTemplate({ ...template, description: value });
                break;
            }
            case 'published': {
                setChecked(!checked);
                setTemplate({ ...template, published: value });
                console.log(checked)
                break;
            }
            default: { }
        }
    }

    return (
        <>
            <Paper elevation={3} style={{ padding: 20, backgroundColor: 'rgba(255,255,255, 1)' }}>
                <Typography variant='h6'>
                    <center><b>CREATE TEMPLATE</b></center>
                </Typography>
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Template name"
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
                <input type='file' onChange={fileSelected} />
                <br />
                <br />
                <span>Publish</span>
                <Switch onChange={handleChange} value={checked} size="small" name="published" />
                <Button disabled={file ? false : true} onClick={handleUpload}>Upload</Button>
            </Paper>
        </>
    );
}

export default CreateTemplates;