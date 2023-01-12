import React from "react";

function Sidetable({ data }) {
  return (
    <table className="w-full table-fixed border border-spacing-0 border-gray-200 shadow-sm">
      <tbody>
        <tr>
          <td className="p-4 bg-gray-800 border-gray-600 border-2">Nombre</td>
          <td className="p-4 border-gray-600 border-2">{data.TablaNombre}</td>
        </tr>
        <tr>
          <td className="p-4 bg-gray-800 border-gray-600 border-2">Estado</td>
          <td className="p-4 border-gray-600 border-2">{data.Estado}</td>
        </tr>
        <tr>
          <td className="p-4 bg-gray-800 border-gray-600 border-2">
            Descripcion
          </td>
          <td className="p-4 border-gray-600 border-2">{data.Descripcion}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Sidetable;
