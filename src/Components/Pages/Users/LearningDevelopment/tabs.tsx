import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Training from "../../Training";
import TrainingTable from "../../trainingTable";
import AppBar from "@mui/material/AppBar";
import { useTheme } from "@mui/material/styles";


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props: any) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="container-fluid pe-4">
        <h1 className="heading text-start mt-3 mb-3">Learning & Development</h1>

        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              sx={{ backgroundColor: "#FBBFD3", color: "#19105B" }}
            >
              <Tab label="Upcoming Trainings" {...a11yProps(0)} />
              <Tab label="Ongoing Trainings" {...a11yProps(1)} />
              <Tab label="Registered Trainings" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Training trainingData={props.trainingData} buttonText={"Register"}/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Training trainingData={props.onGoingTrainingData} buttonText={"OnGoing"} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Training trainingData={props.registeredTrainingData} buttonText={"Registered"} />
          </CustomTabPanel>
        </Box>
      </div>
    </>
  );
}
