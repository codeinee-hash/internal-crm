import { useState, useMemo } from "react";
import type { RequestStatus } from "@/shared/api/mock-api";
import { useRequestsStore } from "./store";
import { useDebouncedValue } from "@/shared/lib/react";

export function useApplicationsFilter() {
  const requests = useRequestsStore((state) => state.requests);
  const [statusFilter, setStatusFilter] = useState<RequestStatus | "All">(
    "All",
  );
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebouncedValue(searchQuery, 400);

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const matchesStatus =
        statusFilter === "All" || request.status === statusFilter;
      const matchesSearch = request.name
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [requests, statusFilter, debouncedSearchQuery]);

  return {
    filteredRequests,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
  };
}
