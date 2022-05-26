import React from 'react'
import { Grid, Paper, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useForm} from 'react-hook-form'

export const AssignMarksForm = ({markObj, onSubmit})=>{
    const {register, handleSubmit, formState:{errors}} = useForm({
        defaultValues: {
            evaluationType:markObj ? markObj.evaluationType : "",
            marks:markObj ? markObj.marks : "",
        }
    })
    const submitHandler = handleSubmit((data) =>{
        onSubmit(data)
        console.log(data)
    })
  return (
    <div>
        <form onSubmit={submitHandler}>
        <Paper elevation={3} style={{padding:20}}>
        <center>
            <Typography><b>ASSIGN MARKS</b></Typography><br/>
        </center>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12}>
                    <TextField error={errors.evaluationType} label="Evaluation Type" name="evaluationType" type="text" size="small" fullWidth="true" 
                    {...register("evaluationType", {required: true})} helperText={errors.evaluationType && "This is a required field!"}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField error={errors.marks} label="Marks" name="marks" type="text" size="small" fullWidth="true"
                    {...register("marks", {required: true} )} helperText={errors.marks && "This is a required field!"}/>
                </Grid>
            </Grid>
               <br />
            <Grid item xs={6}>
                <Button variant="contained" type="submit">ASSIGN</Button>
            </Grid>
        </Paper>
        </form>
    </div>
  )
}