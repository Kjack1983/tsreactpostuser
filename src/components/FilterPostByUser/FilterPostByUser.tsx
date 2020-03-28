import React, { Component } from 'react';
import { /* Form, FormGroup, Label, Input, FormText, Jumbotron, */Alert, Button } from 'reactstrap';
import InputFieldComponent from '../../components/InputFieldComponent/InputFieldComponent';
import axios from 'axios';
import Post from '../Post/Post';
import './FilterPostByUser.css';

// Props interface
interface FullUserManager {}

// Interface for state.
interface loadFilterPostInterface {
    error: boolean,
    filterPosts: LoadedUserManager[],
    inputvalue: string,
    selectedPostId: number
}

interface LoadedUserManager {
    id: number,
    title: string,
    body: string,
    author: string
}

class FilterPostByUser extends Component<FullUserManager, loadFilterPostInterface> {

    public filterRef: React.RefObject<HTMLInputElement>;

    constructor(props: FullUserManager) {
        super(props);
        this.state = {
            error: false,
            filterPosts: [],
            inputvalue: '',
            selectedPostId: 0
        }

        this.filterRef = React.createRef();
    }

    /**
     * Set post id when clicked.
     * @param id
     * @return void
     */
    public filterPostSelectedHandler = (event: any, id: number):void => {
        
        let findId = this.state.filterPosts.findIndex(post => {
            return post.id === id;
        })
        
        let post = {
            ...this.state.filterPosts[findId]
        }

        console.log('post :', post);
        
        // update properties
        post.title = event.target.value;

        console.log('Updated post :', post);

        const posts = [...this.state.filterPosts];
        posts[findId] = post;

        this.setState({
            filterPosts: posts
        });
        
        this.setState({
            selectedPostId: id
        });
    }

    /**
     * Delete a User or Post
     * @param {number} id
     * @return void
     */
    public filterPostDeleteHandler = (id: number):void => {
        let updatePosts = this.state.filterPosts.filter(filterPost => {
            return filterPost.id !== id;
        });

        this.setState({
            filterPosts: updatePosts
        })
    }

    onSearchClick = ():void => {
        const input = this.state.inputvalue;

        if (input !== '') {
            // Posts
            axios.get(`http://jsonplaceholder.typicode.com/posts?userId=${input}`).then(response => {
                
                console.log(response);
                if(response.status !== 200) {
                    this.setState({
                        error: true
                    });
                    return;
                }
            
                // Display only 8 posts.
                const posts = response.data.slice(0, 8);
                const updatedPosts = posts.map((post: LoadedUserManager) => {
                    return {
                        ...post,
                        author: 'Ioannis'
                    }
                });

                if (updatedPosts.length) {
                    this.setState({
                        error: false,
                        filterPosts: updatedPosts
                    })
                } else {
                    this.setState({
                        error: true
                    });
                    return;
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            console.log(`${input} is empty`);
        }
    }

    render() {

        let resultMarkup;

        const { error, filterPosts: posts, inputvalue } = this.state;

        let loadPosts = [];

        if (error) {
            resultMarkup = 
            <section className="Posts">
                <Alert className="mt-3" color="danger">
                    No post Found Please try Again
                </Alert>
            </section>;
        } else if (posts) {

            loadPosts = posts.map(post => {
                return <Post 
                key={post.id}
                title={post.title}
                body={post.body}
                author={post.author}
                changed={(event) => this.filterPostSelectedHandler(event, post.id)}
                deleted={() => this.filterPostDeleteHandler(post.id)}
            />
            });

            resultMarkup = <section className="Posts">
                {loadPosts}
            </section>
        } 

        return (
            <div className="container">
                <h2 className="mt-2 mb-2 text-center">FilterPostsBy User ID</h2>
                <div className="row justify-content-center">    
                    <input name="filter" id="filter" placeholder="Please enter a number from 1 to 10" type="text" className="form-control mt-2 mb-2 w-50 text-center" onChange={(event) => this.setState({inputvalue: event.target.value})}/>
                </div>
                <div className="row justify-content-center">
                    <Button onClick={this.onSearchClick} color="success">Filter</Button>
                </div>
                {resultMarkup}
            </div>
        )
    }
}

export default FilterPostByUser;