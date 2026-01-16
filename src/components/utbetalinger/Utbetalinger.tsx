import { useStore } from "@nanostores/react";
import { Alert, BodyLong, Heading } from "@navikt/ds-react";
import {
  periodeFilterAtom,
  selctedPeriodeAtom,
  setYtelseFilter,
} from "@src/store/filter";
import type { UtbetalingerResponse } from "@src/types/types";
import { addKey } from "@src/utils/client/addKey";
import { logEvent } from "@src/utils/client/analytics";
import getUniqueYtelser from "@src/utils/client/getUniqueYtelser";
import { utbetalingerAPIUrl } from "@src/utils/client/urls";
import dayjs from "dayjs";
import useSWR from "swr";
import { fetcher } from "../../api/api";
import ContentLoader from "../contentLoader/ContentLoader";
import ErrorPanel from "../errorPanel/ErrorPanel";
import YtelserFilter from "../filter/ytelseFilter/YtelserFilter";
import KommendeUtbetalinger from "../kommendeUtbetalinger/KommendeUtbetalinger";
import PrintButton from "../prinButton/PrintButton";
import UtbetaltPeriode from "../utbetaltPeriode/UtbetaltPeriode";
import NoUtbetalinger from "./noUtbetalinger/NoUtbetalinger";
import TidligereUtbetalinger from "./tidligereUtbetalinger/TidligereUtbetalinger";
import style from "./Ubtetalinger.module.css";

const Utbetalinger = () => {
  const utbetalingerPeriod = useStore(selctedPeriodeAtom);
  const selectedPeriodFilter = useStore(periodeFilterAtom);
  const utbetalingerPeriodDato = `${dayjs(selectedPeriodFilter.fom).format("DD.MM.YYYY")}-${dayjs(
    selectedPeriodFilter.tom,
  ).format("DD.MM.YYYY")}`;

  const {
    data: utbetalingerData,
    isLoading,
    error,
  } = useSWR<UtbetalingerResponse>(
    {
      path: utbetalingerAPIUrl(
        `?fom=${selectedPeriodFilter.fom}&tom=${selectedPeriodFilter.tom}`,
      ),
    },
    fetcher,
    {
      shouldRetryOnError: false,
      onError: () => logEvent("fikk-feilmelding-forside"),
    },
  );

  const utbetalinger = addKey(utbetalingerData);

  if (isLoading) {
    return <ContentLoader />;
  }
  const showKommendeUtbetalinger =
    utbetalinger && utbetalinger?.neste.length > 0;

  const hasTidligereUtbetalinger =
    utbetalinger && utbetalinger?.tidligere.length > 0;
  hasTidligereUtbetalinger &&
    setYtelseFilter(
      getUniqueYtelser(utbetalinger.utbetalingerIPeriode.ytelser),
    );

  const nullYtelser = utbetalinger?.tidligere.flatMap((utbetalingGroup) =>
    utbetalingGroup.utbetalinger.map(
      (utbetaling) => utbetaling.beløp === 0 && utbetaling.ytelse,
    ),
  );

  const showInfoMelding: boolean = nullYtelser
    ? nullYtelser.includes("Uføretrygd")
    : false;

  const infoMeldingTekst: string =
    'På grunn av en teknisk feil, kan det hende du ser flere utbetalinger på "0 kr", i tillegg til den vanlige utbetalingen din. Dette påvirker ikke utbetalingen din. Vi beklager feilen.';

  const infoMeldingTekstTo: string =
    "Venter du på utbetaling av AAP, dagpenger eller sykepenger? Denne uken kan den komme senere enn du er vant til. Den skal være på kontoen din i løpet av mandag 19. januar.";

  return (
    <>
      {hasTidligereUtbetalinger && <YtelserFilter />}
      {showInfoMelding && (
        <Alert className={style.infoMelding} variant="info">
          <BodyLong>{infoMeldingTekst}</BodyLong>
        </Alert>
      )}
      <Alert className={style.infoMelding} variant="info">
        <BodyLong>{infoMeldingTekstTo}</BodyLong>
      </Alert>
      {showKommendeUtbetalinger && (
        <KommendeUtbetalinger utbetalinger={utbetalinger.neste} />
      )}
      {
        <>
          <Heading
            level="2"
            size="small"
            className={`navds-body-short ${style.tidligereUtbetalingerHeading}`}
          >
            {utbetalingerPeriod === "Egendefinert"
              ? utbetalingerPeriodDato
              : utbetalingerPeriod}
          </Heading>
          {hasTidligereUtbetalinger ? (
            <>
              {" "}
              <TidligereUtbetalinger
                utbetalingGroups={utbetalinger.tidligere}
              />
              <UtbetaltPeriode
                data={utbetalinger.utbetalingerIPeriode}
                periode={utbetalingerPeriodDato}
              />
              <PrintButton />
            </>
          ) : (
            <NoUtbetalinger />
          )}
          {error ? <ErrorPanel isLandingsside /> : null}
        </>
      }
    </>
  );
};

export default Utbetalinger;
