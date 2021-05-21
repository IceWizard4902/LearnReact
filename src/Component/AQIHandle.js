import { useState, useEffect } from "react";

export default function AQIHandle(props) {
  const { currentCity } = props;
  const [aqi, setAQI] = useState("Loading...");

  useEffect(() => {
    let processedName = currentCity.toLowerCase().replace(/\s/g, "-");
    if (processedName.localeCompare("ho-chi-minh") === 0) {
      processedName = processedName.concat("-city");
    }
    const token = "c14563f23478af4da2c6c3c5ec0892fccd50e9e0";
    fetch(
      "https://api.waqi.info/feed/"
        .concat(processedName)
        .concat("/?token=")
        .concat(token)
    )
      .then((response) => response.json())
      .then((data) => setAQI(data.data.aqi))
      .catch((error) => setAQI(`Unable to retrieve data`));
  }, [currentCity]);
  return displayAQI(parseInt(aqi));
}

function displayAQI(aqi) {
  if (aqi >= 0 && aqi <= 50) {
    return (
      <div className="GoodAQI">
        <h1 id="aqi">{aqi}</h1>
        <h1>Air Pollution Level: Good</h1>
        <p>
          Air quality is considered satisfactory, and air pollution poses little
          or no risk
        </p>
      </div>
    );
  } else if (aqi >= 51 && aqi <= 100) {
    return (
      <div className="ModerateAQI">
        <h1 id="aqi">{aqi}</h1>
        <h1 id="level">Air Pollution Level: Moderate</h1>
        <p id="desc">
          Air quality is acceptable; however, for some pollutants there may be a
          moderate health concern for a very small number of people who are
          unusually sensitive to air pollution.
        </p>
      </div>
    );
  } else if (aqi >= 101 && aqi <= 150) {
    return (
      <div className="UnhealthySGAQI">
        <h1 id="aqi">{aqi}</h1>
        <h1 id="level">Air Pollution Level: Unhealthy for Sensitive Groups</h1>
        <p id="desc">
          Members of sensitive groups may experience health effects. The general
          public is not likely to be affected.
        </p>
      </div>
    );
  } else if (aqi >= 151 && aqi <= 200) {
    return (
      <div className="UnhealthyAQI">
        <h1 id="aqi">{aqi}</h1>
        <h1 id="level">Air Pollution Level: Unhealthy</h1>
        <p id="desc">
          Everyone may begin to experience health effects; members of sensitive
          groups may experience more serious health effects
        </p>
      </div>
    );
  } else if (aqi >= 201 && aqi <= 300) {
    return (
      <div className="VeryUnhealthyAQI">
        <h1 id="aqi">{aqi}</h1>
        <h1 id="level">Air Pollution Level: Very Unhealthy</h1>
        <p id="desc">
          Health warnings of emergency conditions. The entire population is more
          likely to be affected.
        </p>
      </div>
    );
  } else if (aqi >= 301) {
    return (
      <div className="HazardousAQI">
        <h1 id="aqi">{aqi}</h1>
        <h1 id="level">Air Pollution Level: Hazardous</h1>
        <p id="desc">
          Health alert: everyone may experience more serious health effects
        </p>
      </div>
    );
  } else {
    return (
      <div className="UnknownAQI">
        <h1 id="aqi">NaN</h1>
        <h1 id="level">There is no AQI data to display</h1>
      </div>
    );
  }
}
