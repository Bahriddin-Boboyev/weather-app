import { Daily } from "./daily";
import { Degree } from "./degree";
import { Hourly } from "./hourly";

export const Main = ({ weather }: any) => {
  const { name, country, details } = weather;

  return (
    <main>
      <div className="mt-8">
        <p className="text-white text-[25px] font-semibold text-center mb-4">
          {`${name}, ${country}`}
        </p>
        <p className="text-white text-center text-base font-mono">{details}</p>
      </div>

      {weather && (
        <>
          <Degree weather={weather} />
          <Hourly weather={weather} />
          <Daily weather={weather} />
        </>
      )}
    </main>
  );
};
