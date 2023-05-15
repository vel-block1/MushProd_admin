import "./Yield.css";
import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";

const Yield = () => {
  const { DarkTheme } = useContext(ThemeContext);
  return (
    <>
      <div className={`yield ${DarkTheme && "dark"}`}>
        {" "}
        <h1>Yield Analysis</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium,
          perferendis modi! Accusantium dignissimos suscipit dolorem alias
          repellat numquam enim nisi? Harum facilis sint magnam deleniti!
          Quisquam adipisci quibusdam laboriosam quo!
        </p>
        <div className="chart-container">
          {/* add your chart component here */}
        </div>
        <div className="yield-details">
          <h2>Yield Details</h2>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Yield;
