import { Buttons } from "./buttons";
import { Inputs } from "./inputs";
import { Times } from "./times";

export const Header = ({ weather, setQuery, units, setUnits }: any) => {
  return (
    <header>
      <Buttons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
      <Times weather={weather} />
    </header>
  );
};
