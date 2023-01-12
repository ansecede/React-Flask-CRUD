import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useGetEditData from "../utils/useGetEditData";
import EditCatalogDetBody from "./EditCatalogDetBody";
import Loading from "../Loading";
import Sidetable from "./Sidetable";
import CreateCatDetModal from "../modals/CreateCatDetModal";
import UpdateCatDetModal from "../modals/UpdateCatDetModal";

function EditCatalogDet() {
  //Esta función trae los parametros del url
  const params = useParams();
  //Custom Hook
  const [data, setData, done, setDone] = useGetEditData(params.id);
  //Control del modal de creacion: CreateCatDetModal
  const [openCreateModal, setOpenCreateModal] = useState(false);
  //Control del modal de creacion: CreateCatDetModal
  const [openEditModal, setOpenEditModal] = useState(false);
  const [catToEditId, setCatToEditId] = useState(null);

  return (
    <>
      <div className="p-4 w-full bg-gray-700 flex-grow flex flex-col text-gray-50">
        <h1 className="font-semibold text-5xl mb-8">Tipos de Catalogos</h1>

        {/* Logica para renderizar o no los Modales */}
        {openCreateModal ? (
          <CreateCatDetModal
            openModal={openCreateModal}
            setOpenModal={setOpenCreateModal}
            setData={setData}
            setDone={setDone}
            lastId={data.Catalogos_Det.length}
            parentId={params.id}
            // setOpenRegisterModal={() => setOpenRegisterModal(false)}
          />
        ) : (
          <></>
        )}

        {openEditModal ? (
          <UpdateCatDetModal
            openModal={openEditModal}
            setOpenModal={setOpenEditModal}
            setData={setData}
            setDone={setDone}
            lastId={data.Catalogos_Det.length}
            parentId={params.id}
            childreId={catToEditId}
            setChildreId={setCatToEditId}
            // setOpenRegisterModal={() => setOpenRegisterModal(false)}
          />
        ) : (
          <></>
        )}

        {/* {Tabla con informacion del Tipo de Catalogo} */}
        <div className="flex mb-8">
          <div className="w-1/2 justify-start">
            {data.Catalogos_Cab ? (
              <Sidetable data={data.Catalogos_Cab} />
            ) : (
              <></>
            )}
          </div>

          {/* Botones que no hacen nada, solo regresan a la ruta "/catalogs" */}
          <div className="w-1/2 flex flex-col justify-end items-end">
            <div className="mb-3 flex text-gray-900">
              <Link to={"/catalogs"}>
                <button
                  className={
                    "p-2 rounded mr-4 " +
                    (done
                      ? "bg-blue-400 active:scale-[.97] active:duration-75 transition-all hover:scale-[1.05] ease-in-out"
                      : "bg-blue-200")
                  }
                  disabled={done ? false : true}
                >
                  Guardar cambios
                </button>
              </Link>
              <Link to={"/catalogs"}>
                <button
                  className={
                    "p-2 rounded " +
                    (done
                      ? "bg-red-400 active:scale-[.97] active:duration-75 transition-all hover:scale-[1.05] ease-in-out"
                      : "bg-red-200")
                  }
                  disabled={done ? false : true}
                >
                  Cancelar
                </button>
              </Link>
            </div>

            {/* Boton para crear nuevo elemento  */}
            <div className="mb-3 w-full flex flex-col justify-end items-end text-gray-900">
              <button
                className={
                  "p-2 rounded w-50 " +
                  (done
                    ? "bg-emerald-400 active:scale-[.97] active:duration-75 transition-all hover:scale-[1.05] ease-in-out"
                    : "bg-emerald-200")
                }
                disabled={done ? false : true}
                onClick={() => {
                  setTimeout(() => {
                    setOpenCreateModal(true);
                  }, 600);
                }}
              >
                + Crear nuevo elemento
              </button>
            </div>
          </div>
        </div>

        {/* Seccion de cabecera de tabla */}
        <table className="w-full table-fixed border border-spacing-0 border-gray-200 shadow-sm">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-4 border-gray-600 border-2">IdCodigo</th>
              <th className="p-4 border-gray-600 border-2">IdTabla</th>
              <th className="p-4 border-gray-600 border-2">Estado Catalogo</th>
              <th className="p-4 border-gray-600 border-2">Detalle</th>
              <th className="p-4 border-gray-600 border-2">Acciones</th>
            </tr>
          </thead>
          {/* Cuerpo de la tabla */}
          {data.Catalogos_Det ? (
            <EditCatalogDetBody
              data={data.Catalogos_Det}
              setData={setData}
              setDone={setDone}
              setOpenModal={setOpenEditModal}
              setChildreId={setCatToEditId}
            />
          ) : (
            <tbody></tbody>
          )}
        </table>
        {done ? <></> : <Loading />}
      </div>
    </>
  );
}

export default EditCatalogDet;
