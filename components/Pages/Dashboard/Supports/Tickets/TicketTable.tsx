import { DataTable } from "@/components/ui/Datatable";
import { Eye, Paperclip } from "lucide-react";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSupport } from "@/libs/hooks/useSupport";

const COLUMNS = [
  {
    key: "ticketNumber",
    header: "Ticket #",
    render: (row: any) => (
      <span className="font-mono text-sm font-semibold text-gray-700">
        {row.ticketNumber}
      </span>
    ),
  },
  {
    key: "subject",
    header: "Subject",
    render: (row: any) => (
      <span className="text-gray-900 font-medium">{row.subject}</span>
    ),
  },
  {
    key: "projectName",
    header: "Project",
    render: (row: any) => (
      <span className="text-gray-700">{row.projectName || "N/A"}</span>
    ),
  },
  {
    key: "priority",
    header: "Priority",
    render: (row: any) => (
      <span
        className={`px-3 py-1 rounded-md text-sm font-medium ${
          row.priority === "high"
            ? "bg-red-50 text-red-600"
            : row.priority === "medium"
            ? "bg-orange-50 text-orange-600"
            : "bg-blue-50 text-blue-600" // low
        }`}
      >
        {row.priority?.charAt(0).toUpperCase() + row.priority?.slice(1)}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (row: any) => (
      <span
        className={`px-3 py-1 rounded-md text-sm font-medium ${
          row.status === "resolved"
            ? "bg-green-50 text-green-600"
            : row.status === "closed"
            ? "bg-gray-100 text-gray-600"
            : row.status === "in_progress"
            ? "bg-blue-50 text-blue-600"
            : "bg-yellow-50 text-yellow-600" // open
        }`}
      >
        {row.status === "in_progress"
          ? "In Progress"
          : row.status?.charAt(0).toUpperCase() + row.status?.slice(1)}
      </span>
    ),
  },
  {
    key: "attachments",
    header: "Attachments",
    render: (row: any) => (
      <span className="flex items-center gap-1 text-gray-600">
        <Paperclip className="w-3.5 h-3.5" />
        {row.attachmentCount > 0 ? `${row.attachmentCount} file${row.attachmentCount > 1 ? "s" : ""}` : "None"}
      </span>
    ),
  },
  {
    key: "createdAt",
    header: "Created Date",
    render: (row: any) => (
      <span className="text-gray-700">
        {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "N/A"}
      </span>
    ),
  },
];

export default function TicketsTable() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);

  const { getTicketsQuery } = useSupport();
  const { data, isLoading, error } = getTicketsQuery({ page, limit });

  const rawData    = data?.data?.data || [];
  const totalCount: number = data?.data?.meta?.totalDocuments ?? 0;

  const tableData = useMemo(
    () =>
      rawData.map((item: any) => ({
        id:              item.id,
        ticketNumber:    item.ticketNumber,
        subject:         item.subject,
        description:     item.description,
        projectName:     item.projectName,
        priority:        item.priority,
        status:          item.status,
        attachmentCount: item.attachments?.length ?? 0,
        attachments:     item.attachments ?? [],
        createdAt:       item.createdAt,
        updatedAt:       item.updatedAt,
      })),
    [rawData],
  );

  const actions = useMemo(
    () => [
      {
        label: "View",
        icon: <Eye className="w-4 h-4 text-gray-600" />,
        onClick: (row: any) => router.push(`/ticket-details/${row.id}`),
      },
    ],
    [router],
  );

  

  return (
    <div className="max-w-7xl mx-auto">
      <DataTable
        columns={COLUMNS}
        data={tableData}
        actions={actions}
        rowsPerPageOptions={[5, 8, 10, 20]}
        defaultRowsPerPage={limit}
        showSearch={true}
        searchPlaceholder="Search tickets..."
        searchableColumns={["ticketNumber", "subject", "projectName", "status", "priority"]}
        showSerialNumber={true}
        isLoading={isLoading}
        // ── Server-side pagination ──────────────────────────────────────
        serverSide={true}
        totalCount={totalCount}
        currentPage={page}
        onPageChange={(newPage) => setPage(newPage)}
        onRowsPerPageChange={(newLimit) => {
          setLimit(newLimit);
          setPage(1);
        }}
      />
    </div>
  );
}