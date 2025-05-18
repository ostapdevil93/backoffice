export interface FiltersType {
    requestsFilters: RequestFiltersType;
    packagesFilters: PackagesFiltersType;
}

export interface RequestFiltersType {
    filters: {
        [key: string]: string | null | Date;
        id: string;
        user_full_name: string;
        phone: string;
        service_name: string;
        package_name: string;
        assigned_employee: string;
        status: string;
        dt_created: Date | null | string;
    };
    page: PageType;
}

export interface PackagesFiltersType {
    filters: {
        [key: string]: string | null;
        order_id: string;
        certificate_number: string | null;
        partner: string;
        package: string;
        price: string;
        phone: string;
        full_name: string;
        start_date: string;
        end_date: string;
        purchase_date: string;
    };
    page: PageType;
}

export interface PageType {
    offset: number;
    limit: number;
}