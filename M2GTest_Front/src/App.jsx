import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Catalogs from "./catalogComponents/Catalogs";
import Home from "./Home";
import NavBar from "./NavBar";
import Clients from "./clientComponents/Clients";
import EditCatalogDet from "./catalogComponents/EditCatalogDet";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <div className="flex flex-col h-screen">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogs" element={<Catalogs />} />
            <Route
              exact
              path="/catalogs/edit/:id"
              element={<EditCatalogDet />}
            />
            <Route path="/clients" element={<Clients />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
