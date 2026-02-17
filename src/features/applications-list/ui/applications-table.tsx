import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Badge } from "@/shared/ui/badge";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { useApplicationsFilter } from "../model/use-applications-filter";
import { useRequestsStore } from "../model/store";
import type { RequestStatus, ClientRequest } from "@/shared/api/mock-api";
import { EditRequestModal } from "@/features/edit-modal";
import { useState } from "react";

export function ApplicationsTable() {
  const { fetchRequests, isLoading, error } = useRequestsStore();
  const {
    filteredRequests,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
  } = useApplicationsFilter();

  const [selectedRequest, setSelectedRequest] = useState<ClientRequest | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleRowClick = (request: ClientRequest) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const getStatusVariant = (status: RequestStatus) => {
    switch (status) {
      case "Approved":
        return "success";
      case "Rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Input
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <Select
          value={statusFilter}
          onValueChange={(value) =>
            setStatusFilter(value as RequestStatus | "All")
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Client Name</TableHead>
              <TableHead>Current Limit</TableHead>
              <TableHead>Requested Limit</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : filteredRequests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No requests found.
                </TableCell>
              </TableRow>
            ) : (
              filteredRequests.map((request) => (
                <TableRow
                  key={request.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRowClick(request)}
                >
                  <TableCell className="font-medium">{request.id}</TableCell>
                  <TableCell>{request.name}</TableCell>
                  <TableCell>
                    {formatCurrency(request.currentLimit, request.currency)}
                  </TableCell>
                  <TableCell>
                    {formatCurrency(request.requestedLimit, request.currency)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(request.status)}>
                      {request.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <EditRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        request={selectedRequest}
      />
    </div>
  );
}
