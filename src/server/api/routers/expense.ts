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
    });

    return expenses;
  }),
});
