import React, { useCallback, useState, useEffect } from "react";
import throttle from "lodash.throttle";

const itemRowHeight = 32; // same height as each row (32px, see styles.css)
const screenHeight = Math.max(
  document.documentElement.clientHeight,
  window.innerHeight || 0
); // get the height of the screen
const offset = screenHeight; // We want to render more than we see, or else we will see nothing when scrolling fast
const rowsToRender = Math.floor((screenHeight + offset) / itemRowHeight);

function ClientBody({ data }) {
  const [displayStart, setDisplayStart] = useState(0);
  const [displayEnd, setDisplayEnd] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const setDisplayPositions = useCallback(
    (scroll) => {
      // we want to start rendering a bit above the visible screen
      const scrollWithOffset = Math.floor(scroll - rowsToRender - offset / 2);
      // start position should never be less than 0
      const displayStartPosition = Math.round(
        Math.max(0, Math.floor(scrollWithOffset / itemRowHeight))
      );

      // end position should never be larger than our data array
      const displayEndPosition = Math.round(
        Math.min(displayStartPosition + rowsToRender, data.length)
      );

      setDisplayStart(displayStartPosition);
      setDisplayEnd(displayEndPosition);
    },
    [data.length]
  );

  useEffect(() => {
    setDisplayPositions(scrollPosition);
  }, [scrollPosition, setDisplayPositions]);

  useEffect(() => {
    const onScroll = throttle(() => {
      const scrollTop = window.scrollY;
      if (data.length !== 0) {
        setScrollPosition(scrollTop);
        setDisplayPositions(scrollTop);
      }
    }, 100);

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [setDisplayPositions, data.length]);

  const rows = [];

  rows.push(
    <tr
      key="startRowFiller"
      style={{ height: displayStart * itemRowHeight }}
    ></tr>
  );

  for (let i = displayStart; i < displayEnd; ++i) {
    const row = data[i];
    if (row !== undefined) {
      rows.push(
        <tr key={row.id_cliente} className="Row">
          <td className="border-2 h-[32px] border-spacing-0 border-gray-600 px-4">
            {row.id_cliente}
          </td>
          <td className="border-2 h-[32px] border-spacing-0 border-gray-600 px-4">
            {row.identificacion}
          </td>
          <td className="border-2 h-[32px] border-spacing-0 border-gray-600 px-4">
            {row.nombre1 +
              " " +
              row.nombre2 +
              " " +
              row.apellido1 +
              " " +
              row.apellido2}
          </td>
          <td className="border-2 h-[32px] border-spacing-0 border-gray-600 px-4">
            {row.Detalle}
          </td>
          <td className="border-2 h-[32px] border-spacing-0 border-gray-600 px-4">
            Editar-Borrar
          </td>
        </tr>
      );
    }
  }

  rows.push(
    <tr
      key="endRowFiller"
      style={{ height: (data.length - displayEnd) * itemRowHeight }}
    ></tr>
  );

  return <tbody>{rows}</tbody>;
}

export default ClientBody;
