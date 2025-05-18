export type StatisticsResponse = {
    result: string;
    status: string;
};

export type ActResponse = {
    data: string
}

export type WorkersGraphicResponse = {
    date: string;
    performers: string | null;
    start_time: string;
    end_time: string;
    start_time_offset: number;
}
