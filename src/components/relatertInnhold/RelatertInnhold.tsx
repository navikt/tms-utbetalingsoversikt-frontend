import { Heading } from "@navikt/ds-react";
import { logEvent } from "@src/utils/client/analytics";
import {
  dagpengerUrl,
  endreKontonummerUrl,
  endreSkattekortUrl,
  satserUrl,
  sosialhjelpUrl,
  utbetalingsdatoerUrl,
  årsoppgaverUrl,
} from "@src/utils/client/urls";
import style from "./Relatertinnhold.module.css";

const relatertInnholdLinks = [
  {
    title: "Utbetalingsdatoer",
    href: utbetalingsdatoerUrl,
  },
  {
    title: "Sosialhjelp",
    href: sosialhjelpUrl,
  },
  {
    title: "Satser",
    href: satserUrl,
  },
  {
    title: "Endre kontonummer",
    href: endreKontonummerUrl,
  },
  {
    title: "Forskudd på dagpenger",
    href: dagpengerUrl,
  },
  {
    title: "Se årsoppgavene mine",
    href: årsoppgaverUrl,
  },
  {
    title: "Endre skattekort",
    href: endreSkattekortUrl,
  },
];

const RelatertInnhold = () => {
  return (
    <div className={style.container}>
      <Heading className={style.hrefeading} level="2" size="xsmall">
        Relatert innhold
      </Heading>
      <ul className={style.linkList}>
        {relatertInnholdLinks.map((linkObject) => (
          <li key={linkObject.title}>
            <a
              className={style.link}
              onClick={() =>
                logEvent("relatert-innhold-link", linkObject.title)
              }
              href={linkObject.href}
            >
              {linkObject.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatertInnhold;
