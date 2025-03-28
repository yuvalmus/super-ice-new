import moment from "moment";

const WEEKDAYS = [
  "ראשון",
  "שני",
  "שלישי",
  "רביעי",
  "חמישי",
  "שישי",
  "שבת",
] as const;

/**
 * Gets the current date in DD/MM/YYYY format
 */
export const getCurrentDate = (): string => {
  return moment().format("DD/MM/YYYY");
};

/**
 * Gets the name of the current day in Hebrew
 */
export const getCurrentDayName = (): string => {
  const date = new Date();
  return WEEKDAYS[date.getDay()];
};

/**
 * Gets the Hebrew day name for a given date in DD/MM/YYYY format
 */
export const getDayNameFromDate = (date: string): string => {
  const [day, month, year] = date.split("/");
  const dateObj = new Date(+year, +month - 1, +day);
  return WEEKDAYS[dateObj.getDay()];
};

/**
 * Formats a date with its Hebrew day name
 * @returns Format: "יום ראשון 01/01/2024"
 */
export const formatDateWithDay = (date: string): string => {
  return `יום ${getDayNameFromDate(date)} ${date}`;
};

/**
 * Parses a date string in DD/MM/YYYY format to a Date object
 */
export const parseDateString = (date: string): Date => {
  const [day, month, year] = date.split("/");
  return new Date(+year, +month - 1, +day);
};

/**
 * Compares two dates in DD/MM/YYYY format
 * @returns negative if dateA is earlier, positive if dateA is later, 0 if equal
 */
export const compareDates = (dateA: string, dateB: string): number => {
  return parseDateString(dateA).getTime() - parseDateString(dateB).getTime();
};

/**
 * Gets today's title for distribution stats
 * @returns Format: "קו חלוקה - יום ראשון 01/01/2024"
 */
export const getTodaysDistributionTitle = (): string => {
  return `קו חלוקה - יום ${getCurrentDayName()} ${getCurrentDate()}`;
};
