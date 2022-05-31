import React, { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import toast, { Toaster } from 'react-hot-toast';
import { deletePanel, fetchAllPanels } from '../api/panelApi';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import CreatePanel from '../components/manage-panels/createPanel';
import EditPanel from '../components/manage-panels/editPanel';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';
import AlertDialog from "../components/alerts/AlertDialog";

const PanelManagement = () => {
  const [panels, setPanels] = useState([]);
  const [panel, setPanel] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchPanel, setSearchPanel] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    handleGetPanels();
  }, []);

  const handleGetPanels = () => {
    fetchAllPanels().then(res => {
      res.data.isSuccessful ? setPanels(res.data.responseData) : toast.error('Error Retrieving');
      // console.log(res.data)
    }).catch(() => {
      toast.error('Error!', {
        position: "top-right",
        style: {
          padding: '16px',
          color: 'white',
          background: '#FF0000'
        },
        iconTheme: {
          primary: 'red',
          secondary: '#FFFAEE',
        },
      });
    });
  }

  const handleDeletePanel = (id) => {
    setDeleteOpen(false);
    deletePanel(id)
      .then((res) => {
        handleGetPanels();
        toast.success('Deleted Successfully!', {
          position: "top-right",
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: 'white',
            background: '#4BB543'
          },
          iconTheme: {
            primary: 'green',
            secondary: '#FFFAEE',
          },
        });
      })
      .catch(() => {
        toast.error('Error!', {
          position: "top-right",
          style: {
            padding: '16px',
            color: 'white',
            background: '#FF0000'
          },
          iconTheme: {
            primary: 'red',
            secondary: '#FFFAEE',
          },
        });
      })
  }

  const setEditingPanel = (payload) => {
    setPanel(payload);
    setEditOpen(true);
  }

  const setAddPanel = (payload) => {
    setAddOpen(true);
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const setDeletingPanel = (payload) => {
    setPanel(payload);
    setDeleteOpen(true);
  }

  return (
    <>
      <br />
      <Box px={2}>
      <Paper elevation={3} style={{ padding: 20, backgroundColor: 'rgba(255,255,255, 0.70)' }}>
        <Typography variant='h6'>
          <center><b>PANELS</b></center>
        </Typography><br />
        <center>
          <TableContainer component={Paper} >
            <Button startIcon={<AddIcon />} variant="outlined" onClick={() => setAddPanel(panel)} style={{ float: "right", marginTop: "5px" }}>Create</Button>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {/* <TableCell>ID</TableCell> */}
                  <TableCell align="left"><b>Panel ID</b></TableCell>
                  <TableCell align="center"><b>Panel Members</b></TableCell>
                  <TableCell align="center"><b>Allocated Groups</b></TableCell>
                  <TableCell>
                    <IconButton fontSize="small" aria-label="cancel" style={{ float: "right" }}>
                      <CancelIcon onClick={() => setSearchPanel(() => "")} />
                    </IconButton>
                    <TextField
                      id="outlined-adornment-weight"
                      label="Search Panels"
                      variant="standard"
                      onChange={(e) => { setSearchPanel(e.target.value) }}
                      value={searchPanel}
                      style={{ float: "right" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {panels.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter((panel) => {
                  if (searchPanel === "") {
                    return panel;
                  } else if (panel.id.toLowerCase().includes(searchPanel.toLowerCase())) {
                    return panel;
                  }
                }).map((panel, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="left">{panel.id}</TableCell>
                    <TableCell align="center">
                      {PanelMemberDetails(panel)}
                    </TableCell>
                    <TableCell align="center">{AllocatedGroupDetails(panel)}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1}>
                        {/* <IconButton aria-label="fingerprint" style={{color:"black"}} onClick={() => setEditingPanel(panel)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" style={{color:"#FF0000"}} onClick={() => handleDeletePanel(panel.id)}>
                        <DeleteIcon />
                    </IconButton> */}
                        <Button onClick={() => setEditingPanel(panel)}>Edit</Button>
                        <Button onClick={() => setDeletingPanel(panel)}>Delete</Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15]}
                  count={panels.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </Table>
          </TableContainer>
        </center>
        {addOpen && (
          <CreatePanel
            setAddOpen={setAddOpen}
          />
        )
        }
        {editOpen && panel &&
          <EditPanel
            panel={panel}
            panelId={panel.id}
            panelMembers={panel.panelMembers}
            panelGroups={panel.allocatedGroups}
            setEditOpen={setEditOpen}
            handleGetPanels={handleGetPanels}
          />
        }
        {deleteOpen &&
          <AlertDialog 
            title={'Confirm Delete'}
            body={'Please confirm to delete the panel.'}
            onClose={() => setDeleteOpen(false)}
            onConfirm={() => handleDeletePanel(panel.id)}
          />
        }
      </Paper>
      </Box>
    </>
  )
}

const PanelMemberDetails = (panel) => {
  let panelDetail = (panel.panelMembers ? panel.panelMembers + "\n" : "");
  return panelDetail && panelDetail.length > 1 ? panelDetail.substring(0, panelDetail.length - 1) : panelDetail;
}

const AllocatedGroupDetails = (panel) => {
  let groupDetail = (panel.allocatedGroups ? panel.allocatedGroups + "\n" : "");
  return groupDetail && groupDetail.length > 1 ? groupDetail.substring(0, groupDetail.length - 1) : groupDetail;
}

export default PanelManagement;