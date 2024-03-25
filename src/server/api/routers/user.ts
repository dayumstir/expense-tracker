import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        name: z.string(),
        categories: z.string().array(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.create({
        data: {
          id: ctx.user.id,
          email: ctx.user.email!,
          name: input.name,
          categories: input.categories,
        },
      });

      return user;
    }),
  getById: privateProcedure.query(async ({ ctx }) => {
    const user = ctx.db.user.findUnique({
      where: {
        id: ctx.user.id,
      },
    });

    return user;
  }),
});
