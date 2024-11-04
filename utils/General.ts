export const cutDecimalDigits = (num: number, precision: number) => {
  const factor = Math.pow(10, precision);
  return Math.floor(num * factor) / factor;
};
