import { formatToLocalTime } from "../../service/weather-app";

export const Times = ({weather}: any) => {
  const { dt, timezone } = weather;
  return (
    <div>
      <div className="flex justify-around items-center w-[400px] mx-auto">
        <p className="text-white font-mono text-[15px]">
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>
    </div>
  );
};