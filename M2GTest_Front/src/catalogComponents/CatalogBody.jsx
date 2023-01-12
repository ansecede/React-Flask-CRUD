import React from "react";
import { Link } from "react-router-dom";
import { deleteCatalog, getData } from "../utils/apiCalls";

function CatalogBody({ data, setData, setDone }) {
  async function HandleDelete(id) {
    await deleteCatalog(id);
    await getData("catalogs", setData, setDone);
  }

  return (
    <tbody>
      {data.map((row, idx) => {
        if (row.Estado === "A")
          return (
            <tr key={idx}>
              <td className="border-2 border-spacing-0 border-gray-600 p-4">
                {row.IdTabla}
              </td>
              <td className="border-2 border-spacing-0 border-gray-600 p-4">
                {row.TablaNombre}
              </td>
              <td className="border-2 border-spacing-0 border-gray-600 p-4">
                {row.Estado}
              </td>
              <td className="border-2 border-spacing-0 border-gray-600 p-4">
                {row.Descripcion}
              </td>
              <td className="border-2 border-spacing-0 border-gray-600 p-4 text-center">
                <Link
                  className="underline hover:text-emerald-400"
                  to={`/catalogs/edit/${row.IdTabla}`}
                  target="_blank"
                >
                  Editar
                </Link>
                {" - "}
                <span
                  className="underline hover:text-emerald-400 cursor-pointer"
                  onClick={() => HandleDelete(row.IdTabla)}
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

export default CatalogBody;
