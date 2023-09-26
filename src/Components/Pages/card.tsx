import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import '../../Styles/card.css'
import DeleteConfirmation from "./Admin/deleteConfirmation";

export default function Card(props: any) {
  const [count, setCount] = useState(0)

  const [tokendata, setTokendata] = useState("");
  useEffect(() => {
    const token: string | null = sessionStorage.getItem("authToken");
    if (token !== null) {
      setTokendata(token);
    }
  }, []);



  async function handleDelete() {

    try {
      const trainingTitle = await props.tdata.trainingTitle
      const send = await axios.get(`http://localhost:8080/deleteTraining/${trainingTitle}`, { headers: { Authorization: tokendata } })
      if (send.data.message === "Deleted Successfully") {
        toast.success("Deleted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        window.location.reload()
        // setCount(count+1)/
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleTraining() {
    try {
      const trainingTitle = await props.tdata.trainingTitle;
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
      }
      else if (send.data.message === "Training Not Found") {
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
    <div className="card">
      <div className="card-title c-title">
        <h5 className="card-heading">{props.tdata.trainingTitle}</h5>

      </div>
      <div className="card-body body-text">
        <h6>
          Skills: <span>{props.tdata.skillTitle}</span>
        </h6>
        <h6>
          Skill Category: <span>{props.tdata.skillCategory}</span>
        </h6>

        <div className="dates">
          <h6>Start: <span>{props.tdata.startDateTime}</span></h6>
          <h6>|</h6>
          <h6>End: <span>{props.tdata.endDateTime}</span></h6>
        </div>

        <p className="card-text card-description">{props.tdata.description}</p>
      </div>
      <div className="foot">
        {window.location.pathname === "/LearningDevelopment" ? (
          <button className="btn btn-sm see-more" disabled={props.tdata.isDisabled} onClick={handleTraining}>
            Register
          </button>
        ) : (
          <DeleteConfirmation trainingTitle={props.tdata.trainingTitle} />
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

