import { create } from "zustand";

export interface HistoryLogEntry {
  id: string;
  timestamp: Date;
  message: string;
  clientId: string;
}

interface HistoryState {
  logs: HistoryLogEntry[];
  addLog: (message: string, clientId: string) => void;
  clearLogs: () => void;
}

export const useHistoryStore = create<HistoryState>((set) => ({
  logs: [],
  addLog: (message: string, clientId: string) =>
    set((state) => ({
      logs: [
        {
          id: crypto.randomUUID(),
          timestamp: new Date(),
          message,
          clientId,
        },
        ...state.logs,
      ],
    })),
  clearLogs: () => set({ logs: [] }),
}));
