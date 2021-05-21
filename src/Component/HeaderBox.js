import { useEffect, useState } from "react";

export default function HeaderBox(props) {
  const { currentCity, setCurrentCity } = props;
  return (
    <header>
      <h1 id="Title">PROJECT: AQI</h1>
      <div style={{ display: "flex", flexFlow: "row nowrap" }}>
        <OverviewBox />
        <WeatherReport
          currentCity={currentCity}
          setCurrentCity={setCurrentCity}
        />
      </div>
    </header>
  );
}

function OverviewBox() {
  const [name, setName] = useState("Loading...");

  useEffect(() => {
    const savedName = window.localStorage.getItem("username");
    setName(savedName ?? "Stranger");
  }, []);

  return (
    <div className="OverviewBox">
      <p>
        Welcome back,{" "}
        <strong
          role="button"
          onClick={() => {
            const newName = prompt("What is your name?", name);
            setName(newName);
            window.localStorage.setItem("name", newName);
          }}
        >
          {name || "<set a name>"}
        </strong>
        !
      </p>
    </div>
  );
}
function WeatherReport(props) {
  const { currentCity, setCurrentCity } = props;
  const [temp, setTemp] = useState("Loading...");
  const [realFeel, setRealFeel] = useState("Loading...");

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q="
        .concat(currentCity)
        .concat("&appid=7f1bd24a6138253ce0656dbccaa53599")
    )
      .then((response) => response.json())
      .then((data) => setTemp(data.main.temp))
      .catch((error) => setTemp(`Unable to retrieve data`));
  }, [currentCity]);

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q="
        .concat(currentCity)
        .concat("&appid=7f1bd24a6138253ce0656dbccaa53599")
    )
      .then((response) => response.json())
      .then((data) => setRealFeel(data.main.feels_like))
      .catch((error) => setRealFeel(`Unable to retrieve data`));
  }, [currentCity]);

  return (
    <div className="WeatherReport">
      <p>
        Your city:{" "}
        <strong
          role="button"
          onClick={() => {
            const newCity = prompt("Type in your city") || "Hanoi";
            setCurrentCity(newCity);
          }}
        >
          {currentCity}
        </strong>{" "}
      </p>
      <p>Temperature: {Math.round(temp - 273)}℃</p>
      <p>Real-feel: {Math.round(realFeel - 273)}℃</p>
    </div>
  );
}
