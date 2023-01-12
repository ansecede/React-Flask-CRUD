import React from "react";
import Modal from "./Modal";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import { createClientEntrys } from "../utils/constans";

function ClientModal({ openModal, setOpenModal, setData, setDone, data }) {
  const [nombre1, setNombre1] = useState(null);
  const [nombre2, setNombre2] = useState(null);
  const [apellido1, setApellido1] = useState(null);
  const [apellido2, setApellido2] = useState(null);
  const [tipoIdentificacion, setTipoIdentificacion] = useState(null);
  const [identificacion, setIdentificacion] = useState(null);
  const [fechaNacimiento, setFechaNacimiento] = useState(null);
  const [edad, setEdad] = useState(null);
  const [sexo, setSexo] = useState(null);
  const [estadoCivil, setEstadoCivil] = useState(null);
  const [nacionalidad, setNacionalidad] = useState(null);
  const [email, setEmail] = useState(null);
  const [celular, setCelular] = useState(null);
  const [convencional, setConvencional] = useState(null);
  const [provincia, setProvincia] = useState(null);
  const [ciudad, setCiudad] = useState(null);
  const [ciudadela, setCiudadela] = useState(null);
  const [callePrincipal, setCallePrincipal] = useState(null);
  const [calleSecundaria, setCalleSecundaria] = useState(null);
  const [manzana, setManzan] = useState(null);
  const [villa, setVilla] = useState(null);
  const [referencia, setReferencia] = useState(null);
  const [formaPago, setFormaPago] = useState(null);
  const [estado, setEstado] = useState(null);

  const completedForm =
    nombre1 &&
    nombre2 &&
    apellido1 &&
    apellido2 &&
    tipoIdentificacion &&
    identificacion &&
    fechaNacimiento &&
    edad &&
    sexo &&
    estadoCivil &&
    nacionalidad &&
    email &&
    celular &&
    convencional &&
    provincia &&
    ciudad &&
    ciudadela &&
    callePrincipal &&
    calleSecundaria &&
    manzana &&
    villa &&
    referencia &&
    formaPago &&
    estado;

  const setters = [
    setNombre1,
    setNombre2,
    setApellido1,
    setApellido2,
    setTipoIdentificacion,
    setIdentificacion,
    setFechaNacimiento,
    setEdad,
    setSexo,
    setEstadoCivil,
    setNacionalidad,
    setEmail,
    setCelular,
    setConvencional,
    setProvincia,
    setCiudad,
    setCiudadela,
    setCallePrincipal,
    setCalleSecundaria,
    setManzan,
    setVilla,
    setReferencia,
    setFormaPago,
    setEstado,
  ];

  return (
    <Modal open={openModal}>
      <div className="flex flex-col justify-end items-end">
        <FaTimes color="white" onClick={() => setOpenModal(false)} />
      </div>
      <div className="flex justify-center mb-2">
        <h1 className="text-3xl sm:text-5xl font-semibold text-gray-50">
          Crear Tipo Catalogo
        </h1>
      </div>
      {createClientEntrys.map((value, idx) => {
        if (
          value.type === "text" ||
          value.type === "email" ||
          value.type === "textarea" ||
          value.type === "date"
        ) {
          return (
            <div key={idx} className="mt-4 text-gray-200">
              <label className="font-medium text-md" htmlFor="">
                {value.text}
              </label>
              <input
                className="w-full border-2 border-gray-300 rounded-xl p-3 mt-1 bg-transparent placeholder-gray-500"
                type={value.type}
                placeholder={`Ingrese ${value.text}`}
                disabled={value.name === "edad" ? true : false}
                onChange={(event) => setters[idx](event.target.value)}
              />
            </div>
          );
        } else if (value.type === "select") {
          return (
            <div key={idx} className="mt-4 text-gray-200">
              <label className="font-medium text-md" htmlFor="">
                {value.text}
              </label>
              <select
                className="w-full border-2 border-gray-300 rounded-xl p-3 mt-1 bg-transparent"
                placeholder="Nombre del nuevo tipo Catalogo a crear, seguir el patron tbl_Nombre"
                onChange={(event) => setters[idx](event.target.value)}
              >
                <option
                  className="text-black"
                  value="disabled"
                  key="disabled"
                  disabled
                >{`Seleccione ${value.text}`}</option>
                {data[value.name].map((option, index) => {
                  return (
                    <option className="text-black" key={index} value={option}>
                      {option}
                    </option>
                  );
                })}
              </select>
            </div>
          );
        } else if (value.type === "radio") {
          return (
            <div
              key={idx}
              className="mt-4 text-gray-200 flex justify-between"
              onChange={(event) => setEstado(event.target.value)}
            >
              <label className="font-medium text-lg" htmlFor="">
                {value.text}
              </label>
              <div>
                <label className="font-medium text-lg" htmlFor="activo">
                  Activo:
                </label>
                <input
                  value="A"
                  name={value.name}
                  className="ml-6"
                  type="radio"
                />
              </div>
              <div>
                <label className="font-medium text-lg" htmlFor="inactivo">
                  Inactivo:
                </label>
                <input
                  value="I"
                  name={value.name}
                  className="mr-52 ml-6"
                  type={value.type}
                />
              </div>
            </div>
          );
        } else if (value.type === "date") {
        }
      })}
      <button
        className={
          "p-4 rounded w-50 " +
          (completedForm
            ? "bg-emerald-400 active:scale-[.97] active:duration-75 transition-all hover:scale-[1.05] ease-in-out"
            : "bg-emerald-200")
        }
        disabled={completedForm ? false : true}
        onClick={() => {}}
      >
        Crear
      </button>
    </Modal>
  );
}

export default ClientModal;
