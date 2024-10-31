import * as React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./pages/PrivateRoutes";
import SignUp from "./pages/SignUp";
import AdminLogin from "./pages/AdminLogin";
import Home from "./pages/Home";
import EnterOtp from "./pages/EnterOtp";
import AdminPrivateRoute from "./pages/AdminPrivateRoute";
import AdminHome from "./pages/AdminHome";

const App = () => {
  return (
    <BrowserRouter >
      <Routes  >
        <Route element={<PrivateRoutes/>} >

        <Route path="/" element={<Home/>} />
        

        </Route>
      <Route path="signup" element={<SignUp/>} />
      <Route path="enterOtp" element={<EnterOtp/>} />


      <Route element={<AdminPrivateRoute/>} >

      <Route path="admin" element={<AdminHome/>} />
      </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
