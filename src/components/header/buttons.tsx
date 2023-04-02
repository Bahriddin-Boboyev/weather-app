export const Buttons = ({setQuery}: any) => {
  
  const cities = [
    {
      id: 1,
      title: "Samarqand",
    },

    {
      id: 2,
      title: "Farg'ona",
    },
    {
      id: 3,
      title: "Buxoro",
    },
    {
      id: 4,
      title: "Jizzax",
    },
    {
      id: 5,
      title: "Namangan",
    },
  ];
  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-white font-medium"
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </div>
  );
};

