export interface CreateEventInterface {
    boardId: string
    item: {
        id: string
        type: string
        createdAt: string
        createdBy: {
            id: string
            type: string
            [k: string]: unknown
        }
        data: {
            content: string
            shape: string
            [k: string]: unknown
        }
        geometry: {
            width: number
            height: number
            [k: string]: unknown
        }
        modifiedAt: string
        modifiedBy: {
            id: string
            type: string
            [k: string]: unknown
        }
        position: {
            x: number
            y: number
            origin: string
            relativeTo: string
            [k: string]: unknown
        }
        style: {
            fillColor: string
            textAlign: string
            textAlignVertical: string
            [k: string]: unknown
        }
        [k: string]: unknown
    }
    type: string

    [k: string]: unknown
}
