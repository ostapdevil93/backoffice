export type SendMessageRequest = {
    chat_id: number | undefined,
    content: string | null,
    file_ids: number[]
}