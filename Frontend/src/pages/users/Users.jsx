import { useEffect, useState } from "react"
import { deleteUser, findUsers } from "../../api/usersApi";
import { handleToast } from "../../helper/helper";
import { roles } from "../../Util/utils";
import EditUser from "./EditUser";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Users = () => {
  const { SUPERVISOR, STUDENT, PANEL_MEMBER, ADMIN } = roles;
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState(STUDENT);
  const [user, setUser] = useState({});
  const [editOpen, setEditOpen] = useState(false);

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
    deleteUser(id)
      .then((res) => {
        if(res.data.isSuccessful) {
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

  return (
    <>
    <h1>Users</h1>
      <FormControl >
        <InputLabel id="role-label">Role</InputLabel>
        <Select
          labelId="role-label"
          value={role}
          label="Role"
          onChange={handleRoleSelect}
        >
          <MenuItem value={STUDENT}>Students</MenuItem>
          <MenuItem value={PANEL_MEMBER}>Panel Members</MenuItem>
          <MenuItem value={SUPERVISOR}>Supervisors</MenuItem>
          <MenuItem value={ADMIN}>Admins</MenuItem>
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>SLIIT ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Options</TableCell>
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
                  <Button onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
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

    </>
  )

}

export default Users;