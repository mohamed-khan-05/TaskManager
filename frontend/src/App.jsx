import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
export const Context = createContext();
const App = () => {
  const [globalEmail, setGlobalEmail] = useState("");
  return (
    <Context.Provider value={[globalEmail, setGlobalEmail]}>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/users" exact element={<Users />} />
          <Route path="/home/:email" exact element={<Home />} />
        </Routes>
      </Router>
    </Context.Provider>
  );
};
export default App;
