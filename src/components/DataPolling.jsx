import { useEffect, useState } from "react";
import { API_URL } from "../utils/constants";

const DataPolling = () => {
  const [pollData, setPolldata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const resp = await fetch(
        `${API_URL}${Math.floor(Math.random() * 100) + 1}`
      );
      const data = await resp.json();
      setPolldata([data]);
      setError("");
      console.log([data]);
    } catch (error) {
      setError(error);
      setPolldata([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    const timerId = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-center bg-gray-900 text-white items-center">
      <h1 className="font-bold text-2xl p-2">Live Data Polling</h1>

      {error && <p className="text-red-300">{error}</p>}
      <button
        className="px-6 py-2 bg-blue-300 rounded-lg mb-4 cursor-pointer hover:bg-amber-300"
        onClick={() => fetchData()}
      >
        Refresh
      </button>
      {isLoading ? (
        <p className="text-sm">...Loading</p>
      ) : (
        <ul className="w-full max-w-md">
          {pollData?.map((item) => (
            <li key={item.id} className="bg-gray-500 py-2 rounded-lg">
              {item?.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DataPolling;
