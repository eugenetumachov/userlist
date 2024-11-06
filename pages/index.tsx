import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import UsersTable from "@/components/users-list/users-table";
import { useUserApi } from "@/hooks/users";

import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import type { User } from "@/types/user";

export const getServerSideProps = (async () => {
  const res = await fetch(`${process.env.API_URL}/api/users`);
  const users: User[] = await res.json();
  return { props: { users } };
}) satisfies GetServerSideProps<{ users: User[] }>;

export default function TablePage({
  users: initialUsers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { getUsers } = useUserApi();
  const [users, setUsers] = useState(initialUsers);

  const fetchUsers = async () => {
    const updatedUsers = await getUsers();
    setUsers(updatedUsers);
  };

  return (
    <div className="p-4">
      <UsersTable users={users} refetch={fetchUsers} />
      <Toaster />
    </div>
  );
}
