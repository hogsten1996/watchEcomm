import React, { useState, useEffect } from "react";

const AllWatches = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/watch");
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Run the effect only once when the component mounts

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <div>
          <h2>All Watches</h2>
          {data.map((watch) => (
            <div key={watch.id}>
              <h3>{watch.name}</h3>
              <p>Price: ${watch.price}</p>
              <img src={watch.image} alt={watch.name} />
              <p>{watch.details}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllWatches;

