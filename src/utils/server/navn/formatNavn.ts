type Navn = {
  fornavn: string;
  mellomnavn: string | null;
  etternavn: string;
};

export const formatNavn = (navn: Navn) => {
  return `${navn.fornavn} ${navn.mellomnavn ? navn.mellomnavn + ' ' : ''}${navn.etternavn}`;
};
