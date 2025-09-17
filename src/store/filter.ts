import { getDateThreemonthsBack } from "@src/utils/client/date";
import { atom } from "nanostores";

export const showFilterAtom = atom<boolean>(false);
export const selctedPeriodeAtom = atom<string>("Siste 3 måneder");
export const ytelserFilterAtom = atom<SelectedYtelser>({});
export const periodeFilterAtom = atom<{ fom: string; tom: string }>(
  getDateThreemonthsBack(),
);

export function toggleShowFilter() {
  showFilterAtom.set(!showFilterAtom.value);
}
export type SelectedYtelser = { [key: string]: boolean };
export function setSelectedPeriode(label: string) {
  selctedPeriodeAtom.set(label);
}
export function setPeriodeFilter(date: { tom: string; fom: string }) {
  periodeFilterAtom.set(date);
}
export function setYtelseFilter(ytelser: SelectedYtelser) {
  ytelserFilterAtom.set(ytelser);
}
export function toggleYtelseFilter(ytelse: string) {
  const toggledYtelseList = { ...ytelserFilterAtom.value };

  if (toggledYtelseList[ytelse]) {
    toggledYtelseList[ytelse] = false;
  } else {
    toggledYtelseList[ytelse] = true;
  }
  ytelserFilterAtom.set({ ...toggledYtelseList });
}
