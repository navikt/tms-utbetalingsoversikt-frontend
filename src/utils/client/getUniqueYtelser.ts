import type { Ytelse } from '@src/types/types';

export type YtelserListFilter = { [key: string]: boolean };
const getUniqueytelser = (ytelser: Ytelse[]): YtelserListFilter =>
  ytelser.reduce((filteredList: YtelserListFilter, ytelse: Ytelse) => {
    return {
      [ytelse.ytelse]: false,
      ...filteredList,
    };
  }, {});

export default getUniqueytelser;
