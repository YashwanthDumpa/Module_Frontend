import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from "@mui/icons-material/Delete";

import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function DeleteConfirmation(props:any) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [tokendata, setTokendata] = useState("");
  useEffect(() => {
    const token: string | null = sessionStorage.getItem("authToken");
    if (token !== null) {
      setTokendata(token);
    }
  }, []);
  async function handleDelete(trainingTitle: any) {
    try {
      const send = await axios.get(
        `http://localhost:8080/deleteTraining/${trainingTitle}`,
        { headers: { Authorization: tokendata } }
      );
      console.log(send.data.message);
      if (send.data.message === "Deleted Successfully") {
        toast.success("Deleted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Button  onClick={handleClickOpen} variant="outlined"
                endIcon={<DeleteIcon />}
                size="small"
                >
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Do you want to delete?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={() => handleDelete(props.trainingTitle)} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}