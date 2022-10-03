import React, { useState } from "react";
import { FormGroup, TextField, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import "./Update.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useParams,useLocation } from "react-router-dom";
import { Buffer } from "buffer";
import 'react-toastify/dist/ReactToastify.css';

function Update() {

  const state=useLocation();
  const {_id}=useParams();

  const [userData, setUserData] = useState([]);
  const [firstName, setFirstName] = useState(state.state.d.firstname);
  const [lastName, setLastName] = useState(state.state.d.lastname);
  const [usrAddress, setUsrAddress] = useState(state.state.d.address);
  const [mobileNum, setMobileNum] = useState(state.state.d.mobile);
  const [email, setEmail] = useState(state.state.d.email);
  const [image, setImage] = useState();

  const base64String = Buffer.from(state.state.d.img.data.data, 'binary').toString('base64')
  const [updateImg,setUpdateImg]=useState(`data:image/png;base64,${base64String}`)

  const handleChange = (e) => {
    setImage(e.target.files[0]);

    getBase64(e.target.files[0], (result) => {
      setUpdateImg(result)
    });

    function getBase64(file, cb) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
          cb(reader.result)
      };
      reader.onerror = function (error) {
          console.log('Error: ', error);
      };
  }
  };

  const formData = new FormData();
  formData.append("file", image);
  const SubmitData = () => {
    const newData = {
      firstname: firstName,
      lastname: lastName,
      mobile: mobileNum,
      email: email,
      address: usrAddress,
    };
    formData.append("_id", _id);
    formData.append("firstname", firstName);
    formData.append("lastname", lastName);
    formData.append("mobile", mobileNum);
    formData.append("email", email);
    formData.append("address", usrAddress);

    setUserData(newData);
    console.log(formData.get("file"))

    axios.post(`http://localhost:8080/update`, formData).then((res) => {
      if(res.status===200){
        toast.success("Update successfuly")
      }
    });
  };

  return (
    <>
      <Box id="form" className="create-user-form-wrapper">
        <Box className="create-user-form-box">
          <FormGroup className="create-user-form">
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                textTransform: "uppercase",
                fontWeight: "bold",
                color:"orangered",
              }}
            >
              Update User
            </Typography>
            <Box className="update-image-main-wrapper" >
            <Box className="update-image-wrapper">
              <img className="update-avatar" src={updateImg} alt="avtar"/>
              <Typography>Profile Picture</Typography>
            </Box>
            <Box className="image-upload-wrapper">
                  <input
                    type="file"
                    className="image-upload"
                    name="myImage"
                    accept="image/*"
                    onChange={(e) => handleChange(e)}
                  />
            </Box>
            </Box>
            
            <TextField
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              label="First Name"
              aria-label="firstname"
            />
            <TextField
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              label="Last Name"
              aria-label="lastname"
            />
            <TextField
              onChange={(e) => setUsrAddress(e.target.value)}
              value={usrAddress}
              label="Address"
              aria-label="address"
            />
            <TextField
              onChange={(e) => setMobileNum(e.target.value)}
              value={mobileNum}
              label="Mobile"
              aria-label="mobile"
            />
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              label="Email"
              aria-label="Email"
            />
            
            <Button
              onClick={() => SubmitData()}
              color="error"
              variant="contained"
            >
              Update
            </Button>
            
          </FormGroup>
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
}

export default Update;
