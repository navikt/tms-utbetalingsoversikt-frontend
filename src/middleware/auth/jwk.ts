import { createRemoteJWKSet } from "jose";
import { getIdportenIssuer } from "./issuer";

let remoteJWKSet: ReturnType<typeof createRemoteJWKSet>;

export async function getJwkSet(): Promise<ReturnType<typeof createRemoteJWKSet>> {
  if (remoteJWKSet == null) {
    const issuer = await getIdportenIssuer();
    remoteJWKSet = createRemoteJWKSet(new URL(<string>issuer.metadata.jwks_uri));
  }

  return remoteJWKSet
}
