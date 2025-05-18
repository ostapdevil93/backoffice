export type CustomersResponse = {
    id: number;
    full_name: string;
    phone: string;
    package_count: number;
    last_login: string | null;
    dt_registered: string;
    certificate_code: string | null;
    customer_id: number;
    order_id?: number;
    taxpayer_number?: string;
    cor_acc?: string;
    bank_acc?: string;
    bank_bik?: string;
    bank?: string;
    application?: string;
    price?: string | number;
};

export type CustomerApiResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: CustomersResponse[];
    available_services: AvailableService[];
    customer_address: string;
    customer_birth_datetime: string;
    customer_country: string | null;
    customer_email: string;
    customer_full_name: string;
    customer_phone: string;
    ordered_services: OrderedService[];
    purchased_packages: PurchasedPackage[];
};

export type CurrentCustomerResponse = {
    available_services: AvailableService[];
    customer_address: string;
    customer_birth_datetime: string;
    customer_country: string | null;
    customer_email: string;
    customer_full_name: string;
    customer_phone: string;
    ordered_services: OrderedService[];
    purchased_packages: PurchasedPackage[];
};

export type AvailableService = {
    service_id: number;
    service_name: string;
    total_quantity: number;
    left_quantity: number;
};

export type OrderedService = {
    request_id: number;
    employee_name: string;
    service_name: string;
    service_start: string;
    service_status: {
        name: string
    }
};

export type PurchasedPackage = {
    package_alias: string;
    package_name: string;
    dt_start: string;
    dt_end: string;
};
