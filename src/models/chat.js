import BASE_URL from '../config/config';
import axios from 'axios';
import { useAuthStore } from '../store/store';
import { mockChatHistory, mockChats, USE_MOCK } from '../config/mock';

export const ask = async (content, chatId = null) => {
    if (USE_MOCK) {
        return {
            success: true,
            chat: {
                chat_id: chatId || 1,
                answer: { content: 'Mock 응답입니다.', is_recommend: false, is_diag: false },
            },
        };
    }

    try {
        const accessToken = useAuthStore.getState().accessToken;

        const requestData = {
            content,
            ...(chatId && { chat_id: chatId }),
        };

        const res = await axios.post(
            `${BASE_URL}/chat`,
            requestData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
            }
        );

        return res.data;
    } catch (e) {
        console.error('질문하기 에러:', e);
        throw e;
    }
};

// getChatAll 함수를 getAllChats로 변경하고 period API를 사용
export const getAllChats = async (days = 365) => {  // 기본값을 1년으로 설정해서 전체 조회
    if (USE_MOCK) {
        const chatsWithHistory = mockChats.map(chat => ({
            ...chat,
            history: mockChatHistory[chat.chat_id] || [],
        }));
        return { success: true, data: chatsWithHistory };
    }

    try {
        const accessToken = useAuthStore.getState().accessToken;

        const res = await axios.get(
            `${BASE_URL}/chat/period`,
            {
                params: { period: days },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
            }
        );

        return res.data;
    } catch (e) {
        console.error('전체 채팅방 조회 에러:', e);
        throw e;
    }
};

export const getChat = async (chatId) => {
    if (USE_MOCK) {
        return {
            success: true,
            data: {
                title: mockChats.find(c => c.chat_id === chatId)?.title || '채팅',
                history: mockChatHistory[chatId] || [],
            },
        };
    }

    try {
        const accessToken = useAuthStore.getState().accessToken;

        const res = await axios.get(
            `${BASE_URL}/chat/${chatId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
            }
        );

        return res.data;
    } catch (e) {
        console.error('특정 채팅방 조회 에러:', e);
        throw e;
    }
};

export const getChat7Period = async () => {
    if (USE_MOCK) {
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const filtered = mockChats.filter(c => new Date(c.created_at) >= sevenDaysAgo);
        return { success: true, data: filtered };
    }

    try {
        const accessToken = useAuthStore.getState().accessToken;

        const res = await axios.get(
            `${BASE_URL}/chat/period`,
            {
                params: { period: 7 },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
            }
        );

        return res.data;
    } catch (e) {
        console.error('7일 채팅 조회 에러:', e);
        throw e;
    }
};

export const getChat30Period = async () => {
    if (USE_MOCK) {
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const filtered = mockChats.filter(c => new Date(c.created_at) >= thirtyDaysAgo);
        return { success: true, data: filtered };
    }

    try {
        const accessToken = useAuthStore.getState().accessToken;

        const res = await axios.get(
            `${BASE_URL}/chat/period`,
            {
                params: { period: 30 },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
            }
        );

        return res.data;
    } catch (e) {
        console.error('30일 채팅 조회 에러:', e);
        throw e;
    }
};

export const getChatByPeriod = async (days) => {
    if (USE_MOCK) {
        const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
        const filtered = mockChats.filter(c => new Date(c.created_at) >= cutoff);
        return { success: true, data: filtered };
    }

    try {
        const accessToken = useAuthStore.getState().accessToken;

        const res = await axios.get(
            `${BASE_URL}/chat/period`,
            {
                params: { period: days },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
            }
        );

        return res.data;
    } catch (e) {
        console.error(`${days}일 채팅 조회 에러:`, e);
        throw e;
    }
};
