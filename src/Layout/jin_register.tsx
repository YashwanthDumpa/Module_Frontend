import { Dispatch, SetStateAction, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import '../Styles/jinSignIn.css';
import Image from '../Components/image';


const Register = () => {
    const Navigate = useNavigate()
    const validator = require('validator')

    const [signUpData, setSignUpData] = useState({
        firstName: "",
        lastName: "",
        mailId: "",
        password: "",
        jobTitle: "",
        empId: "",
        phoneNo: ""
    });

    const [confirmPwd, setConfirmPwd] = useState("");

    const [fErr, setFerr]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
    const [fText, setFtext]: [string, Dispatch<SetStateAction<string>>] = useState("");

    const [mErr, setMerr] = useState(false);
    const [mtext, setMtext] = useState("");

    const [IdErr, setIderr] = useState(false);
    const [Idtext, setIdtext] = useState("");

    const [nErr, setNerr] = useState(false);
    const [ntext, setNtext] = useState("");

    const [pErr, setPerr] = useState(false);
    const [ptext, setPtext] = useState("");

    const [jErr, setJerr] = useState(false);
    const [jtext, setJtext] = useState("");

    const [cErr, setCerr] = useState(false);
    const [ctext, setCtext] = useState("");


    interface userType {
        EmpId: string;
        fname: string;
        lname: string;
        number: string;
        email: string;
        password: string;
    }
    const data: userType = {
        EmpId: "JMD" + signUpData.empId,
        fname: signUpData.firstName,
        lname: signUpData.lastName,
        number: signUpData.phoneNo,
        email: signUpData.mailId,
        password: signUpData.password,
    };

    async function register() {

        if (signUpData.firstName === undefined || signUpData.firstName === "") {
            setFerr(true);
            setFtext("Please enter First Name");
        } else if (signUpData.mailId === undefined || signUpData.mailId === "") {
            setMerr(true);
            setMtext("Please enter mail id");
        } else if (!(/^[A-Z0-9._%+-]+@(jmangroup.com)+/i.test(signUpData.mailId))) {
            setMtext("Please enter Organization mail address");
            setMerr(true);
        } else if (signUpData.password === undefined || signUpData.password === "") {
            setPerr(true);
            setPtext("Please Enter Password");
        } else if (signUpData.empId === undefined || signUpData.empId === "") {
            setIderr(true);
            setIdtext("Please Enter Employee ID");
        } else if (signUpData.phoneNo === undefined || signUpData.phoneNo === "") {
            setNerr(true);
            setNtext("Please Enter Phone Number");
        } else if (!validator.isStrongPassword(signUpData.password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })) {
            setPtext(
                "Password should be atleast 8 characters and consist of one uppercase, lowercase, symbol and a number"
            );
            setPerr(true);
        } else if (signUpData.password !== confirmPwd) {
            setCerr(true);
            setCtext("Passwords do not match");
        } else {
            console.log(signUpData);
            console.log("Clicked");

            try {
                const RegisterRequest = await axios.post(
                    "http://localhost:8080/register",
                    data
                );
                console.log(RegisterRequest);
                console.log(data);
                if (RegisterRequest.data.message === "User Already Registered") {
                    toast.error('User Already Registered', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
                if (RegisterRequest.data.message === "User Created") {

                    toast.success('Registration Success', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    setTimeout(() => {
                        Navigate("/")
                    }, 3000)
                }

                if (RegisterRequest.data.message === "empty data") {
                    toast.error('empty data', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }

            } catch (error) {
                console.log(error);
            }
        }
    }

    const setValues = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setSignUpData((vals) => ({ ...vals, [name]: value }))
    }

    return (
        <div className="main-container">
            <Image />
            <div>
                <div className='sign-container' onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        register()
                    }
                }}>

                    <div className="d-flex flex-column w-50 ">
                        <h1 className="m-3">Register</h1>
                        <div className='d-flex mb-4 '>

                            <TextField
                                required
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                value={signUpData.firstName}
                                error={fErr}
                                className="me-4"
                                size='small'
                                onChange={setValues}
                                helperText={fText}
                                onBlur={() => {
                                    // signUpData.firstName === "" ? (setFerr(true)) : setFerr(false);
                                    if (signUpData.firstName.trim() === "") {
                                        setFerr(true);
                                        setFtext("Enter First Name");
                                    }
                                    else {
                                        setFerr(false);
                                        setFtext("");
                                    }
                                }}
                            />
                            <TextField
                                id="lastName"
                                label="Last Name"
                                name='lastName'
                                value={signUpData.lastName}
                                size='small'
                                onChange={setValues}
                            />
                        </div>
                        <div>

                            <TextField fullWidth
                                required
                                id="mail"
                                label="Email"
                                name='mailId'
                                error={mErr}
                                helperText={mtext}
                                value={signUpData.mailId}
                                size='small'
                                className='mb-4'
                                onChange={setValues}
                                onBlur={() => {
                                    if (signUpData.mailId.trim() === "") {
                                        setMerr(true);
                                        setMtext("Enter mail Id");
                                    } else if (!(/^[A-Z0-9._%+-]+@(jmangroup.com)+/i.test(signUpData.mailId))) {
                                        setMtext("Please enter Organization mail address");
                                        setMerr(true);
                                    }
                                    else {
                                        setMerr(false);
                                        setMtext("");
                                    }
                                }}
                            />

                            <div className='d-flex mb-4'>
                                <TextField
                                    required
                                    id="empId"
                                    label="Employee Id"
                                    name="empId"
                                    value={signUpData.empId}
                                    error={IdErr}
                                    className="me-4"
                                    size='small'
                                    onChange={setValues}
                                    helperText={Idtext}
                                    sx={{ width: '35ch' }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">
                                            JMD
                                            </InputAdornment>,
                                    }}
                                    onBlur={() => {

                                        if (signUpData.empId.trim() === "") {
                                            setIderr(true);
                                            setIdtext("Enter employee Id");
                                        }
                                        else if (!(/^[0-9]+/i.test(signUpData.empId))) {
                                            setIderr(true);
                                            setIdtext("Enter valid employee Id");
                                        }
                                        else {
                                            setIderr(false);
                                            setIdtext("");
                                        }
                                    }}
                                />
                                <TextField
                                    required
                                    fullWidth
                                    id="phoneNo"
                                    label="Phone Number"
                                    name="phoneNo"
                                    value={signUpData.phoneNo}
                                    error={nErr}
                                    size='small'
                                    onChange={setValues}
                                    helperText={ntext}
                                    onBlur={() => {
                                        if (signUpData.phoneNo.trim() === "") {
                                            setNerr(true);
                                            setNtext("Enter Phone Number");
                                        } else if (signUpData.phoneNo.length !== 10) {
                                            setNerr(true);
                                            setNtext("Enter Valid Phone Number");
                                        }
                                        else {
                                            setNerr(false);
                                            setNtext("");
                                        }
                                    }}
                                />
                            </div>

                            <TextField fullWidth
                                required
                                id="jobTitle"
                                label="Job Title"
                                name='jobTitle'
                                error={jErr}
                                helperText={jtext}
                                value={signUpData.jobTitle}
                                size='small'
                                className='mb-4'
                                onChange={setValues}
                                onBlur={() => {

                                    if (signUpData.jobTitle.trim() === "") {
                                        setJerr(true);
                                        setJtext("Enter Job Title");
                                    }
                                    else {
                                        setJerr(false);
                                        setJtext("");
                                    }
                                }}
                            />

                            <TextField
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"
                                value={signUpData.password} 
                                type='password'
                                className='mb-4'
                                size='small'
                                onChange={setValues}
                                error={pErr} helperText={ptext}
                                onBlur={() => {
                                    // signUpData.firstName === "" ? (setFerr(true)) : setFerr(false);
                                    if (signUpData.password.trim() === "") {
                                        setPerr(true);
                                        setPtext("Enter Password");
                                    } else if (
                                        !validator.isStrongPassword(signUpData.password, {
                                            minLength: 8,
                                            minLowercase: 1,
                                            minUppercase: 1,
                                            minNumbers: 1,
                                            minSymbols: 1,
                                        })
                                    ) {
                                        setPtext(
                                            "Password should be of atleast 8 charcters and consist of one uppercase, lowercase, symbol and a number"
                                        );
                                        setPerr(true);
                                    } else {
                                        setPerr(false);
                                        setPtext("");
                                    }
                                }}
                            />

                            <TextField
                                required
                                id="outlined-required"
                                label="Confirm Password"
                                name="Confirmpassword"
                                error={cErr}
                                helperText={ctext}
                                value={confirmPwd}
                                fullWidth type='password'
                                size='small'
                                className="mb-4"
                                onChange={(e) => { setConfirmPwd(e.target.value) }}
                                onBlur={() => {
                                    // signUpData.firstName === "" ? (setFerr(true)) : setFerr(false);
                                    if (confirmPwd.trim() === "") {
                                        setCerr(true);
                                        setCtext("Enter Password");
                                    } else if (signUpData.password !== confirmPwd) {
                                        setCerr(true);
                                        setCtext("Passwords do not match ");
                                    } else {
                                        setCerr(false);
                                        setCtext("");
                                    }
                                }}
                            />
                        </div>
                        <div className='d-flex flex-row justify-content-end'>

                            <button className='button1' onClick={register}>REGISTER
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right ms-2" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                </svg>
                            </button>

                        </div>
                        <p className="text-end mt-2"> Already have an account? <Link to='/'>Sign In</Link></p>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;