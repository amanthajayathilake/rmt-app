import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Typography from '@mui/material/Typography';
import ButtonAppBar from "./components/navBar/Navbar";
import NavBar from "./components/navBar/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { toastContainer } from "./helper/helper";

const style = {
  backgroundColor: "#232B2B",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "20px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "20px",
  width: "100%",
  color: "white",
  fontSize: "14px"
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Typography>
      <NavBar />
      {toastContainer()}
      <App />
      <br/><br/><br/>
      <div style={style}>@Copyright 2022 RMT APP</div>
    </Typography>
  </StrictMode>
);