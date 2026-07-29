"use client";

import { useState } from "react";

export default function Home() {
  const [nombre, setNombre] = useState("");
  const [posicion, setPosicion] = useState("DC");

  // Coordenadas para ubicar las posiciones sobre tu cancha de 460x460
  const posiciones = [
    { id: "EI", top: "32%", left: "22%" },
    { id: "DC", top: "20%", left: "50%" },
    { id: "ED", top: "32%", left: "78%" },
    { id: "MCO", top: "58%", left: "50%" },
  ];

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center p-4">
      {/* Contenedor principal de Figma (1070px x 595px) */}
      <main
        className="relative w-full max-w-[1070px] min-h-[595px] bg-[#030614] border border-[#233362] rounded-2xl p-8 md:p-12 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center overflow-hidden"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.25), rgba(0,0,0,0.25) 2px, transparent 2px, transparent 4px)",
        }}
      >
        {/* COLUMNA IZQUIERDA */}
        <div className="flex flex-col justify-between h-full space-y-8 z-10">
          <div className="space-y-8">
            {/* Título exacto de Figma */}
            <h1 className="font-[family-name:var(--font-bebas)] text-5xl md:text-6xl text-white font-normal uppercase tracking-[8.16px] leading-none">
              Crea tu futbolista
            </h1>

            {/* Input exacto de Figma */}
            <div className="relative flex h-[53px] w-full max-w-[407px] items-center justify-center gap-2.5 rounded-xl border border-solid border-[#818181] bg-[#030303] py-3 pl-4 pr-[9px]">
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="pibe, decime tu nombre..."
                className="w-full bg-transparent text-center font-[family-name:var(--font-bebas)] text-3xl md:text-4xl font-normal leading-normal tracking-wide text-white placeholder:text-[#494949] focus:outline-none"
              />
            </div>
          </div>

          {/* Botón Continuar Carrera exacto de Figma */}
          <button
            onClick={() =>
              alert(
                nombre.trim()
                  ? `¡Carrera iniciada para ${nombre} de ${posicion}!`
                  : "¡Poné tu nombre antes de empezar!"
              )
            }
            className="self-start font-[family-name:var(--font-bebas)] text-3xl md:text-4xl font-normal text-white uppercase tracking-normal leading-normal hover:text-blue-400 transition cursor-pointer"
          >
            CONTINUAR CARRERA
          </button>
        </div>

        {/* COLUMNA DERECHA: Cancha + Pregunta */}
        <div className="flex flex-col space-y-4 z-10 items-end">
          <h2 className="font-[family-name:var(--font-bebas)] text-3xl md:text-4xl text-white font-normal uppercase tracking-normal">
            ¿DE QUÉ JUGÁS PENDEJO?
          </h2>

          {/* Cancha 460x460 de Figma */}
          <div className="relative w-full max-w-[460px] aspect-square rounded-xl overflow-hidden border border-[#233362]/40 shadow-2xl">
            <img
              src="/cancha.png"
              alt="Cancha"
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
            />

            {/* Posiciones interactivas sobre la imagen */}
            {posiciones.map((pos) => {
              const isSelected = posicion === pos.id;
              return (
                <button
                  key={pos.id}
                  onClick={() => setPosicion(pos.id)}
                  style={{ top: pos.top, left: pos.left }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full font-[family-name:var(--font-bebas)] text-xl flex items-center justify-center transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white text-[#030303] scale-110 shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                      : "bg-[#030303]/80 text-white border border-[#818181] hover:bg-blue-900"
                  }`}
                >
                  {pos.id}
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}