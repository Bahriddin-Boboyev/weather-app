import { iconUrlFromCode } from "../../service/weather-app";

export const Daily = ({ weather }: any) => {
  const { daily } = weather;

  return (
    <div>
      <h2 className="text-white font-semibold text-[16px] mt-6 mb-3 uppercase">
        Daily Forecast
      </h2>
      <hr className="border-[1px] mb-2" />
      <ul className="flex justify-between items-center">
        {daily?.map((item: any) => (
          <li key={item.title} className="text-center">
            
            <p className="text-white mb-1 text-[14px]">{item.title}</p>
            <img
              className="mb-1 w-9 h-9 mx-auto"
              src={iconUrlFromCode(item.icon)}
              alt="img"
              width={36}
              height={36}
            />
            <h4 className="text-white mb-1 font-semibold text-[14px]">
              {`${item.temp.toFixed()}°`}
            </h4>
          </li>
        ))}
      </ul>
    </div>
  );
};
