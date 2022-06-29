import { BsSearch } from "react-icons/bs";
import axios from "axios";
import { useState } from "react";

function App() {
  const [cityImage, setCityImage] = useState("");

  const fetchCityImage = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.unsplash.com/photos/random?query=${cityImage}&client_id=06K6Abw0z7-akEI1NG8Vu_uA8opl8S2wyXyG9FK5JOM`
      )
      .then((response) => {
        console.log(response.data);
        setCityImage(response.data.urls.regular);
      });
  };
  return (
    <div className="App">
      {/* HEADER */}
      <div className="bg-black w-full h-[600px]">
        <img
          src={cityImage}
          alt="city image"
          className="w-full h-[600px] object-cover"
        />
        {/* Search and Info */}
        <div className="absolute w-full h-[600px] top-[0%] flex flex-col justify-center bg-gradient-to-t from-black">
          <div className="flex justify-center py-4">
            <h1 className="font-bold">Weather App</h1>
          </div>

          <div className="flex justify-center">
            <form className="flex justify-between border border-white rounded-xl max-w-[300px] p-4">
              <input
                onChange={(e) => setCityImage(e.target.value)}
                className="bg-transparent focus:outline-none placeholder:text-white"
                type="text"
                placeholder="Search a City..."
              />
              <button onClick={fetchCityImage}>
                <BsSearch size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* DATA */}
    </div>
  );
}

export default App;
