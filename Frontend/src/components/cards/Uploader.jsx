
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useState } from "react";
import { createSubmission } from '../../api/submissionsApi';

export default function Uploader(props) {
    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);
    const [file, setFile] = useState(null);
    const {type, folder} = props;
    const fileSelected = event => {
        const file = event.target.files[0]
        file.originalname = 'haloo'
            setFile(file)
        }

    const handleUpload = () => {
        const formData = new FormData();
        formData.append("file", file);
        createSubmission(`folder=${folder}&type=${type}`, formData)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    }

  return (
    <Box  my={1} mx={1}>
      <Card variant="outlined">
        <React.Fragment>
            <CardContent>
                <Typography variant="h5" component="div"> 
                    {title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {description}
                </Typography>
                <input type='file' onChange={fileSelected} />
            </CardContent>
            <CardActions>
                <Button onClick={handleUpload} disabled={file ? false : true} >Upload</Button>
            </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
}
