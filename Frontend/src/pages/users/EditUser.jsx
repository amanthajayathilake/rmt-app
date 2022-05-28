import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { updateUser } from '../../api/usersApi';
import { handleToast } from '../../helper/helper';

const EditUser = (props) =>{
    const [user, setUser] = useState(props.user);
    

    const handleEditUser = () => {
        props.setEditOpen(false)
        updateUser(user.id, user)
            .then((res) => {
                if (res.data.isSuccessful) {
                    handleToast('User updated', 'info')
                    props.handleFindUsers() 
                }
            })
            .catch(() => handleToast());
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        switch(name) {
            case 'name': {
                setUser({...user, name: value});
                break;
            }
            case 'email': {
                setUser({...user, email: value});
                break;
            }
            case 'phone': {
                setUser({...user, phone: value});
                break;
            }
            default: {}
        }
    }

    return (
        <div>
        <Dialog open={true} onClose={() => props.setEditOpen(false)}>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Name"
                value={user.name || ''}
                fullWidth
                variant="standard"
                onChange={handleChange}
            />
            <TextField
                autoFocus
                margin="dense"
                name="email"
                label="Email"
                type="email"
                value={user.email || ''}
                fullWidth
                variant="standard"
                onChange={handleChange}
            />
            <TextField
                autoFocus
                margin="dense"
                name="phone"
                label="Phone"
                value={user.phone || ''}
                fullWidth
                variant="standard"
                onChange={handleChange}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={() => props.setEditOpen(false)}>Cancel</Button>
            <Button onClick={handleEditUser}>Edit</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}


export default EditUser;