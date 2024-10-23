import dayjs from "dayjs";
export type GetDatePeriodType = () => {
  fom:string;
  tom: string;
}

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
