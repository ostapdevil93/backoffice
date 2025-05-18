export type PackagesResponse = {
    verbose_name: string;
    alias: string;
};

export type CanceledItem = {
    id?: number;
    start_date: string;
    end_date: string;
    purchase_date: string;
    full_name: string;
    partner: string;
    order_id: string;
    certificate_number: string | null;
    price: string;
    package: string;
    phone: string;
    customer: number;
    bank_acc: string;
    taxpayer_number: string;
    bank: string;
    bank_bik: string;
    cor_acc: string;
    dt_created: string;
    application: string;
    receiver: string;
    customer_full_name: string;
    customer_id?: number;
};

export type CanceledPackagesResponse = {
    total: number;
    data: CanceledItem[];
};



