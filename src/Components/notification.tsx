import * as React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import { blue } from "@mui/material/colors";
import { Paper, Popover } from "@mui/material";
import Button from "@mui/material/Button";

import NotificationsIcon from "@mui/icons-material/Notifications";
import axios from "axios";

export default function Notification() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
const [notification, setNotification] = React.useState([])
console.log("notifiacation",notification);
 React.useEffect(()=>{
  async function getNotification(){
    try {
      const token = await sessionStorage.getItem("authToken")
      const response = await axios.get("http://localhost:8080/notification",{headers:{Authorization:token}})
      if(response.data.success){
        setNotification(response.data.notification)
        console.log(response.data.notification);
        
      }
      
    } catch (error) {
      console.log(error);
      
    }
  } 
  getNotification()
 },[anchorEl])

  


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
 
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleListItemClick = (value: string) => {
    console.log("clicked");
  };

  const emails = ["username@gmail.com", "user02@gmail.com","user02@gmail.com","user02@gmail.com","user02@gmail.com","user02@gmail.com",
  "user02@gmail.com","user02@gmail.com","user02@gmail.com","user02@gmail.com"];
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button aria-describedby={id} onClick={handleClick}>
        <NotificationsIcon />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
          <List sx={{ pt: 0, maxHeight:500 }}>
         
            {notification.map((data) => (
              
              <ListItem disableGutters key={data['trainingTitle']}>
                <div className='d-flex flex-column ps-4'>
                  <h3>{data['trainingTitle']}</h3>
                  <p>{data['description']}</p>
                </div>
              </ListItem>
            ))}
            <ListItem disableGutters>
              <ListItemButton
                autoFocus
                onClick={() => handleListItemClick("addAccount")}
              >
                <ListItemAvatar>
                  <Avatar>
                    <AddIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Add account" />
              </ListItemButton>
            </ListItem>
          </List>
   
      </Popover>
    </div>
  );
}
