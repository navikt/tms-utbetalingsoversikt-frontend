import { type Client, Issuer } from "openid-client";
import { verifyAndGetTokenXConfig } from "./config";

let tokenXIssuer: Issuer<Client>

export async function getTokenXIssuer(): Promise<Issuer<Client>> {
  if (tokenXIssuer == null) {
    const tokenXConfig = verifyAndGetTokenXConfig();

    tokenXIssuer = await Issuer.discover(tokenXConfig.tokenXWellKnownUrl);
  }
  return tokenXIssuer;
}

let idportenIssuer: Issuer<Client>

export async function getIdportenIssuer(): Promise<Issuer<Client>> {
  if (idportenIssuer == null) {
    const tokenXConfig = verifyAndGetTokenXConfig();

    idportenIssuer = await Issuer.discover(tokenXConfig.idportenWellKnownUrl);
  }
  return idportenIssuer;
}
