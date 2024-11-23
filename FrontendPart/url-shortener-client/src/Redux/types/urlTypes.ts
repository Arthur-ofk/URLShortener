export interface Url {
    id: string;
    originalUrl: string;
    shortUrl: string;
    createdAt: string;
}

export interface UrlPayload {
    originalUrl: string;
}

export interface UrlState {
    urls: Url[];
    loading: boolean;
    error: string | null;
}