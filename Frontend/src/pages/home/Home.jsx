import { Box } from "@mui/material";
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
            <Box sx={{ boxShadow: 1 }} px={1} py={1}>
                <h1>Submissions</h1>
                    <Submissions />
            </Box>
            <Box sx={{ boxShadow: 1 }} mt={1} px={1} py={1}>
                    <ListTemplates />
            </Box>
            <Box sx={{ boxShadow: 1 }} mt={1} px={1} py={1}>
                <h1>Marking Schemes</h1>
                    <ListMarkingSchemes />
            </Box>
        </>
    )
}

export default Home;