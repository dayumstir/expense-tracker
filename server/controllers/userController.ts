import prisma from "../db";
import { Request, Response } from "express";

const getUsers = async (_req: Request, res: Response) => {
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

const getUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json(user);
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ error: "id does not exist!" });
      console.error(err.message);
    } else {
      console.log("Unexpected error", err);
    }
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(user);
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({ error: "id does not exist!" });
      console.error(err.message);
    } else {
      console.log("Unexpected error", err);
    }
  }
};

export { getUsers, getUser, deleteUser };
