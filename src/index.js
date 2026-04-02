import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import StarRating from "./StarRatings";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "Okay", "Good", "Excellent"]}
    />
    <StarRating size={24} color="gold" className="" defaultRating={3} />
    {/*  <StarRating maxRating={10} />
    <StarRating /> */}
  </React.StrictMode>,
);
