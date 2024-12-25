import axios, {AxiosError} from 'axios';
import {Character, SearchResult} from "../types.ts";

export type Option = {
    label: string;
    category: string;
}

const api = axios.create({
    baseURL: 'https://swapi.py4e.com/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const useAPI = () => {
    const handleApiError = (error: unknown) => {
        if (error instanceof AxiosError) {
            if (error.code === 'ECONNABORTED') {
                throw new Error('Request timed out. Please try again.');
            }
            if (error.response) {
                throw new Error(`API Error: ${error.response.status} - ${error.response.statusText}`);
            }
            if (error.request) {
                throw new Error('Network error. Please check your internet connection.');
            }
        }
        throw new Error('An unexpected error occurred.');
    };

    const getFilms = async (search?: string): Promise<SearchResult> => {
        try {
            const response = await api.get<SearchResult>('/films', {
                params: {search},
            });
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    };

    const getCharacter = async (url: string): Promise<Character> => {
        try {
            const response = await axios.get<Character>(url);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    };

    return {getCharacter, getFilms};
};