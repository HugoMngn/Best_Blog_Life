// src/hooks/useComments.ts
import { useCallback, useState } from "react";
// do not use raw axios here; use commentService helper to fetch and map
// import axios from "axios";
import commentService from '../services/commentService';
import { Comment as CommentType } from "../types/comment.types";

/**
 * useComments hook
 * - Fetches comments for an article and supports creating new comments.
 * - Maps API response fields from snake_case to camelCase to match front-end types.
 */
export function useComments(articleId: number) {
    const [comments, setComments] = useState<CommentType[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchComments = useCallback(async () => {
        setLoading(true);
        try {
            const data = await commentService.getCommentsByArticle(articleId);
            // The service returns camelCase `Comment` objects; keep as-is
            setComments(data || []);
        } catch (err) {
            console.error("Failed to fetch comments", err);
        } finally {
            setLoading(false);
        }
    }, [articleId]);

    const createComment = async (content: string, author?: string) => {
        try {
            const c = await commentService.createComment({ articleId: articleId, author: author || "Anonymous", content });
            const mapped = c as CommentType;
            // append the returned comment
            setComments((prev) => [...prev, mapped]);
        } catch (err) {
            console.error("Failed to create comment", err);
            throw err;
        }
    };

    return { comments, loading, fetchComments, createComment };
}
