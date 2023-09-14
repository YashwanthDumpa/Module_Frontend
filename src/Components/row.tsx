import { TableRow, TableCell, IconButton, Collapse, Table, TableBody } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

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
  
    const [currentColor, setCurrentColor] = useState('white')
  
    function handleColor(key:any) {
      setOpen(!open)
      setCurrentColor((prevColor) =>
      prevColor === 'white' ? '#FBBFD3' : 'white'
    );
    }
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' }, backgroundColor: currentColor }} key={data.trainingTitle}>
  
          <TableCell align="center" component="th" scope="row">
            {data.trainingTitle}
          </TableCell>
          <TableCell align="center">{data.skillTitle}</TableCell>
          <TableCell align="center">{data.skillCategory}</TableCell>
          <TableCell align="center">{data.startDateTime}</TableCell>
          <TableCell align="center">{data.endDateTime}</TableCell>
          <TableCell>
            {window.location.pathname === '/adminLearningDevelopment' ? <button className="btn btn-sm see-more text-light" onClick={() => handleDelete(data.trainingTitle)}>Delete</button> : <button className="btn btn-sm see-more text-light" onClick={() => handleTraining(data.trainingTitle)}>
              Register
            </button>}
          </TableCell>
  
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={handleColor}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Table size="small" aria-label="purchases">
  
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

  export default Row;