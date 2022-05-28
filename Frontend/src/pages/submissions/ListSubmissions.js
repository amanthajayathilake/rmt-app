import { useEffect, useState } from "react"
import { handleToast } from "../../helper/helper";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Box from '@mui/material/Box';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getSubmission, getSubmissionList } from "../../api/submissionsApi";
import fileDownload from 'js-file-download'

const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return (
        parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
    );
}

const handleDownloadSubmission = (key) => {
    handleToast('Downloading...','info');
    getSubmission(key)
        .then((res) => {
            fileDownload(res.data, `${key.split('/')[0]}.pdf`)
            handleToast('Downloaded','success');
        })
}
const ListSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [folder, setFolder] = useState('Assignments');

  useEffect(() => {
    handleFindSubmissions();
  }, [folder]);

  const handleFindSubmissions = () => {
    getSubmissionList(folder)
      .then(res => {
        res.data.isSuccessful ?
          setSubmissions(res.data.responseData.Contents) :
          handleToast();
      })
      .catch(() => handleToast());
  }

  const handleSubmissionSelect = (event) => {
    setFolder(event.target.value)
  }

  return (
    <>
    <br/>
    <Box px={2} >
    <Paper elevation={3} style={{padding:20, backgroundColor:'rgba(255,255,255, 0.70)'}}>
                <Typography variant='h6'>
                  <center><b>Students Submissions - {folder}</b></center>
                </Typography><br/>
      <FormControl >
        <InputLabel id="role-label">Submission Type</InputLabel>
        <Select
          labelId="role-label"
          value={folder}
          label="Submission Type"
          onChange={handleSubmissionSelect}
        >
          <MenuItem value={'Assignments'}>Assignments</MenuItem>
          <MenuItem value={'Presentations'}>Presentations</MenuItem>
          <MenuItem value={'Topics'}>Topics</MenuItem>
        </Select>
      </FormControl>
      <br />
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Uploader</TableCell>
              <TableCell align="right">Submission Type</TableCell>
              <TableCell align="right">Size</TableCell>
              <TableCell align="right">Last Modified</TableCell>
              <TableCell align="right">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions && submissions.map((sub, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{sub.Key.split('/')[2]}</TableCell>
                <TableCell align="right">{sub.Key.split('/')[0]}</TableCell>
                <TableCell align="right">{formatBytes(sub.Size)}</TableCell>
                <TableCell align="right">{ new Date(Date.parse(sub.LastModified)).toUTCString()}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleDownloadSubmission(sub.Key)}>Download</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      </Paper>
      </Box>
    </>
  )

}

export default ListSubmissions;