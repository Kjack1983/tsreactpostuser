import React from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import User from '../../components/User/User';
import { Form, Button } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Blog.css';
import FilterPostByUser from '../../components/FilterPostByUser/FilterPostByUser';
import InputFieldComponent from '../../components/InputFieldComponent/InputFieldComponent';
import TextAreaFieldComponent from '../../components/TextAreaFieldComponent/TextAreaFieldComponent';

interface PpostProps {}

interface Pposts {
    id: number,
    userId: number,
    title: string,
    body: string,
    author: string,
    clicked?(e: any): void;
}

interface Uusers {
    id: number,
    name: string,
    username: string,
    email: string,
    address: address
}

interface address {
    street: string,
    suite: string,
    city: string,
    zipcode: string
}

interface PostUserManagerState {
    displayPosts: boolean
    posts: Pposts[],
    displayUsers: boolean
    users: Uusers[],
    selectedUserId: number,
    selectedPostId: number
}

class Blog extends React.Component<PpostProps, PostUserManagerState>{

    // Set form inputs for new post.
    public titleRef: React.RefObject<HTMLInputElement>;
    public contentRef: React.RefObject<HTMLTextAreaElement>;
    public authorRef: React.RefObject<HTMLInputElement>;

    // Set Form inputs for user Post.
    public nameRef: React.RefObject<HTMLInputElement>;
    public emailRef: React.RefObject<HTMLInputElement>;
    public usernameRef: React.RefObject<HTMLInputElement>;
    public streetRef: React.RefObject<HTMLInputElement>;
    public suiteRef: React.RefObject<HTMLInputElement>;
    public cityRef: React.RefObject<HTMLInputElement>;
    public zipcodeRef: React.RefObject<HTMLInputElement>;

    constructor(props: PpostProps) {
        super(props);
        this.state = {
            displayPosts: false,
            posts: [],
            displayUsers: false,
            users: [],
            selectedUserId: 0,
            selectedPostId: 0,
        }

        // Post Refs
        this.titleRef = React.createRef();
        this.contentRef = React.createRef();
        this.authorRef = React.createRef();

        // User Refs
        this.nameRef = React.createRef();
        this.emailRef = React.createRef();
        this.usernameRef = React.createRef();
        this.streetRef = React.createRef();
        this.suiteRef = React.createRef();
        this.cityRef = React.createRef();
        this.zipcodeRef = React.createRef();

    }

    componentDidMount():void {
        // Posts
        fetch('http://jsonplaceholder.typicode.com/posts').then(response => {
            return response.json();
        }).then((response) => {
            // Display only 6 posts.
            const posts = response.slice(0, 8);
            const updatedPosts = posts.map((post: Pposts) => {
                return {
                    ...post,
                    author: 'Ioannis'
                }
            });
            this.setState({
                posts: updatedPosts
            })
        }).catch((err) => {
            console.log(err);
        })

        // Posts
        fetch('http://jsonplaceholder.typicode.com/users').then(response => {
            return response.json();
        }).then((response) => {

            console.log(response);

            // Display only 6 posts.
            const updatedUsers = response.slice(0, 8);

            this.setState({
                users: updatedUsers
            })
        }).catch((err) => {
            console.log(err);
        })

    }

    public userSelectedHandler = (id: number):void => {
        this.setState({selectedUserId: id});
    }

    /**
     * Set post id when clicked.
     * @param id
     * @return void
     */
    public postSelectedHandler = (id: number):void => {
        this.setState({selectedPostId: id});
    }


    /**
     * Delete a User or Post
     * @param {number} id
     * @return void
     */
    public postUserDeleteHandler = (id: number, isPost: boolean):void => {
        
        if (isPost) {
            let updatePosts = this.state.posts.filter(post => {
                return post.id !== id;
            });

            this.setState({
                posts: updatePosts
            })
        } else {
            let updateUsers = this.state.users.filter(user => {
                return user.id !== id;
            });
    
            this.setState({
                users: updateUsers
            })
        }
    }

    /**
     * Add a new post
     * return void
     */
    public addDataHandler = ():void => {
        let titleInputValue = this.titleRef.current.value;
        let contentInputValue = this.contentRef.current.value;
        let authorInputValue = this.authorRef.current.value;

        let counter = 1;
        this.state.posts.forEach((post: any, index: number) => {
            counter = post.id + 1;
        });

        let newPost = {
            userId: 1,
            id: counter, 
            title: titleInputValue,
            body: contentInputValue,
            author: authorInputValue
        }

        let updatedPosts = [
            ...this.state.posts,
            newPost
        ]

        this.setState({
            posts: updatedPosts
        } as PostUserManagerState);
    }


    /**
     * Add a new post
     * return void
     */
    public addUserHandler = ():void => {
        let nameInputValue = this.nameRef.current.value;
        let emailInputValue = this.emailRef.current.value;
        let usernameInputValue = this.usernameRef.current.value;
        let streetRef = this.streetRef.current.value;
        let suiteRef = this.suiteRef.current.value;
        let cityRef = this.cityRef.current.value;
        let zipcodeRef = this.zipcodeRef.current.value;

        let counter = 1;
        this.state.users.forEach((user: any, index: number) => {
            counter = user.id + 1;
        });

        let newUser = {
            id: counter,
            name: nameInputValue,
            email: emailInputValue,
            username: usernameInputValue,
            address: {
                street: streetRef,
                suite: suiteRef,
                city: cityRef,
                zipcode: zipcodeRef
            }
        }

        let updatedUsers = [
            ...this.state.users,
            newUser
        ]

        this.setState({
            users: updatedUsers
        } as PostUserManagerState);
    }

    /**
     * Clear form values.
     */
    clearUserFormHandler = ():void => {
        this.nameRef.current.value = '';
        this.emailRef.current.value = '';
        this.usernameRef.current.value = '';
        this.streetRef.current.value = '';
        this.suiteRef.current.value = '';
        this.cityRef.current.value = '';
        this.zipcodeRef.current.value = '';
    }



    /**
     * Clear form values.
     */
    clearDataHandler = ():void => {
        this.titleRef.current.value = '';
        this.contentRef.current.value = '';
        this.authorRef.current.value = '';
    }

    /**
     * Toggle posts.
     */
    showHidePosts = ():void => {
        let doesPostShow = !this.state.displayPosts;
        this.setState({
            displayPosts: doesPostShow,
            displayUsers: false
        })
    }

    showHideUsers = ():void => {
        let doesUserShow = !this.state.displayUsers;
        this.setState({
            displayPosts: false,
            displayUsers: doesUserShow
        })
    }

    render() {
        const posts = this.state.posts.map((post) => {
            return <Post 
                key={post.id}
                title={post.title}
                body={post.body}
                author={post.author}
                clicked={() => this.postSelectedHandler(post.id)}
                deleted={() => this.postUserDeleteHandler(post.id, true)}
            />
        })

        const users = this.state.users.map(user => {
            return <User
                key={user.id}
                name={user.name}
                email={user.email}
                address={user.address}
                clicked={() => this.userSelectedHandler(user.id)}
                deleted={() => this.postUserDeleteHandler(user.id, false)}
            />
        })

        const postSectionStyling = {
            backgroundColor: '#a9b3bc'
        } as any;

        const postTitle = {
            marginBottom: '20px',
            marginTop: '10px',
            textAlign: 'center'
        } as any;
        
        return (
            <div style={postSectionStyling} className="container pt-2 pb-4">
                <h1 style={postTitle}>Post / User Application</h1>
                <section>
                    <div className="row justify-content-center">
                        <Button onClick={this.showHidePosts} color="primary" className="mb-3 mr-1">Display Posts</Button>
                        <Button onClick={this.showHideUsers} color="warning" className="mb-3">Display Users</Button>
                    </div>
                </section>

                {/* Users */}
                { this.state.displayUsers ? <div>
                    <section className="Posts">
                        {users}
                    </section>
                    <section>
                        <div className="NewPost">
                            <h3>Add a User</h3>
                            <Form>
                                <InputFieldComponent type="text" ref={this.nameRef} label="Name" forLabel="Name" name="name" id="name" placeholder="Please enter a Name" class="form-control" />
                                <InputFieldComponent type="email" ref={this.emailRef} label="Email" forLabel="Email" name="email" id="email" placeholder="Please enter an Email" class="form-control" />
                                <InputFieldComponent type="text" ref={this.usernameRef} label="username" forLabel="Username" name="username" id="username" placeholder="Please enter a username" class="form-control" />
                                <InputFieldComponent type="text" ref={this.streetRef} label="Street address" forLabel="Address" name="address" id="address" placeholder="Please enter Your address" class="form-control" />
                                <InputFieldComponent type="text" ref={this.suiteRef} label="Suite" forLabel="Suite" name="suite" id="suite" placeholder="Please enter a Suite" class="form-control" />
                                <InputFieldComponent type="text" ref={this.cityRef} label="City address" forLabel="City" name="address" id="address" placeholder="Please enter a City" class="form-control" />
                                <InputFieldComponent type="text" ref={this.zipcodeRef} label="Zip Code" forLabel="Zip" name="zip" id="zip" placeholder="Please enter a zip code" class="form-control" />

                                <Button onClick={this.addUserHandler} color="success">Add User</Button>
                                <Button onClick={this.clearUserFormHandler} color="success">Clear</Button>
                            </Form>
                        </div>
                    </section>
                    </div>
                : ''}

                {/* Posts */}
                {this.state.displayPosts ? <div>
                    <section style={postSectionStyling} className="Posts">
                        { posts }          
                    </section>
                    <section>
                        <FullPost id={this.state.selectedPostId} 
                            deleted={() => this.postUserDeleteHandler(this.state.selectedPostId, true)
                        } />        
                    </section>
                    <section>
                        <div className="NewPost">
                            <h3>Add a Post</h3>
                            <Form>
                                <InputFieldComponent type="text" ref={this.titleRef} label="Title" forLabel="title" name="title" id="title" placeholder="Please enter a title" class="form-control" />
                                <TextAreaFieldComponent label="content" forLabel="Content" name="name" id="Content" class="form-control" ref={this.contentRef} placeholder="Please enter a content"/>
                                <InputFieldComponent type="text" ref={this.authorRef} label="Author" forLabel="Author" name="author" id="author" placeholder="Please enter an Autho" class="form-control" />
                                <Button onClick={this.addDataHandler} color="success">Add Post</Button>
                                <Button onClick={this.clearDataHandler} color="success">Clear Post</Button>
                            </Form>
                        </div>
                    </section>
                </div>: ''}
                    <section>
                        <FilterPostByUser />
                    </section>
            </div>    
        );
    }
}

export default Blog;