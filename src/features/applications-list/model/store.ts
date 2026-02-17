import { create } from "zustand";
import type { ClientRequest } from "@/shared/api/mock-api";
import { mockApi } from "@/shared/api/mock-api";

interface RequestsState {
  requests: ClientRequest[];
  isLoading: boolean;
  error: string | null;

  fetchRequests: () => Promise<void>;
  updateRequest: (request: ClientRequest) => Promise<void>;
}

export const useRequestsStore = create<RequestsState>((set) => ({
  requests: [],
  isLoading: false,
  error: null,

  fetchRequests: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await mockApi.getRequests();
      set({ requests: data, isLoading: false });
    } catch (err) {
      set({ error: "Failed to fetch requests", isLoading: false });
    }
  },

  updateRequest: async (updatedRequest: ClientRequest) => {
    set({ isLoading: true, error: null });
    try {
      const result = await mockApi.updateRequest(updatedRequest);
      set((state) => ({
        requests: state.requests.map((r) => (r.id === result.id ? result : r)),
        isLoading: false,
      }));
    } catch (err) {
      set({ error: "Failed to update request", isLoading: false });
      throw err;
    }
  },
}));
