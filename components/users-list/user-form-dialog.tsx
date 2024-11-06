import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { User } from "@/types/user";
import { useEffect, useState } from "react";

export function UserFormDialog({
  open,
  user: initialUser,
  onClose,
}: {
  open: boolean;
  user?: User;
  onClose: (user?: User) => void;
}) {
  const [user, setUser] = useState<User>(
    initialUser ?? { id: "", name: "", email: "", phone: "" }
  );
  const [isFormError, setFormError] = useState(false);

  useEffect(() => {
    if (initialUser) setUser(initialUser);
  }, [initialUser]);

  const cleanForm = () => {
    setUser({ id: "", name: "", email: "", phone: "" });
  };

  const handleOpenChange = () => {
    cleanForm();
    onClose();
  };

  const handleSubmit = () => {
    const error = !user.email || !user.name || !user.phone;
    setFormError(error);

    if (error) return;

    cleanForm();
    onClose(user);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{user ? "Edit user" : "Create user"}</DialogTitle>
        </DialogHeader>
        {isFormError && (
          <Alert variant="destructive">
            <AlertDescription>
              Please fill in all required fields
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="flex items-baseline gap-1 justify-end">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <span className="text-red-500 font-bold">*</span>
            </div>
            <Input
              id="name"
              value={user?.name}
              onChange={(e) =>
                setUser((oldUser) => ({ ...oldUser!, name: e.target.value }))
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="flex items-baseline gap-1 justify-end">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <span className="text-red-500 font-bold">*</span>
            </div>
            <Input
              id="email"
              type="email"
              value={user?.email}
              onChange={(e) =>
                setUser((oldUser) => ({ ...oldUser!, email: e.target.value }))
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="flex items-baseline gap-1 justify-end">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <span className="text-red-500 font-bold">*</span>
            </div>
            <Input
              id="phone"
              value={user?.phone}
              onChange={(e) =>
                setUser((oldUser) => ({ ...oldUser!, phone: e.target.value }))
              }
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
