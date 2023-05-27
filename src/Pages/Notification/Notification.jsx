import "./Notification.css";
import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import Header from "../../Components/HeaderTemplate/Header";

const Notification = () => {
  const { DarkTheme } = useContext(ThemeContext);
  return (
    <>
      <div className={`notif ${DarkTheme && "dark"}`}>
        <Header />
        <h1 className="title-notif">Notification</h1>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam
        quas nobis ipsam ullam expedita reprehenderit, ea aliquam eius
        architecto itaque labore vitae repudiandae, magnam doloribus libero
        numquam, quaerat placeat dolores.
      </div>
    </>
  );
};

export default Notification;
