export declare class MiroWrapperService {
    private static instance;
    private constructor();
    static getInstance(): MiroWrapperService;
    registerUser(boardId: string, userId: string): Promise<string>;
    subscribeBoard(boardId: string): Promise<string>;
}
