import keyMirror from '~utils/keyMirror';
import isValidEmailPattern from './isValidEmailPattern';

// if val is null, undefined, empty string but not zero
const hasNoValue = (value: string | number) => !value && value !== 0;

// if the input val is too long
// default maxLength is 64
const isTooLong = (value: string, { maxLength = 64 }) => value.length > maxLength;

// if the input val is too short
const isTooShort = (value: string, { minLength = 6 }) => value.length < minLength;

// if the input value less than zero
const mustMoreThanZero = (value: number) => value <= 0;

// should be contain only letters
const mustContainOnlyLetters = (value: string) => !/^[а-яёa-z ]+$/i.test(value);

// should be contain only numbers
const mustContainOnlyPositiveNumbers = (value: string) => !/^([0-9]{1,})?(\.)?([0-9]{1,})?$/.test(value);

// if the input value contains special characters
const containsSpecialCharacters = (value: string) => /[@^&/\\#+$~%;~`*<>=%[\]{}_|]/g.test(value);

// if the input val matches a predefined pattern
const isNotValidEmailPattern = (value: string) => !isValidEmailPattern(value);

// list of all generic validation functions
const validationFuncs = {
  hasNoValue,
  isTooLong,
  mustMoreThanZero,
  isNotValidEmailPattern,
  isTooShort,
  mustContainOnlyLetters,
  containsSpecialCharacters,
  mustContainOnlyPositiveNumbers
};

// exporting the enumerated rule types
export const validationTypes = keyMirror(Object.keys(validationFuncs));

// get validation errors
// "params" is an optional object to provide more validation parameters if needed.
export const getValidationFailure = (val: string | number, validationRules, params = {}) => {
  const value = val ? val.toString() : '';

  const failedRule = (validationRules || []).find((rule: string) => validationFuncs[rule](value, params));

  return failedRule;
};
