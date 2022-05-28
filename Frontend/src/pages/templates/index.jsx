import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ListTemplates from "./ListTemplates";
import CreateTemplates from "./CreateTemplates";


const Templates = () => {
    return (
        <>
            <Box>
                <br/>
                <Grid container
                    direction="row"
                >
                    <Grid item xs={12} md={8} >
                    <Box px={2} >
                    <ListTemplates />
                    </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box px={2} >
                            <CreateTemplates />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Templates;

