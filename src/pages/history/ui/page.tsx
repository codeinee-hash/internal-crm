import { HistoryLog } from "@/features/history";

export function HistoryPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Session History</h2>
      <p className="text-muted-foreground">
        Log of actions performed during this session.
      </p>
      <HistoryLog />
    </div>
  );
}
