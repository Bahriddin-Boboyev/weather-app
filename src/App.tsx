import React, { useState, useEffect } from "react";
import { Header } from "./components/header/header";
import { Main } from "./components/main/main";
import getFormattedWeatherData from "./service/weather-app";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "./ui/loader";
import SignInSide from "./login/signInSide";

interface WeatherData {
  temp: number;
  description: string;
  details: string;
}

export default function Home() {
  const [query, setQuery] = useState({ q: "tashkent" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState<WeatherData>({
    temp: 0,
    description: "",
    details: "",
  });
  const [background, setBackground] = useState("blur");
  const [loading, setLoading] = useState(true);

  const inUser = () => {
    return localStorage.getItem("tokinUser");
  };

  const getLoginUser = async (
    email: string,
    password: string
  ): Promise<void> => {
    const response = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (!response.ok) {
      let errorMessage = await response.text();
      errorMessage = JSON.parse(errorMessage);

      toast.error(`${Object.keys(errorMessage)}: ${Object.values(errorMessage)}`);
      return;
    }
    const json = await response.json();
    toast.success("Login successful :)");
    localStorage.setItem("tokinUser", JSON.stringify(json));
    window.location.reload();
  };

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query, units })
        .then((data: any) => {
          toast.success(
            `Successfully fetched weather fot ${data.name}, ${data.country}.`
          );
          setWeather(data);
          setLoading(false);
        })
        .catch((error) => {
          toast.error("Error country not found.");
        });
    };
    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";

    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };

  useEffect(() => {
    const backgroundFunc = () => {
      if (weather.details === "Smoke" || weather.details === "Mist") {
        setBackground("smoke");
      } else if (weather.details === "Rain" || weather.details === "Drizzle") {
        setBackground("rain");
      } else if (weather.details === "Snow") {
        setBackground("snow");
      } else if (weather.details === "Clouds" || weather.details === "Clear") {
        setBackground("clouds");
      } else {
        setBackground("default");
      }
    };
    backgroundFunc();
  }, [setBackground, weather]);

  return (
    <>
      <div className={background}></div>
      <div>
        {inUser() ? (
          <>
            {loading ? (
              <Loader />
            ) : (
              <div
                className={`App bg-gradient-to-br ${formatBackground()} mx-auto max-w-screen-md py-4 px-16 h-fit z-30 mt-10 mb-10 pb-16`}
              >
                <header>
                  <Header
                    weather={weather}
                    setQuery={setQuery}
                    units={units}
                    setUnits={setUnits}
                  />
                </header>

                <main>
                  <Main weather={weather} />
                </main>
                <ToastContainer
                  autoClose={5000}
                  theme="colored"
                  newestOnTop={true}
                />
              </div>
            )}
          </>
        ) : (
          <>
            <SignInSide getLoginUser={getLoginUser} />
            <ToastContainer
              autoClose={5000}
              theme="colored"
              newestOnTop={true}
            />
          </>
        )}
      </div>
    </>
  );
}
