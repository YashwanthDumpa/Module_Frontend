import { useState } from "react";
import "../Styles/form.css";

//React Bootstrap Modal
import TextField from "@mui/material/TextField";

// The below line are commented as they are declared but never used. Please ddelete them later

//For Select option element
// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select, { SelectChangeEvent } from "@mui/material/Select";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { error } from "console";


import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'

const TrainingForm = () => {
  const [trainingTitle, setTrainingTitle] = useState("");
  const [skillTitle, setSkillTitle] = useState("");
  const [skillCategory, setSkillCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [limit, setLimit] = useState("");

  const data = {
    trainingTitle: trainingTitle,
    skillTitle: skillTitle,
    description: desc,
    skillCategory: skillCategory,
    startDateTime: startDate,
    endDateTime: endDate,
    limit: limit,
  };

  const [post, setPost] = useState(null);

  const close = (values: any) => {
    return (<button
      type="button"
      className="btn-close close-button"
      data-bs-dismiss={values}
    ></button>)
      ;
  };

  const createTraining = () => {


    if (
      trainingTitle.trim() !== "" &&
      skillTitle.trim() !== "" &&
      desc.trim() !== "" &&
      skillCategory.trim() !== "" &&
      endDate !== "" &&
      startDate !== "" &&
      startDate <= endDate
    ) {
      const url = `http://localhost:8080/admin`;
      axios
        .post(url, data)
        .then((response) => {
          if(response.data.message === "Training Already Exists"){
            toast.warning("Training Already Exists", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
          if(response.data.message === "Training Created Successfully"){
            setPost(response.data);
            toast.success("Training Created Successfully", {
              position: toast.POSITION.TOP_RIGHT,
            });
            setTimeout(()=>{
              window.location.reload()
            },1000)
          }
       
        })
        .catch((error) => {
          toast.error("Network Error", {
            position: toast.POSITION.TOP_RIGHT,
          });
          console.log(error);
        });
    } else {
      toast.error("Please check all the fields", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };


  return (
    <>
      <div >
      <h1 className="heading text-start mt-3">Learning & Development</h1>
      <div className="d-flex justify-content-between main-training-box w-100 p-4">
        <div className="Search">
          <h1>Search</h1>

        </div>
        {window.location.pathname === "/home" ? (
          <div>
            <button
              className="btn mybtn register"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              + Create Training<i className="fas fa-arrow-right"></i>
            </button>

            <div className="modal" id="myModal">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="pe-3 ps-3">
                    <div className="modal-header">
                      <h1 className="modal-title heading">New Request</h1>

                      <div>{close("modal")}</div>

                    </div>
                    <div className="modal-body">
                      <p className="labels">
                        Training Title<span className="text-danger">*</span>
                      </p>
                      <TextField
                        fullWidth
                        required
                        id="trainingTitle"
                        size="small"
                        className="mb-2"
                        onChange={(e) => setTrainingTitle(e.target.value)}
                      />
                      <div className="d-flex flex-row mb-2">
                        <div className="me-2">
                          <p className="labels">
                            Skill Title<span className="text-danger">*</span>
                          </p>
                          <TextField
                            required
                            id="skillTitle"
                            size="small"
                            onChange={(e) => setSkillTitle(e.target.value)}
                          />
                        </div>
                        <div>
                          <p className="labels">
                            Skill Category<span className="text-danger">*</span>
                          </p>
                          <TextField
                            required
                            id="skillCategory"
                            size="small"
                            onChange={(e) => setSkillCategory(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="dates d-flex justify-content-between mb-2">
                        <div>
                          <p className="labels">
                            Start Date<span className="text-danger">*</span>
                          </p>
                          <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            className="date-input"
                            onBlur={() => {
                              if (endDate !== "" && endDate < startDate) {
                                console.log(
                                  "End Date cannot be lesser than Start date"
                                );
                              }
                            }}
                            onChange={(e) => setStartDate(e.target.value)}
                          />
                        </div>
                        <div>
                          <p className="labels">
                            End Date<span className="text-danger">*</span>
                          </p>
                          <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            className="date-input"
                            onChange={(e) => {
                              if (startDate !== "") {
                                setEndDate(e.target.value);
                              } else {
                                console.log("error");
                              }
                            }}
                            onBlur={() => {
                              if (endDate < startDate) {
                                console.log(
                                  "End Date cannot be lesser than Start date"
                                );
                              }
                            }}
                          />
                        </div>
                        <div>
                          <p className="labels">
                            Limit<span className="text-danger">*</span>
                          </p>
                          <input
                            type="text-box"
                            id="limit"
                            name="limit"
                            className="date-input"
                            onChange={(e) => setLimit(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="description">
                        <p className="labels">
                          Description<span className="text-danger">*</span>
                        </p>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          onChange={(e) => setDesc(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-end">
                      <div>
                        <ToastContainer />
                        <button
                          className="submit-button"
                          onClick={createTraining}

                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) 
        : (
          ""
        )}
      </div>

       
      </div>
    </>
  );
};

export default TrainingForm;
