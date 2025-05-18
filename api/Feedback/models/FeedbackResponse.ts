export type FeedbackResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: FeedbackItem[];
};

type FeedbackItem = {
    id: number;
    user_full_name: string;
    assigned_employee: string;
    service_name: string;
    package_name: string;
    request_id: number;
    rate: number;
    comment: string | null;
    dt_created: string;
    customer_id: number;
    tangibles: boolean;
    qualification: boolean;
    empathy: boolean;
    responsiveness: boolean;
    reliability: boolean;
};
