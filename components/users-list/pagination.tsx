import { Button } from "@/components/ui/button";

import type { Table } from "@tanstack/react-table";
import type { User } from "@/types/user";

const TablePagination = ({ table }: { table: Table<User> }) => (
  <div className="flex items-center justify-end space-x-2 py-4">
    <div className="space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </Button>
    </div>
  </div>
);

export default TablePagination;
