import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Upvote from 'react-icons/lib/fa/thumbs-up'
import DownVote from 'react-icons/lib/fa/thumbs-down'
import Delete from 'react-icons/lib/md/delete'

/*Creating the component that handles Post
Here we used a the icons from font awesome 
and google material design*/
class Posts extends Component {

    constructor(props) {
        super(props)

        this.state = {
            sort: '',
            sortField: ''
        }

        this.sort = this.sort.bind(this)
    }

/*Defining the data types that our properties expects */
    static propTypes = {
        posts: PropTypes.array.isRequired,
        category: PropTypes.string.isRequired,
        onVote: PropTypes.func.isRequired,
        onDeletePost: PropTypes.func.isRequired
    }

/*This method is invoked immediately after the component is inserted into the DOM*/
    componentDidMount() {
        this.setState({ posts: this.findPostsByCategory() })
    }

/*This method is invoked whenever the component is about to receive brand new props. */
    componentWillReceiveProps(nextProps) {
        this.setState({ posts: this.findPostsByCategory() })
    }

/*Alert for the user to confirm his action of deleting a post*/
    deletePost(id) {
        var c = window.confirm("Are you sure you want to delete the post?")
        if (c === true) {
            this.props.onDeletePost(id)
        }
    }

/*Method to sort the post based on the posts' voteScore and the time of posting*/ 
    sort(field) {
        var sposts, sortby = 'asc'
        if (field === this.state.sortField) sortby = this.state.sortby === 'asc' ? 'desc' : 'asc'
        if (field === 'title' || field === 'author' || field === 'category' ) {
            sposts = this.props.posts.sort((a, b) => sortby === 'asc' ?
                a[field].toLowerCase() > b[field].toLowerCase() :
                a[field].toLowerCase() < b[field].toLowerCase())
        } else {
            sposts = this.props.posts.sort((a, b) => sortby === 'asc' ? a[field] > b[field] : a[field] < b[field])
        }
        this.setState({ posts: sposts, sortField: field, sortby: sortby })
    }

/*The render() method will render a table with the existing categories, the post related to the various categories, 
the number of Commentsa post has, the time at which the post was registered and the number of likes or dislikes 
for the post*/
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>
                            <a href="#" onClick={() => { this.sort('category') }}>
                                Category of the Post
                            </a>
                        </th>
                        <th>
                            <a href="#" onClick={() => { this.sort('title') }}>
                                Title of the Post
                            </a>
                        </th>

                        <th>
                            <a href="#" onClick={() => { this.sort('author') }}>
                                Author
                            </a>
                        </th>
                        <th>
                            <a href="#" onClick={() => { this.sort('timestamp') }}>
                                Timestamp
                            </a>
                        </th>
                        <th>
                            <a href="#" onClick={() => { this.sort('commentCount') }}>
                                Number of Comments
                            </a>
                        </th>
                        <th>
                            <a href="#" onClick={() => { this.sort('voteScore') }}>
                                Vote Score
                            </a>
                            </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.findPostsByCategory().map((post, i) => 
                        <tr key={i}>
                            <td>
                                {post.category}
                            </td>
                            <td>
                                <Link to={'/' + post.category + '/' + post.id}>{post.title}</Link>
                            </td>
                            <td>
                                {post.author}
                            </td>
                            <td>
                                {new Date(post.timestamp).toLocaleString()}
                            </td>
                            <td>
                                {post.commentCount}
                            </td>
                            <td>
                                {post.voteScore}
                            </td>
                            <td>
                                <Upvote size={15} onClick={e => {
                                    e.preventDefault()
                                    this.props.onVote(post.id, 'upVote')
                                    }}
                                />&nbsp;&nbsp;

                                <DownVote size={15} onClick={e => {
                                    e.preventDefault()
                                    this.props.onVote(post.id, 'downVote')
                                    }}
                                />&nbsp;&nbsp;

                                <Delete size={15} onClick={e => {
                                    e.preventDefault()
                                    this.deletePost(post.id)
                                    }}
                                />
                            </td>
                        </tr>)}
                </tbody>
            </table>
        )
    }

    findPostsByCategory = () => {
        if (!this.props.category) 
            return this.props.posts
        else 
            return this.props.posts.filter(p => p.category === this.props.category)
    }
}

export default Posts