export interface Article {
    id: number;
    title: string;
    content: string;
    author: string;
    likesCount: number;
    commentsCount: number;
    createdAt: string;
    updatedAt?: string;
}


export interface CreateArticleDto {
    title: string;
    content: string;
    author: string;
    password?: string;
}

export interface UpdateArticleDto {
    title?: string;
    content?: string;
    password: string;
}

export interface Comment {
    id: number;
    articleId: number;
    author: string;
    content: string;
    createdAt: string;
}

export interface CreateCommentDto {
    articleId: number;
    author: string;
    content: string;
}