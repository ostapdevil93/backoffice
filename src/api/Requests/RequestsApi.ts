import {GetApiTemplate} from "@/api/ApiTemplate/GetApiTemplate";
import {PostApiTemplate} from "@/api/ApiTemplate/PostApiTemplate";
import {PutApiTemplate} from "@/api/ApiTemplate/PutApiTemplate";
import {TermIdType} from "@/stores/types/backofficeType/ActionModalType";
import {
    StatusesResponse,
    UserChatMessagesResponse,
    CurrentRequestResponse,
    RequestApiResponse,
    AssigmentEmployerResponse
} from '@/api/Requests/models';
import {
    RequestReviewResponse,
    SendMessageRequest,
    SendMessageResponse,
    UploadFileRequest,
    UploadFileResponse
} from "./models";

export class RequestsApi {
    /**
     * Получение списка запросов или конкретного запроса по ID
     * @param requestData - строка параметров запроса, например, 'status=active'
     * @param requestId - идентификатор запроса, если нужно получить конкретный запрос
     * @returns Объект Promise, содержащий либо список запросов (RequestApiResponse), либо информацию о текущем запросе (CurrentRequestResponse)
     */
    static async getRequests(requestData: string, requestId: number = 0): Promise<RequestApiResponse | CurrentRequestResponse> {
        return GetApiTemplate.get<RequestApiResponse | CurrentRequestResponse>(`request${requestId > 0 ? '/' + requestId : ''}`, requestData);
    }

    /**
     * Получение пред-заказов
     * @param requestData - строка параметров для формирования запроса
     * @returns Объект Promise, содержащий информацию о предварительном заказе (RequestApiResponse)
     */
    static async getPreOrder(requestData: string): Promise<RequestApiResponse> {
        return GetApiTemplate.get<RequestApiResponse>('pre-order', requestData);
    }

    /**
     * Получение статусов запросов
     * @returns Объект Promise, содержащий данные о статусах запросов (StatusesResponse)
     */
    static async getStatuses(): Promise<StatusesResponse[]> {
        return GetApiTemplate.get<StatusesResponse[]>('request/statuses');
    }

    static async changeStatus(id: number | null | undefined, status: string): Promise<AssigmentEmployerResponse> {
        const endpoint = `request/${id}`;
        const data = {status: status};
        return PutApiTemplate.put<AssigmentEmployerResponse, { status: string }>(
            endpoint,
            data,
            true
        )
    }

    static async putAssigmentEmployer(id: number | undefined, termId: TermIdType): Promise<AssigmentEmployerResponse> {
        const endpoint = `request/${id}/assignee`;
        const data = {employee_id: termId.termId};
        return PutApiTemplate.put<AssigmentEmployerResponse, {employee_id: number | string}>(
            endpoint,
            data,
            true
        );
    }

    static async getChatMessages(id: number | undefined): Promise<UserChatMessagesResponse> {
        return GetApiTemplate.get<UserChatMessagesResponse>('chat/' + id);
    }

    static async sendMessage(data: SendMessageRequest): Promise<SendMessageResponse> {
        return PostApiTemplate.post<SendMessageResponse, SendMessageRequest>('chat/message', data, true);
    }

    static async uploadFile(data: UploadFileRequest): Promise<UploadFileResponse> {
        return PostApiTemplate.post<UploadFileResponse, UploadFileRequest>('file', data, true, '/api/client/v1');
    }

    static async sendReviewRequest(id: number | undefined): Promise<RequestReviewResponse> {
        return PostApiTemplate.post<RequestReviewResponse, number | null>('backoffice-chat-sending-feedback/' + id, null, true);
    }
}
