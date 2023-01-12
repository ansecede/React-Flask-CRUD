import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center mt-15 pt-10">
      <AiOutlineLoading3Quarters
        className="text-gray-500 animate-spin"
        size={200}
        color={"#34d399"}
      />
      <h1 className="font-semibold text-3xl mt-8">Cargando...</h1>
    </div>
  );
}

export default Loading;
