import React, {useState} from 'react';
import { Button } from 'reactstrap';

import './Post.css';

interface PostInterface {
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

const Post: React.FC<PostInterface> = ({ title, body, clicked, author, changedTitle, changedAuthor, changedContent, deleted }) => {

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
            <h3>Title: {title}</h3>
            <div className="Info">
            <div className="Author">Author: {author}</div>
                <div className="Author">Content: {body}</div>                
            </div>
            <Button onClick={displayForm} className="mb-2">Update properties</Button>
            { display ?
                <div>
                    <label className="m-0" htmlFor="Title">Title:</label>
                        <input name="updatetitle" id="Title" placeholder="" type="text" onChange={changedTitle} value={title} className="form-control w-70 text-center"/>
                    <label className="m-0" htmlFor="Author">Author:</label>
                        <input name="updateauthor" id="Author" placeholder="" type="text" onChange={changedAuthor} value={author} className="form-control w-70 text-center"/>
                    <label className="m-0"  htmlFor="Author">Content:</label>
                        <input name="updatebody" id="Content" placeholder="" type="text" onChange={changedContent} value={body} className="form-control w-70 text-center"/>
                </div>
            : ''}

            <div className="row justify-content-center mt-2">
                <Button onClick={deleted} color="info"> Delete Post </Button>
            </div>
        </article>
    );
}

export default Post;