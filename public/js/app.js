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
            })
    }

    update = (event)=>{
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
            })
    }

    delete = (event)=>{
        axios
            .delete('/blog/'+event.target.value)
            .then(
                (response)=>{
                    this.setState({
                        posts: response.data
                    })
                }
            )
    }

    openModal = ()=>{
        document.querySelector('.modal').style.display = "flex"
    }

    closeModal = ()=>{
        document.querySelector('.modal').style.display = "none"
    }
    

    componentDidMount = ()=>{
        axios
            .get('/blog')
            .then(
                (response)=>{
                    console.log(response.data)
                    this.setState({
                        posts: response.data
                    })
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
                    {this.state.posts.map((post)=>{
                        return (
                            <div key={post._id}>
                                <h2>{post.title}</h2>
                                <p>{post.post}</p>
                                {(post.image)?
                                    <img src={post.image} alt={post.title}/>
                                    : null    
                                }
                                <button className="edit" onClick={this.openModal}>edit</button>
                                <div className="modal">
                                    <div className="modal-box">
                                        <form onSubmit={this.update} id={post._id}>
                                            <label htmlFor="name">Userame: </label><br/>
                                            <input type="text" name="name" id="name" onClick={this.handleChange}/><br/>

                                            <label htmlFor="title">Title: </label><br/>
                                            <input type="text" name="title" id="title" onClick={this.handleChange}/><br/>

                                            <label htmlFor="post"></label>Text: <br/>
                                            <input type="text" name="post" id="post" onClick={this.handleChange}/><br/>

                                            <label htmlFor="image">Image: </label><br/>
                                            <input type="text" name="image" id="image" onClick={this.handleChange}/><br/>

                                            <input type="submit" value="Update"/>

                                            <button onClick={this.delete} value={post._id}>Delete</button>
                                            
                                        </form>
                                        <button onClick={this.closeModal}>Close</button>
                                    </div>
                                </div>


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