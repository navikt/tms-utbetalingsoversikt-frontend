import {
  Button,
  DatePicker,
  ErrorMessage,
  useRangeDatepicker,
} from "@navikt/ds-react";
import { setPeriodeFilter, setSelectedPeriode } from "@src/store/filter";
import { formatDateToDayjs } from "@src/utils/client/date";
import dayjs from "dayjs";
import { useState } from "react";
import style from "./Egendefinert.module.css";

const EgendefinertPeriode = () => {
  const [costumDate, setCostumDate] = useState({ fom: "", tom: "" });
  const [invalidInput, setInValidInput] = useState({
    showInvalidMessage: false,
    isInvalid: true,
  });

  const { datepickerProps, toInputProps, fromInputProps } = useRangeDatepicker({
    fromDate: dayjs().subtract(3, "years").toDate(),
    toDate: dayjs().toDate(),
    onRangeChange: (date) =>
      setCostumDate(formatDateToDayjs(date?.from, date?.to)),
    onValidate: (data) =>
      setInValidInput({
        showInvalidMessage: false,
        isInvalid:
          data.from.isEmpty ||
          data.from.isInvalid ||
          data.from.isBefore ||
          data.from.isAfter ||
          data.to.isEmpty ||
          data.to.isInvalid ||
          data.to.isBefore ||
          data.to.isAfter,
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
          Oppgitt dato må være innenfor de siste 3 årene.
        </ErrorMessage>
      )}
      <Button
        id={style.oppdaterButton}
        size="small"
        onClick={() =>
          invalidInput.isInvalid
            ? setInValidInput({ ...invalidInput, showInvalidMessage: true })
            : (setPeriodeFilter(costumDate), setSelectedPeriode("Egendefinert"))
        }
      >
        Oppdater
      </Button>
    </>
  );
};

export default EgendefinertPeriode;
