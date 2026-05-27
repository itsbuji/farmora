export type IntegrationBookItem = {
  id: number;
  name: string;
  category: {
    id: number;
    name: string;
  };
  invoice_number: string;
  invoice_date: string;
  vendor: {
    id: number;
    name: string;
  };
  total_price: number;
  discount_price: number;
  net_amount: number;
  quantity: number;
  price_per_unit: number;
  payment_type: "credit" | "paid";
};

export type IntegrationBookRecord = {
  id: number;
  farm_id: number;
  master_id: number;
  date: string;
  amount: number;
  payment_type: "credit" | "paid";
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
};

export type IntegrationBookFilterRequest = {
  farm_id: number | null;
  start_date: string;
  end_date: string;
};

export type IntegrationBookResponse = {
  credit_items: IntegrationBookItem[];
  paid_items: IntegrationBookItem[];
};

export type IntegrationBookListResponse = {
  credit_items: IntegrationBookRecord[];
  paid_items: IntegrationBookRecord[];
};

export type NewIntegrationBookRequest = {
  farm_id: number | null;
  amount: number | string;
  date: string;
  payment_type: "credit" | "paid";
};

export type EditIntegrationBookRequest = Partial<NewIntegrationBookRequest> & {
  id: number;
};

export type EditIntegrationBookPayload = Omit<EditIntegrationBookRequest, "id">;
