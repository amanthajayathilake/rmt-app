import { useEffect, useState } from "react"
import { deleteSubmissionType, fetchSubmissionTypes } from "../../api/submissionTypesApi";
import { handleToast } from "../../helper/helper";
import EditSubmissionType from "./EditSubmissionType";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from "@mui/material";

const ListSubmissionTypes = () => {
    const [submissionTypes, setSubmissionTypes] = useState([]);
    const [submissionType, setSubmissionType] = useState({});
    const [editOpen, setEditOpen] = useState(false);

    useEffect(() => {
        handleFetchSubmissionTypes();
    }, []);

    const handleFetchSubmissionTypes = () => {
        fetchSubmissionTypes('')
            .then(res => {
                console.log(res)
                res.data.isSuccessful ?
                    setSubmissionTypes(res.data.responseData) :
                    handleToast();
            })
            .catch(() => handleToast());
    }

    const handleDeleteSubmissionType = (id) => {
        deleteSubmissionType(`id=${id}`)
            .then((res) => {
                res.data.isSuccessful ?
                    handleFetchSubmissionTypes() :
                    handleToast()
            })
            .catch(() => handleToast())
    }

    const setEditingSubmissionType = (payload) => {
        setSubmissionType(payload);
        setEditOpen(true);
    }

    return (
        <>
        <h1>Submission Types</h1>
            <TableContainer >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Submission Type</TableCell>
                            <TableCell align="right">Folder</TableCell>
                            <TableCell align="right">Visibilty</TableCell>
                            <TableCell align="right">Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {submissionTypes && submissionTypes.map((sub, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {sub.name}
                                </TableCell>
                                <TableCell align="right">{sub.folder}</TableCell>
                                <TableCell align="right">{sub.published ? 'Published' : 'Hidden'}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => setEditingSubmissionType(sub)}>Edit</Button>
                                    <Button onClick={() => handleDeleteSubmissionType(sub._id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
            {editOpen && submissionType &&
                <EditSubmissionType
                    submissionType={submissionType}
                    setEditOpen={setEditOpen}
                    handleFetchSubmissionTypes={handleFetchSubmissionTypes}
                />
            }

        </>
    )

}

export default ListSubmissionTypes;