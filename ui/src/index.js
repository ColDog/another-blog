import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch'
import './index.css';

const getPosts = () => {
  return fetch('/api/posts')
    .then(res => res.json())
}

const insertPost = (data) => {
  return fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
}

const PostItem = ({ post }) => (
  <div className="panel">
    <h4>{post.title}</h4>
    <p>{post.post}</p>
  </div>
)

const PostList = ({ posts }) => (
  <div>
    {posts.map(post =>
      <PostItem key={post.id} post={post} />
    )}
  </div>
)

class PostForm extends React.Component {
  state = {title: '', post: ''}

  static propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
  }

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value })
  }

  handleContentChange = (e) => {
    this.setState({ post: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  render() {
    return (
      <div className="panel">
        <form onSubmit={this.handleSubmit}>
          <label>Title</label>
          <input value={this.state.title} type="text" onChange={this.handleTitleChange} />
          <br />

          <label>Content</label>
          <textarea value={this.state.post} type="text" onChange={this.handleContentChange} ></textarea>

          <br />
          <button>Save</button>
        </form>
      </div>
    )
  }

}

class App extends React.Component {
  state = { posts: [] }

  fetchPosts() {
    getPosts().then((posts) => {
      this.setState({ posts: posts })
    })
  }

  componentDidMount() {
    this.fetchPosts()
  }

  handleSubmit = (body) => {
    insertPost(body).then(() => {
      this.fetchPosts()
    })
  }

  render() {
    const { posts } = this.state
    return (
      <div>
        <PostList posts={posts} />

        <PostForm onSubmit={this.handleSubmit} />
      </div>
    )
  }

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
