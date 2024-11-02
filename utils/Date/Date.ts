import moment from "moment";

const days: Record<number, string> = {
  0: "ראשון",
  1: "שני",
  2: "שלישי",
  3: "רביעי",
  4: "חמישי",
  5: "שישי",
  6: "שבת",
};

const getCurrentDate = () => {
  return moment().format("DD/MM/YYYY");
};

const getCurrentDayName = (): string => {
  const date = new Date();
  return days[date.getDay()];
};

export default {
  getCurrentDate,
  getCurrentDayName,
};
