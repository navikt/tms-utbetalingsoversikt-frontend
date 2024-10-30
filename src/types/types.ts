export type UnderYtelseType = {
  beskrivelse: string;
  satstype: string;
  sats: number;
  antall: number;
  beløp: number;
};

export type Trekk = {
  type: string;
  beløp: number;
};

export type UtbetalingType = {
  id: string;
  beløp: number;
  dato: string;
  ytelse: string;
};

export type UtbetalingGroupType = {
  år: number;
  måned: number;
  utbetalinger: UtbetalingType[];
};

export type Ytelse = { ytelse: string; beløp: number };

export type UtbetalingerIPeriode = {
  harUtbetalinger: boolean;
  brutto: number;
  netto: number;
  trekk: number;
  ytelser: Ytelse[];
};

export type UtbetalingerResponse = {
  neste: UtbetalingType[];
  tidligere: UtbetalingGroupType[];
  utbetalingerIPeriode: UtbetalingerIPeriode;
};
