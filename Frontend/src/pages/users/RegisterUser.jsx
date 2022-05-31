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
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Grid } from "@mui/material";
import { registerUser } from '../../api/usersApi';
import { handleToast } from "../../helper/helper";

const RegisterUser = () => {
    const [user, setUser] = useState({
        role: 'Student',
        id: '',
        name: '',
        email: '',
        password: '',
        phone: ''
    });

    const [errors, setErrors] = useState({
        id: false,
        name: false,
        email: false,
        password: false,
        phone: false
    });

    const validateUser = () => {
        const inValidations = {
            id: false,
            name: false,
            email: false,
            password: false,
            phone: false
        }
        
        if (!user.id) inValidations.id = true;
        if (!user.name) inValidations.name = true;
        if (!user.email) inValidations.email = true;
        if (!user.password) inValidations.password = true;
        if (user.phone && user.phone.length > 0 && user.phone.length != 10) inValidations.phone = true;

        setErrors(inValidations);
        if (inValidations.id || inValidations.name || inValidations.email || inValidations.password || inValidations.phone) return false;
        return true;
    }

    const handleRegister = (e) => {
        e.preventDefault();
        const isValid = validateUser();
        if(isValid) {
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
            handleToast('Invalid inputs!', 'error');
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'id': {
                setUser({ ...user, id: value });
                setErrors({ ...errors, id: false })
                break;
            }
            case 'name': {
                setUser({ ...user, name: value });
                setErrors({ ...errors, name: false })
                break;
            }
            case 'email': {
                setUser({ ...user, email: value });
                setErrors({ ...errors, email: false })
                break;
            }
            case 'phone': {
                setErrors({ ...errors, phone: false });
                value.length > 0 && !(/^\d+$/.test(value)) && setErrors({...errors, phone: true});
                value.length > 10 && setErrors({...errors, phone: true});
                setUser({ ...user, phone: value });
                break;
            }
            case 'password': {
                setUser({ ...user, password: value });
                setErrors({ ...errors, password: false })
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
                <Grid item  sx={{
    boxShadow: 1,
    backgroundColor:'rgba(255,255,255, 1)'}}  px={3} py={3} xs={12} md={6}>
                                        <center>
                        <Typography variant='h4'><b>SIGN UP</b></Typography>
                    </center>
                    <TextField
                        error={errors.id}
                        helperText={errors.id && 'Invalid id!'}
                        autoFocus
                        margin="dense"
                        name="id"
                        label="Enter your ID"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField
                        error={errors.name}
                        helperText={errors.name && 'Invalid name!'}
                        autoFocus
                        name="name"
                        label="Enter your name"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField
                        error={errors.email}
                        helperText={errors.email && 'Invalid email!'}
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
                        error={errors.phone}
                        helperText={errors.phone && 'Invalid phone number!'}
                        autoFocus
                        margin="dense"
                        name="phone"
                        label="Enter you phone number"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField
                        error={errors.password}
                        helperText={errors.password && 'Inavlid password!'}
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