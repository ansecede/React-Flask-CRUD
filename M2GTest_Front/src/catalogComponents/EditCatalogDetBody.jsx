import React from "react";
import { deleteCatalogDetail, getEditData } from "../utils/apiCalls";

function EditCatalogDetBody({
  data,
  setOpenModal,
  setData,
  setDone,
  setChildreId,
}) {
  async function HandleDelete(idParent, IdChildren) {
    await deleteCatalogDetail(idParent, IdChildren);
    await getEditData(idParent, setData, setDone);
  }
  return (
    // Este componente renderiza todas las filas de la tabla que se obtienen llamando a la API
    <tbody>
      {data.map((row, idx) => {
        if (row.Estado === "A")
          return (
            <tr key={idx}>
              <td className="border-2 border-spacing-0 border-gray-600 p-4">
                {row.IdCodigo}
              </td>
              <td className="border-2 border-spacing-0 border-gray-600 p-4">
                {row.IdTabla}
              </td>
              <td className="border-2 border-spacing-0 border-gray-600 p-4">
                {row.Estado}
              </td>
              <td className="border-2 border-spacing-0 border-gray-600 p-4">
                {row.Detalle}
              </td>
              <td className="border-2 border-spacing-0 border-gray-600 p-4 text-center">
                <span
                  className="underline hover:text-emerald-400 cursor-pointer"
                  onClick={() => {
                    setOpenModal(true);
                    setChildreId(row.IdCodigo);
                  }}
                >
                  Editar
                </span>
                {" - "}
                <span
                  className="underline hover:text-emerald-400 cursor-pointer"
                  onClick={() => HandleDelete(row.IdTabla, row.IdCodigo)}
                >
                  Eliminar
                </span>
              </td>
            </tr>
          );
      })}
    </tbody>
  );
}

export default EditCatalogDetBody;
