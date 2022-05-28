import { useState } from "react";
import { login } from "../api/authApi";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { handleToast } from "../helper/helper";
import Grid from '@mui/material/Grid';
import { Typography } from "@mui/material";


const Login = () => {
    const [credentials, setCredentials] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        login(credentials)
            .then(res => {
                console.log(res)
                if (res.data.isSuccessful) {
                    localStorage.setItem('authentication', res.data.responseData.accessToken);
                    window.location.href = '/';
                } else {
                    handleToast('Login failed!', 'info');
                }
            })
            .catch(() => handleToast('Login failed! Please try again', 'info'));
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'email': {
                setCredentials({ ...credentials, email: value });
                break;
            }
            case 'password': {
                setCredentials({ ...credentials, password: value });
                break;
            }
            default: { }
        }
    }

    return (
        <>
        <br/><br/><br/><br/><br/><br/>
            <Grid container my={2}
                direction="row"
            >
                <Grid item xs={0} md={4}></Grid>
                <Grid item sx={{ boxShadow: 1 }} style={{background:'rgba(255, 255, 255, 1)', padding:20}} px={3} py={3} xs={12} md={4}>
                    <center>
                        <Typography variant='h4'><b>LOGIN</b></Typography>
                    </center>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="email"
                        label="Email address"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField
                        autoFocus
                        name="password"
                        margin="dense"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <center>
                        <Button onClick={handleSubmit}>Sign in</Button>
                    </center>
                </Grid>
                <Grid item xs={0} md={4}></Grid>
            </Grid>
        </>
    );
}

export default Login;