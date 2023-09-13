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

import { lime, purple, orange } from '@mui/material/colors';
import { Collapse, Box, Typography } from '@mui/material';
import axios from 'axios';

import SwapVertIcon from '@mui/icons-material/SwapVert';
import { ToastContainer, toast } from "react-toastify";


import Search from './search';
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

function Row(props: { data: any }) {
  const { data } = props;
  const [open, setOpen] = React.useState(false);
  const [tokendata, setTokendata] = useState("");
  useEffect(() => {
    const token: string | null = sessionStorage.getItem("authToken");
    if (token !== null) {
      setTokendata(token);
    }
  }, []);



  async function handleDelete(trainingTitle: any) {

    try {


      const send = await axios.get(`http://localhost:8080/deleteTraining/${trainingTitle}`, { headers: { Authorization: tokendata } })

      console.log(send.data.message);

      if (send.data.message === "Deleted Successfully") {

        toast.success("Deleted Successfully", {

          position: toast.POSITION.TOP_RIGHT,

        });



        window.location.reload()

      }

    } catch (error) {

      console.log(error);



    }

  }

  async function handleTraining(trainingTitled: any) {


    try {
      const trainingTitle: any = await trainingTitled;
      const send = await axios.get(
        `http://localhost:8080/training-request/${trainingTitle}`,
        { headers: { Authorization: tokendata } }
      );
      console.log(send.data.message);
      if (send.data.message === "already taken") {
        toast.warning("already Registered", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else if (send.data.message === "Limit Reached") {
        toast.error("Limit Reached", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else if (send.data.message === "success") {
        toast.success("success", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else if (send.data.message === "already exists") {
        toast.warning("Already Registered", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else if (send.data.message === "Training Success") {
        toast.success("Training Success", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else if (send.data.message === "Training Not Found") {
        toast.error("Training Not Found", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else if (send.data.message === "Token Not Found") {
        toast.error("Token Not Found", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>

        <TableCell align="center" component="th" scope="row">
          {data.trainingTitle}
        </TableCell>
        <TableCell align="center">{data.skillTitle}</TableCell>
        <TableCell align="center">{data.skillCategory}</TableCell>
        <TableCell align="center">{data.startDateTime}</TableCell>
        <TableCell align="center">{data.endDateTime}</TableCell>
        <TableCell>
          {window.location.pathname === '/home' ? <button className="btn btn-sm see-more" onClick={() => handleDelete(data.trainingTitle)}>Delete</button> : <button className="btn btn-sm see-more" onClick={() => handleTraining(data.trainingTitle)}>
            Register
          </button>}
        </TableCell>

        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <ThemeProvider theme={theme}>
                    <CustomCheckbox>Description</CustomCheckbox>
                  </ThemeProvider>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ maxWidth: 180, overflowWrap: 'break-word' }}>{data.description}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


export default function CustomizedTables(props: any) {

  const trainingData = props.trainingData


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




  return (
    <>
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
              {(rowsPerPage > 0
                ? trainingData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : trainingData
              ).map((data: any) => (
                <Row key={data.trainingTitle} data={data} />
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

    </>
  );
}