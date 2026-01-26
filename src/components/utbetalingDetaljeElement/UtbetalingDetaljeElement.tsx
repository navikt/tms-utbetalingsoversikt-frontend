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
  const commonClasses = `${className && style[className]} ${isSum ? style.sumElement : ""}`;

  return (
    <>
      <dt className={`${commonClasses} ${style.detaljeTittel}`}>{label}</dt>
      <dd className={`${commonClasses} ${style.detaljeBelop}`}>
        {`${formaterTallUtenDesimaler(beløp)} kr`}
      </dd>
    </>
  );
};

export default DetaljeElement;
