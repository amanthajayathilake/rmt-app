import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import { createMarkingScheme } from '../../api/markingSchemeApi';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { handleToast } from '../../helper/helper';
import ListMarkingSchemes from "./ListMarkingSchemes";

const CreateMarkingScheme = () => {
    const [markigScheme, setMarkingScheme] = useState({});
    const [checked, setChecked] = useState(true);
    const [mAllocations, setMallocations] = useState([{ allocation: '', mark: '' }]);

    const handleSubmit = () => {
        handleToast('Creating marking-cheme!')
        markigScheme.markingAllocations = mAllocations;
        createMarkingScheme(markigScheme)
            .then(res => {
                res.data && !res.data.isSuccessful && handleToast();
                window.location.reload(true);
            })
            .catch(() => handleToast())
    }

    const handleRemoveFields = (index) => {
        const mAll = [...mAllocations]
        mAll.pop();
        setMallocations(mAll)
    }

    const handleChange = (event, index) => {
        const { name, value } = event.target;
        switch (name) {
            case 'name': {
                setMarkingScheme({ ...markigScheme, name: value });
                break;
            }
            case 'description': {
                setMarkingScheme({ ...markigScheme, description: value });
                break;
            }
            case 'published': {
                setChecked(!checked);
                setMarkingScheme({ ...markigScheme, published: value });
                console.log(checked)
                break;
            }
            case 'allocation': {
                const newState = [...mAllocations];
                newState[index] = { ...newState[index], allocation: value }
                setMallocations(newState);
                break;
            }
            case 'mark': {
                const newState = [...mAllocations];
                newState[index] = { ...newState[index], mark: value }
                setMallocations(newState);
                break;
            }
            default: { }
        }
    }

    return (
        <>  <br />
            <Grid container>
                <Grid item xs={7} px={2}>
                    <Paper elevation={3} style={{ padding: 20, backgroundColor: 'rgba(255,255,255, 0.70)' }}>
                        <Typography variant='h6'>
                            <center><b>MARKING SCHEMES</b></center>
                        </Typography><br />
                        <ListMarkingSchemes />
                    </Paper>
                </Grid>
                <Grid item xs={5} px={2}>
                    <Paper elevation={3} style={{ padding: 20, backgroundColor: 'rgba(255,255,255, 1)' }}>
                        <Typography variant='h6'>
                            <center><b>CREATE MARKING SCHEME</b></center>
                        </Typography><br />

                        <TextField
                            autoFocus
                            margin="dense"
                            name="name"
                            label="Marking scheme title"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="description"
                            label="Description"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                        />
                        <br />
                        <br />
                        Marking Allocations
                        {mAllocations.map((mAllocation, index) => (
                            <Grid key={index} container>
                                <Grid item xs={5}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        name="allocation"
                                        label="Allocation"
                                        // value={index}
                                        fullWidth
                                        variant="standard"
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </Grid>
                                <Grid item xs={5} px={1}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        name="mark"
                                        label="Mark"
                                        fullWidth
                                        variant="standard"
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    <Button onClick={() => setMallocations([...mAllocations, { allocation: '', mark: '' }])} disabled={mAllocations.length - 1 !== index}>+</Button>
                                </Grid>
                                <Grid item xs={1}>
                                    <Button onClick={() => handleRemoveFields(index)} disabled={mAllocations.length - 1 !== index || index === 0} >x</Button>
                                </Grid>
                            </Grid>
                        ))}
                        <br />
                        <br />
                        <span>Publish</span>
                        <Switch onChange={handleChange} value={checked} size="small" name="published" />
                        <Button onClick={handleSubmit}>Create</Button>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}

export default CreateMarkingScheme;