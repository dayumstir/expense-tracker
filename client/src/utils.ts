export const CATEGORIES = [
  "Food",
  "Travel",
  "Entertainment",
  "Fashion",
  "Sports",
  "Healthcare",
  "Gifts",
  "Others",
];

// export const CURRENCIES = ["SGD", "MYR", "AUD", "KRW"];
export const CURRENCIES = ["SGD"];

export const formatAmount = (amount: number, currency: string = "SGD") => {
  const isInteger = Number.isInteger(amount);

  return new Intl.NumberFormat("en-SG", {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
    minimumFractionDigits: isInteger ? 0 : 2,
    maximumFractionDigits: isInteger ? 0 : 2,
  }).format(amount);
};
