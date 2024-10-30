import { Heading } from '@navikt/ds-react';
import Breadcrumbs from '@src/components/breadcrumbs/Breadcrumbs.tsx';
import PeriodeFilter from '@src/components/filter/periodeFilter/PeriodeFilter.tsx';
import ShowFilterButton from '@src/components/filter/showFilterButton/ShowFilterButton.tsx';
import RelatertInnhold from '@src/components/relatertInnhold/RelatertInnhold.tsx';
import Utbetalinger from '@src/components/utbetalinger/Utbetalinger.tsx';
import style from './Landingsside.module.css';
import PrintUtbetalinger from './printUtbetalinger/PrintUtbetalinger';
import { initializeAmplitude } from '@src/utils/client/amplitude';

function Landingsside() {
  initializeAmplitude();

  return (
    <>
      <div id={style.printHide}>
        <Breadcrumbs showUtbetalinger={false} />
        <Heading className={style.pageTitle} level="1" size="xlarge">
          Utbetalinger
        </Heading>
        <div className={style.pageBody}>
          <ShowFilterButton />
          <PeriodeFilter />
          <Utbetalinger />
          <RelatertInnhold />
        </div>
      </div>
      <PrintUtbetalinger />
    </>
  );
}

export default Landingsside;
