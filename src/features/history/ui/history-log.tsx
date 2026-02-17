import { useHistoryStore } from "@/shared/model/history-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export function HistoryLog() {
  const logs = useHistoryStore((state) => state.logs);

  return (
    <Card className="h-full max-h-[400px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Session History</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        {logs.length === 0 ? (
          <div className="text-sm text-muted-foreground text-center py-4">
            No actions recorded in this session.
          </div>
        ) : (
          <ul className="space-y-3">
            {logs.map((log) => (
              <li
                key={log.id}
                className="text-sm border-b pb-2 last:border-0 hover:bg-muted/50 p-2 rounded transition-colors"
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-xs text-muted-foreground">
                    {log.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <div className="text-foreground">
                  <span className="font-medium">
                    {log.clientId ? `Client: ${log.clientId}` : "System"}:{" "}
                  </span>
                  {log.message}
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
