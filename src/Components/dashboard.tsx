import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider, styled, useTheme } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import { useEffect, useState } from "react";


import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Collapse, Box, Typography } from '@mui/material';
import axios from 'axios';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import Nav from './nav';




const CustomCheckbox = styled(TableCell)(({ theme }) => ({
    color: "white",
    backgroundColor: "#19105B",
    fontSize: 16,
    fontFamily: "sans-serif"

}));

const theme = createTheme({
    palette: {
        primary: {
            main: '#19105B',
        },
    },
});

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}



export default function Dashboard(props: any) {



    const [userName, setuserName] = useState("")


    const [tokendata, setTokendata] = useState('')
    const [trainingData, setTrainingData] = useState([])

    const Navigate = useNavigate()

    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        const token: string | null = sessionStorage.getItem("authToken")
        console.log("token>", token);
        async function getTraining() {
            const trainingData = await axios.get("http://localhost:8080/get-training-data", { headers: { Authorization: token } })
            console.log(trainingData.data.trainingData);
            if (trainingData.data.message === "TokenExpiredError") {
                Navigate("/")
            }
            console.log("From Userhome", trainingData.data.trainingData)
            setTrainingData(trainingData.data.trainingData);
            setuserName(trainingData.data.userName);

        }

        if (token !== null) {
            setTokendata(token)
            getTraining()
        } else {
            sessionStorage.clear()
            Navigate('/')
        }
    }, []);





    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - trainingData.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const [sortingColumn, setSortingColumn] = useState<string | null>(null);
    const [ascending, setAscending] = useState<boolean>(true);

    const handleSort = (column: string) => {
        console.log("Clickable");
        console.log(column, "Column Name");
        console.log(sortingColumn, "SortingColumn");

        if (sortingColumn === column) {
            setAscending(!ascending);
        } else {
            console.log("setting State");
            setSortingColumn(column);
            setAscending(true);

        }

    };

    if (sortingColumn) {
        console.log("Inside if sorting Column", sortingColumn);
        // console.log(sortedData);
        trainingData.sort((a: any, b: any) => {
            const aValue = a[sortingColumn];
            const bValue = b[sortingColumn];

            if (ascending) {

                return aValue.localeCompare(bValue);

            } else {

                return bValue.localeCompare(aValue);

            }

        });

    }

    const filteredData = trainingData.filter((training: any) => {
        return training.trainingTitle.toLowerCase().includes(searchTerm.toLowerCase());
    })
    console.log(filteredData);









    return (

        <>
            <div className="navigation">
                <Nav name={userName} />
            </div>
            <div className="training">
                <div>
                    <h1 className="heading text-start mt-3">Dashboard</h1>
                    <div className="d-flex justify-content-between main-training-box w-100 pb-4 pt-2">
                        <div className="Search">
                            <input
                                type="text"
                                placeholder="Search for training title"
                                value={searchTerm}
                                onChange={(e) =>
                                    setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <TableContainer component={Paper} sx={{ maxHeight: 460 }}>
                    <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <ThemeProvider theme={theme}>
                                    <CustomCheckbox align="center" >Training Title <SwapVertIcon style={{ fontSize: '20px' }} onClick={() => handleSort('trainingTitle')} /></CustomCheckbox>

                                    <CustomCheckbox align="center" onClick={() => handleSort('skillTitle')}>Skill Title <SwapVertIcon style={{ fontSize: '20px' }} /></CustomCheckbox>

                                    <CustomCheckbox align="center" onClick={() => handleSort('skillCategory')}>Skill Category <SwapVertIcon style={{ fontSize: '20px' }} /></CustomCheckbox>

                                    <CustomCheckbox align="center" onClick={() => handleSort('startDateTime')}>Start Date <SwapVertIcon style={{ fontSize: '20px' }} /></CustomCheckbox>

                                    <CustomCheckbox align="center" onClick={() => handleSort('endDateTime')}>End Date <SwapVertIcon style={{ fontSize: '20px' }} /></CustomCheckbox>

                                    <CustomCheckbox align="center">Button</CustomCheckbox>

                                    <CustomCheckbox></CustomCheckbox>

                                </ThemeProvider>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.map((training: any) => (
                                <TableRow
                                    key={training.trainingTitle}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {training.trainingTitle}
                                    </TableCell>
                                    <TableCell align="right">{training.trainingTitle}</TableCell>
                                    <TableCell align="right">{training.skillTitle}</TableCell>
                                    <TableCell align="right">{training.startDateTime}</TableCell>
                                    <TableCell align="right">{training.endDateTime}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Paper sx={{ minHeight: 40 }} className='d-flex justify-content-end'>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={3}
                        count={trainingData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            inputProps: {
                                'aria-label': 'rows per page',
                            },
                            native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                    />
                </Paper>

                <ToastContainer />


            </div>
        </>
    );
}