// Type posts
export default interface Pposts {
    id: number,
    userId: number,
    title: string,
    body: string,
    author: string,
    changed?(e: any): void;
}