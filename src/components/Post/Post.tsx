import React from 'react';
import { Button } from 'reactstrap';

import './Post.css';

interface PostInterface {
    key: number,
    title: string,
    body: string,
    author: string,
    clicked?(e: any): void,
    deleted?(e: any): void
}

const post: React.SFC<PostInterface> = (props) => (
    <article className="Post" onClick={props.clicked} >
        <h3>{props.title}</h3>
        <div className="Info">
            <div className="Author">{props.body}</div>
            <div className="Author">Author: {props.author}</div>
        </div>
        <div className="row justify-content-center">
            <Button onClick={props.deleted} color="info"> Delete Post </Button>
        </div>
    </article>
);

export default post;