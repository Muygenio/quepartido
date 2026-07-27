"use client";

import { useState } from "react";
import { simularPartido, Jugador, ResultadoPartido } from "@/engine/game";
export default function Home() {
  const [jugador, setJugador] = useState<Jugador>({
    nombre: "Pibe Promesa",
    posicion: "Delantero",
    media: 70,
    fisico: 100,
    golesTotales: 0,
  });

  const [resultado, setResultado] = useState<ResultadoPartido | null>(null);

  const jugarPartido = () => {
    const res = simularPartido(jugador);
    setResultado(res);

    if (res.gol) {
      setJugador((prev) => ({
        ...prev,
        golesTotales: prev.golesTotales + 1,
        fisico: Math.max(10, prev.fisico - 15),
      }));
    } else {
      setJugador((prev) => ({
        ...prev,
        fisico: Math.max(10, prev.fisico - 15),
      }));
    }
  };

  const salirDeJoda = () => {
    setJugador((prev) => ({
      ...prev,
      fisico: Math.max(0, prev.fisico - 40),
    }));
    alert("Te fuiste al boliche hasta las 6 AM... ¡Tu físico cayó en picada!");
  };

  const descansar = () => {
    setJugador((prev) => ({
      ...prev,
      fisico: Math.min(100, prev.fisico + 30),
    }));
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 rounded-xl p-6 shadow-2xl border border-slate-700">
        <h1 className="text-3xl font-bold text-center text-emerald-400 mb-4">
          ⚽ ¿Qué Partido?
        </h1>

        {/* Ficha del Jugador */}
        <div className="bg-slate-900 p-4 rounded-lg mb-6 space-y-2 border border-slate-800">
          <p className="text-lg font-semibold">{jugador.nombre} ({jugador.posicion})</p>
          <div className="flex justify-between text-sm text-slate-300">
            <span>Media: <strong className="text-white">{jugador.media}</strong></span>
            <span>Goles: <strong className="text-emerald-400">{jugador.golesTotales}</strong></span>
            <span>Físico: <strong className={jugador.fisico < 50 ? "text-red-400" : "text-green-400"}>{jugador.fisico}%</strong></span>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="grid grid-cols-1 gap-3 mb-6">
          <button
            onClick={jugarPartido}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg transition"
          >
            🏟️ Jugar Partido
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={descansar}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg text-sm transition"
            >
              🛌 Descansar (+30 Físico)
            </button>
            <button
              onClick={salirDeJoda}
              className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2 rounded-lg text-sm transition"
            >
              🕺 Salir de Noche (-40)
            </button>
          </div>
        </div>

        {/* Resultado del Último Partido */}
        {resultado && (
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-700">
            <h3 className="font-bold text-slate-400 text-xs uppercase mb-1">Último Partido</h3>
            <p className="text-slate-200">{resultado.mensaje}</p>
          </div>
        )}
      </div>
    </main>
  );
}