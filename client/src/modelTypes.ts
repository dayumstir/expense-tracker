export type User = {
  id: number;
  name: string;
  email: string;
};

export type Expense = {
  id: number;
  title: string;
  amount: number;
  date: Date;
  category: string;
  currency: string;
};
