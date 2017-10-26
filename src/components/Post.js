  import { Redirect } from 'react-router'
  import React, { Component } from 'react'
  import { Link } from 'react-router-dom'
  import {
  updatePostVote, fetchComments, fetchPost,
  updateCommentVote, addNewPost, updatePost,
  addNewComment, delComment, updateComment, updateCommentCount
  } from '../actions'
  import PropTypes from 'prop-types'
  import Upvote from 'react-icons/lib/md/thumb-up'
  import Comments from './Comments'
  import DownVote from 'react-icons/lib/md/thumb-down'
  import Delete from 'react-icons/lib/md/delete'
  import Save from 'react-icons/lib/md/save'
  import FaHome from 'react-icons/lib/md/home'
  import { connect } from 'react-redux'
  

/*This component shows a single post to the user and gives the user 
the opportunity to edit, delete, up vote or down vote the post */
 
  const uuidv4 = require('uuid/v4')
  class Post extends Component {
/*
Defining the datatypes of the properties of the component Post*/
    static propTypes = {
        id: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        comments: PropTypes.array.isRequired,
        loadPostComments: PropTypes.func.isRequired,
        onPostVote: PropTypes.func.isRequired,
        onCommentVote: PropTypes.func.isRequired,
        onDeletePost: PropTypes.func.isRequired
    }

/*Initialising our props */
    constructor(props) {
        super(props)
        this.state = {
            category: this.props.category,
            id: this.props.id === 'new' ? uuidv4() : this.props.id,
            title: '',
            body: '',
            author: '',
            voteScore: 1,
            editingMode: this.props.id !== 'new',
            redirectHome: false,
            error: false,
            timestamp: new Date().getTime()
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.deletePost = this.deletePost.bind(this)
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

/*This is the method that gets executed once a user clicks on the button Save Post*/
    handleSubmit(event) {
        event.preventDefault();
        if (this.state.title.trim() && this.state.author.trim() && this.state.body.trim()) {
            var savedPost = { ...this.state, timestamp: new Date().getTime() }
            delete savedPost.editingMode
            this.props.onAddPost(savedPost)
            this.setState({ editingMode: true, error: false })
        } else {
            this.setState({ error: true })
        }
    }

    updatePost() {
        this.props.onUpdatePost(this.state.id, this.state.title, this.state.body, this.state.author)
    }

/*
This method is invoked when a user clicks on the icon to delete the post*/
    deletePost() {
        var c = window.confirm("Are you sure you want to delete the post?")
        if (c === true) {
            this.props.onDeletePost(this.state.id)
            this.setState({ redirectHome: true })
        }
    }

/*This method is invoked immediately after the component Post is inserted into the DOM*/
    componentDidMount() {
        this.props.loadPost(this.props.id)
        this.props.loadPostComments(this.props.id)
    }

/*This method is invoked whenever the component Post is about to receive brand new props. */

    componentWillReceiveProps(nextProps) {
        if (nextProps.post) {
            this.setState({
                title: nextProps.post.title,
                body: nextProps.post.body,
                author: nextProps.post.author,
                voteScore: nextProps.post.voteScore,
                timestamp: nextProps.post.timestamp
            })
        }
    }

/*This render function returns the main UI that allows a user to create a post under the chosen category*/
    render() {
      var submitBtnStyle = {
        background:'#fff222',
      }
        return (
            <div>
                <br />

                <Link to='/'>
                    Home
                    <FaHome size={30} />
                </Link>
                <br />
                <br />

                <span><b>Post</b>&nbsp;&nbsp;

                </span>
                <h4>Creating a new post for the Category:&nbsp;&nbsp;&nbsp;&nbsp;
                  <Link 
                    to={'/' + this.props.category}>{this.props.category}
                  </Link>
                </h4>

                  {this.state.editingMode && 
                    <Upvote size={15} onClick={e => {
                      e.preventDefault()
                      this.props.onPostVote(this.props.id, 'upVote')}}
                    />
                  }&nbsp;&nbsp;&nbsp;&nbsp;

                  {this.state.editingMode && 
                    <DownVote size={15} onClick={e => {
                      e.preventDefault()
                      this.props.onPostVote(this.props.id, 'downVote')}}
                    />
                  }&nbsp;&nbsp;&nbsp;&nbsp;

                  {this.state.editingMode && 
                    <Save size={15} onClick={e => {
                      e.preventDefault()
                      this.updatePost()}}
                    />
                  }&nbsp;&nbsp;&nbsp;&nbsp;

                  {this.state.editingMode && 
                    <Delete size={15} onClick={e => {
                      e.preventDefault()
                      this.deletePost()}}
                    />
                  }

                {this.state.editingMode && <h4>Vote Score: {this.state.voteScore}</h4>}
                {this.state.editingMode && <h4>Timestamp: {new Date(this.state.timestamp).toLocaleString()}</h4>}
                {this.state.error && <span className="error">Title, Body and Author are required</span>}
                /*This is the form for creating a post*/ 
                <form onSubmit={this.handleSubmit}>
                    <label>Title of the Post
                      <input type="text" id="title" name="title" placeholder="Give a title to your post"
                              value={this.state.title} onChange={this.handleInputChange} />
                    </label>
                    <label>Body of the Post
                      <textarea rows="4" cols="50" id="body" name="body" placeholder="Give a short description of your post"
                              value={this.state.body} onChange={this.handleInputChange} />
                    </label>
                    <label>Author of the Post
                      <input type="text" id="author" name="author" placeholder="Give the name of the Author"
                              value={this.state.author} onChange={this.handleInputChange} />
                    </label>
                    {!this.state.editingMode && <input type="submit" value="Submit Post" styel={submitBtnStyle}/>}
                </form>
                {this.state.redirectHome && (<Redirect to='/' />)}
                {this.state.editingMode && 
                  <Comments parentId={this.state.id}
                    comments={this.props.comments}
                    onCommentVote={this.props.onCommentVote}
                    onAddComment={this.props.onAddComment}
                    onDeleteComment={this.props.onDeleteComment}
                    onUpdateComment={this.props.onUpdateComment} 
                  />
                }
            </div>
        )
    }
  }

/*Binds the Components' state to its' properties*/
  const mapStateToProps = (state) => ({
    post: state.post.posts ? state.post.posts[state.post.selectedIndex] : {},
    comments: state.comment.comments ? state.comment.comments : []
  })

/*Here, the method mapDispatchToProps maps the dispatch function 
to the properties of the Component Post. The various actions are been executed 
by the dispatch function and the results assinged to the properties */
  const mapDispatchToProps = dispatch => ({
    onPostVote: (postId, vote) => {
        dispatch(updatePostVote(postId, vote))
    },
/*Binds the onCommentVote property to the updateCommentVote action*/
    onCommentVote: (commentId, vote) => {
        dispatch(updateCommentVote(commentId, vote))
    },
/*Binds the loadPost property to the fetchPost action*/
    loadPost: id => {
        dispatch(fetchPost(id))
    },
/*Binds the loadPostComments property to the fetchComments actions*/
    loadPostComments: id => {
        dispatch(fetchComments(id))
    },
/*Binds the onAddPost property to the addNewPost action*/
    onAddPost: post => {
        dispatch(addNewPost(post))
    },
/*Binds the onUpdatePost property to the updatePost action*/
    onUpdatePost: (id, title, body, author) => {
        dispatch(updatePost(id, title, body, author))
    },
/*Binds the onAddComment property to the addNewComment and updateCommentCount actions*/
    onAddComment: comment => {
        dispatch(addNewComment(comment))
        dispatch(updateCommentCount(comment.parentId, 1, 'add'))
    },
/*Conditionally binds the onDeleteComment property to the delComment or updateCommentCount actions*/
    onDeleteComment: comment => {
        var c = window.confirm("Delete the comment?")
        if (c === true) {
            dispatch(delComment(comment.id))
            dispatch(updateCommentCount(comment.parentId, 1, 'del'))
        }
    },
/*Binds the onUpdateComment property to updateComment action*/
    onUpdateComment: (id, body, author) => {
        dispatch(updateComment(id, body, author))
    }
  })

  export default connect(mapStateToProps, mapDispatchToProps, null, {pure:false})(Post)