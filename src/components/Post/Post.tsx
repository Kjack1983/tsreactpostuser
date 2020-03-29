import React, {useState} from 'react';
import { Button } from 'reactstrap';

import './Post.css';

interface PostInterface {
    key: number,
    title: string,
    body: string,
    author: string,
    clicked?(e:any):void
    changed?(e: any):void
    deleted?(e: any): void
}

interface formDisplay {
    isShown: boolean
}

const Post: React.FC<PostInterface> = ({ title, body, clicked, author, changed, deleted }) => {

    const [display, setDisplay] = useState<boolean>(false);

    /**
     * Toggle Form
     */
    const displayForm = ():void => {
        let isShownForm = !display;
        setDisplay(isShownForm);
    }

    return (
        <article className="Post" onClick={clicked}>
            <h3>{title}</h3>
            <div className="Info">
                <div className="Author">{body}</div>
                <div className="Author">Author: {author}</div>
            </div>
            <Button onClick={displayForm} className="">Display Form</Button>
            { display ?
                <div>
                    <input name="updatetitle" placeholder="" type="text" onChange={changed} value={title} className="form-control mt-2 mb-2 w-70 text-center"/>
                    <input name="updateauthor" placeholder="" type="text" onChange={changed} value={author} className="form-control mt-2 mb-2 w-70 text-center"/>
                    <input name="updatebody" placeholder="" type="text" onChange={changed} value={body} className="form-control mt-2 mb-2 w-70 text-center"/>
                </div>
            : ''}

            <div className="row justify-content-center">
                <Button onClick={deleted} color="info"> Delete Post </Button>
            </div>
        </article>
    );
}

export default Post;