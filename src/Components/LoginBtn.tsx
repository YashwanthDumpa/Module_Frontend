import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';

import Button from '@mui/material/Button';

import Grid from '@mui/material/Grid';

import { useNavigate } from "react-router-dom";

import axios from "axios";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

 

function LoginBtn() {

   

  const Navigate = useNavigate();

  const { loginWithRedirect } = useAuth0();

  const { isAuthenticated, user } = useAuth0();

 

  const handleSignInClick = async () => {

    debugger;

    await loginWithRedirect().

    then(()=>{

        if(isAuthenticated){

            handlesub();

        }

    })

  };

 

  const handlesub = async () => {

   

    console.log(user?.email)

    const email = user?.email;

    const response = await axios.post("http://localhost:8080/loginwithsso", {email})

    try{

        if (response.data.message === "Login") {

            sessionStorage.setItem('authToken', response.data.token)

            toast.success('Login Successfully', {

              position: toast.POSITION.TOP_RIGHT

            });

   

            setTimeout(() => {

              Navigate('/dashboard')

            }, 1000)

          }

          if (response.data.message === "Login-admin") {

            sessionStorage.setItem('authToken', response.data.token)

            toast.success('Login Successfully', {

              position: toast.POSITION.TOP_RIGHT

            });

   

            setTimeout(() => {

              Navigate('/adminLearningDevelopment')

            }, 1000)

          }

          if (response.data.message === "Activation Required") {

                toast.warning('Activation Required', {

                  position: toast.POSITION.TOP_RIGHT

                });

   

                setTimeout(() => {

                  Navigate('/')

                }, 1000)

              }

        if (response.data.message === "User Not Found") {

                toast.error('User Not Found', {

                  position: toast.POSITION.TOP_RIGHT

                });

   

              }

    }

    catch (error) {

        console.error("Login error:", error);

        toast.error('Login failed. Please check your credentials', {

          position: toast.POSITION.TOP_RIGHT

        });

      }

 

  }

//   if (isAuthenticated) {

//     console.log("is auth")

//     handlesub();

//   }

  return (

   

    <main>

      <Grid container>

        <Grid container justifyContent="center">

       

          
          <button type="button" className="button1" onClick={handleSignInClick}>
                 AUTH0
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-right ms-2"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                  />
                </svg>
              </button>

        </Grid>

      </Grid>

      <ToastContainer />

    </main>

  );

}

 

export default LoginBtn;