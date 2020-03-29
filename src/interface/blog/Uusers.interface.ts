// type Users
export default interface Uusers {
    id: number,
    name: string,
    username: string,
    email: string,
    address: address
    clicked?(e: any): void;
}

interface address {
    street: string,
    suite: string,
    city: string,
    zipcode: string
}