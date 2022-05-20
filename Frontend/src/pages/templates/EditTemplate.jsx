import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Switch from '@mui/material/Switch';
import { handleToast } from '../../helper/helper';
import { editTemplates } from '../../api/templateApi';

const EditTemplate = (props) =>{
    const [template, setTemplate] = useState(props.template);
    const [checked, setChecked] = useState(!props.template.published)

    const handleEditTemplate = () => {
        editTemplates(template._id, template)
            .then((res) => {
                res.data.isSuccessful ? 
                    props.handleFetchTemplates() :
                    props.handleToast()
                props.setEditOpen(false)
            })
            .catch(() => handleToast());
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
                break;
            }
            default: {}
        }
    }

    return (
        <div>
        <Dialog open={true} onClose={() => props.setEditOpen(false)}>
            <DialogTitle>Edit Template</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    value={template.name}
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
                    value={template.folder}
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="description"
                    label="Description"
                    value={template.description}
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                />
                <br />
                <br />
                <span>Publish</span>
                {template.published ? 
                <Switch value={checked} onChange={handleChange} size="small" name="published" defaultChecked/> :
                <Switch value={checked} onChange={handleChange} size="small" name="published" /> }
            </DialogContent>
            <DialogActions>
            <Button onClick={() => props.setEditOpen(false)}>Cancel</Button>
            <Button onClick={handleEditTemplate}>Edit</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}


export default EditTemplate;