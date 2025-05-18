type Specialist = {
    id: number;
    first_name: string;
    last_name: string;
};

type User = {
    id: number;
    first_name: string;
    last_name: string;
};

export type Review = {
    id: number;
    specialist: Specialist;
    user: User;
    text: string;
    dt_created: string;
};

export type ReviewsResponse = {
    reviews: Review[];
};
