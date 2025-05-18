import {PackagesResponse, CanceledPackagesResponse} from "@/api/Packages/models";
import {RequestTitleType} from "@/stores/types/backofficeType/RequestType";
import {CanceledItem} from "@/api/Packages/models/PackagesResponse";
import {CustomersResponse} from "@/api/Customers/models/CustomersResponse";
import {RequestItem} from "@/api/Requests/models/RequestsListResponse";

export interface PackageData {
    packages: PackagesResponse[];
    canceledPackages: CanceledPackagesResponse;
    canceledPackagesTitles: RequestTitleType[];
    clientData: CustomersResponse | RequestItem | CanceledItem | null
}
