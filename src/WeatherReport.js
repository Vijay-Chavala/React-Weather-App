import React from "react";
import "./WeatherReport.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { GoLocation } from "react-icons/go";

function WeatherReport({
  cityInfo,
  page2,
  searchClick,
  setSearchClick,
  setPage2,
}) {
  const { sunrise, sunset, speed, pressure, humidity, name, temp, icon, main } =
    cityInfo;
  const isDay = icon?.includes("d");
  const getTime = (timeStamp) => {
    return `${new Date(timeStamp * 1000).getHours()}:${new Date(
      timeStamp * 1000
    ).getMinutes()}`;
  };
  const backBtnHandle = () => {
    setSearchClick(!searchClick);
    setPage2(!page2);
  };
  return (
    <main>
      <div
        className={
          searchClick
            ? "weather_report weather_report_show "
            : "weather_report  "
        }
      >
        <div className="temp_img_row">
          <div className="temp">
            <h1>
              {Math.round(temp - 273.15)}°<span>c</span>
            </h1>
            <p>{main}</p>
          </div>
          <div className="weather_icon">
            <img src={`/images/${icon}.svg`} alt="icon" />
          </div>
        </div>
        <h1 className="city_name">
          <GoLocation /> {name}
        </h1>
        <div className="weather_info_row">
          <h3>Weather Info :</h3>
          <div className="col">
            <div className="info">
              <img
                src={isDay ? "images/sunset.png" : "images/sunrise.png"}
                alt="sunrise"
              />

              <p>{isDay ? "sunset" : "sunrise"}</p>
              <p>
                {getTime(isDay ? sunset : sunrise)}
                <span style={{ textTransform: "lowercase" }}>
                  {" "}
                  {isDay ? "pm" : "am"}
                </span>
              </p>
            </div>
            <div className="info">
              <img src="images/wind.png" alt="wind" />

              <p>wind speed</p>
              <p>{speed}</p>
            </div>
          </div>
          <div className="col">
            <div className="info">
              <img src="images/pressure.png" alt="pressure" />

              <p>pressure</p>
              <p>{pressure}</p>
            </div>
            <div className="info">
              <img src="images/humidity.png" alt="humidity" />

              <p>humidity</p>
              <p>{humidity}</p>
            </div>
          </div>
        </div>

        <button className="back_btn" onClick={() => backBtnHandle()}>
          <IoMdArrowRoundBack /> search City
        </button>
      </div>
    </main>
  );
}

export default WeatherReport;
