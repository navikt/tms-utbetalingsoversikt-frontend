import {
  Button,
  DatePicker,
  ErrorMessage,
  type RangeValidationT,
  useRangeDatepicker,
} from "@navikt/ds-react";
import { setPeriodeFilter, setSelectedPeriode } from "@src/store/filter";
import { formatDateToDayjs } from "@src/utils/client/date";
import dayjs from "dayjs";
import { useState } from "react";
import style from "./Egendefinert.module.css";

enum DatePickerState {
  ValidRange,
  InvalidRange,
  BothDatesMissing,
  FromDateMissing,
  ToDateMissing,
}

const parseDatePickerState = (data: RangeValidationT): DatePickerState => {
  if (data.from.isEmpty && data.to.isEmpty) {
    return DatePickerState.BothDatesMissing;
  } else if (data.from.isEmpty) {
    return DatePickerState.FromDateMissing;
  } else if (data.to.isEmpty) {
    return DatePickerState.ToDateMissing;
  } else {
    const isInvalid =
      data.from.isInvalid ||
      data.from.isAfter ||
      data.from.isBefore ||
      data.to.isInvalid ||
      data.to.isAfter ||
      data.to.isBefore;

    return isInvalid
      ? DatePickerState.InvalidRange
      : DatePickerState.ValidRange;
  }
};

const explainError = (error: DatePickerState): string => {
  switch (error) {
    case DatePickerState.BothDatesMissing:
      return "Vennligst velg datoer for egendefinert periode.";
    case DatePickerState.FromDateMissing:
      return "Vennligst velg startdato for egendefinert periode.";
    case DatePickerState.ToDateMissing:
      return "Vennligst velg sluttdato for egendefinert periode.";
    case DatePickerState.InvalidRange:
      return "Oppgitte datoer må være innenfor de siste 3 årene.";
    case DatePickerState.ValidRange:
      return " ";
  }
};

const EgendefinertPeriode = () => {
  const [costumDate, setCostumDate] = useState({ fom: "", tom: "" });
  const [invalidInput, setInValidInput] = useState({
    showInvalidMessage: false,
    datePickerState: DatePickerState.BothDatesMissing,
  });

  const { datepickerProps, toInputProps, fromInputProps } = useRangeDatepicker({
    fromDate: dayjs().subtract(3, "years").toDate(),
    toDate: dayjs().toDate(),
    onRangeChange: (date) =>
      setCostumDate(formatDateToDayjs(date?.from, date?.to)),
    onValidate: (data) =>
      setInValidInput({
        showInvalidMessage: false,
        datePickerState: parseDatePickerState(data),
      }),
  });

  return (
    <>
      <DatePicker className={style.datePicker} {...datepickerProps}>
        <div className={style.datePicketInputs}>
          <DatePicker.Input {...fromInputProps} size="small" label="Fra" />
          <DatePicker.Input {...toInputProps} size="small" label="Til" />
        </div>
      </DatePicker>
      {invalidInput.showInvalidMessage && (
        <ErrorMessage className={style.invalidDateMessage}>
          {explainError(invalidInput.datePickerState)}
        </ErrorMessage>
      )}
      <Button
        id={style.oppdaterButton}
        size="small"
        onClick={() =>
          invalidInput.datePickerState === DatePickerState.ValidRange
            ? (setPeriodeFilter(costumDate), setSelectedPeriode("Egendefinert"))
            : setInValidInput({ ...invalidInput, showInvalidMessage: true })
        }
      >
        Oppdater
      </Button>
    </>
  );
};

export default EgendefinertPeriode;
