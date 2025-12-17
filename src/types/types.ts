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
  key?: string;
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

export type PDLType = {
  errors?: [
    {
      message: string;
      locations: [{ line: number; column: number }];
      path: [string];
      extensions: {
        id: string;
        code: string;
        classification: string;
      };
    },
  ];
  data: {
    hentPerson: {
      navn: [
        {
          fornavn: string;
          mellomnavn: string | null;
          etternavn: string;
        },
      ];
    } | null;
  };
};

export type Utbetaling = {
  ytelse: string;
  ytelseDato: string;
  nettoUtbetalt: number;
  bruttoUtbetalt: number;
  erUtbetalt: boolean;
  melding: string;
  ytelsePeriode: { fom: string; tom: string };
  kontonummer: string;
  underytelse: UnderYtelseType[];
  trekk: Trekk[];
};

export type Bruker = {
  navn: string | null;
  ident: string | null;
};
