const Appliedjobcard = ({ title, company, location, description }) => {
  const shortDescription =
    description.length > 100 ? description.slice(0, 100) + "..." : description;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">
        {company} · {location}
      </p>
      <p className="text-sm my-2">{shortDescription}</p>
      <div className="flex justify-between items-center">
        <button className=" mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Applied
        </button>
      </div>
    </div>
  );
};

export default Appliedjobcard;
