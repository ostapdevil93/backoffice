import {RequestItem} from "@/api/Requests/models/RequestsListResponse";
import {StatusesResponse} from "@/api/Requests/models/StatusesResponse";


export interface RequestTitleOptionsType {
    title: string;
    value: number | string
}

export interface RequestTitleType {
    text: string;
    value: string;
    filterable?: boolean;
    label?: string;
    selectable?: boolean;
    isDate?: boolean;
    options?: RequestTitleOptionsType[];
}


export interface RequestType {
    count: number;
    titles: RequestTitleType[];
    requests: RequestItem[];
    statuses: StatusesResponse[];
}
