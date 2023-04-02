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

  const logoutUser = () => {
    localStorage.removeItem('tokinUser')
    window.location.reload()
  }

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
        <button onClick={logoutUser} className="transition-all duration-400 text-white hover:bg-red-700 font-medium py-1 px-2 border border-white rounded ml-5">
        Logout
      </button>
    </div>
  );
};

