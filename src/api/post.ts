import { apiClient } from "./axios";
import type { CommentsResponse, FeedResponse } from "./types";

export const getFeed = async (page = 1, limit = 10): Promise<FeedResponse> => {
    try {
        const response = await apiClient.get('/feed', {
            params: { page, limit },
        });
        const data = response.data.data;
        return {
            items: data.posts,
            currentPage: data.currentPage,
            totalPages: data.totalPages,
            totalItems: data.totalPosts,
        };
    } catch (error) {
        console.error('Failed to fetch feed:', error);
        throw error;
    }
};

export const getComments = async (postId: string, page = 1, limit = 10): Promise<CommentsResponse> => {
    if (!postId) throw new Error('Post ID is required to fetch comments.');

    try {
        const response = await apiClient.get(`/posts/${postId}/comments`, {
            params: { page, limit },
        });
        const data = response.data.data;
        return {
            items: data.comments,
            currentPage: data.currentPage,
            totalPages: data.totalPages,
            totalItems: data.totalComments,
        };
    } catch (error) {
        console.error(`Failed to fetch comments for post ${postId}:`, error);
        throw error;
    }
};
