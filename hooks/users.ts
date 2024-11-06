import { useToast } from "@/hooks/use-toast";

import type { User } from "@/types/user";

export const useUserApi = () => {
  const { toast } = useToast();

  async function getUsers() {
    const res = await fetch("/api/users");

    // Show notification or error message
    if (res.ok) {
      const users = await res.json();
      return users;
    } else {
      toast({
        variant: "destructive",
        description: "Something went wrong, please retry",
      });
      return [];
    }
  }

  async function createUser(user: User) {
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(user),
    });

    // Show notification or error message
    if (res.ok) {
      toast({
        description: "The user has been successfully created",
      });
    } else {
      toast({
        variant: "destructive",
        description: "Something went wrong, please retry",
      });
    }
  }

  async function updateUser(user: User) {
    const res = await fetch(`/api/users/${user.id}`, {
      method: "PUT",
      body: JSON.stringify(user),
    });

    // Show notification or error message
    if (res.ok) {
      toast({
        description: "The user has been successfully updated",
      });
    } else {
      toast({
        variant: "destructive",
        description: "Something went wrong, please retry",
      });
    }
  }

  async function deleteUser(id: User["id"]) {
    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });

    // Show notification or error message
    if (res.status === 204) {
      toast({
        description: "The user has been successfully deleted",
      });
    } else {
      toast({
        variant: "destructive",
        description: "Something went wrong, please retry",
      });
    }
  }

  return { getUsers, createUser, updateUser, deleteUser };
};
