import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Card,
  Table,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
import useAuth from '../../../../hooks/useAuth';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import SearchNotFound from '../../../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../../../sections/@dashboard/user/list';
import { getUsers } from '../../../../redux/slices/user';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../../../redux/slices/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'country', label: 'Country', alignRight: false },
  { id: 'phoneNumber', label: 'Phone Number', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

UserList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserList() {
  const theme = useTheme();

  const dispatch = useDispatch()

  const { themeStretch } = useSettings();

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { user } = useAuth();

  const { users } = useSelector(state => state.user)

  const color = ['success', 'primary', 'warning']

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked) => {
    if (checked) {
      const newSelecteds = users.map((n) => (n.firstName + n.lastName));
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    console.log(newSelected)
    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleDeleteUser = (uid) => {
    try {
      dispatch(deleteUser(uid))
    } catch(err){
      console.log(err)
    }
  };

  const handleDeleteMultiUser = (selected) => {
    // const deleteUsers = userList.filter((user) => !selected.includes(user.name));
    // setSelected([]);
    // setUserList(deleteUsers);
  };

  const filteredUsers = applySortFilter(users, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && Boolean(filterName);

  useEffect(() => {
    function fetchUser() {
      dispatch(getUsers(user._id))
    }
    fetchUser();
  },[])

  return (
    <Page title="User: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="User List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Admin', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user },
            { name: 'List' },
          ]}
          action={
            <NextLink href={PATH_DASHBOARD.admin.userManage.newUser} passHref>
              <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
                New User
              </Button>
            </NextLink>
          }
        />

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            onDeleteUsers={() => handleDeleteMultiUser(selected)}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={users.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { _id, firstName, lastName,  email, country, phoneNumber, role, avatar } = row;
                    const isItemSelected = selected.indexOf(firstName + lastName) !== -1;
                    
                    return (
                      <TableRow
                        hover
                        key={_id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onClick={() => handleClick(firstName + lastName)} />
                        </TableCell>
                        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar alt={firstName + lastName} src={avatar} sx={{ mr: 2 }} />
                          <Typography variant="subtitle2" noWrap>
                            {firstName + ' ' + lastName}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell align="left">{country}</TableCell>
                        <TableCell align="left">{phoneNumber}</TableCell>
                        <TableCell align="left"> 
                          {role.map((_role, i) => 
                          <Label
                            key={_role}
                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                            color={color[i]}
                            sx={{ mx:0.25 }}
                            >
                              {_role}
                            </Label>
                          )} 
                        </TableCell>

                        <TableCell align="right">
                          <UserMoreMenu onDelete={() => handleDeleteUser(_id)} userName={firstName + lastName} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {(users.length) === 0 && (
                    <TableRow style={{ height: 53 }}>
                      <TableCell align="center" colSpan={6} sx={{ fontSize:20 }}>There are no any users...</TableCell>
                    </TableRow>
                  )}
                </TableBody>
                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    console.log(a, b)
    console.log(order)
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return array.filter((_user) => (_user.firstName+_user.lastName).toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
