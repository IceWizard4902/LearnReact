import HeaderBox from "./Component/HeaderBox";
import AQIHandle from "./Component/AQIHandle";
import "./styles.css";
import { useState } from "react";

function App() {
  const [currentCity, setCurrentCity] = useState("Hanoi");
  return (
    <div className="App">
      <HeaderBox currentCity={currentCity} setCurrentCity={setCurrentCity} />
      <main>
        <AQIHandle currentCity={currentCity} />
      </main>
    </div>
  );
}

export default App;
