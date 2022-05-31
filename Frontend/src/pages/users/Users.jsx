import { useEffect, useState } from "react"
import { deleteUser, findUsers } from "../../api/usersApi";
import { handleToast } from "../../helper/helper";
import { roles } from "../../Util/utils";
import EditUser from "./EditUser";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Container from '@mui/material/Container';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AlertDialog from "../../components/alerts/AlertDialog";
import Typography from '@mui/material/Typography';

const Users = () => {
  const { SUPERVISOR, STUDENT, PANEL_MEMBER, ADMIN } = roles;
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState(STUDENT);
  const [user, setUser] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    handleFindUsers();
  }, [role]);

  const handleFindUsers = () => {
    findUsers(`role=${role}`)
      .then(res => {
        res.data.isSuccessful ?
          setUsers(res.data.responseData) :
          handleToast();
      })
      .catch(() => handleToast());
  }

  const handleDeleteUser = (id) => {
    setDeleteOpen(false)
    deleteUser(id)
      .then((res) => {
        if (res.data.isSuccessful) {
          handleFindUsers();
          handleToast('User deleted!', 'info');
        } else {
          handleToast()
        }
      })
      .catch(() => handleToast())
  }

  const handleRoleSelect = (event) => {
    setRole(event.target.value)
  }

  const setEditingUser = (user) => {
    setUser(user);
    setEditOpen(true);
  }

  const setDeletingUser = (user) => {
    setUser(user);
    setDeleteOpen(true);
  }

  return (
    <>
      <Container maxWidth={"90%"}><br />
        <Paper elevation={3} style={{ padding: 20, backgroundColor: 'rgba(255,255,255, 0.70)' }}>
          <Typography variant='h6'>
            <center><b>USERS</b></center>
          </Typography><br />
          <TableContainer component={Paper} >
            <br />
            <FormControl style={{ marginLeft: "5px" }} >
              <InputLabel id="role-label">Filter role</InputLabel>
              <Select
                labelId="role-label"
                value={role}
                label="Filter role"
                onChange={handleRoleSelect}
              >

                <MenuItem value={STUDENT}>Students</MenuItem>
                <MenuItem value={PANEL_MEMBER}>Panel Members</MenuItem>
                <MenuItem value={SUPERVISOR}>Supervisors</MenuItem>
                <MenuItem value={ADMIN}>Admins</MenuItem>
              </Select>
            </FormControl>
            <br />

            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell><b>SLIIT ID</b></TableCell>
                  <TableCell align="right"><b>NAME</b></TableCell>
                  <TableCell align="right"><b>EMAIL</b></TableCell>
                  <TableCell align="right"><b>PHONE</b></TableCell>
                  <TableCell align="right"><b>OPTIONS</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users && users.map((user, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {user.id}
                    </TableCell>
                    <TableCell align="right">{user.name}</TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">{user.phone}</TableCell>
                    <TableCell align="right">
                      <Button onClick={() => setEditingUser(user)}>Edit</Button>
                      <Button onClick={() => setDeletingUser(user)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
                {deleteOpen &&
                  <AlertDialog
                    onConfirm={() => handleDeleteUser(user.id)}
                    onClose={() => setDeleteOpen(false)}
                    title={'Confirm delete'}
                    body={'Are you sure, you want to delete this user?'}
                  />
                }
              </TableBody>
            </Table>
          </TableContainer>
          {editOpen && user &&
            <EditUser
              user={user}
              setEditOpen={setEditOpen}
              handleFindUsers={handleFindUsers}
            />
          }
        </Paper>
      </Container>
    </>
  )

}

export default Users;