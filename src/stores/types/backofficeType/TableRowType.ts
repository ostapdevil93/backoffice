import {CustomersResponse} from "@/api/Customers/models/CustomersResponse";
import {RequestItem} from "@/api/Requests/models/RequestsListResponse";
import {RequestTitleType} from "@/stores/types/backofficeType/RequestType";
import {CustomerTitleType} from "@/stores/types/backofficeType/CustomerType";
import {CanceledItem} from "@/api/Packages/models/PackagesResponse";

export interface TableRowItemPathType {
    key: string,
    format?: string
}

export interface TableRowProps {
    rowContent: RequestItem[] | CustomersResponse[] | CanceledItem[],
    tableType: string
}

export interface DataTableProps {
    tableType: string,
    count: number,
    titles: RequestTitleType[] | CustomerTitleType[],
    requests: RequestItem[] | CustomersResponse[] | CanceledItem[],
    loader: boolean,
    title: string
}

export interface TableHeaderProps {
    titles: RequestTitleType[],
    tableType: string,
}
