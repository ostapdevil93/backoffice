export type UserChatMessagesResponse = {
    "messages": [
        {
            "dt_created": string,
            "type": string,
            value: string,
            author: string,
            kind: string,
            link: string,
            id: number,
            reply_to: string,
            file_size: string,
            metadata: {}
        }
    ],
    employee: {
        id: number,
        full_name: string
    },
    feedback: {
        feedback_created: boolean,
        token: string
    },
    is_closed: boolean,
    dt_closed: string
}
