import BASE_URL from '../config/config';
import axios from 'axios';
import { useAuthStore, useUserStore } from '../store/store';
import { mockUser, USE_MOCK } from '../config/mock';

export const login = async (id, password) => {
    if (USE_MOCK) {
        if (id === 'test1' && password === '1234') {
            const data = { accessToken: 'mock-token-12345', user: mockUser, success: true };
            useAuthStore.getState().setAccessToken(data.accessToken);
            useUserStore.getState().setUser(data.user);
            return data;
        }
        throw new Error('아이디 또는 비밀번호가 틀렸습니다.');
    }

    try {
        const res = await axios.post(
            `${BASE_URL}/auth/login`,
            { id, password },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );
        useAuthStore.getState().setAccessToken(res.data.accessToken);
        useUserStore.getState().setUser(res.data.user);
        return res.data;
    }
    catch (e) {
        console.error('로그인 에러:', e);
        throw e;
    }
};

export const logout = async () => {
    if (USE_MOCK) {
        useAuthStore.getState().resetAccessToken();
        useUserStore.getState().resetUser();
        return { success: true };
    }

    try {
        const accessToken = useAuthStore.getState().accessToken;
        const res = await axios.post(
            `${BASE_URL}/auth/logout`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true,
            }
        );
        useAuthStore.getState().resetAccessToken();
        useUserStore.getState().resetUser();
        return res.data;
    }
    catch (e) {
        console.log('로그아웃 에러:', e);
        throw e;
    }
};

export const register = async (id, password, name, age, gender, phone) => {
    if (USE_MOCK) {
            return { success: true, message: '회원가입 성공' };
        }

    try {
        console.log('=== 요청 정보 ===');
        console.log('BASE_URL:', BASE_URL);
        console.log('요청 URL:', `${BASE_URL}/auth/register`);
        console.log('요청 데이터:', { id, password, name, age, gender, phone });

        const res = await axios.post(
            `${BASE_URL}/auth/register`,
            { id, password, name, age, gender, phone },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );
        return res.data;
    }
    catch (e) {
        // console.log('회원가입 에러:', e);
        console.log('=== 에러 정보 ===');
        console.log('에러 메시지:', e.message);
        console.log('요청 URL:', e.config?.url);
        console.log('요청 방법:', e.config?.method);
        console.log('에러 코드:', e.code);
        console.log('응답 상태:', e.response?.status);
        throw e;
    }
};
