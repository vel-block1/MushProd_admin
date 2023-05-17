import "./Record.css";
import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../ThemeContext";
import Header from "../../Components/HeaderTemplate/Header";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

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
  const [reduce, setReduce] = useState(0);
  const reduceBag = async (id, quantity) => {
    const bagDoc = doc(db, "bags", id);
    const newBag = { quantity: quantity - reduce };
    await updateDoc(bagDoc, newBag);

    setReduce(0);

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
        <>
          {/* <div className="addBags">
            <TextField
              id="date-input"
              label="Enter Date"
              placeholder="Date"
              type="date"
              multiline
            />
            <TextField
              id="date-input"
              label="Enter Quantity"
              placeholder="Quantity"
              type="number"
              multiline
            />
          </div>

          <input
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
          />
          <button onClick={addBag}> Add Bag</button> */}
        </>
        <h1>Records</h1>

        <TableContainer
          className={`record ${DarkTheme && "dark"} table-cont`}
          component={Paper}
        >
          <Table
            className="table"
            sx={{ minWidth: 650 }}
            aria-label="simple table"
          >
            <TableHead className="tbl-head">
              <TableRow className="tbl-title" hover>
                <TableCell className="tbl-txt">Date</TableCell>
                <TableCell className="tbl-txt" align="right">
                  Quantity
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="tbl-body">
              {bags.map((bag) => (
                <TableRow
                  className="tbl-row"
                  hover
                  key={bag.quantity} /**should be date here */
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="tbl-cell" component="th" scope="row">
                    {bag.date}
                  </TableCell>
                  <TableCell className="tbl-cell" align="right">
                    {bag.quantity}
                  </TableCell>
                  <TableCell className="tbl-cell" align="right">
                    <TextField
                      className="rdc-bg"
                      id="reduce-bag"
                      label="Quantity"
                      variant="standard"
                      type="number "
                      InputLabelProps={{
                        style: { color: { DarkTheme } ? "#6f6f6f" : "#6f6f6f" },
                      }}
                      onChange={(event) => {
                        setReduce(event.target.value);
                      }}
                    />

                    <Button
                      variant="contained"
                      onClick={() => {
                        reduceBag(bag.id, bag.quantity);
                      }}
                    >
                      Reduce bag
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        deleteBag(bag.id);
                      }}
                    >
                      delete
                    </Button>
                  </TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Record;
