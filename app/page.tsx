'use client';

import { useEffect, useState, type ReactNode } from 'react';
import formaciones from './data/lanus.json';

type Partido = (typeof formaciones)[number];
type Jugador = Partido['titulares'][number];

const normalizarTexto = (texto: string) => {
  return texto
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export default function Home() {
  const [nivelActual, setNivelActual] = useState(0);
  const partidoActual = formaciones[nivelActual];
  
  const [inputTexto, setInputTexto] = useState('');
  const [acertados, setAcertados] = useState<string[]>([]);
  const [rendido, setRendido] = useState(false);
  const [tiempo, setTiempo] = useState(0);
  const manejarInput = (valor: string) => {
    setInputTexto(valor);
    const busqueda = normalizarTexto(valor);

    if (!busqueda) return;

    partidoActual.titulares.forEach((jugador) => {
      const yaAcertado = acertados.includes(jugador.nombre);
      if (!yaAcertado) {
        const coincide = jugador.alias.some((alias: string) => normalizarTexto(alias) === busqueda);
        if (coincide) {
          setAcertados([...acertados, jugador.nombre]);
          setInputTexto('');
        }
      }
    });
  };

  const total = partidoActual.titulares.length;
  const ganaste = acertados.length === total;

  useEffect(() => {
    if (ganaste || rendido) return;

    const intervalo = window.setInterval(() => {
      setTiempo((segundos) => segundos + 1);
    }, 1000);

    return () => window.clearInterval(intervalo);
  }, [ganaste, rendido]);

  const formatearTiempo = (segundos: number) => {
    const minutos = Math.floor(segundos / 60);
    const resto = segundos % 60;
    return `${minutos}:${resto < 10 ? '0' : ''}${resto}`;
  };

  const pasarAlSiguiente = () => {
    if (nivelActual < formaciones.length - 1) {
      setNivelActual(nivelActual + 1);
      setAcertados([]);
      setInputTexto('');
      setRendido(false); // Reiniciamos la rendición
      setTiempo(0);
    }
  };

  return (
    <main className="min-h-[100svh] bg-slate-950 text-white flex flex-col items-center justify-start p-3 sm:p-6 font-sans">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Cabecera */}
        <div className="relative w-full mb-4 overflow-hidden rounded-2xl border border-slate-700/60 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-3.5 shadow-xl flex flex-col items-center">
          <div className="absolute top-0 h-1 w-full bg-[#800020]"></div>
          <h1 className="text-center text-xl font-black uppercase tracking-wide text-white drop-shadow sm:text-2xl">
            {partidoActual.titulo}
          </h1>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
            <span className="rounded-md border border-slate-700 bg-slate-950/70 px-2.5 py-1">DT: {partidoActual.dt}</span>
            <span className="rounded-md border border-slate-700 bg-slate-950/70 px-2.5 py-1">Esquema: {partidoActual.esquema}</span>
          </div>
        </div>

        {/* Buscador y controles */}
        <div className="mb-4 w-full">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4" aria-hidden="true">
              <span className="text-lg text-slate-400">⚽</span>
            </div>
            <input
              type="text"
              value={inputTexto}
              onChange={(e) => manejarInput(e.target.value)}
              disabled={ganaste || rendido}
              placeholder={ganaste ? "¡Plantel completado!" : (rendido ? "Partido finalizado" : "Escribí apellido o apodo...")}
              className="w-full rounded-2xl border-2 border-slate-700 bg-slate-900 py-3.5 pl-12 pr-4 text-left text-base font-bold text-white shadow-inner transition-all placeholder:font-medium placeholder:text-slate-500 focus:border-[#800020] focus:outline-none disabled:opacity-60 sm:text-lg"
              autoFocus
            />
          </div>

          <div className="mt-2.5 px-1">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-300">Aciertos:</span>
                <span className={`rounded-md border px-2.5 py-0.5 text-sm font-black ${ganaste ? 'border-emerald-500/30 bg-emerald-500/20 text-emerald-400' : 'border-slate-700 bg-slate-800 text-white'}`}>
                  {acertados.length} / {total}
                </span>
              </div>
              <div className="flex items-center gap-1.5 rounded-md border border-slate-800 bg-slate-900 px-3 py-1 font-mono text-sm font-bold text-slate-300" aria-label={`Tiempo ${formatearTiempo(tiempo)}`}>
                <span aria-hidden="true">⏱️</span>
                {formatearTiempo(tiempo)}
              </div>
            </div>
            <div className="mt-1.5 flex items-center justify-between">
              {!ganaste && !rendido && (
                <button
                  onClick={() => setRendido(true)}
                  className="text-left text-xs font-bold uppercase tracking-wider text-red-400/80 underline underline-offset-2 transition-colors hover:text-red-300"
                >
                  No me acuerdo (Rendirse)
                </button>
              )}

              {(ganaste || rendido) && (
                <button
                  onClick={pasarAlSiguiente}
                  className={`rounded-xl px-4 py-2.5 text-xs font-black uppercase tracking-wider shadow-lg transition-transform hover:scale-105 active:scale-95 ${ganaste ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-emerald-500/20' : 'bg-slate-700 text-white hover:bg-slate-600'}`}
                >
                  {nivelActual < formaciones.length - 1 ? "Siguiente ➡" : "Fin del juego"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* La Pizarra Dinámica */}
        <div
          className="relative flex aspect-[4/5] max-h-[55vh] w-full flex-col overflow-hidden rounded-2xl border-[3px] border-slate-700 bg-[#16291d] p-3 shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
          style={{ backgroundImage: 'repeating-linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.12) 25px, transparent 25px, transparent 50px)' }}
        >
          {/* Líneas de la cancha */}
          <div className="pointer-events-none absolute inset-0 m-3 rounded-xl border-2 border-white/20"></div>
          <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-white/20"></div>
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-[2px] border-white/20"></div>
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30"></div>

          {/* Arcos */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-4 w-20 -translate-x-1/2 rounded-b-md border-x-2 border-b-2 border-white/20"></div>
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-4 w-20 -translate-x-1/2 rounded-t-md border-x-2 border-t-2 border-white/20"></div>

          {/* Renderizado dinámico de la formación */}
          <div className="relative z-10 flex h-full flex-col justify-between py-2">
            {renderizarCancha(partidoActual, acertados, rendido)}
          </div>
        </div>
      </div>
    </main>
  );
}

// Función que acomoda solita a los jugadores (ahora recibe "rendido")
function renderizarCancha(partido: Partido, acertados: string[], rendido: boolean): ReactNode[] {
  const lineas = partido.esquema.split('-'); 
  const lineasNumericas = lineas.map(Number).reverse(); 
  
  const filas: ReactNode[] = [];
  let jugadorIndex = partido.titulares.length - 1; 

  lineasNumericas.forEach((cantidad, indiceFila) => {
    const jugadoresEnEstaLinea: Jugador[] = [];
    for (let i = 0; i < cantidad; i++) {
      if (jugadorIndex >= 1) { 
        jugadoresEnEstaLinea.push(partido.titulares[jugadorIndex]);
        jugadorIndex--;
      }
    }
    
    filas.push(
      <div key={`fila-${indiceFila}`} className="my-auto flex w-full items-center justify-around">
        {jugadoresEnEstaLinea.map((j) => (
          <Ficha key={j.pos + j.nombre} jugador={j} acertado={acertados.includes(j.nombre)} rendido={rendido} />
        ))}
      </div>
    );
  });

  filas.push(
    <div key="arquero" className="my-auto flex w-full items-center justify-center">
      <Ficha key="ARQ" jugador={partido.titulares[0]} acertado={acertados.includes(partido.titulares[0].nombre)} rendido={rendido} />
    </div>
  );

  return filas;
}

// Componente visual (ahora pinta de rojo a los que no adivinaste si te rendís)
function Ficha({ jugador, acertado, rendido }: { jugador: Jugador, acertado: boolean, rendido: boolean }) {
  const apellido = jugador.nombre.split(' ').pop() ?? jugador.nombre;

  let estilosIman = 'bg-slate-900/95 text-slate-200 border-2 border-slate-500 shadow-md';
  let colorTexto = 'text-slate-200 font-semibold';
  let textoMostrar = '???';

  if (acertado) {
    estilosIman = 'bg-gradient-to-br from-[#9c0a2d] to-[#54121c] text-white scale-110 shadow-[0_0_20px_rgba(156,10,45,0.8)] border-2 border-white/60 z-10';
    colorTexto = 'text-white font-black drop-shadow';
    textoMostrar = apellido;
  } else if (rendido) {
    estilosIman = 'bg-gradient-to-br from-red-950 to-slate-900 text-red-300 border-2 border-red-700/80 opacity-95';
    colorTexto = 'text-red-300 font-bold';
    textoMostrar = apellido;
  }

  return (
    <div className="group relative flex w-[22%] flex-col items-center sm:w-20">
      <div className={`flex h-11 w-11 items-center justify-center rounded-full text-xs font-black transition-all duration-300 ease-out sm:h-12 sm:w-12 ${estilosIman}`}>
        {jugador.pos}
      </div>
      <span className={`mt-1.5 flex min-h-[2rem] items-start justify-center rounded bg-slate-950/40 px-1 text-center text-[11px] leading-tight tracking-wide sm:text-xs ${colorTexto}`}>
        {textoMostrar}
      </span>
    </div>
  );
}
