import { useState, useEffect } from "react";
import type { ClientRequest, RequestStatus } from "@/shared/api/mock-api";
import { useRequestsStore } from "../../applications-list/model/store";
import { useHistoryStore } from "@/shared/model/history-store";

interface UseEditRequestProps {
  request: ClientRequest | null;
  onClose: () => void;
}

export function useEditRequest({ request, onClose }: UseEditRequestProps) {
  const updateRequest = useRequestsStore((state) => state.updateRequest);
  const addLog = useHistoryStore((state) => state.addLog);

  const [limit, setLimit] = useState<number>(0);
  const [reason, setReason] = useState<string>("");
  const [status, setStatus] = useState<RequestStatus>("New");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (request) {
      setLimit(request.requestedLimit);
      setReason(request.reason || "");
      setStatus(request.status);
      setError(null);
    }
  }, [request]);

  const isHighRisk = limit > 1000000;
  const isReasonRequired = isHighRisk;

  const validate = () => {
    if (limit < 0) return "Limit cannot be negative.";
    if (limit > 10000000) return "Limit cannot exceed 10,000,000 bad currency.";
    if (isReasonRequired && !reason.trim())
      return "Reason is required for limits over 1,000,000.";
    return null;
  };

  const handleSubmit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!request) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const updatedRequest: ClientRequest = {
        ...request,
        requestedLimit: limit,
        reason,
        status,
      };

      await updateRequest(updatedRequest);

      if (request.requestedLimit !== limit) {
        addLog(
          `Limit changed from ${request.requestedLimit} to ${limit}`,
          request.name,
        );
      }
      if (request.status !== status) {
        addLog(`Status changed to ${status}`, request.name);
      }
      if (!request.reason && reason) {
        addLog(`Reason added: ${reason}`, request.name);
      }

      onClose();
    } catch (err) {
      setError("Failed to update request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
  };
}
