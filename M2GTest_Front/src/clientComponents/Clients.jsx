import React, { useState } from "react";
import useGetData from "../utils/useGetData";
import ClientBody from "./ClientBody";
import ClientModal from "../modals/ClientModal";
import Loading from "../Loading";

function Clients() {
  const [data, setData, done, setDone] = useGetData("clients");
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="p-4 w-full bg-gray-700 flex-grow flex flex-col text-gray-50">
      <h1 className="font-semibold text-5xl mb-8 p-8">Clientes</h1>
      {openModal ? (
        <ClientModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          setData={setData}
          setDone={setDone}
          data={data}
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
          + Crear nuevo cliente
        </button>
      </div>
      <table className="w-full table-fixed md:table-fixed border border-spacing-0 border-gray-200 ">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-4 border-gray-600 border-2">Id Cliente</th>
            <th className="p-4 border-gray-600 border-2">Identificación</th>
            <th className="p-4 border-gray-600 border-2">Nombre Completo</th>
            <th className="p-4 border-gray-600 border-2">
              Tipo identificacion
            </th>
            <th className="p-4 border-gray-600 border-2">Acciones</th>
          </tr>
        </thead>
        {data.clientes ? <ClientBody data={data.clientes} /> : <tbody></tbody>}
      </table>
      {done ? <></> : <Loading />}
    </div>
  );
}

export default Clients;
