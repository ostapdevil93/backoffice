import {CurrentRequestResponse, UserChatMessagesResponse} from "@/api/Requests/models";
import {CurrentCustomerResponse} from "@/api/Customers/models";
import {Review} from "@/api/Reviews/model";

export interface ReviewData {
    text: string,
    user_id: number | undefined
}

export interface ChatUploadedFile {
    name: string,
    id: number
}

export interface CustomerInfo {
    customerName: string,
    customerPhone: string,
    customerEmail: string,
    customerBirthDay: string,
    customerCountry: string,
    customerAddress: string,
    sessionDuration?: string,
    serviceName?: string,
    status?: string,
    assignedEmployee?: string,
    dtCreated?: string,
}

export interface ListAvailableServices {
    serviceName: string,
    leftQuantity: number
}

export interface AvailableServicesProps {
    listAvailableServices: ListAvailableServices[]
}

export interface ListOrderServices {
    id: number,
    name: string,
    status: string,
    manager: string,
    date: string
}

export interface OrderServicesProps {
    listOrderServices: ListOrderServices[]
}

export interface ListPurchasedPackages {
    name: string,
    purchaseDate: string,
    expiryDate: string
}

export interface PurchasedPackagesProps {
    listPurchasedPackages: ListPurchasedPackages[]
}

export interface RequestDetailsType {
    renderInfo: string,
    requestId: number | undefined,
    customerId: number | undefined,
    request: CurrentRequestResponse | null,
    customer: CurrentCustomerResponse | null
    reviewData: ReviewData,
    reviews: Review[],
    status: string,
    currentChat: UserChatMessagesResponse,
    currentChatNewMessage: string | null,
    chatUploadedFiles: ChatUploadedFile[],
    fileIds: number[]
}