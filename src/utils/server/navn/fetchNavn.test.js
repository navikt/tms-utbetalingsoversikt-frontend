import { expect, test } from "vitest";
import { localToken } from "../token";
import { pdlApiUrl } from "../urls";
import { fetchNavn } from "./fetchNavn";

const testLogger = { info() {}, warn() {}, error() {} };

test("Fetch navn successfully", async () => {
  const JWTToken = await localToken({ pid: "12345678912" });
  const navn = await fetchNavn(JWTToken, pdlApiUrl, testLogger);

  expect(navn).toEqual({
    navn: "Ola Normann",
    ident: "12345678912",
  });
});

test("PDL response with error", async () => {
  const JWTToken = await localToken({ pid: "12345678912" });
  const navn = await fetchNavn(
    JWTToken,
    "http://localhost:3000/api/navn/error",
    testLogger,
  );

  expect(navn).toEqual({
    navn: null,
    ident: "12345678912",
  });
});
