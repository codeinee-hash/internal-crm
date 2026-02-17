import { ApplicationsTable } from "@/features/applications-list";

export function RequestsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Requests</h2>
      <p className="text-muted-foreground">
        Manage credit limit change requests.
      </p>
      <ApplicationsTable />
    </div>
  );
}
