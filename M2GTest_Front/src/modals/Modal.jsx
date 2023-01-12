import React from "react";

// Componente base para crear los modales hijos
function Modal({ open, children }) {
  if (!open) return null;
  return (
    <>
      <div className="fixed flex justify-center top-0 left-0 w-full h-full bg-black bg-opacity-80 z-['1000'] overflow-y-auto p-8">
        <div className="absolute bg-gray-600 p-4 z-['1000'] w-2/3 rounded-lg">
          {children}
        </div>
      </div>
    </>
  );
}

export default Modal;
