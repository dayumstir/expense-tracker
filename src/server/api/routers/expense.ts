import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const expenseRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        title: z.string().min(1),
        amount: z
          .string()
          .min(1)
          .regex(/^(?!0(\.0*)?$).*$/), // Amount !== "0" || "0." || "0.0"|| "0.00"
        date: z.date(),
        category: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const expense = await ctx.db.expense.create({
        data: {
          amount: input.amount,
          title: input.title,
          date: input.date,
          category: input.category,
          userId: ctx.user.id,
        },
      });

      return expense;
    }),

  getAll: privateProcedure.query(async ({ ctx }) => {
    const expenses = await ctx.db.expense.findMany({
      where: {
        userId: ctx.user.id,
      },
      orderBy: {
        id: "desc",
      },
    });

    // TODO: Format this in frontend (ExpenseRow.tsx)

    const expensesWithoutDecimalType = expenses.map((expense) => ({
      ...expense,
      amount: Number(expense.amount),
    }));

    return expensesWithoutDecimalType;
  }),

  getUniqueDates: privateProcedure.query(async ({ ctx }) => {
    const uniqueDates = await ctx.db.expense.findMany({
      select: {
        date: true,
      },
      where: {
        userId: ctx.user.id,
      },
      distinct: ["date"],
    });

    const uniqueDatesArray = uniqueDates
      .map((date) => date.date)
      .sort((a, b) => b.getTime() - a.getTime());

    return uniqueDatesArray;
  }),

  update: privateProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1),
        amount: z
          .string()
          .min(1)
          .regex(/^(?!0(\.0*)?$).*$/), // Amount !== "0" || "0." || "0.0"|| "0.00"
        date: z.date(),
        category: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const expense = await ctx.db.expense.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          amount: input.amount,
          date: input.date,
          category: input.category,
        },
      });

      return expense;
    }),

  delete: privateProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const expense = await ctx.db.expense.delete({
        where: {
          id: input.id,
        },
      });

      return expense;
    }),
});
