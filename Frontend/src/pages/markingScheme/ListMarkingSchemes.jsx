import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { fetchMarkingSchemes } from '../../api/markingSchemeApi';
import { handleToast } from '../../helper/helper';

export default function ListMarkingSchemes() {
    const [markingSchemes, setMarkingSchemes] = useState([]);
    useEffect(() => {
        getMarkingSchemes();
    },[]);

    const getMarkingSchemes = () => {
        fetchMarkingSchemes().
            then(res => {
                if (res && res.data && res.data.isSuccessful) {
                    setMarkingSchemes(res.data.responseData);
                } else {
                    handleToast();
                }
            })
            .catch(() => handleToast())
    }

    return (
        <div>
            {markingSchemes && markingSchemes.map((ms, index)=> (
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{index+1}. <b>{ms.name}</b></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TextField
                            autoFocus
                            margin="dense"
                            fullWidth
                            value={ms.description}
                            variant="standard"
                        />
                        <br /><br />

                        Marking Allocations
                        {ms.markingAllocations.map((mAllocation, index) => (
                            <Grid key={index} container my={3}>
                                <Grid item xs={6}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        value={mAllocation.allocation}
                                        fullWidth
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={6} px={1}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        value={mAllocation.mark}
                                        fullWidth
                                        variant="standard"
                                    />
                                </Grid>
                            </Grid>
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}

        </div>
    );
}
