import { test, expect } from 'vitest';
import { formatNavn } from './formatNavn';

test('fomat navn with mellomnavn', () => {
  const navn = formatNavn({
    fornavn: 'Ola',
    mellomnavn: 'Normann',
    etternavn: 'Nordmann',
  });
  expect(navn).toEqual('Ola Normann Nordmann');
});

test('fomat navn without mellomnavn', () => {
  const navn = formatNavn({
    fornavn: 'Ola',
    mellomnavn: null,
    etternavn: 'Nordmann',
  });
  expect(navn).toEqual('Ola Nordmann');
});

test('fomat nav with many mellomnavn', () => {
  const navn = formatNavn({
    fornavn: 'Ola',
    mellomnavn: 'Nikolai Mohammed Ali',
    etternavn: 'Nordmann',
  });
  expect(navn).toEqual('Ola Nikolai Mohammed Ali Nordmann');
});
