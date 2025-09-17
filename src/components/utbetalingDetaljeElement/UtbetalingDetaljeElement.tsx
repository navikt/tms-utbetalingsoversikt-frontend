import { BodyShort } from "@navikt/ds-react";
import { formaterTallUtenDesimaler } from "@src/utils/client/utbetalingDetalje";
import style from "./utbetalingDetaljeElement.module.css";

interface DetaljeElementProps {
  label: string;
  beløp: number;
  isSum?: boolean;
  className?: string;
}
const DetaljeElement = ({
  label,
  beløp,
  isSum,
  className,
}: DetaljeElementProps) => {
  const containerClassName = `${style.container} ${className && style[className]}`;

  return (
    <li key={label + beløp} className={containerClassName}>
      <BodyShort weight={isSum ? "semibold" : "regular"}>{label}</BodyShort>
      <BodyShort
        weight={isSum ? "semibold" : "regular"}
      >{`${formaterTallUtenDesimaler(beløp)} kr`}</BodyShort>
    </li>
  );
};

export default DetaljeElement;
