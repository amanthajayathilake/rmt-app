import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Switch from '@mui/material/Switch';
import { createTemplate } from '../../api/templateApi';
import Uploader from '../../components/cards/Uploader';
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
                console.log(res);
            });
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        switch(name) {
            case 'name': {
                setTemplate({...template, name: value});
                break;
            }
            case 'folder': {
                setTemplate({...template, folder: value});
                break;
            }
            case 'description': {
                setTemplate({...template, description: value});
                break;
            }
            case 'published': {
                setChecked(!checked);
                setTemplate({...template, published: value});
                console.log(checked)
                break;
            }
            default: {}
        }
    }

    return (
        <>
        <h1>Create new Template</h1>
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
            
        </>
    );
}

export default CreateTemplates;