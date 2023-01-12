import React, { useState } from "react";
import useGetData from "../utils/useGetData";
import CatalogBody from "./CatalogBody";
import CreateCatalogModal from "../modals/CreateCatalogModal";
import Loading from "../Loading";

function Catalogs() {
  const [data, setData, done, setDone] = useGetData("catalogs");
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="p-4 w-full bg-gray-700 flex-grow flex flex-col text-gray-50">
      <h1 className="font-semibold text-5xl mb-8 p-8">Tipos de Catalogos</h1>{" "}
      {openModal ? (
        <CreateCatalogModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          setData={setData}
          setDone={setDone}
          lastId={data.length}
          // setOpenRegisterModal={() => setOpenRegisterModal(false)}
        />
      ) : (
        <></>
      )}
      <div className="mb-3 w-full flex flex-col justify-end items-end text-gray-900">
        <button
          className={
            "p-4 rounded w-50 " +
            (done
              ? "bg-emerald-400 active:scale-[.97] active:duration-75 transition-all hover:scale-[1.05] ease-in-out"
              : "bg-emerald-200")
          }
          disabled={done ? false : true}
          onClick={() => {
            setTimeout(() => {
              setOpenModal(true);
            }, 600);
          }}
        >
          + Crear nuevo elemento
        </button>
      </div>
      <table className="w-full table-fixed border border-spacing-0 border-gray-200 shadow-sm">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-4 border-gray-600 border-2">IdTabla</th>
            <th className="p-4 border-gray-600 border-2">Nombre Tabla</th>
            <th className="p-4 border-gray-600 border-2">Estado Tabla</th>
            <th className="p-4 border-gray-600 border-2">Descripcion</th>
            <th className="p-4 border-gray-600 border-2">Acciones</th>
          </tr>
        </thead>
        {done ? (
          <CatalogBody data={data} setData={setData} setDone={setDone} />
        ) : (
          <tbody></tbody>
        )}
      </table>
      {done ? <></> : <Loading />}
    </div>
  );
}

export default Catalogs;
