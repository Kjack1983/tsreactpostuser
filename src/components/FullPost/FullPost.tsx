import React, { Component } from 'react';
import axios from 'axios'; // add a different approach.
import { Button } from 'reactstrap';
import './FullPost.css';

interface FullPostManager {
    id: number
    changedTitle?(e: any): void
    deleted?(e: any): void
}

interface loadPostInterface {
    error: boolean,
    loadedPost: LoadedPostManager
}

interface LoadedPostManager {
    id: number,
    title: string,
    body: string
}

class FullPost extends Component<FullPostManager, loadPostInterface> {
    constructor(props: FullPostManager) {
        super(props);
        this.state = {
            error: false,
            loadedPost: null
        }
    }

    componentDidUpdate():void {
        if (this.props.id) {

            if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
                axios.get('http://jsonplaceholder.typicode.com/posts/' + this.props.id).then(response => {
                    console.log('response, ', response);
                    
                    if (response.status !== 200) {
                        this.setState({
                            error: true
                        })
                        return;
                    }

                    this.setState({
                        error: false,
                        loadedPost: {
                            id: response.data.id,
                            title: response.data.title,
                            body: response.data.body
                        }
                    })
                }).catch(err => {
                    console.log('err :', err);
                })
            }
        }
    }

    deletePostHandler = ():void => {
        console.log(this.props.id);
        axios.delete('http://jsonplaceholder.typicode.com/posts/' + this.props.id)
            .then(response => {
                console.log(response);
            }).catch(err => {
                console.log(err);
            })
    }

    render() {
        let post = <div className="FullPost p-4">
            <h3>Please select a Post!</h3>
        </div>;
        if(this.props.id) {
            post = <div className="FullPost p-4">
                <div className="spinner-border text-danger" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
            </div>;
        }

        if(!this.state.error) {
            if(this.state.loadedPost) {
                post = (
                    <div className="FullPost p-4">
                        <h2>{this.state.loadedPost.title}</h2>
                        <p>{this.state.loadedPost.body}</p>
                        <div className="Edit">
                            <Button onClick={this.props.deleted} color="warning">Delete Post</Button>
                            {/* <button onClick={this.props.deleted} className="delete-Post">Delete</button> */}
                        </div>
                    </div>
        
                );
            }
        } else {
            post = (
                <div>
                    <h1>Problem Loading posts!!!</h1>
                </div>
            );
        }

        return post;
    }
}

export default FullPost;