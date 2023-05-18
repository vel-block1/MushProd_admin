import "./Record.css";
import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../ThemeContext";
import Header from "../../Components/HeaderTemplate/Header";

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
          <button onClick={addBag}> Add Bag</button>
        </>
        <h1>Records </h1>

        <table className="rtable">
          <thead className="rhead">
            <tr className="rheadrow">
              <th className="rtitle">Date</th>
              <th className="rtitle">Quantity</th>
              <th className="rtitle"></th>
            </tr>
          </thead>
          <tbody className="rtablebody">
            {bags.map((bag) => (
              <tr className="rtablebody" key={bag.id}>
                <td className="rtablebody">{bag.quantity}</td>
                <td className="rtablebody">{bag.quantity}</td>
                <td className="rtablebody">
                  <input
                    className="rdc-bg"
                    id="reduce-bag"
                    variant="standard"
                    type="number "
                    onChange={(event) => {
                      setReduce(event.target.value);
                    }}
                  />
                  <button
                    className=""
                    onClick={() => {
                      reduceBag(bag.id, bag.quantity);
                    }}
                  >
                    Reduce bag
                  </button>
                  <button
                    onClick={() => {
                      deleteBag(bag.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Record;
