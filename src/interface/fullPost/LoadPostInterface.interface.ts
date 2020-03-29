export interface loadPostInterface {
    error: boolean,
    loadedPost: LoadedPostManager
}

interface LoadedPostManager {
    id: number,
    title: string,
    body: string
}