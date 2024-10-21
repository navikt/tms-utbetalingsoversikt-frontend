import { type ValidationResult, verifyJwt } from "./verify";
import { verifyAndGetTokenXConfig } from "./config";
import { getIdportenIssuer } from "./issuer";
import { getJwkSet } from "./jwk";

export type IdportenErrorVariants = 'EXPIRED' | 'CLIENT_ID_MISMATCH' | 'UNKNOWN_JOSE_ERROR';
export type IdportenValidationResult = ValidationResult<IdportenErrorVariants>;

export async function validateIdportenToken(bearerToken: string): Promise<IdportenValidationResult> {
  const verificationResult = await verifyJwt(bearerToken, await getJwkSet(), await getIdportenIssuer());

  if ('errorType' in verificationResult) {
    return verificationResult;
  }

  const tokenXConfig = verifyAndGetTokenXConfig()
  if (verificationResult.payload.client_id !== tokenXConfig.idportenClientId) {
    return {
      errorType: 'CLIENT_ID_MISMATCH',
      message: 'client_id does not match app client_id'
    };
  }

  return 'valid';
}
