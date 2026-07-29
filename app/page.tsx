"use client";

import { useState } from "react";

export default function Home() {
  const [nombre, setNombre] = useState("");
  const [posicion, setPosicion] = useState("DC");

  const posiciones = [
    { id: "EI", top: "32%", left: "25%", label: "Extremo Izquierdo" },
    { id: "DC", top: "20%", left: "50%", label: "Delantero Centro" },
    { id: "ED", top: "32%", left: "75%", label: "Extremo Derecho" },
    { id: "MCO", top: "52%", left: "50%", label: "Medio Ofensivo" },
  ];

  const handleEmpezar = () => {
    if (!nombre.trim()) {
      alert("¡Che, poné tu nombre antes de empezar!");
      return;
    }
    alert(`¡Carrera iniciada para ${nombre} jugando de ${posicion}!`);
    // Acá conectaremos con la pantalla del juego principal
  };

  return (
    <main className="min-h-screen bg-[#070b19] text-white flex items-center justify-center p-4 selection:bg-blue-500 selection:text-white">
      {/* Tarjeta Principal Centrada */}
      <div className="w-full max-w-4xl bg-[#131936]/90 border border-blue-500/30 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* COLUMNA IZQUIERDA: Formulario */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wider text-white">
              Crea tu futbolista
            </h1>

            {/* Input de Nombre */}
            <div className="space-y-2">
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="PIBE, DECIME TU NOMBRE..."
                className="w-full bg-[#0b0f24] border border-blue-500/40 rounded-lg px-4 py-3 text-sm md:text-base text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
              />
            </div>
          </div>

          {/* Botón Continuar Carrera */}
          <button
            onClick={handleEmpezar}
            className="w-full md:w-auto self-start bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg tracking-wide uppercase transition shadow-lg shadow-blue-900/40 hover:scale-[1.02] active:scale-95"
          >
            Continuar Carrera
          </button>
        </div>

        {/* COLUMNA DERECHA: Canchita Táctica */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-right text-sm md:text-base font-bold uppercase tracking-wider text-slate-300">
            ¿De qué jugás pendejo?
          </h2>

          {/* Representación de la cancha */}
          <div className="relative w-full aspect-[3/4] bg-[#0b1026] border border-blue-500/30 rounded-xl overflow-hidden p-4 flex flex-col justify-between">
            {/* Dibujo del Área Grande */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/5 h-1/4 border-b border-x border-blue-500/20 rounded-b-md"></div>
            {/* Círculo Central */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 border border-blue-500/20 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-500/40 rounded-full"></div>
            </div>
            {/* Línea de Medio Campo */}
            <div className="absolute top-1/2 left-0 w-full border-t border-blue-500/20"></div>

            {/* Botones de Posiciones Interactivos */}
            {posiciones.map((pos) => {
              const isSelected = posicion === pos.id;
              return (
                <button
                  key={pos.id}
                  onClick={() => setPosicion(pos.id)}
                  style={{ top: pos.top, left: pos.left }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full font-bold text-xs md:text-sm flex items-center justify-center transition-all duration-200 shadow-md ${
                    isSelected
                      ? "bg-white text-blue-950 scale-110 ring-4 ring-blue-400 shadow-blue-500/50"
                      : "bg-[#182046] text-white border border-blue-400/40 hover:bg-blue-600/50"
                  }`}
                  title={pos.label}
                >
                  {pos.id}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </main>
  );
}