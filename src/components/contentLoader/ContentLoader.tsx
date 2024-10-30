import { Loader } from '@navikt/ds-react';
import styles from './ContentLoader.module.css';

const ContentLoader = () => (
  <div className={styles.contentLoader}>
    <Loader transparent title="Laster inn" size="2xlarge" />
  </div>
);

export default ContentLoader;
