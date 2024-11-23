import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Registration from "./Components/Registration/Registration";
import UrlManager from "./Components/Table/UrlManager";
import Header from "./Components/Header/Header";
import CreatingUrl from "./Components/CreatingUrl/CreatingUrl";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/add-url" element={<CreatingUrl/>}></Route>
        <Route
          path="/table"
          element={
            <>
              <Header />
              <UrlManager />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
