import prisma from "../db";
import { Request, Response } from "express";

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.send(users);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.log("Unexpected error", err);
    }
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.create({
      data: {
        email,
      },
    });
    res.json(user);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.log("Unexpected error", err);
    }
  }
};

export { getUsers, createUser };

// app.post(`/createUser`, async (req, res) => {
//     try {
//       const { email } = req.body;

//       const result = await prisma.user.create({
//         data: {
//           email,
//         },
//       });

//       res.json(result);
//     } catch (err) {
//       res.status(409); // conflict
//       res.json({ error: "email is already in use!" });
//       console.error(err.message);
//     }
//   });
