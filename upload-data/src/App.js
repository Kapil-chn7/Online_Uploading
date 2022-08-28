import "./App.css";
import FooterComp from "./components/pages/Footer";
import HeaderComp from "./components/pages/HeaderComp";
import { Routes, Route } from "react-router-dom";
import FirstPage from "./components/pages/FirstPage";
import SecondPage from "./components/pages/SecondPage";
import ThirdPage from "./components/pages/ThirdPage";
import About from "./components/pages/About";

function App() {
  const style1 = {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
  };
  return (
    <div className="App">
      <div style={style1}>
        <HeaderComp />
        <Routes>
          <Route exact path="/" element={<FirstPage />} />
          <Route exact path="/SecondPage" element={<SecondPage />} />
          <Route
            path="/ThirdPage/:url/:one/:two/:three/:four"
            element={<ThirdPage />}
          />

          <Route exact path="/About" element={<About />} />
          <Route path="*" element={<FirstPage />} />
        </Routes>
      </div>

      <FooterComp />
    </div>
  );
}

export default App;
