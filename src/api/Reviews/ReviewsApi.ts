import {GetApiTemplate} from "@/api/ApiTemplate/GetApiTemplate";
import {PostApiTemplate} from "@/api/ApiTemplate/PostApiTemplate";
import {ReviewsResponse, SendReviewResponse} from "@/api/Reviews/model";
import {ReviewData} from "@/stores/types/backofficeType/RequestDetailsType";

export class ReviewsApi {
    private static baseUrl = '/api/expert_reviews/v1';

    /**
     * Получение отзывов по ID клиента
     * @param customerId - идентификатор клиента
     * @returns Promise<ReviewsResponse>
     */
    static async getReviews(customerId: number | undefined): Promise<ReviewsResponse> {
        return GetApiTemplate.get<ReviewsResponse>('reviews/get/' + customerId, '', this.baseUrl);
    }

    /**
     * Отправка отзыва через POST-запрос
     * @param data - данные отзыва для отправки на сервер
     * @returns Promise<SendReviewResponse>
     */
    static async sendReview(data: ReviewData): Promise<SendReviewResponse> {
        return PostApiTemplate.post<SendReviewResponse, ReviewData>('reviews', data, true, this.baseUrl);
    }
}
