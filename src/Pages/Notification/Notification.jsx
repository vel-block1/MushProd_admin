import "./Notification.css";
import { useContext } from "react";
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

const Notification = () => {
  const { DarkTheme } = useContext(ThemeContext);
  return (
    <>
      <div className={`notif ${DarkTheme && "dark"}`}>
        <Header />
        <h1 className="title-notif">Notification</h1>

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
              <TableRow
                hover
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
                  sda
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
                      onChange={(event) => {}}
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
                      onClick={() => {}}
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
                      onClick={() => {}}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Notification;
