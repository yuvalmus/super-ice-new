import { Customer } from "@/models/Customer";

export const customers: Customer[] = [
  {
    id: "1",
    businessNumber: 1,
    name: "פינת המזל",
    invoiceName: 'קיוסקי המזל בע"מ',
    address: "הרופא 3 רמת-גן",
    distributionAreaId: "3",
    bagPrice2kg: 5.5,
  },
  {
    id: "2",
    businessNumber: 2,
    name: "סיטי מרקט המכתש",
    address: "המכתש 24 חולון",
    distributionAreaId: "10",
    bagPrice2kg: 6,
  },
  {
    id: "3",
    businessNumber: 3,
    name: "יין בעיר שילת",
    address: "שדרות המלאכות 15 שילת",
    distributionAreaId: "7",
    bagPrice2kg: 6,
  },
  {
    id: "4",
    businessNumber: 4,
    name: "מעדני בנימין",
    address: "רמבם 25 פתח תקווה",
    distributionAreaId: "5",
    bagPrice2kg: 5.5,
  },
  {
    id: "5",
    businessNumber: 5,
    name: "רמי לוי רעננה",
    address: "החרושת 14 רעננה",
    distributionAreaId: "6",
    bagPrice2kg: 6.5,
    freezerId: "2",
  },
  {
    id: "6",
    businessNumber: 6,
    name: "הפינה החמה",
    address: "סחרוב 11 ראשון לציון",
    distributionAreaId: "9",
    bagPrice2kg: 6,
  },
];
