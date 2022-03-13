import { useState } from 'react'
import {useSelector} from 'react-redux'

//mui
import { 
    Card,
    Tab,
    Tabs,
    Grid,
    Container,
    Table,
    TableContainer,
    TableBody,
    TableCell,
    TableRow,
    TablePagination
} from '@mui/material';
import Layout from '../../../../../layouts';
import Artist from '../../../../../layouts/dashboard/artist';
import { paramCase } from 'change-case';
import { useRouter } from 'next/router';
//component
import Page from '../../../../../components/Page';
import Bank from '../../../../../components/Bank';
import TableSortHead from '../../../../../components/TableSortHead'
import Scrollbar from '../../../../../components/Scrollbar';
//mock
import BankData from '../../../../../_mock/bank'
Index.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

const TABLE_HEAD = [
    { id: 'id', label: 'Id No', alignRight: false },
    { id: 'date', label: 'Date', alignRight: false },
    { id: 'type', label: 'Type', alignRight: false },
    { id: 'currency', label: 'Currency', alignRight: false },
    { id: 'amount', label: 'Amount', alignRight: false },
    { id: 'usd', label: 'Amount in USD', alignRight: false },
];

export default function Index() {

    const { allArtists } = useSelector(state => state.user)
    const { query } = useRouter();
    const { name } = query;
    const currentArtist = allArtists.filter(artist => paramCase(artist.firstName + artist.lastName) === name)

    const [value, setValue] = useState('all')
    const [tableData, setTableData] = useState(BankData)

    //table
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filterName, setFilterName] = useState('');

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue)
        if(newValue === 'all') {
            setTableData(BankData)
        }else {
            const newTalbleData = BankData.filter(data => data.type === newValue)
            setTableData(newTalbleData)
        }
    }

    const filteredArtists = applySortFilter(tableData, getComparator(order, orderBy), filterName);

    return(
        <Page title="Artist:Bank">
            <Container>
                <Artist artist={currentArtist[0]} />
                <Bank 
                    src="/icons/bitcoin_icon.jpg"
                    title="Personal Account (Available Balance)"
                    balance={1.0235}
                    currency="BTC"
                    sx={{ my:5 }}
                />
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, md: 12 }}>
                    <Grid item xs={4} md={4}>
                        <Bank 
                            src="/icons/artist.svg"
                            title="Artist Fund Account"
                            balance={1.0235}
                            currency="BTC"
                        />
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Bank 
                            src="/icons/investor.svg"
                            title="Investment Portfolio Valyou "
                            balance={0.0412}
                            currency="ETH"
                        />
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <Bank 
                            src="/icons/business.svg"
                            title="Business Account Balance"
                            balance={0.0356}
                            currency="BTC"
                        />
                    </Grid>
                </Grid>

                <Card sx={{ mt:3 }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        sx={{ px:2, backgroundColor: 'grey.400' }}
                        >
                        <Tab
                            value="all"
                            label="All"
                            wrapped
                        />
                        <Tab value="buy" label="Buy" />
                        <Tab value="sell" label="Sell" />
                    </Tabs>
                    <Scrollbar sx={{ mt:3 }}>
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
                                            <TableCell> {row.id} </TableCell>
                                            <TableCell>{ row.date }</TableCell>
                                            <TableCell sx={{ textTransform: 'capitalize' }}> {row.type} </TableCell>
                                            <TableCell sx={{ textTransform: 'capitalize' }}> {row.currency} </TableCell>
                                            <TableCell> {row.amount} </TableCell>
                                            <TableCell> {row.usd} </TableCell>


                                        </TableRow>
                                    ))}
                                        {(tableData.length) === 0 && (
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
                        count={tableData.length}
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