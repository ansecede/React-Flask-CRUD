import React, { useEffect, useState } from "react";
import { getData } from "./apiCalls";

function useGetData(route) {
  const [data, setData] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData([]);
      getData(route, setData, setDone);
    }, 1000);
  }, []);

  return [data, setData, done, setDone];
}

export default useGetData;
