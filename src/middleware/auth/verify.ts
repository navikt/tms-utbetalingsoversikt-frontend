import { createRemoteJWKSet, errors, jwtVerify, type JWTVerifyResult, type ResolvedKey } from "jose";
import type { Client, Issuer } from "openid-client";

export type ValidationResult<ErrorTypes extends string> = 'valid' | ValidationError<ErrorTypes>

type ValidationError<ErrorTypes extends string> = {
  errorType: ErrorTypes
  message: string
  error?: Error | unknown
}

export async function verifyJwt(
  bearerToken: string,
  jwkSet: ReturnType<typeof createRemoteJWKSet>,
  issuer: Issuer<Client>,
): Promise<(JWTVerifyResult & ResolvedKey) | ValidationError<'EXPIRED' | 'UNKNOWN_JOSE_ERROR'>> {
  const token = bearerToken.replace('Bearer ', '')

  try {
    return await jwtVerify(token, jwkSet, {
      issuer: issuer.metadata.issuer,
    })
  } catch (err) {
    if (err instanceof errors.JWTExpired) {
      return {
        errorType: 'EXPIRED',
        message: err.message,
        error: err,
      }
    }

    if (err instanceof errors.JOSEError) {
      return {
        errorType: 'UNKNOWN_JOSE_ERROR',
        message: err.message,
        error: err,
      }
    }

    throw err
  }
}
