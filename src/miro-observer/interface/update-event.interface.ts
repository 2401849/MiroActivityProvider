export interface UpdateEventInterface {
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
            fillOpacity: string
            fontFamily: string
            fontSize: string
            borderColor: string
            borderWidth: string
            borderOpacity: string
            borderStyle: string
            textAlign: string
            textAlignVertical: string
            color: string
            [k: string]: unknown
        }
        [k: string]: unknown
    }
    type: string
    [k: string]: unknown
}
