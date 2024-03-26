import { expenseSchema } from "~/components/add-expense/ExpenseForm";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const expenseRouter = createTRPCRouter({
  create: privateProcedure
    .input(expenseSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.expense.create({
        data: {
          amount: input.amount,
          title: input.title,
          date: input.date,
          category: input.category,
          userId: ctx.user.id,
        },
      });

      return user;
    }),
  getAll: privateProcedure.query(async ({ ctx }) => {
    const expenses = await ctx.db.expense.findMany({
      where: {
        userId: ctx.user.id,
      },
    });

    return expenses;
  }),
});
