export type Status = {
    alias: string;
    name: string;
};

export type RequestItem = {
    id: number;
    user_full_name: string;
    phone: string;
    service_name: string;
    package_name: string;
    status: Status;
    assigned_employee: string | null;
    customer_id: number;
    dt_created: string;
    start_time: string | null;
    service_id: number;
    is_single_package: boolean;
    on_review_date: string | null;
    preferred_specialist: string | null;
    order_id?: number;
    full_name?: string;
    taxpayer_number?: string;
    cor_acc?: string;
    bank_acc?: string;
    bank_bik?: string;
    bank?: string;
    application?: string;
    price?: string | number;
};

export type CurrentRequestResponse = {
    assigned_employee: string | null;
    chat_id: number;
    customer_id: number;
    customer_unavailable_call_is_made: boolean;
    documents_received_at: string | null;
    dt_created: string;
    duration: string;
    get_in_touch_at: string | null;
    id: number;
    on_review_date: string | null;
    phone: string;
    service_name: string;
    start_time: string | null;
    status: {
        alias: string;
        name: string;
    };
    user_full_name: string;
    count?: number;
    results?: RequestItem[];
};

export type RequestApiResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: RequestItem[];
    assigned_employee: string | null;
    chat_id: number;
    customer_id: number;
    customer_unavailable_call_is_made: boolean;
    documents_received_at: string | null;
    dt_created: string;
    duration: string;
    get_in_touch_at: string | null;
    id: number;
    on_review_date: string | null;
    phone: string;
    service_name: string;
    start_time: string | null;
    status: {
        alias: string;
        name: string;
    };
    user_full_name: string;
};

export type AssigmentEmployerResponse = {
    detail: string
}
