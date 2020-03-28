import React, {ReactNode} from 'react';
import { FormGroup, Label } from 'reactstrap';
import './TextAreaFieldComponent.css';

type Props = {
    children?: ReactNode; 
    label?: string;
    forLabel?: string;
    name?: string;
    id?: string
    placeholder?: string
    class?: string
}

export type Ref = HTMLTextAreaElement;

const textareafieldComponent = React.forwardRef<Ref, Props>((props, ref) => {

    return (
        <FormGroup>
            <Label for="exampleText">{props.label}</Label>
            <textarea name={props.name} id={props.id} ref={ref} placeholder={props.placeholder} className={props.class}>
                {props.children}
            </textarea>
        </FormGroup>
    )
});


export default textareafieldComponent;