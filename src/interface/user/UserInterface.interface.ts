interface address {
    street: string,
    suite: string,
    city: string,
    zipcode: string
}

export default interface UserInterface {
    key: number,
    name: string,
    email: string
    address: address
    clicked?(e: any): void,
    changedName?(e:any): void,
    changedEmail?(e:any): void,
    changedAddress?(e: any): void
    changedSuite?(e: any): void
    changedCity?(e: any): void
    changedZipcode?(e: any): void
    deleted?(e: any): void
}