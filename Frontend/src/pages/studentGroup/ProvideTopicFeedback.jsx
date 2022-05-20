import React from 'react'
import { Grid, Paper, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useForm} from 'react-hook-form'

export const TopicFeedbackForm = ({topicObj, onSubmit})=>{
    const {register, handleSubmit} = useForm({
        defaultValues: {
            panelEvaluateFeedbacks:topicObj ? topicObj.panelEvaluateFeedbacks : ""
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
            <Typography><b>ADD EVALUATED TOPIC FEEDBACK</b></Typography><br/>
        </center>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12}>
                    <TextField label="Feedback" name="panelEvaluateFeedbacks" type="text" size="small" fullWidth="true" 
                    {...register("panelEvaluateFeedbacks")} />
                </Grid>
            </Grid>
               <br />
            <Grid item xs={6}>
                <Button variant="contained" type="submit">Save Feedback</Button>
            </Grid>
        </Paper>
        </form>
    </div>
  )
}