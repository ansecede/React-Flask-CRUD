import React, { useState } from "react";
import Modal from "./Modal";
import { FaTimes } from "react-icons/fa";
import {
  createCatalogDetail,
  getEditData,
  updateCatalogDetail,
} from "../utils/apiCalls";

function UpdateCatDetModal({
  openModal,
  setOpenModal,
  setData,
  setDone,
  parentId,
  childreId,
}) {
  const [estado, setEstado] = useState("");
  const [detalle, setDetalle] = useState(null);

  async function HandleUpdate() {
    await updateCatalogDetail(parentId, childreId, estado, detalle);
    setOpenModal(false);
    await getEditData(parentId, setData, setDone);
  }

  return (
    <>
      <Modal open={openModal}>
        <div className="flex flex-col justify-end items-end">
          <FaTimes color="white" onClick={() => setOpenModal(false)} />
        </div>
        <div className="flex justify-center mb-2">
          <h1 className="text-3xl sm:text-5xl font-semibold text-gray-50">
            Modificar Elemento
          </h1>
        </div>
        <div className="mt-4 text-gray-200">
          <label className="font-medium text-lg" htmlFor="">
            Codigo:
          </label>
          <input
            className="caret-transparent w-full border-2 border-gray-300 rounded-xl p-4 mt-2 bg-transparent placeholder-gray-500"
            type="text"
            disabled
            value={childreId}
            placeholder="Id del nuevo tipo Catalogo a crear"
            onChange={(event) => setId(event.target.value)}
          />
        </div>
        <div
          className="mt-4 text-gray-200 flex justify-between"
          onChange={(event) => setEstado(event.target.value)}
        >
          <label className="font-medium text-lg" htmlFor="">
            Estado:
          </label>
          <div>
            <label className="font-medium text-lg" htmlFor="activo">
              Activo:
            </label>
            <input value="A" name="estado" className="ml-6" type="radio" />
          </div>
          <div>
            <label className="font-medium text-lg" htmlFor="inactivo">
              Inactivo:
            </label>
            <input
              value="I"
              name="estado"
              className="mr-52 ml-6"
              type="radio"
            />
          </div>
        </div>
        <div className="mt-4 text-gray-200">
          <label className="font-medium text-lg" htmlFor="">
            Detalle:
          </label>
          <textarea
            className="w-full border-2 border-gray-300 rounded-xl p-4 mt-2 bg-transparent placeholder-gray-500"
            type="text"
            placeholder="Descripción tipo Catalogo a crear"
            onChange={(event) => setDetalle(event.target.value)}
          />
        </div>
        <div className="mb-3 w-full flex flex-col justify-end items-center text-gray-900">
          <button
            className={
              "p-4 rounded w-50 " +
              (detalle && estado
                ? "bg-emerald-400 active:scale-[.97] active:duration-75 transition-all hover:scale-[1.05] ease-in-out"
                : "bg-emerald-200")
            }
            disabled={detalle && estado ? false : true}
            onClick={HandleUpdate}
          >
            Actualizar
          </button>
        </div>
      </Modal>
    </>
  );
}

export default UpdateCatDetModal;
