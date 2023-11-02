import prisma from "../db";
import { Request, Response } from "express";

const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    res.json(user);
  } catch (err) {
    if (err instanceof Error) {
      res.status(409).json({ error: "email is already in use!" });
      console.error(err.message);
    } else {
      console.log("Unexpected error", err);
    }
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
        password: password,
      },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "username/password is wrong!" });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ error: "username/password is wrong!" });
      console.error(err.message);
    } else {
      console.log("Unexpected error", err);
    }
  }
};

export { signup, login };
