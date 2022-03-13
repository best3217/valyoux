import { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import NextLink from 'next/link';
import { paramCase } from 'change-case';
import { 
    Typography, 
    Tabs, 
    Tab, 
    Card, 
    Container, 
    TableContainer, 
    Table,
    TableBody,
    TableRow,
    TableCell,
    Avatar,
    TablePagination,
    Button,
    Stack
} from '@mui/material';
import Layout from '../../layouts';
//component
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import TableSortHead from '../../components/TableSortHead'
//hook
import { getAccountsByRole, changeArtist } from '../../redux/slices/user'
//router
import { PATH_DASHBOARD } from '../../routes/paths';

Market.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

const TABLE_HEAD = [
    { id: '#rank', label: '#Rank', alignRight: false },
    { id: 'artist', label: 'Artist', alignRight: false },
    { id: 'change', label: 'Changes %', alignRight: false },
    { id: 'stockPrice', label: 'Stock Price', alignRight: false },
    { id: 'marketValue', label: 'Market Value', alignRight: false },
    { id: 'dividends', label: 'Dividends', alignRight: false },
    { id: 'trade', label: 'Trade' },
];


const tradeData = [
    {
        changes: 0.0518,
        price: 0.7704,
        value:77000100,
        dividends: 0.0001
    },
    {
        changes: 0.00525,
        price: 0.5468,
        value: 57510000,
        dividends: 0.002
    },
    {
        changes: 0.0174,
        price: 0.5375,
        value: 57480000,
        dividends: 0.0005
    },
    {
        changes: 0.04677,
        price: 0.532,
        value: 54680000,
        dividends: 0.02
    },
    {
        changes: 0.0068,
        price: 0.4726,
        value: 54180000,
        dividends: 0.008
    }
]

const flag = 0.035;


export default function Market() {
    const [value, setValue] = useState('all');

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filterName, setFilterName] = useState('');

    const dispatch = useDispatch();
    const { artists, allArtists } = useSelector(state => state.user)

    const handleChange = (event, newValue) => {
        setValue(newValue)
        let newArtists;
        if(newValue !== 'all') {
            newArtists = allArtists.filter(artist => (artist.data.category === newValue))
        }else {
            newArtists = allArtists
        }

        try {
            dispatch(changeArtist(newArtists)) 
        }catch(err) {
            console.log(err)
        }
    }

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    
    useEffect(() => {
        function fetchUser() {
            try {
                dispatch(getAccountsByRole('artist'))
            }catch(err) {
                console.log(err)
            }
        }
        fetchUser()
      }, [])

    const filteredArtists = applySortFilter(artists, getComparator(order, orderBy), filterName);

    return (
        <Page title="Market">
            <Container>
                <Typography variant="h4" mb={5}>Market</Typography>
                <Card>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        sx={{ px:2, backgroundColor: 'grey.400', mb:2 }}
                        >
                        <Tab
                            value="all"
                            label="All"
                            wrapped
                        />
                        <Tab value="EOI Profile" label="Expression of interest" />
                        <Tab value="Upcoming" label="Upcomming" />
                        <Tab value="Professional" label="Professional" />
                        <Tab value="Major Artists" label="Major Artists" />
                    </Tabs>
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <TableSortHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody>
                                    {filteredArtists.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={index}
                                        >
                                            <TableCell
                                                component="th"
                                                id={row._id}
                                                scope="row"
                                                padding="none"
                                                align="center"
                                            >
                                                {index+1}
                                            </TableCell>
                                            <TableCell align="center" sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Avatar alt={row.firstName + row.lastName} src={row.avatar} sx={{ mr: 2 }} />
                                                <Stack>
                                                    <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }} noWrap>
                                                        {row.firstName + ' ' + row.lastName}
                                                    </Typography>
                                                    <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }} color="grey.500" noWrap>
                                                        {row.data.RSD}
                                                    </Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    (tradeData[index].changes > flag) ? 
                                                        <Stack direction="row" alignItems="center" justifyContent="center" sx={{ color: 'white', gap: 0.5, py: 0.75, backgroundColor: 'success.main', borderRadius: '8px' }}>
                                                            <Iconify icon={'eva:plus-fill'} /> {tradeData[index].changes}
                                                        </Stack>
                                                    : <Stack direction="row" alignItems="center" justifyContent="center" sx={{ color: 'white', gap: 0.5, py: 0.75, backgroundColor: 'primary.main', borderRadius: '8px' }}>
                                                        <Iconify icon={'eva:minus-fill'} /> {tradeData[index].changes}
                                                    </Stack>
                                                }
                                            </TableCell>
                                            <TableCell>{'$ ' + tradeData[index].price}</TableCell>
                                            <TableCell>{'$ ' + tradeData[index].value}</TableCell>
                                            <TableCell>{tradeData[index].dividends + ' %'}</TableCell>
                                            <TableCell>
                                                <NextLink href={`${PATH_DASHBOARD.artist.stockPrice}/${paramCase(row.firstName + row.lastName)}`} passHref>
                                                    <Button variant="contained" color="secondary">
                                                        Invest in Artist
                                                    </Button>
                                                </NextLink>
                                            </TableCell>


                                        </TableRow>
                                    ))}
                                        {(artists.length) === 0 && (
                                            <TableRow style={{ height: 53 }}>
                                                <TableCell align="center" colSpan={6} sx={{ fontSize:20 }}>There are no any artist...</TableCell>
                                            </TableRow>
                                        )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                       
                    </Scrollbar>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={artists.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(e, page) => setPage(page)}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Container>
        </Page>
    )
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
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}