export default interface PostInterface {
    key: number,
    title: string,
    body: string,
    author: string,
    clicked?(e:any):void
    changedTitle?(e: any):void
    changedAuthor?(e: any):void
    changedContent?(e: any): void 
    deleted?(e: any): void
}
