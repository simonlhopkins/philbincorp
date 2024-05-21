import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import TradePort from "./components/TradePort/TradePort";
import TradePortLayout from "./components/layouts/TradePortLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TradePort />}></Route>
          <Route element={<TradePortLayout />}>
            <Route path="/howToExport" element={<h1>how to export</h1>} />
            <Route path="/exportPlanning" element={<h1>export planning</h1>} />
            <Route path="/findingBuyers" element={<h1>finding Buyers</h1>} />
            <Route path="/movingTheGoods" element={<h1>moving the goods</h1>} />
            <Route
              path="/obtainingFinancing"
              element={<h1>obtaining financing</h1>}
            />
            <Route path="*" element={<h1>Page not found</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
