import dayjs from 'dayjs';

export interface UtkastElement {
  tittel: string;
  link: string;
  utkastId: string;
  opprettet: string;
  sistEndret: string;
}

export const sortByOpprettet = (a: UtkastElement, b: UtkastElement) =>
  dayjs(a.opprettet).isAfter(dayjs(b.opprettet)) ? -1 : 1;
