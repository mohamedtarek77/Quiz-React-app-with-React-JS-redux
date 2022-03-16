import axios from "axios";
import React, { useEffect, useState } from "react";

axios.defaults.baseURL = "https://opentdb.com/";

const useAxios = ( {url} ) => {
  const [response, setresponse] = useState(null);

  const [error, seterror] = useState("");

  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(url)
        .then((res) => setresponse(res.data))
        .catch((err) => seterror(err))
        .finally(() => setloading(false));
    };
    fetchData();
  }, [url]);

  return { response, error, loading };
};

export default useAxios;
