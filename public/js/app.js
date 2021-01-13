class App extends React.Component {
    render = ()=>{
        return (
            <div>
                <h1>Create a Post</h1>
                <form id="createPost">
                    <label htmlFor="user">Username</label><br/>
                    <input type="user" name="user" id="title"/><br/>

                    <label htmlFor="title">Title</label><br/>
                    <input type="text" name="title" id="title"/><br/>

                    <label htmlFor="">Text</label><br/>
                    <textarea name="post" id="post" cols="30" rows="10"></textarea><br/>

                    <label htmlFor="image">image</label><br/>
                    <input type="text" name="image" id="image"/><br/>
                </form>
            </div>
        )
    }
}

ReactDOM.render(
    <App></App>,
    document.querySelector('main')
)