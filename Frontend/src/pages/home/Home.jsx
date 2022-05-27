import { Box, Container, Paper, Typography } from "@mui/material";
import Submissions from "../submissions/Submissions"
import ListTemplates from "../templates/ListTemplates";
import ListMarkingSchemes from "../markingScheme/ListMarkingSchemes";
import { useEffect, useState } from "react";
import { getAuth } from "../../helper/helper";

const Home = () => {
    const [role, setRole] = useState('');
    useEffect(() => {
        const auth = getAuth();
        auth && setRole(auth.role);
    }, []);

    return (
        <>
        <Container maxWidth={"98%"}>
            <br/>
            <Paper elevation={3} style={{padding:20, background:'rgba(255, 255, 255, 0.50)'}}>
                <center>
                <Typography variant='h5'><b>SUBMISSIONS</b></Typography>
                </center>
                    <Submissions />
                
            </Paper>
            <br/>
            <Paper elevation={3} style={{padding:20, background:'rgba(255, 255, 255, 0.50)'}}>
                    <ListTemplates />
            </Paper>
            <br/>
            <Paper elevation={3} style={{padding:20, background:'rgba(255, 255, 255, 0.50)'}}>
                <center>
                    <Typography variant='h5'><b>MARKING SCHEMES</b></Typography>
                </center>
                    <ListMarkingSchemes />
            </Paper>
            </Container>
        </>
    )
}

export default Home;