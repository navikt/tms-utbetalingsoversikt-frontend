import type { UnderYtelseType } from "@src/types/types";

const utbetalingerMedSats = ["ARBEIDSAVKLARINGSPENGER", "DAGPENGER"];

export function isUtbetalingWithSats(type: string): boolean {
  for (const ytelse of utbetalingerMedSats) {
    if (ytelse.toUpperCase() === type.toUpperCase()) {
      return true;
    }
  }

  return false;
}

export function satsDescription(ytelse: UnderYtelseType): string {
  if (ytelse.satstype === "Prosent") {
    return `(${formaterTallTilKomma({
      tall: ytelse.antall,
      maxDesimaler: 4,
    })} kroner à ${formaterTallUtenDesimaler(ytelse.sats)}%)`;
  } else {
    return `(${formaterTallTilKomma({
      tall: ytelse.antall,
      maxDesimaler: 4,
    })} dager à ${formaterTallUtenDesimaler(ytelse.sats)} kroner)`;
  }
}

export function formaterTallTilKomma({
  tall,
  minDesimaler = 0,
  maxDesimaler = 3,
}: {
  tall: number;
  minDesimaler?: number;
  maxDesimaler?: number;
}): string {
  if (minDesimaler > maxDesimaler) {
    maxDesimaler = minDesimaler;
  }

  return tall
    ? tall.toLocaleString("no-nb", {
        minimumFractionDigits: minDesimaler,
        maximumFractionDigits: maxDesimaler,
      })
    : "0";
}

export function formaterTallUtenDesimaler(tall: number): string {
  return tall ? tall.toLocaleString("no-nb") : "0";
}

export function formaterVekkTommeMeldinger(tekster: { [key: string]: string }) {
  for (const tekstNoekkel in tekster) {
    if (tekster[tekstNoekkel].length === 0) {
      tekster[tekstNoekkel] = " ";

      // Akkurat naa er det kun utbetalinger.info.tekst som er tom.
      // Fjern return hvis flere tekster kan være tomme
      return tekster;
    }
  }

  return tekster;
}
