import {addCommas} from '@/utils/common';

test('add commas to positive integer', () => {
  expect(addCommas(122233)).toEqual('122,233');
});

test('add commas to nagative integer', () => {
  expect(addCommas(-122233)).toEqual('-122,233');
});

test('add commas to `positive integer` string', () => {
  expect(addCommas('122233')).toEqual('122,233');
});

test('add commas to `positive integer` string', () => {
  expect(addCommas('122233')).toEqual('122,233');
});

test('add commas to positive float', () => {
  expect(addCommas(122233.323)).toEqual('122,233.323');
});

test('add commas to nagative float', () => {
  expect(addCommas(-122233.323)).toEqual('-122,233.323');
});

test('add commas to string', () => {
  expect(addCommas('adasddwq323d323')).toEqual('adasddwq323d323');
  expect(addCommas('122233k23')).toEqual('122233k23');
});

test('add commas with empty string', () => {
  expect(addCommas('')).toEqual('');
});

test('add commas with no input', () => {
  expect(addCommas()).toEqual('');
});
