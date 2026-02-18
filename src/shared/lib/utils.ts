import type { RequestStatus } from "../api/mock-api";
import type { VariantProps } from "class-variance-authority";
import { badgeVariants } from "@/shared/ui/badge";

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

export const getStatusVariant = (status: RequestStatus): BadgeVariant => {
    const map: Record<RequestStatus, BadgeVariant> = {
        Approved: "success",
        Rejected: "destructive",
        New: "secondary",
    };

    return map[status] ?? "secondary";
};

export const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: currency,
        maximumFractionDigits: 0,
    }).format(amount);
};

export const maskAccount = (account: string) => {
    if (account.length < 9) return account;
    const first5 = account.substring(0, 5);
    const last4 = account.substring(account.length - 4);
    return `${first5} **** **** ${last4}`;
};
