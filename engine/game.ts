export interface Jugador {
  nombre: string;
  posicion: string;
  media: number;        
  fisico: number;       
  golesTotales: number;
}

export interface ResultadoPartido {
  nota: number;
  gol: boolean;
  mensaje: string;
}

export function simularPartido(jugador: Jugador): ResultadoPartido {
  const suerte = (Math.random() * 4) - 2;
  let penalizadorFisico = 0;

  if (jugador.fisico < 50) {
    penalizadorFisico = 1.5;
  }

  let notaBase = (jugador.media / 10) + suerte - penalizadorFisico;
  const notaFinal = Number(Math.max(1, Math.min(10, notaBase)).toFixed(1));

  const probabilidadGol = notaFinal > 7 ? 0.6 : 0.15;
  const hizoGol = Math.random() < probabilidadGol;

  let mensaje = `Rendimiento: ${notaFinal}.`;
  if (hizoGol) {
    mensaje += " ¡Hiciste un golazo!";
  } else if (notaFinal < 5) {
    mensaje += " Estuviste irreconocible en la cancha, te silbó la hinchada.";
  } else {
    mensaje += " Cumpliste, pero no deslumbraste.";
  }

  return {
    nota: notaFinal,
    gol: hizoGol,
    mensaje,
  };
}