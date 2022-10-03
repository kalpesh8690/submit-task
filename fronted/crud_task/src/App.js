import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./component/Footer";
import Header from "./component/Header";
import CreateUser from "./page/CreateUser/CreateUser";
import DataTable from "./page/DataTable/DataTable";
import Update from "./page/Update/Update";

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route excat path="/" element={<DataTable />} />
        <Route excat path="/create_usr" element={<CreateUser />} />
        <Route excat path="/update/:_id" element={<Update />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
