import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import type { ClientRequest, RequestStatus } from "@/shared/api/mock-api";
import { useEditRequest } from "../model/use-edit-request";
import { maskAccount } from "@/shared/lib/utils";

interface EditRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: ClientRequest | null;
}

export function EditRequestModal({
  isOpen,
  onClose,
  request,
}: EditRequestModalProps) {
  const {
    limit,
    setLimit,
    reason,
    setReason,
    status,
    setStatus,
    error,
    isSubmitting,
    isHighRisk,
    handleSubmit,
  } = useEditRequest({ request, onClose });

  if (!request) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Edit Request</DialogTitle>
          <DialogDescription>Details for {request.name}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium">Account</span>
            <span className="col-span-3 text-sm font-mono tracking-wider">
              {maskAccount(request.account)}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium">Current Limit</span>
            <span className="col-span-3 text-sm">
              {request.currentLimit.toLocaleString()} {request.currency}
            </span>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium">New Limit</span>
            <Input
              type="number"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium">Status</span>
            <Select
              value={status}
              onValueChange={(val) => setStatus(val as RequestStatus)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium">Reason</span>
            <Select
              value={reason}
              onValueChange={setReason}
              disabled={!isHighRisk && reason === "" && false}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Credit History">Credit History</SelectItem>
                <SelectItem value="Income Level">Income Level</SelectItem>
                <SelectItem value="Bank Policy">Bank Policy</SelectItem>
                {isHighRisk && (
                  <SelectItem
                    value="Special Risk"
                    className="text-red-500 font-medium"
                  >
                    Special Risk
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          {isHighRisk && (
            <div className="col-span-4 text-xs text-amber-500 font-medium text-center">
              High risk limit detected. Reason is mandatory.
            </div>
          )}
          {error && (
            <div className="col-span-4 text-sm text-red-500 text-center">
              {error}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
