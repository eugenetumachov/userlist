import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

import type { User } from "@/types/user";

export const getColumns: (
  onEdit: (id: User["id"]) => void,
  onDelete: (id: User["id"]) => void
) => ColumnDef<User>[] = (onEdit, onDelete) => {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onEdit(user.id)}>
              edit
            </Button>
            <Button variant="outline" onClick={() => onDelete(user.id)}>
              delete
            </Button>
          </div>
        );
      },
    },
  ];

  return columns;
};
