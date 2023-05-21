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

    setReduce("0");
    reduceBagInputRef.current.value = "";
    refreshBags();
    document.getElementById("reduce-bag").value = "";
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

        <h1>Records </h1>
        <div className="cont">
          <div className="tableCont">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Quanitity</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bags.map((bag) => (
                    <TableRow key={bag.id}>
                      <TableCell
                        // style={{ width: 2 }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {bag.quantity}
                      </TableCell>
                      <TableCell
                        // style={{ width: 1 }}
                        align="center"
                      >
                        {bag.quantity}
                      </TableCell>
                      <TableCell
                        sx={{ mx: 10 }}
                        className="tblCell"
                        align="left"
                      >
                        {" "}
                        <TextField
                          style={{ width: 100 }}
                          sx={{
                            mx: "auto",
                            p: 0.5,
                            m: 0.5,
                            textAlign: "center",
                          }}
                          className="txtField"
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
                          sx={{ mx: "auto", p: 1, m: 1 }}
                          className="btn"
                          variant="contained"
                          size="small"
                          onClick={() => {
                            reduceBag(bag.id, bag.quantity);
                          }}
                        >
                          Remove Bag
                        </Button>
                        <Button
                          color="error"
                          variant="contained"
                          className="btn"
                          onClick={() => {
                            deleteBag(bag.id);
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="inputCont">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  type="date"
                  id="date-input"
                  label="Date"
                  onChange={(event) => {
                    setNewDate(event.target.value);
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <TextField
              id="quantity-input"
              label="Number"
              type="number"
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
            <button onClick={addBag}> Add Bag</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Record;
