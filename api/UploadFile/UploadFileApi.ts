import {PostApiTemplate} from "@/api/ApiTemplate/PostApiTemplate";
import {UploadFileResponse} from "@/api/UploadFile/model/UploadFileResponse";

export class UploadFileApi extends PostApiTemplate {
    static async sendFile(file: string, id: number | string): Promise<UploadFileResponse> {
        return this.post<UploadFileResponse, {file_base64: string, partner_id: number | string}>('partner/registry-upload', {file_base64: file, partner_id: id}, true);
    }
}