import React, { useEffect, useState } from "react";
import { getEditData } from "./apiCalls";

function useGetEditData(catalogCabId) {
  const [data, setData] = useState({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    setData({});
    getEditData(catalogCabId, setData, setDone);
  }, []);

  return [data, setData, done, setDone];
}

export default useGetEditData;
