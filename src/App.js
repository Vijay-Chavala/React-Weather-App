import { useState } from "react";
import "./App.css";
import CurrentLocation from "./CurrentLocation";
import sunCloud from "./weather.png";
// https://api.openweathermap.org/data/2.5/weather?q=kakinada&appid=978e9e0fd1b18a548ca78ff391ec9e34

function App() {
  const [getStart, setGetStart] = useState(false);
  const [page2, setPage2] = useState(false);
  //get stared handle click
  const getStartedClick = () => {
    setGetStart(true);
    setPage2(true);
  };
  // useEffect(() => {
  //   window.screen.lockOrientation("landscape");
  // }, []);
  return (
    <>
      <main>
        <section>
          <div className="blur_section"></div>
          <div className="sun"></div>
          <div className="cloud cloud1"></div>
          <div className="cloud cloud2"></div>
          <div className="cloud cloud3"></div>
          <div className="cloud cloud4"></div>
          <div className="wave"></div>

          <div className="box"></div>

          <div className="container">
            <h2>Weather App</h2>
            <div
              className={getStart ? "welcome_page moveLeft" : "welcome_page"}
            >
              <p>Welcome to </p>
              <img src={sunCloud} alt="pic" className="welcome_icon" />
              <h1>Live weather Updates</h1>
              <p>the world's Weather at your finger tips </p>
              <button
                className="get_started_btn"
                onClick={() => getStartedClick()}
              >
                Get weather Updates
              </button>
            </div>
            <div>
              <CurrentLocation page2={page2} setPage2={setPage2} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
