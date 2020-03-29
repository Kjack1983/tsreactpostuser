import React, {useState} from 'react';
import { Button } from 'reactstrap';

import './User.css';

//Load Interface
import UserInterface from '../../interface/user/UserInterface.interface';


const User: React.FC<UserInterface> = (props) => {

    const [display, setDisplay] = useState<boolean>(false);

    /**
     * Toggle Form
     */
    const displayForm = ():void => {
        let isShownForm = !display;
        setDisplay(isShownForm);
    }


    return (
        <article className="User" onClick={props.clicked} >
            <h3>{props.name}</h3>
            <div className="Info">
                <div className="Author">{props.email}</div>
                <div className="Author">Address: {props.address.street}</div>
                <div className="Author">Suite: {props.address.suite}</div>
                <div className="Author">City: {props.address.city}</div>
                <div className="Author">Zip code: {props.address.zipcode}</div>
            </div>

            <Button onClick={displayForm} className="mb-2">Update properties</Button>
            { display ?
                <div>
                    <label className="m-0" htmlFor="Name">Name:</label>
                        <input name="updatename" id="Name" placeholder="" type="text" onChange={props.changedName} value={props.name} className="form-control w-70 text-center"/>
                    <label className="m-0" htmlFor="Email">Email:</label>
                        <input name="updateEmail" id="Email" placeholder="" type="text" onChange={props.changedEmail} value={props.email} className="form-control w-70 text-center"/>
                    <label className="m-0"  htmlFor="Address">Address:</label>
                        <input name="updateaddress" id="Address" placeholder="" type="text" onChange={props.changedAddress} value={props.address.street} className="form-control w-70 text-center"/>
                    <label className="m-0"  htmlFor="Suite">Suite:</label>
                        <input name="updatesuite" id="Suite" placeholder="" type="text" onChange={props.changedSuite} value={props.address.suite} className="form-control w-70 text-center"/>
                    <label className="m-0"  htmlFor="City">Suite:</label>
                        <input name="updatecity" id="City" placeholder="" type="text" onChange={props.changedCity} value={props.address.city} className="form-control w-70 text-center"/>
                    <label className="m-0"  htmlFor="ZipCode">ZipCode:</label>
                        <input name="zipCode" id="ZipCode" placeholder="" type="text" onChange={props.changedZipcode} value={props.address.zipcode} className="form-control w-70 text-center"/>
                </div>
            : ''}
            <div className="row justify-content-center">
                <Button onClick={props.deleted} color="info"> Delete User </Button>
            </div>
        </article>
    );
}
    

export default User;