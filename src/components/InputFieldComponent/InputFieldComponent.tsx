import React, {ReactNode} from 'react';
import { FormGroup, Label } from 'reactstrap';
import './InputFieldComponent.css';

type Props = {
    children?: ReactNode; 
    type: 'text' | 'email' | 'password'; 
    label?: string;
    forLabel?: string;
    name: string;
    id: string
    placeholder: string
    class: string
}

export type Ref = HTMLInputElement;

const inputfieldcomponent = React.forwardRef<Ref, Props>((props, ref) => {

    return (
        <FormGroup>
            <Label for={props.forLabel}>{props.label}</Label>
            <input name={props.name} id={props.id} ref={ref} placeholder={props.placeholder} type={props.type} className={props.class}>
                {props.children}
            </input>
        </FormGroup>
    )
});


export default inputfieldcomponent;