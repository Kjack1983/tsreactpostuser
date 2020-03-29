import React, { Component } from 'react';
import axios from 'axios';
import './NewPost.css';

interface NewPostInterface {
    posts: [],
    userId: number,
    id: number,
    title: string,
    content: string,
    author: string,
    rows: number
}

class NewPost extends Component<any, NewPostInterface> {
    titleRef: React.RefObject<HTMLInputElement>;
    contentRef: React.RefObject<HTMLTextAreaElement>;
    authorRef: React.RefObject<HTMLSelectElement>;

    constructor(props: any) {
        super(props);
        this.state = {
            posts: [],
            userId: null,
            id: null,
            title: '',
            content: '',
            author: 'Max',
            rows: 4
        }

        this.titleRef = React.createRef();
        this.contentRef = React.createRef();
        this.authorRef = React.createRef();
    }
    


    postDataHandler = ():void => {
        /* const post = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        }

        axios.post('http://jsonplaceholder.typicode.com/posts/', post)
            .then(response => {
                console.log(response);
            }).catch(err => {
                console.log(err);
            }) */
        let fetchedPosts = this.props.posts;
        console.log(fetchedPosts);
        let titleInputValue = this.titleRef.current.value;
        let contentInputValue = this.contentRef.current.value;
        let authorInputValue = this.authorRef.current.value;
        
        let counter = 0;
        this.props.posts.forEach((element: any, index: number) => {
            counter = index + 1;
        });

        let newPost = {
            userId: 1,
            id: counter, 
            title: titleInputValue,
            content: contentInputValue,
            author: authorInputValue
        }

        let updatedPosts = {
            ...this.props.posts,
            [counter]: newPost
        }

        console.log('updatedPosts :', updatedPosts);
        
        this.setState({
            posts: updatedPosts
        })

        console.log('Posts: ',this.state.posts);

        /* this.setState({
            ...this.props.posts,
            newPost
        }) */

    }

    render () {

        return (
            <div className="NewPost">
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} ref={this.titleRef} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows={this.state.rows} ref={this.contentRef} value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} ref={this.authorRef} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;