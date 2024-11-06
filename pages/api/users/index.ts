import { v4 as uuidv4 } from "uuid";
import { readJson, writeJson } from "@/lib/json";

import type { NextApiRequest, NextApiResponse } from "next";
import type { User } from "@/types/user";
import { USERS_DATA_FILE } from "@/constants/api";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  if (req.method === "GET") {
    // List users

    const users = readJson<User[]>(USERS_DATA_FILE);
    res.status(200).json(users);
  } else if (req.method === "POST") {
    // Create a new user

    const { name, email, phone } = JSON.parse(req.body);
    const users = readJson<User[]>(USERS_DATA_FILE);
    const user = { id: uuidv4(), name, email, phone };
    const updatedUsers = [...users, user];
    writeJson(USERS_DATA_FILE, updatedUsers);
    res.status(201).json([user]);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
