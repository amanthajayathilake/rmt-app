import { useEffect, useState } from "react"
import { getAuth, handleToast } from "../../helper/helper";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from "@mui/material";
import { deleteTemplate, fetchTemplates } from "../../api/templateApi";
import EditTemplate from "./EditTemplate";
import { getSubmission } from "../../api/submissionsApi";
import fileDownload from 'js-file-download'
import { roles } from "../../Util/utils";
import AlertDialog from "../../components/alerts/AlertDialog";

const ListTemplates = () => {
    const [templates, setTemplates] = useState([]);
    const [template, setTemplate] = useState({});
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [role, setRole] = useState('');
    const { ADMIN } = roles;
    useEffect(() => {
        handleFetchTemplates();
        const auth = getAuth();
        setRole(auth.role);
    }, []);

    const OnClickdeleteClose = () => {
        setDeleteOpen(false);
    }

    const handleFetchTemplates = () => {
        setDeleteOpen(false)
        fetchTemplates()
            .then(res => {
                res.data.isSuccessful ?
                    setTemplates(res.data.responseData) :
                    handleToast();
            })
            .catch(() => handleToast());
    }

    const handleDeleteTemplate = (id) => {
        deleteTemplate(id)
            .then((res) => {
                if(res.data.isSuccessful) {
                    handleFetchTemplates();
                    handleToast('Template deleted!');
                }
            })
            .catch(() => handleToast())
    }

    const setEditingTemplate = (payload) => {
        setTemplate(payload);
        setEditOpen(true);
    }

    const handleDownloadTemplate = (temp) => {
        handleToast('Template downloading...', 'info');
        getSubmission(temp.key)
            .then((res) => {
                fileDownload(res.data, `${temp.name}.pdf`)
                handleToast('Downloaded', 'success');
            })
            .catch(() => handleToast());
    }

    return (
        <>
            <h1>Templates</h1>
            <TableContainer >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Template</TableCell>
                            <TableCell align="right">Description</TableCell>
                            {role && role === ADMIN &&
                                <>
                                    <TableCell align="right">Upload Folder</TableCell>
                                    <TableCell align="right">Visibilty</TableCell>
                                </>
                            }
                            <TableCell align="right">Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {templates && templates.map((temp, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {temp.name}
                                </TableCell>
                                <TableCell align="right">{temp.description}</TableCell>
                                {role && role === ADMIN ?
                                    <>
                                        <TableCell align="right">{temp.folder}</TableCell>
                                        <TableCell align="right">{temp.published ? 'Published' : 'Hidden'}</TableCell>
                                        <TableCell align="right">
                                            <Button onClick={() => setEditingTemplate(temp)}>Edit</Button>
                                            <Button onClick={() => setDeleteOpen(true)}>Delete</Button>
                                            <Button onClick={() => handleDownloadTemplate(temp)}>Download</Button>
                                        </TableCell>
                                    </> :
                                    <TableCell align="right">
                                        <Button onClick={() => handleDownloadTemplate(temp)}>Download</Button>
                                    </TableCell>
                                }
                                {deleteOpen &&
                                    <AlertDialog
                                        onConfirm={() => handleDeleteTemplate(temp._id)}
                                        onClose={() => setDeleteOpen(false)}
                                        title={'Confirm Delete'}
                                        body={'Are you sure, you want to delete this template?'}
                                    />
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {editOpen && template &&
                <EditTemplate
                    template={template}
                    setEditOpen={setEditOpen}
                    handleFetchTemplates={handleFetchTemplates}
                />
            }

        </>
    )

}

export default ListTemplates;