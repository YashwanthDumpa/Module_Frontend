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
import Nav from "../../../Layout/Sidebar/nav";
import TablePaginationActions from "../tablePagination";
import Checkbox from '@mui/material/Checkbox';
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

const CustomCheckbox = styled(TableCell)(({ theme }) => ({
  color: "white",
  backgroundColor: "#19105B",
  fontSize: 16,
  fontFamily: "sans-serif",
}));

const theme = createTheme({
  palette: {
    primary: {
      main: "#19105B",
    },
  },
});

const ManageAccounts = () => {
  const [userName, setuserName] = useState("");

  const [tokendata, setTokendata] = useState("");

  
//   const [trainingData, setTrainingData] = useState([
//     { firstName: "Yashwanth", lastName: "Dumpa", mail: "abc@", admin: false },
//     { firstName: "Yashu", lastName: "D", mail: "def@", admin: false },
// ]);
  const [trainingData, setTrainingData] = useState([]);


// const [isAdminStatus, setIsAdminStatus] = useState();


const Navigate = useNavigate();

const [searchTerm, setSearchTerm] = useState("");


const token: string | null = sessionStorage.getItem("authToken");
const handleAdminAccess = async(mailId:any)=>{
  try{
    console.log("Clicked Admin Access");
    

    const setIsAdmin  =  await axios.post("http://localhost:8080/adminStatus",{mailId,token})
    if(setIsAdmin.data.success){
      window.location.reload()
    }
  }catch(error){
    console.log(error);
    
  }
}

  useEffect(() => {
    console.log("token>", token);
    async function getTraining() {
      const trainingData = await axios.get(
        "http://localhost:8080/userinfo",
        { headers: { Authorization: token } }
      );
      console.log(trainingData.data.trainingData);
      if (trainingData.data.message === "TokenExpiredError") {
        sessionStorage.clear();
        Navigate("/");
      }
      if (trainingData.data.message === "Token Not Found") {
        sessionStorage.clear();
        Navigate("/");
      }
      if (trainingData.data.message === "Verification Failed") {
        sessionStorage.clear();
        Navigate("/");
      }
      console.log("From Userhome", trainingData.data.userName);
        setTrainingData(trainingData.data.userData);
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
    _event: React.MouseEvent<HTMLButtonElement> | null,
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
    return training.firstName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  console.log(filteredData);

  return (
    <>
      <div className="navigation">
        <Nav name={userName} />
      </div>
      <div className="training">
        <div>
          <h1 className="heading text-start mt-3">Manage Accounts</h1>
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
                      First Name{" "}
                      <SwapVertIcon
                        style={{ fontSize: "20px" }}
                        onClick={() => handleSort("trainingTitle")}
                      />
                    </CustomCheckbox>
                    <CustomCheckbox
                      align="center"
                      onClick={() => handleSort("skillTitle")}
                    >
                      Last Name <SwapVertIcon style={{ fontSize: "20px" }} />
                    </CustomCheckbox>
                    <CustomCheckbox
                      align="center"
                      onClick={() => handleSort("skillCategory")}
                    >
                      E-Mail ID <SwapVertIcon style={{ fontSize: "20px" }} />
                    </CustomCheckbox>
                    <CustomCheckbox
                      align="center"
                      onClick={() => handleSort("skillCategory")}
                    >
                      Admin Access
                      <SwapVertIcon style={{ fontSize: "20px" }} />
                    </CustomCheckbox>
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
                ).map((training: any, index) => (
                  <TableRow
                    key={training.trainingTitle}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {training.firstName}
                    </TableCell>
                    <TableCell align="center">{training.lastName}</TableCell>
                    <TableCell align="center">{training.employeeEmail}</TableCell>
                    <TableCell align="center">
                      <Checkbox
                        checked={training.isAdmin}
                        name = {training.mail}
                        onChange={()=>handleAdminAccess(training.employeeEmail)}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </TableCell>
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
};

export default ManageAccounts;
