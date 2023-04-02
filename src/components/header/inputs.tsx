import { useState } from "react";
import { toast } from "react-toastify";
import searchIcon from "../../img/searchicon.svg";
import locationIcon from "../../img//locationicon.svg";

export const Inputs = ({ setQuery, units, setUnits }: any) => {
  const [city, setCity] = useState("");

  const handleUnitsChange = (e: any) => {
    const selectedUnits = e.currentTarget.name;
    if (units !== selectedUnits) setUnits(selectedUnits);
  };

  const handleSearchClick = () => {
    if (city !== "") setQuery({ q: city });
    setCity("");
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    handleSearchClick();
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info("Fetching users location");
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Location fetched!");
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        if (lat && lon) {
          setQuery({ lat, lon });
        }
      });
    }
  };

  return (
    <div className="flex flex-row justify-center my-6 mx-auto">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4 mx-auto">
        <form onSubmit={(e) => handleFormSubmit(e)}>
          <input
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
            type="search"
            className="text-[15px] font-sans font-medium text-[#6e6e6e] p-2 w-[300px] shadow-xl outline-none rounded capitalize search"
            placeholder="Search..."
          />
        </form>
        <div
          onClick={handleSearchClick}
          className=" text-white cursor-pointer transition ease-out hover:scale-125 w-[20px]"
        >
          <img src={searchIcon} alt="search icon" />
        </div>
        <div
          onClick={handleLocationClick}
          className=" text-white cursor-pointer transition ease-out hover:scale-125 w-[20px]"
        >
          <img src={locationIcon} alt="location icon" />
        </div>
      </div>
      <div className="flex flex-row items-center justify-center ">
        <button
          name="metric"
          className={` text-white font-medium pl-2 cursor-pointer transition ease-out hover:scale-125 mr-3 metric ${
            units === "metric" ? "opacity-100" : "opacity-70"
          }`}
          onClick={handleUnitsChange}
        >
          °C
        </button>

        <p className="text-white">|</p>
        <button
          name="imperial"
          className={` text-white font-medium pl-2 cursor-pointer transition ease-out hover:scale-125 w-8 mr-3 imperial ${
            units === "imperial" ? "opacity-100" : "opacity-70"
          }`}
          onClick={handleUnitsChange}
        >
          °F
        </button>
      </div>
    </div>
  );
};
