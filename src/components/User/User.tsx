import React from 'react';
import { Button } from 'reactstrap';

import './User.css';

/**
 * 
 *  "id": 1,
 *  "name": "Leanne Graham",
 *  "username": "Bret",
 *   "email": "Sincere@april.biz",
 *   "address": {
 *      "street": "Kulas Light",
 *      "suite": "Apt. 556",
 *      "city": "Gwenborough",
 *      "zipcode": "92998-3874",
 *      "geo": {
 *         "lat": "-37.3159",
 *         "lng": "81.1496"
 *     }
 *   },
 *   "phone": "1-770-736-8031 x56442",
 *   "website": "hildegard.org",
 *   "company": {
 *   "name": "Romaguera-Crona",
 *   "catchPhrase": "Multi-layered client-server neural-net",
 *   "bs": "harness real-time e-markets"
 *   }
 */

interface address {
    street: string,
    suite: string,
    city: string,
    zipcode: string
}

interface UserInterface {
    key: number,
    name: string,
    email: string
    address: address
    clicked?(e: any): void,
    deleted?(e: any): void
}
const user: React.SFC<UserInterface> = (props) => (
    <article className="User" onClick={props.clicked} >
        <h3>{props.name}</h3>
        <div className="Info">
            <div className="Author">{props.email}</div>
            <div className="Author">Address: {props.address.street}</div>
            <div className="Author">Suite: {props.address.suite}</div>
            <div className="Author">City: {props.address.city}</div>
            <div className="Author">Zip code: {props.address.zipcode}</div>
        </div>
        <div className="row justify-content-center">
            <Button onClick={props.deleted} color="info"> Delete User </Button>
        </div>
    </article>
);

export default user;