import { Detail, Heading } from "@navikt/ds-react";

type props = {
  isPrint?: boolean;
};

const CustomHeading = ({ isPrint }: props) => {
  const text = "Utbetalt i perioden";

  if (isPrint) return <Detail weight="semibold"> {text} </Detail>;
  return (
    <Heading className={`navds-body-short`} level="2" size="small">
      {text}
    </Heading>
  );
};

export default CustomHeading;
