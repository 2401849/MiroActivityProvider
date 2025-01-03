export interface DeleteEventInterface {
    boardId: string
    item: {
        id: string
        [k: string]: unknown
    }
    type: string
    [k: string]: unknown
}
