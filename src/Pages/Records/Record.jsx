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
  const updateBag = async (id, quantity) => {
    const bagDoc = doc(db, "bags", id);
    const newBag = { quantity: quantity + 1 };
    await updateDoc(bagDoc, newBag);

    refreshBags();
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
    <div className={`record ${DarkTheme && "dark"}`}>
      <Header />
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
      <button onClick={addBag}> Add bag</button>
      <h1>Records</h1>
      {bags.map((bag) => {
        return (
          <div>
            {/* <h1>Date: {formattedDate}</h1> */}
            <h1>Quantity: {bag.quantity}</h1>
            <button
              onClick={() => {
                updateBag(bag.id, bag.quantity);
              }}
            >
              add bag
            </button>
            <button
              onClick={() => {
                deleteBag(bag.id);
              }}
            >
              delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Record;
