import {PostApiTemplate} from '@/api/ApiTemplate/PostApiTemplate';
import {ActResponse, WorkersGraphicResponse, StatisticsResponse} from "@/api/Statistics/model";
import {GetApiTemplate} from "@/api/ApiTemplate/GetApiTemplate";
import {StatisticType} from "@/stores/types/backofficeType/StatisticType";


export class StatisticsApi {
    static async getStatistics(statisticRange: StatisticType): Promise<StatisticsResponse> {
        return PostApiTemplate.post<StatisticsResponse, StatisticType>('purchase_report/detailed', statisticRange, true);
    }

    static async getActStatistic(query: string): Promise<ActResponse> {
        return GetApiTemplate.get<ActResponse>('partner/statistics/download/excelreport/', query);
    }

    static async getWorkersGraphic(query: string): Promise<WorkersGraphicResponse> {
        return GetApiTemplate.get<WorkersGraphicResponse>('video_conference_workday_schedule/', query);
    }
}
