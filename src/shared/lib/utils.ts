import type { RequestStatus } from "../api/mock-api";

export const getStatusVariant = (status: RequestStatus) => {
    return {
        Approved: "success",
        Rejected: "destructive",
        New: "secondary",
    }[status];
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
