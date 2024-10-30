import * as React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./pages/PrivateRoutes";
import SignUp from "./pages/SignUp";
import AdminLogin from "./pages/AdminLogin";

const App = () => {
  return (
    <BrowserRouter >
      <Routes  >
        <Route element={<PrivateRoutes/>} >

        <Route path="/" element={<>Hard</>} />
        

        </Route>
      <Route path="signup" element={<SignUp/>} />
      <Route path="adminLogin" element={<AdminLogin/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;