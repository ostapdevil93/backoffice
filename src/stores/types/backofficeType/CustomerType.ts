import {CustomersResponse} from "@/api/Customers/models/CustomersResponse";


export interface CustomerTitleType {
    text: string;
    value: string;
    filterable?: boolean;
    isDate?:boolean,
}

export interface CustomerData {
    count: number;
    titles: CustomerTitleType[];
    customers: CustomersResponse[]
}
