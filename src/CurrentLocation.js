import axios from "axios";
import React, { useEffect, useState } from "react";
import "./CurrentLocation.css";
import WeatherReport from "./WeatherReport";
import { GoLocation } from "react-icons/go";

function CurrentLocation({ page2, setPage2 }) {
  const [latitude, setLatitude] = useState(17.385);
  const [longitude, setLongitude] = useState(78.4867);
  const [currentData, setCurrentData] = useState({
    icon: "01d",
    temp: "300",
    main: "rain",
    description: "heavy rain",
    name: "hyderabad",
  });
  const [city, setCity] = useState("");
  const [cityInfo, setCityInfo] = useState({});
  const [errMsg, setErrMsg] = useState("");
  const [searchClick, setSearchClick] = useState(false);

  //getting coords from geo location and setting up to a useState variables
  const savePositionToState = (position) => {
    const latitudeValue = position.coords.latitude;
    const longitudeValue = position.coords.longitude;
    setLatitude(latitudeValue);
    setLongitude(longitudeValue);
  };
  const getCoords = () => {
    window.navigator.geolocation.getCurrentPosition(savePositionToState, () => {
      alert(
        "You have blocked us to know your location!! Please allow weather app to access your location to get current weather update"
      );
    });
  };

  //fetching data from openweather app using axios
  //getting geo locations
  const fetchCurrentWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=978e9e0fd1b18a548ca78ff391ec9e34`
      );

      //destructering api data
      const {
        name,
        main: { temp },
        weather: [{ main, description, icon }],
      } = response.data;
      //reformating structured data to data variable
      const data = { name, temp, description, icon, main };
      setCurrentData(data);
    } catch (err) {
      if (err.response.data.cod === 429) {
        setErrMsg("Please try after some time");
      }
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCurrentWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latitude, longitude, currentData]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setErrMsg("");
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [errMsg]);

  const onChangeHandler = (e) => {
    setCity(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(city);
    try {
      const cityResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=978e9e0fd1b18a548ca78ff391ec9e34`
      );
      console.log(cityResponse.data);

      const {
        name,
        main: { temp, humidity, pressure },
        weather: [{ main, description, icon }],
        wind: { speed },
        sys: { sunrise, sunset },
      } = cityResponse.data;
      //reformating structured data to data variable
      const cityData = {
        sunrise,
        speed,
        pressure,
        humidity,
        name,
        temp,
        description,
        icon,
        main,
        sunset,
      };
      setCityInfo(cityData);
      setPage2(false);
      setSearchClick(true);
      setCity("");
    } catch (error) {
      console.log(error.response.data.cod);
      if (error.response.data.cod === 429) {
        setErrMsg("Please try after some time");
      } else {
        setErrMsg("Enter Valid City Name");
      }
      setCity("");
      setPage2(true);
      setSearchClick(false);
    }
  };

  return (
    <>
      <div
        className={
          page2
            ? " current_Page_MoveLeft current_location_page"
            : "current_location_page"
        }
      >
        <div className="section_2_container">
          <div className="row">
            <div className="">
              <div className="current_report">
                <img src={`/images/${currentData.icon}.svg`} alt="icon" />
                {/* <p>{currentData.description}</p> */}

                <h1>
                  {Math.round(currentData.temp - 273.15)}°<span>C</span>
                </h1>

                <h2>{currentData.main}</h2>
                <h3>
                  <GoLocation />
                  {currentData.name}
                </h3>

                {/* //get location button */}

                <button className="get_location_btn" onClick={getCoords}>
                  My Location
                </button>
              </div>

              <div className="search_section">
                <form onSubmit={submitHandler}>
                  <input
                    className="search_city"
                    type="text"
                    name="city"
                    value={city}
                    placeholder="Enter City Name"
                    onChange={onChangeHandler}
                  />
                  <input
                    className="search_city_btn"
                    type="submit"
                    value="Search City"
                  />
                  {errMsg && (
                    <p style={{ color: "red", padding: "5px 0" }}>{errMsg}</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WeatherReport
        searchClick={searchClick}
        setSearchClick={setSearchClick}
        setPage2={setPage2}
        page2={page2}
        cityInfo={cityInfo}
      ></WeatherReport>
    </>
  );
}

export default CurrentLocation;
