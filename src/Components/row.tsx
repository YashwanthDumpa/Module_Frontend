import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Table,
  TableBody,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import DeleteConfirmation from "./deleteConfirmation";

function Row(props: { data: any }) {
  const { data, button } = props.data;
  const [open, setOpen] = React.useState(false);
  const [tokendata, setTokendata] = useState("");
  useEffect(() => {
    const token: string | null = sessionStorage.getItem("authToken");
    if (token !== null) {
      setTokendata(token);
    }
  }, []);



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

  const [currentColor, setCurrentColor] = useState("white");
  const [textColor, setTextColor] = useState("#6a6c71");
  const CustomTableCell = styled(TableCell)(({ theme }) => ({
    color: textColor,
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
  function handleColor(key: any) {
    setOpen(!open);
    setCurrentColor((prevColor) =>
      prevColor === "white" ? "#FBBFD3" : "white"
    );
    setTextColor((prevColo: string) =>
      prevColo === "#6a6c71" ? "#19105B" : "#6a6c71"
    );
  }

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          backgroundColor: currentColor,
        }}
        key={data.trainingTitle}
      >
        <ThemeProvider theme={theme}>
          <CustomTableCell align="center" component="th" scope="row">
            {data.trainingTitle}
          </CustomTableCell>
          <CustomTableCell align="center">{data.skillTitle}</CustomTableCell>
          <CustomTableCell align="center">{data.skillCategory}</CustomTableCell>
          <CustomTableCell align="center">{data.startDateTime}</CustomTableCell>
          <CustomTableCell align="center">{data.endDateTime}</CustomTableCell>
          <CustomTableCell align="center">
            {window.location.pathname === "/adminLearningDevelopment" ? (
              <DeleteConfirmation trainingTitle={data.trainingTitle}/>
            ) : (
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleTraining(data.trainingTitle)}
              >
                {button}
              </Button>
            )}
          </CustomTableCell>
          <CustomTableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={handleColor}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </CustomTableCell>
        </ThemeProvider>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small" aria-label="purchases">
              <TableBody>
                <TableRow>
                  <CustomTableCell
                    sx={{
                      maxWidth: 180,
                      overflowWrap: "break-word",
                      color: "#6a6c71",
                    }}
                  >
                    {data.description}
                  </CustomTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default Row;
