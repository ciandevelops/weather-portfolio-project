import { BsSearch } from "react-icons/bs";
import axios from "axios";
import { useState } from "react";

function App() {
  const [city, setCity] = useState({});
  const [appData, setAppData] = useState([]);

  const fetchCityImage = () => {
    axios
      .get(
        `https://api.unsplash.com/photos/random?query=${city}&client_id=${process.env.REACT_APP_UNSPLASH_API}`
      )
      .then((response) => {
        //console.log(response.data);
        setCity(response.data.urls.regular);
      });
  };

  const fetchCityWeather = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_API}`
      )
      .then((response) => {
        console.log(response.data);
        setAppData(response.data);
        fetchCityImage();
      });
  };
  return (
    <div className="App">
      {/* HEADER */}
      <div className="bg-black w-full h-[600px]">
        {appData.main && (
          <img
            src={city}
            alt="city"
            className="w-full h-[600px] object-cover"
          />
        )}

        {/* Search and Info */}
        <div className="absolute w-full h-[600px] top-[0%] flex flex-col justify-center bg-gradient-to-t from-black">
          <div className="flex justify-center py-4">
            <h1 className="font-bold">Weather App</h1>
          </div>

          <div className="flex justify-center">
            <form
              onSubmit={fetchCityWeather}
              className="flex justify-between border border-white rounded-xl max-w-[300px] p-4"
            >
              <input
                onChange={(e) => setCity(e.target.value)}
                className="bg-transparent focus:outline-none placeholder:text-white"
                type="text"
                placeholder="Search a City..."
              />
              <button onClick={fetchCityWeather}>
                <BsSearch size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* DATA */}
      {appData.main && (
        <div>
          <div className="py-4">
            <div className="flex justify-center">
              <h1 className="text-4xl font-bold">
                Weather in {appData.name}, {appData.sys.country}
              </h1>
            </div>

            <div className="flex justify-between items-center p-2 border border-white max-w-[300px] rounded-xl">
              <div>
                <h1>Temperature:</h1>
                <p>{appData.main.temp.toFixed(0)}&#176;c</p>
                <h1>Feels Like:</h1>
                <p>{appData.main.feels_like.toFixed(0)}&#176;c</p>
              </div>

              <div>
                <h1>Min Temperature:</h1>
                <p>{appData.main.temp_min.toFixed(0)}&#176;c</p>
                <h1>Max Temperature:</h1>
                <p>{appData.main.temp_max.toFixed(0)}&#176;c</p>
              </div>
            </div>

            <div className="flex justify-between items-center p-2 border border-white max-w-[300px] rounded-xl">
              <div>
                <h1>Conditions:</h1>
                <p>{appData.weather[0].main}</p>
                <h1>Wind Speed:</h1>
                <p>{appData.wind.speed.toFixed(0)} MPH</p>
              </div>
              <div>
                <h1>Conditions:</h1>
                <p>{appData.weather[0].main}</p>
                <h1>Wind Speed:</h1>
                <p>{appData.wind.speed.toFixed(0)} MPH</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
