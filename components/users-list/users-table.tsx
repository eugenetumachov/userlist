import { useCallback, useState } from "react";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import TableFilter from "./filter";
import TablePagination from "./pagination";
import { getColumns } from "./columns";
import { DeleteAlertDialog } from "./delete-alert-dialog";
import { Button } from "../ui/button";
import { UserFormDialog } from "./user-form-dialog";
import { useUserApi } from "@/hooks/users";

import type { User } from "@/types/user";

export default function UsersTable({
  users,
  refetch,
}: {
  users: User[];
  refetch: () => Promise<void>;
}) {
  const { createUser, updateUser, deleteUser } = useUserApi();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isUserFormVisible, setUserFormVisible] = useState(false);
  const [isDeleteUserAlertVisible, setDeleteUserAlertVisible] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<User["id"]>();

  const handleEdit = useCallback((id: User["id"]) => {
    setCurrentUserId(id);
    setUserFormVisible(true);
  }, []);

  const handleDelete = useCallback((id: User["id"]) => {
    setCurrentUserId(id);
    setDeleteUserAlertVisible(true);
  }, []);

  const columns = getColumns(handleEdit, handleDelete);

  const handleUserFormDialogClose = async (user?: User) => {
    setUserFormVisible(false);
    setCurrentUserId(undefined);

    if (user) {
      if (user.id) {
        await updateUser(user);
      } else {
        await createUser(user);
      }
      refetch();
    }
  };

  const handleUserDeleteAlertDialogClose = async (confirmed: boolean) => {
    if (confirmed) {
      await deleteUser(currentUserId!);
      refetch();
    }

    setDeleteUserAlertVisible(false);
    setCurrentUserId(undefined);
  };

  const table = useReactTable({
    data: users,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <>
      <div className="flex py-4">
        <TableFilter table={table} />
        <Button
          variant="outline"
          className="ml-auto"
          onClick={() => setUserFormVisible(true)}
        >
          Create user
        </Button>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <TablePagination table={table} />

      <UserFormDialog
        open={isUserFormVisible}
        user={users.find((user) => user.id === currentUserId)}
        onClose={handleUserFormDialogClose}
      />

      <DeleteAlertDialog
        open={isDeleteUserAlertVisible}
        onClose={handleUserDeleteAlertDialogClose}
      />
    </>
  );
}
