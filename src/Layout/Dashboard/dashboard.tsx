import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  createTheme,
  ThemeProvider,
  styled,
  useTheme,
} from "@mui/material/styles";
import TablePagination from "@mui/material/TablePagination";
import { useEffect, useState } from "react";
import axios from "axios";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Nav from "../Sidebar/nav";
import TablePaginationActions from "../../Components/Pages/tablePagination";
import Notification from "../../Components/Pages/Users/Dashboard/notification";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

const CustomCheckbox = styled(TableCell)(({ theme }) => ({
  color: "white",
  backgroundColor: "#19105B",
  fontSize: 16,
  fontFamily: "sans-serif",
}));

const CustomTableCell = styled(TableCell)(({ theme }) => ({
  color: "#6a6c71",
  fontSize: 12.5,
  fontFamily: "Arial",
}));

const theme = createTheme({
  palette: {
    primary: {
      main: "#19105B",
    },
  },
});

export default function Dashboard() {
  const [userName, setuserName] = useState("");

  const [tokendata, setTokendata] = useState("");
  const [trainingData, setTrainingData] = useState([]);

  const Navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token: string | null = sessionStorage.getItem("authToken");
    console.log("token>", token);
    async function getTraining() {
      const trainingData = await axios.get("http://localhost:8080/dashboard", {
        headers: { Authorization: token },
      });
      console.log(trainingData.data.trainingData);
      if (trainingData.data.message === "TokenExpiredError") {
        Navigate("/");
      }
      console.log("From Userhome", trainingData.data.trainingData);
      setTrainingData(trainingData.data.trainingData);
      setuserName(trainingData.data.userName);
    }

    if (token !== null) {
      setTokendata(token);
      getTraining();
    } else {
      sessionStorage.clear();
      Navigate("/");
    }
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - trainingData.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [sortingColumn, setSortingColumn] = useState<string | null>(null);
  const [ascending, setAscending] = useState<boolean>(true);

  const handleSort = (column: string) => {
    // console.log("Clickable");
    // console.log(column, "Column Name");
    // console.log(sortingColumn, "SortingColumn");

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
    return training.trainingTitle
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });
  console.log(filteredData);


  function changeDateFormat(inputDate: string) {
    const [year, month, day] = inputDate.split("-");
    // Create a new date string in dd-mm-yyyy format
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;

  }



  return (
    <>
      <div className="navigation">
        <Nav name={userName} />
      </div>
      <div className="training ">
        <div>
          <div className="d-flex justify-content-between mt-3">
            <h1 className="heading text-start ">Dashboard</h1>
            <Notification />
          </div>
          <div className="d-flex justify-content-between main-training-box w-100 pb-4 pt-2">
            <abbr
              title="Search for a training title"
              style={{
                textDecoration: "none",
                backgroundColor: "rgb(245,250,250)",
              }}
            >
              <TextField
                label=""
                size="small"
                placeholder="Search..."
                id="outlined-start-adornment"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ maxHeight: 30 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon sx={{ height: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </abbr>
          </div>
        </div>
        <div className="container-fluid pe-4">
          <TableContainer component={Paper} sx={{ maxHeight: 460 }}>
            <Table
              stickyHeader
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <ThemeProvider theme={theme}>
                    <CustomCheckbox align="center">
                      Training Title{" "}
                      <SwapVertIcon
                        style={{ fontSize: "20px" }}
                        onClick={() => handleSort("trainingTitle")}
                      />
                    </CustomCheckbox>

                    <CustomCheckbox
                      align="center"
                      onClick={() => handleSort("skillTitle")}
                    >
                      Skill Title <SwapVertIcon style={{ fontSize: "20px" }} />
                    </CustomCheckbox>

                    <CustomCheckbox
                      align="center"
                      onClick={() => handleSort("skillCategory")}
                    >
                      Skill Category{" "}
                      <SwapVertIcon style={{ fontSize: "20px" }} />
                    </CustomCheckbox>

                    <CustomCheckbox
                      align="center"
                      onClick={() => handleSort("startDateTime")}
                    >
                      Start Date <SwapVertIcon style={{ fontSize: "20px" }} />
                    </CustomCheckbox>


                    <CustomCheckbox
                      align="center"
                      onClick={() => handleSort("endDateTime")}
                    >
                      End Date <SwapVertIcon style={{ fontSize: "20px" }} />
                    </CustomCheckbox>
                    <CustomCheckbox
                      align="center"
                      onClick={() => handleSort("RegisteredDateTime")}
                    >
                      Registered Date <SwapVertIcon style={{ fontSize: "20px" }} />
                    </CustomCheckbox>
                    <CustomCheckbox align="center">
                      Registered Time
                    </CustomCheckbox>

                    <CustomCheckbox></CustomCheckbox>
                  </ThemeProvider>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? filteredData.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  : filteredData
                ).map((training: any) => (
                  <TableRow
                    key={training.trainingTitle}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <ThemeProvider theme={theme}>
                      <CustomTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {training.trainingTitle}
                      </CustomTableCell>
                      <CustomTableCell align="center">
                        {training.trainingTitle}
                      </CustomTableCell>
                      <CustomTableCell align="center">
                        {training.skillTitle}
                      </CustomTableCell>
                      <CustomTableCell align="center">
                        {changeDateFormat(training.startDateTime)}
                      </CustomTableCell>
                      <CustomTableCell align="center">
                        {changeDateFormat(training.endDateTime)}
                      </CustomTableCell>
                      <CustomTableCell align="center">
                        {changeDateFormat(training.RegisteredDateTime.split("T")[0])}
                      </CustomTableCell>
                      <CustomTableCell align="center">
                        {training.RegisteredDateTime.split("T")[1].split(".")[0]}
                      </CustomTableCell>
                    </ThemeProvider>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Paper sx={{ minHeight: 40 }} className="d-flex justify-content-end">
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={trainingData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
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
      </div>
    </>
  );
}
