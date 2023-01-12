//Pide datos a la API. Dependiendo de la ruta, retorna JSON de Clientes o Catalogos
export async function getData(route, dataSetter, doneSetter) {
  /* 
  --------------- Trying out AJAX and a different syntax ---------------
  let xhttp = new XMLHttpRequest();

  xhttp.open("GET", `http://localhost:5000/${route}`, true);
  xhttp.send();

  xhttp.onreadystatechange = function () {
    console.lo(JSON.parse(this.responseText));
    dataSetter(JSON.parse(this.responseText));
    doneSetter(true);
  };
  */
  const res = await fetch(`http://localhost:5000/${route}`);
  const data = await res.json().then(doneSetter(true));

  dataSetter(data);
}

//Pide datos de los tipos de Catalogos y sus elementos/detalles
export async function getEditData(catalogCabId, dataSetter, doneSetter) {
  const res = await fetch(
    `http://localhost:5000/catalogs/${catalogCabId}/edit`
  );
  const data = await res.json().then(doneSetter(true));
  dataSetter(data);
}

//Crea un catalogo en la ruta /catalogs
export async function createCatalog(id, nombre, estado, descripcion) {
  const res = await fetch("http://localhost:5000/catalogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      IdTabla: id,
      TablaNombre: nombre,
      Estado: estado,
      Descripcion: descripcion,
    }),
  });
  const data = await res.json();

  console.log(data);
}

// Borra logicamente los Catalogos cuando se presiona Eliminar
export async function deleteCatalog(catalogCabId) {
  const res = await fetch(`http://localhost:5000/catalogs/${catalogCabId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Estado: "I",
    }),
  });
  const data = await res.json();

  console.log(data);
}

export async function createCatalogDetail(catalogCabId, id, estado, detalle) {
  const res = await fetch(
    `http://localhost:5000/catalogs/${catalogCabId}/edit`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        IdCodigo: id,
        Estado: estado,
        Detalle: detalle,
      }),
    }
  );
  const data = await res.json();

  console.log(data);
}

export async function updateCatalogDetail(
  catalogCabId,
  catalogDetId,
  estado,
  detalle
) {
  const res = await fetch(
    `http://localhost:5000/catalogs/${catalogCabId}/edit/${catalogDetId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Estado: estado,
        Detalle: detalle,
      }),
    }
  );
  const data = await res.json();

  console.log(data);
}

export async function deleteCatalogDetail(catalogCabId, catalogDetId) {
  const res = await fetch(
    `http://localhost:5000/catalogs/${catalogCabId}/edit/${catalogDetId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Estado: "I",
      }),
    }
  );
  const data = await res.json();

  console.log(data);
}
