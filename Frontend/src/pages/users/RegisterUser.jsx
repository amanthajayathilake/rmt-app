import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { Grid } from "@mui/material";
import { registerUser } from '../../api/usersApi';
import { handleToast } from "../../helper/helper";

const RegisterUser = () => {
    const [user, setUser] = useState({role: 'Student'});
    const [errors, setErrors] = useState({
        id: '',
        name: '',
        email: '',
        password: '',
        phone: '',
        init: true
    });

    const validateUser = () => {
        let id = '';
        let name = '';
        let email = '';
        let password = '';
        let phone = '';

        !user.id && (id = 'ID cannot be empty.');
        !user.name && (name = 'Name cannot be empty.');
        !user.email && (email = 'Email cannot be empty.');
        !user.password && (password = 'Password cannot be empty.');
        user.phone && user.phone.length > 0 && user.phone.length != 10 && (phone = 'Phone number must contain 10 digits.');

        setErrors({...errors, id, name, email, password, phone, init: false});

    }

    const handleRegister = (e) => {
        e.preventDefault();
        validateUser();
        if(errors.id === '' && errors.name === '' && errors.email === '' && errors.password === '' && errors.phone === '' && !errors.init) {
            registerUser(user)
            .then(res => {
                if(res && res.data && res.data.isSuccessful) {
                    handleToast('Signup successful!', 'success');
                    const accessToken = res.data.responseData.accessToken;
                    localStorage.setItem('authentication', accessToken);
                    window.location.href = '/';
                }
            })
            .catch(() => handleToast());
        } else {
            handleToast('Please input correct values in the form!', 'error');
        }

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'id': {
                setUser({ ...user, id: value });
                setErrors({ ...errors, id: '' })
                break;
            }
            case 'name': {
                setUser({ ...user, name: value });
                setErrors({ ...errors, name: '' })
                break;
            }
            case 'email': {
                setUser({ ...user, email: value });
                setErrors({ ...errors, email: '' })
                break;
            }
            case 'phone': {
                setErrors({ ...errors, phone: '' });
                value.length > 0 && !(/^\d+$/.test(value)) && setErrors({...errors, phone: 'Phone number cannot contain letters.'});
                value.length > 10 && setErrors({...errors, phone: 'Phone number should contain only 10 digits.'});
                setUser({ ...user, phone: value });
                break;
            }
            case 'password': {
                setErrors({ ...errors, password: '' })
                setUser({ ...user, password: value });
                break;
            }
            case 'interestArea': {
                setUser({ ...user, interestArea: value });
                break;
            }
            case 'role': {
                setUser({ ...user, role: value });
                break;
            }
            default: { }
        }
    }

    return (
        <>
            <Grid container my={2}
                direction="row"
            >
                <Grid item xs={0} md={3}></Grid>
                <Grid item sx={{ boxShadow: 1 }} px={3} py={3} xs={12} md={6}>
                    <center><h1>Sign Up</h1></center>
                    <TextField
                        error={errors.id !== ''}
                        helperText={errors.id}
                        autoFocus
                        margin="dense"
                        name="id"
                        label="Enter your ID"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField
                        error={errors.name !== ''}
                        helperText={errors.name}
                        autoFocus
                        name="name"
                        label="Enter your name"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField
                        error={errors.email !== ''}
                        helperText={errors.email}
                        autoFocus
                        margin="dense"
                        name="email"
                        label="Enter your email"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField
                        error={errors.phone !== ''}
                        helperText={errors.phone}
                        autoFocus
                        margin="dense"
                        name="phone"
                        label="Enter you phone number"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField
                        error={errors.password !== ''}
                        helperText={errors.password}
                        autoFocus
                        margin="dense"
                        name="password"
                        label="Enter a password"
                        fullWidth
                        type="password"
                        variant="standard"
                        onChange={handleChange}
                    />
                    <br />
                    <br />

                    <Grid container my={2}
                        direction="row"
                    >
                        <Grid item xs={6}>

                            <FormControl>
                                <FormLabel id="demo-radio-buttons-group-label">Choose your Role</FormLabel>
                                <FormLabel>(For demo purpose only)</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="Student"
                                    name="role"
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="Student" control={<Radio />} label="Student" />
                                    <FormControlLabel value="PanelMember" control={<Radio />} label="PanelMember" />
                                    <FormControlLabel value="Supervisor" control={<Radio />} label="Supervisor" />
                                    <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            {user.role === 'Supervisor' &&

                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Interested Area</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name='interestArea'
                                        value={user.interestArea}
                                        label="Age"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={'Machine Learning'}>Machine Learning</MenuItem>
                                        <MenuItem value={'Software Engineering'}>Software Engineering</MenuItem>
                                        <MenuItem value={'Cyber Security'}>Cyber Security</MenuItem>
                                    </Select>
                                </FormControl>
                            }
                        </Grid>
                    </Grid>
                            <Button style={{float: 'right'}} onClick={handleRegister}>Register</Button>
                </Grid>
                <Grid item xs={0} md={3} ></Grid>
            </Grid> 
        </>
    );
}

export default RegisterUser;