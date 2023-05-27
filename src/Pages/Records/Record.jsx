import * as React from "react";
import "./Record.css";
import { useState, useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../../ThemeContext";
import Header from "../../Components/HeaderTemplate/Header";
import Input from "@mui/material/Input";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { db } from "../../Firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Record = () => {
  const { DarkTheme } = useContext(ThemeContext);

  //add
  const [newDate, setNewDate] = useState("");
  const [newBags, setNewBag] = useState(0);

  const addBag = async () => {
    await addDoc(usersCollectionRef, {
      date: newDate,
      quantity: Number(newBags),
    });
    console.log(newDate);
    setNewDate("");
    setNewBag(0);
    refreshBags();
    document.getElementById("date-input").value = "";
    document.getElementById("quantity-input").value = "";
  };

  //read
  const [bags, setBags] = useState([]);
  const usersCollectionRef = collection(db, "bags");

  //update
  const reduceBagInputRef = useRef(null);
  const [reduce, setReduce] = useState(0);
  const reduceBag = async (id, quantity) => {
    const bagDoc = doc(db, "bags", id);
    const newBag = { quantity: quantity - reduce };
    await updateDoc(bagDoc, newBag);

    refreshBags();
    document.getElementById("reduce-bag").value = "";
    setReduce("0");
    reduceBagInputRef.current.value = "";
  };

  //delete
  const deleteBag = async (id) => {
    const bagDoc = doc(db, "bags", id);
    await deleteDoc(bagDoc);
    refreshBags();
  };
  const refreshBags = async () => {
    const data = await getDocs(usersCollectionRef);
    setBags(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    refreshBags();
  }, []);

  return (
    <>
      <div className={`record ${DarkTheme && "dark"}`}>
        <Header />

        <h1 className="title-rec">Records </h1>
        <div
          className="cont"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div
            className="inputCont"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  type="date"
                  id="date-input"
                  label="Date"
                  onChange={(event) => {
                    setNewDate(event.target.value);
                  }}
                  sx={{
                    m: "1rem",
                    "& .MuiSvgIcon-root": {
                      color: DarkTheme ? "#39b7ed" : "#05356b", // Set the desired icon color here
                    },
                    "& .MuiInputLabel-root": {
                      color: DarkTheme ? "#39b7ed" : "#05356b", // Set the desired label color here
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: DarkTheme ? "#39b7ed" : "#05356b", // Set the desired border color here
                        paddingTop: "8px",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: DarkTheme ? "#39b7ed" : "#05356b", // Set the desired label color here
                    },
                    "& input": {
                      color: DarkTheme ? "#39b7ed" : "#05356b", // Set the desired font color here
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <TextField
              id="quantity-input"
              label="Number"
              type="number"
              variant="outlined"
              sx={{
                "& input": {
                  color: DarkTheme ? "#39b7ed" : "#05356b", // Set the desired font color here
                },
                "& .MuiSvgIcon-root": {
                  color: DarkTheme ? "#39b7ed" : "#05356b", // Set the desired icon color here
                },
                "& .MuiInputLabel-root": {
                  color: DarkTheme ? "#39b7ed" : "#05356b", // Set the desired label color here
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: DarkTheme ? "#39b7ed" : "#05356b", // Set the desired border color here
                  },
                },
                "& .MuiInputLabel-root": {
                  color: DarkTheme ? "#39b7ed" : "#05356b", // Set the desired label color here
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                setNewBag(event.target.value);
              }}
            />
            {/* <input
              id="date-input"
              placeholder="Date..."
              type="date"
              onChange={(event) => {
                setNewDate(event.target.value);
              }}
            />
            <input
              id="quantity-input"
              placeholder="Quantity"
              type="number "
              onChange={(event) => {
                setNewBag(event.target.value);
              }}
            /> */}

            <Button
              sx={{
                fontSize: "18px",
                marginLeft: "2rem",
              }}
              className="btn"
              variant="contained"
              size="small"
              onClick={addBag}
            >
              Add Bag
            </Button>
          </div>
        </div>
        <div
          className="tableCont"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TableContainer
            component={Paper}
            className="tableContainer"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Table
              sx={{
                justifyContent: "center",
                minWidth: 650,
                backgroundColor: DarkTheme ? "#001b3e" : "white",
                color: DarkTheme ? "white" : "black",
              }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontSize: "24px",
                      color: DarkTheme ? "white" : "black",
                    }}
                    align="center"
                  >
                    Date
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "24px",
                      color: DarkTheme ? "white" : "black",
                    }}
                    align="center"
                  >
                    Quantity
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "24px",
                      color: DarkTheme ? "white" : "black",
                    }}
                    align="center"
                  >
                    Remove
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bags.map((bag) => (
                  <TableRow
                    hover
                    key={bag.id}
                    className="tableRow"
                    // style={{ display: "flex", alignItems: "center" }}
                  >
                    <TableCell
                      // style={{ width: 2 }}
                      align="center"
                      component="th"
                      scope="row"
                      sx={{
                        m: "5px",
                        fontSize: "3rem",
                        color: DarkTheme ? "white" : "black",
                      }}
                      className="tableCell"
                    >
                      {/* {bag.quantity} */}
                      May 28,2023
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "3rem",
                        color: DarkTheme ? "white" : "black",
                      }}
                      // style={{ width: 1 }}
                      align="center"
                      className="tableCell"
                    >
                      {bag.quantity}
                    </TableCell>
                    <TableCell
                      sx={{
                        m: "1rem",
                        color: DarkTheme ? "white" : "black",
                      }}
                      align="center"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                      className="tableCell"
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <TextField
                          style={{ width: 100 }}
                          sx={{
                            marginRight: 0.5, // Set the right margin
                            textAlign: "center",
                            color: DarkTheme ? "white" : "black",
                            "& label": {
                              color: "#39b7ed", // Set the desired label color here
                            },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "#39b7ed ", // Set the desired border color here
                              },
                            },
                          }}
                          id="reduce-bag"
                          label="Quantity"
                          type="number"
                          size="small"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputRef={reduceBagInputRef}
                          onChange={(event) => {
                            setReduce(event.target.value);
                          }}
                        />
                        <Button
                          sx={{
                            fontSize: "18px",
                            marginLeft: 0.5, // Set the left margin
                            marginRight: 0.5, // Set the right margin
                          }}
                          className="btn"
                          variant="contained"
                          color="warning"
                          size="small"
                          onClick={() => {
                            reduceBag(bag.id, bag.quantity);
                          }}
                        >
                          Remove Bag
                        </Button>
                        <Button
                          sx={{
                            fontSize: "18px",
                            marginLeft: 0.5, // Set the left margin
                            marginRight: 0.5, // Set the right margin
                          }}
                          color="error"
                          variant="contained"
                          className="btn"
                          onClick={() => {
                            deleteBag(bag.id);
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default Record;
