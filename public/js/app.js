class App extends React.Component {
    state = {
        title: '',
        name: '',
        image: '',
        post: '',
        date: undefined,
        posts:[]
    }

    handleChange = (event)=>{
        this.setState({
            [event.target.id]: event.target.value,
        })
    }

    create = (event)=>{
        event.preventDefault();
        axios
            .post('/blog', this.state)
            .then((response)=>{
                console.log(response.data)
                this.setState({
                    posts: response.data,
                    title: '',
                    name: '',
                    image: '',
                    post: '',
                    date: undefined,
                })
            }, 
            (error) => {
                console.log(error);
              }
        )
    }

    update = (event)=>{
        console.log(event.target.id)
        event.preventDefault();
        axios
            .put('/blog/'+event.target.id, this.state)
            .then((response)=>{
                console.log(response.data)
                this.setState({
                    posts: response.data,
                    title: '',
                    name: '',
                    image: '',
                    post: '',
                    date: undefined,
                })
            },
            (error)=>{
                console.log(error)
            }
        )
    }

    delete = (event)=>{
        axios
            .delete('/blog/'+event.target.value)
            .then(
                (response)=>{
                    this.setState({
                        posts: response.data
                    })
                },
                (error)=>{
                    console.log(error)
                }
            )
    }

    // openModal = (i)=>{
    //     console.log(i)
    //    document.getElementById(i).style.display = "flex"
    // }

    // closeModal = (event)=>{
    //     event.currentTarget.style.display = "none"
    // }
    

    componentDidMount = ()=>{
        axios
            .get('/blog')
            .then(
                (response)=>{
                    console.log(response.data)
                    this.setState({
                        posts: response.data
                    })
                },
                (error)=>{
                    console.log(error)
                }
            )
    }

    

    render = ()=>{
        return (
            <div>

                <div id="createDiv">
                <h1>Create a Post</h1>
                    <form id="createPost" onSubmit={this.create}>
                        <label htmlFor="name">Username: </label><br/>
                        <input type="text" name="name" id="name" onChange={this.handleChange}/><br/>

                        <label htmlFor="title">Title: </label><br/>
                        <input type="text" name="title" id="title" onChange={this.handleChange}/><br/>

                        <label htmlFor="">Text: </label><br/>
                        <textarea name="post" id="post" cols="30" rows="10" onChange={this.handleChange}></textarea ><br/>

                        <label htmlFor="image">Image: </label><br/>
                        <input type="text" name="image" id="image" onChange={this.handleChange}/><br/>

                        <input type="submit" value="Post!"/>
                    </form>
                </div>

                <div className="post">
                    {this.state.posts.map((post, i)=>{
                        return (
                            <div key={post._id}>
                                <h2>{post.title}</h2>
                                <p>{post.post}</p>
                                <img src={post.image} alt={post.title}/>
                                <p>created by: {post.name}</p>
                             
                                
                                <summary>
                                    <details>
                                        <form onSubmit={this.update} id={this.state.posts[i]._id}>
                                            <label htmlFor="name">Userame: </label><br/>
                                            <input type="text" name="name" id="name" onChange={this.handleChange} defaultValue={this.state.posts[i].name}/><br/>

                                            <label htmlFor="title">Title: </label><br/>
                                            <input type="text" name="title" id="title" onChange={this.handleChange} defaultValue={this.state.posts[i].title}/><br/>

                                            <label htmlFor="post"></label>Text: <br/>
                                            <input type="text" name="post" id="post" onChange={this.handleChange} defaultValue={post.post}/><br/>

                                            <label htmlFor="image">Image: </label><br/>
                                            <input type="text" name="image" id="image" onChange={this.handleChange} defaultValue={post.image}/><br/>

                                            <input type="submit" value="Update"/>

                                            <button onClick={this.delete} value={post._id}>Delete</button>
                                            
                                        </form>
                                    </details>
                                </summary>


                            </div>
                        )
                    })}
                </div>

            </div>

        )
    }
}

ReactDOM.render(
    <App></App>,
    document.querySelector('main')
)