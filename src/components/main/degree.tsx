import { iconUrlFromCode } from "../../service/weather-app";
import { formatToLocalTime } from "../../service/weather-app";
import sunIcon from '../../img/sunicon.svg'

export const Degree = ({ weather }: any) => {
  const {
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone,
  } = weather;

  return (
    <div className="mb-8">
      <div className="flex justify-around items-center mb-7 mt-7">
        <img src={iconUrlFromCode(icon)} alt="img" width={80} height={80} />
        <p className="text-white text-4xl font-medium">{`${temp.toFixed(
          0
        )}°`}</p>
        <div>
          <p className="text-white font-mono text-[14px]">
            Real fell:{" "}
            <span className="font-semibold text-[14px]">{`${feels_like.toFixed(0)}°`}</span>
          </p>
          <p className="text-white font-mono text-[14px]">
            Humidity:{" "}
            <span className="font-semibold text-[13px]">{`${humidity.toFixed(0)}°`}</span>
          </p>
          <p className="text-white font-mono text-[14px]">
            Wind: <span className="font-semibold text-[13px]">{`${speed} km/h`}</span>
          </p>
        </div>
      </div>
      <div className="flex justify-around items-center">
        <span>
          <img className="text-white" src={sunIcon} alt="icon" width={20} />
        </span>
        <p className="text-white font-mono text-[14px]">
          Rise:{" "}
          <span className="font-semibold">
            {formatToLocalTime(sunrise, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="text-white mt-[-5px]">|</p>

        <span>
          <img className="text-white" src={sunIcon} alt="icon" width={20}/>
        </span>
        <p className="text-white font-mono text-[14px]">
          Set:{" "}
          <span className="font-semibold">
            {formatToLocalTime(sunset, timezone, "hh:mm a")}
          </span>
        </p>
        <p className="text-white mt-[-5px]">|</p>
        <span>
          <img className="text-white" src={sunIcon} alt="icon" width={20}/>
        </span>
        <p className="text-white font-mono text-[14px]">
          Hight:{" "}
          <span className="font-semibold">{`${temp_max.toFixed(0)}°`}</span>
        </p>
        <p className="text-white mt-[-5px]">|</p>
        <span>
          <img className="text-white" src={sunIcon} alt="icon" width={20}/>
        </span>
        <p className="text-white font-mono text-[14px]">
          Low:{" "}
          <span className="font-semibold">{`${temp_min.toFixed(0)}°`}</span>
        </p>
      </div>
    </div>
  );
};
