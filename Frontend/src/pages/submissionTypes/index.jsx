import CreateSubmissionType from "./CreateSubmissionType";
import ListSubmissionTypes from "./ListSubmissionTypes";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


const SubmissionTypes = () => {
    return (
        <>
            <Box>
                <Grid container
                    spacing={5}
                    direction="row"
                >
                    <Grid item xs={12} md={8} >
                        <Box px={2} sx={{ boxShadow: 1 }} >
                            <ListSubmissionTypes />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box px={2} sx={{ boxShadow: 1 }} >

                            <CreateSubmissionType />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default SubmissionTypes;

