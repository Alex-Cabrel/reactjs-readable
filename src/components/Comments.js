import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddIcon from 'react-icons/lib/md/add-circle'
import Upvote from 'react-icons/lib/fa/thumbs-up'
import DownVote from 'react-icons/lib/fa/thumbs-down'
import Delete from 'react-icons/lib/md/delete'
import Edit from 'react-icons/lib/md/edit'
import Modal from 'react-modal'
const uuidv4 = require('uuid/v4')

/*The Component to handle the manipulation of Comments*/
class Comments extends Component {

    constructor(props) {
        super(props)
/*Setting the state of the Component*/
        this.state = {
            id: '',
            body: '',
            author: '',
            parentId: this.props.parentId,
            modalIsOpen: false,
            editMode: false,
            error: false
        }

        this.addComment = this.addComment.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.editComment = this.editComment.bind(this)
    }
/*
Defines the process to add a comment to a post*/
    addComment() {
        this.setState({ id: uuidv4(), body: '', author: '', modalIsOpen: true, editMode: false })
    }
/*
Defines what happens when the modal is closed */
    closeModal() {
        this.setState({ modalIsOpen: false })
    }
/*Method to edit the comments*/ 
    editComment(comment) {
        this.setState({ id: comment.id, body: comment.body, author: comment.author, modalIsOpen: true, editMode: true })
    }
/*Method to handle the chages made to the input fields*/
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

/*Method to submit the comment */
    handleSubmit(event) {
        event.preventDefault();
        if (this.state.body.trim() && this.state.author.trim()) {
            var savedComment = { ...this.state, timestamp: new Date().getTime() }
            if (this.state.editMode) {
                this.props.onUpdateComment(savedComment.id, savedComment.body, savedComment.author)
            } else {
                this.props.onAddComment(savedComment)
            }
            this.setState({ error: false })
            this.closeModal()
        } else {
            this.setState({ error: true })
        }
    }

/*Defining the data types of our properties*/
    static propTypes = {
        comments: PropTypes.array.isRequired,
        onCommentVote: PropTypes.func.isRequired,
        onAddComment: PropTypes.func.isRequired,
        onDeleteComment: PropTypes.func.isRequired,
        onUpdateComment: PropTypes.func.isRequired
    }
/*This render() method returns the GUI to define the content(Comment, Author) of a message.  */
    render() {
        return (
            <div>
                <h3>Comments: {this.props.comments.length}&nbsp;&nbsp;&nbsp;&nbsp;
                    <br/>Add Comments:&nbsp;&nbsp;
                    <AddIcon size={20} onClick={this.addComment}/>
                </h3>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Add Comment"
                    >

                    {this.state.error && <span className="error">Body and Author are required</span>}
                    {/*Form to comment on a post*/}
                    <form onSubmit={this.handleSubmit}>
                        <label>Comment
                            <textarea rows="4" cols="50" id="body" name="body" placeholder="Enter your comment concerning this post here"
                                    value={this.state.body} onChange={this.handleInputChange} />
                        </label>

                        <label>Author
                            <input type="text" id="author" name="author" placeholder="Enter the authors name"
                                    value={this.state.author} onChange={this.handleInputChange} />
                        </label>

                        <input type="submit" value="Save" />
                    </form>
                </Modal>

                {this.props.comments.map((comment, i) => <div key={comment.id}><div className="listComments">
                    {/*Displaying a clickable thumbs up icon from font awesome*/ }
                    <Upvote size={15} onClick={e => {
                        e.preventDefault()
                        this.props.onCommentVote(comment.id, 'upVote')
                    }}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {/*Displaying a clickable thumb down icon from font awesome*/}
                    <DownVote size={15} onClick={e => {
                        e.preventDefault()
                        this.props.onCommentVote(comment.id, 'downVote')
                    }}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {/*Displaying a clickable edit icon from google's material design*/}
                    <Edit size={15} onClick={e => {
                        e.preventDefault()
                        this.editComment(comment)
                    }}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                   {/* Displaying a clickable delete icon from google material design(md)*/}
                    <Delete size={15} onClick={e => {
                        e.preventDefault()
                        this.props.onDeleteComment(comment)
                    }}/>
                    <br /><br />
                    <span><b>Comment</b>:&nbsp;&nbsp;{comment.body}</span>
                    <br />
                    <span><b>Author</b>:&nbsp;&nbsp; {comment.author}</span>
                    <br />
                    <span><b>Vote Count</b>:&nbsp;&nbsp; {comment.voteScore}</span>
                </div><br /></div>
                )}
            </div>
        )
    }
}

export default Comments