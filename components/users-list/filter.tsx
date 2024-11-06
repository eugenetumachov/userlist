import { Input } from "@/components/ui/input";

import type { Table } from "@tanstack/react-table";
import type { User } from "@/types/user";

const TableFilter = ({ table }: { table: Table<User> }) => (
  <Input
    placeholder="Filter names..."
    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
    onChange={(event) =>
      table.getColumn("name")?.setFilterValue(event.target.value)
    }
    className="max-w-sm"
  />
);

export default TableFilter;
