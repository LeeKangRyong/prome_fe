interface Chat {
    chat_id: number;
    title: string;
    created_at: string;
}

interface ChatMessage {
    content_id: number;
    content: string;
    is_question: boolean;
    is_diag: boolean;
    is_recommend: boolean;
    temp: number | null;
    ecg: number | null;
    created_at: string;
}

interface ChatAnswer {
    content: string;
    is_recommend: boolean;
    is_diag: boolean;
}

interface Ask {
    success: boolean;
    chat: {
        chat_id: number;
        answer: ChatAnswer;
    };
}

interface GetChat {
    success: boolean;
    data: {
        title: string;
        history: ChatMessage[];
    };
}

interface GetAllChats {
    success: boolean;
    data: Chat[];
}

export type { Chat, ChatMessage, ChatAnswer, Ask, GetChat, GetAllChats };
