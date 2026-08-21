import { init } from "@nais/apm";
import { useEffect } from "react";

const Observability = () => {
  useEffect(() => {
    init({
      app: "tms-utbetalingsoversikt-frontend",
      namespace: "min-side",
      tracing: true,
    });
  }, []);

  return null;
};

export default Observability;
