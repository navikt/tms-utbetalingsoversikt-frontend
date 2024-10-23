import dayjs from "dayjs";

const months = [
  "Januar",
  "Februar",
  "Mars",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export const getMonth = (
  index: number,
  capitalInitalLetter: boolean
): string =>
  capitalInitalLetter ? months[index] : months[index].toLowerCase();

export const formatToReadableDate = (date: string) => {
  return `${dayjs(date).date()}. ${getMonth(dayjs(date).month(), false)}`;
};

export const formatToDetailedDate = (date: string) => {
  return dayjs(date).format("DD.MM.YYYY");
};

export type GetDatePeriodType = () => {
  fom: string;
  tom: string;
};

export const getDateThreemonthsBack = (): { fom: string; tom: string } => {
  const currentDate = dayjs();
  const threeMonthsBack = currentDate.subtract(3, "months").format("YYYYMMDD");
  return { fom: threeMonthsBack, tom: currentDate.format("YYYYMMDD") };
};

export const getDateCurrentlyThisYear = (): { fom: string; tom: string } => {
  const currentDate = dayjs();
  const startOfThisYear = currentDate.startOf("year").format("YYYYMMDD");
  return { fom: startOfThisYear, tom: currentDate.format("YYYYMMDD") };
};

export const getDateLastYear = (): { fom: string; tom: string } => {
  const currentDate = dayjs();
  const startOfLastYear = currentDate
    .year(currentDate.year() - 1)
    .startOf("year")
    .format("YYYYMMDD");
  const endOfLastYear = currentDate
    .year(currentDate.year() - 1)
    .endOf("year")
    .format("YYYYMMDD");

  return { fom: startOfLastYear, tom: endOfLastYear };
};

export const formatDateToDayjs = (
  from: Date | undefined,
  to: Date | undefined
): { fom: string; tom: string } => ({
  fom: dayjs(from).format("YYYYMMDD"),
  tom: dayjs(to).format("YYYYMMDD"),
});
