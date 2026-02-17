export type RequestStatus = "New" | "Approved" | "Rejected";
export type Currency = "RUB" | "USD" | "EUR";

export interface ClientRequest {
  id: string;
  name: string;
  account: string;
  currentLimit: number;
  requestedLimit: number;
  currency: Currency;
  status: RequestStatus;
  reason?: string;
}

const MOCK_DATA: ClientRequest[] = [
  {
    id: "7b2f-4a12",
    name: "Иванов Иван Иванович",
    account: "40817810500000001234",
    currentLimit: 50000,
    requestedLimit: 150000,
    currency: "RUB",
    status: "New",
  },
  {
    id: "1c9d-8b34",
    name: "Константинопольский Александр Владимирович",
    account: "40817810500000005678",
    currentLimit: 1500000,
    requestedLimit: 2000000,
    currency: "RUB",
    status: "Approved",
  },
  {
    id: "9a5e-2f11",
    name: "Сидорова Анна Сергеевна",
    account: "40817840300000009999",
    currentLimit: 5000,
    requestedLimit: 10000,
    currency: "RUB",
    status: "Rejected",
  },
  {
    id: "4f3a-1b2c",
    name: "Петров Петр Петрович",
    account: "40817810500000002222",
    currentLimit: 100000,
    requestedLimit: 250000,
    currency: "RUB",
    status: "New",
  },
  {
    id: "8c7d-5e6f",
    name: "Смирнов Алексей Дмитриевич",
    account: "40817810500000003333",
    currentLimit: 300000,
    requestedLimit: 500000,
    currency: "RUB",
    status: "Approved",
    reason: "Reliable client",
  },
  {
    id: "2b1a-9c8d",
    name: "Волкова Мария Сергеевна",
    account: "40817810500000004444",
    currentLimit: 5000000,
    requestedLimit: 8000000,
    currency: "RUB",
    status: "New",
  },
  {
    id: "6e5f-4d3c",
    name: "Соколов Дмитрий Игоревич",
    account: "40817810500000005555",
    currentLimit: 10000,
    requestedLimit: 10000000,
    currency: "RUB",
    status: "Rejected",
    reason: "Suspicious activity",
  },
  {
    id: "3a2b-1c4d",
    name: "Михайлов Михаил Михайлович",
    account: "40817810500000006666",
    currentLimit: 75000,
    requestedLimit: 100000,
    currency: "RUB",
    status: "Approved",
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  getRequests: async (): Promise<ClientRequest[]> => {
    await delay(800);
    return JSON.parse(JSON.stringify(MOCK_DATA));
  },

  updateRequest: async (
    updatedRequest: ClientRequest,
  ): Promise<ClientRequest> => {
    await delay(500);
    return updatedRequest;
  },
};
