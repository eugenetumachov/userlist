import { readJson, writeJson } from "@/lib/json";

import type { NextApiRequest, NextApiResponse } from "next";
import type { User } from "@/types/user";
import { USERS_DATA_FILE } from "@/constants/api";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  const { id } = req.query;

  const users = readJson<User[]>(USERS_DATA_FILE);

  // Check if ID exists
  if (!users.some((user) => user.id === id)) {
    res.status(404).end();
  }

  if (req.method === "DELETE") {
    // Delete user

    const updatedUsers = users.filter((user) => user.id !== id);
    writeJson(USERS_DATA_FILE, updatedUsers);

    res.status(204).end();
  } else if (req.method === "PUT") {
    // Update user

    const { name, email, phone } = JSON.parse(req.body);
    const updatedUsers = users.map((user) =>
      user.id === id ? { id, name, email, phone } : user
    );
    writeJson(USERS_DATA_FILE, updatedUsers);

    res.status(204).end();
  } else {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
