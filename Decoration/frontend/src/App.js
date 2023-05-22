import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AddWeddingDeco from "./Components/Admin/AddWeddingDeco";
import DecorationList from "./Components/user/DecorationList";
import DecorateAppoiment from "./Components/user/DecorateAppoiment";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/AddWeddingDeco" element={<AddWeddingDeco />} />
        <Route path="/DecorationList" element={<DecorationList />} />
        <Route path="/DecorateAppoiment" element={<DecorateAppoiment />} />
      </Routes>
    </Router>
  );
}

export default App;
