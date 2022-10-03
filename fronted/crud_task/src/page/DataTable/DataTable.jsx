import React, { useState, useEffect } from "react";
import LoadingScreen from "react-loading-screen";
import { Buffer } from "buffer";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./DataTable.css";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DataTable() {
  const [resData, setResData] = useState([]);
  const [loading, setLoading] = useState(0);

  const navigate = useNavigate();

  // Get user data from backend

  useEffect(() => {
    axios
      .get("http://localhost:8080/users")
      .then(function (res) {
        setResData(res.data);
        setLoading(res.status);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // Delete user from database and data-table
  const DUser = (_id) => {
    const deleted = resData.filter((i) => i._id !== _id);
    setResData(deleted);
    var dID = {
      _id: _id,
    };
    axios
      .post("http://localhost:8080/remove", dID)
      .then((res) => {
        if (res.status === 200) {
          const deleted = resData.filter((i) => i._id != _id);
          setResData(deleted);
          toast.success("Deleted successfuly");
        } else {
          toast.error("Data not deleted!");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Update user data
  const UpUser = (_id, d) => {
    const state = { d: d };
    navigate(`/update/${_id}`, { state });
  };

  // some style from mui table component

  const cellStyle = {
    color: "white",
    fontWeight: "bold",
    alignText: "center",
    textAlign: "center",
    borderRight: "2px solid white",
  };
  const dataStyle = {
    color: "white",
    fontSize: "18px",
    alignText: "center",
    borderRight: "2px solid black",
  };
  const rowStyle = {
    background: "rgba(0, 0, 0, 0.5)",
    fontWeight: "bold",
    backdropFilter: "blur(50px)",
    alignText: "center",
    borderBottom: "2px solid black",
  };
  const imgStyle = {
    display: "flex",
    flex: "content",
    justifyContent: "center",
    alignItem: "center",
    minWidth: "80px",
    minHeight: "80px",
    maxWidth: "80px",
    maxHeight: "80px",
    overflow: "hidden",
  };
  const noDataStyle = {
    background: "rgba(0, 0, 0, 0.1)",
    fontWeight: "bold",
    backdropFilter: "blur(50px)",
    alignText: "white",
    fontSize: "50px",
    borderBottom: "2px solid black",
    textAlign: "center",
  };
  const backColor = "#000526";
  if (loading === 200) {
    return (
      <>
        <TableContainer>
          <Table>
            <TableHead sx={{ background: backColor }}>
              <TableRow>
                <TableCell sx={cellStyle}>ID</TableCell>
                <TableCell sx={cellStyle}>DB_ID</TableCell>
                <TableCell sx={cellStyle}>First Name</TableCell>
                <TableCell sx={cellStyle}>Last Name</TableCell>
                <TableCell sx={cellStyle}>Mobile</TableCell>
                <TableCell sx={cellStyle}>Email</TableCell>
                <TableCell sx={cellStyle}>Address</TableCell>
                <TableCell sx={cellStyle}>Avtar</TableCell>
                <TableCell sx={cellStyle}>Update</TableCell>
                <TableCell sx={cellStyle}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resData.length === 0 ? (
                <TableRow sx={noDataStyle}>No Data Found</TableRow>
              ) : (
                resData.map((d, i) => {
                  const {
                    _id,
                    img,
                    email,
                    firstname,
                    lastname,
                    mobile,
                    address,
                  } = d;
                  //const base64String = btoa(String.fromCharCode(...new Uint8Array(img.data.data)));
                  const base64String = Buffer.from(
                    img.data.data,
                    "binary"
                  ).toString("base64");

                  return (
                    <TableRow sx={rowStyle} key={i}>
                      <TableCell sx={dataStyle}>{i}</TableCell>
                      <TableCell sx={dataStyle}>{_id}</TableCell>
                      <TableCell sx={dataStyle}>{firstname}</TableCell>
                      <TableCell sx={dataStyle}>{lastname}</TableCell>
                      <TableCell sx={dataStyle}>{mobile}</TableCell>
                      <TableCell sx={dataStyle}>{email}</TableCell>
                      <TableCell sx={dataStyle}>{address}</TableCell>
                      <TableCell sx={dataStyle}>
                        <Box sx={imgStyle}>
                          <img
                            className="avatar"
                            src={`data:image/png;base64,${base64String}`}
                            alt="avtar"
                          />
                        </Box>
                      </TableCell>
                      <TableCell sx={dataStyle}>
                        <Button
                          sx={{ margin: 0 }}
                          color="success"
                          variant="contained"
                          onClick={() => UpUser(_id, d)}
                        >
                          Update
                        </Button>
                      </TableCell>
                      <TableCell sx={dataStyle}>
                        <Button
                          color="error"
                          variant="contained"
                          onClick={() => DUser(_id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <ToastContainer />
      </>
    );
  } else {
    return (
      <>
        <LoadingScreen
          loading={true}
          bgColor="#f1f1f1"
          spinnerColor="#ff3300"
          textColor="#676767"
          text="Wait..."
        ></LoadingScreen>
      </>
    );
  }
}

export default DataTable;
