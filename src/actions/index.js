/*Import the api as API for readability and understanding*/
import * as API from '../util/api'

//  Defining a variable to hold the property type of the defined categories
export const LIST_CATEGORIES = 'LIST_CATEGORIES'

// Defining variables to hold the property type the actions that actions on a Post supports 
export const LIST_POSTS = 'LIST_POSTS'
export const GET_POST = 'GET_POST'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'
export const VOTE_POST = 'VOTE_POST'
export const COMMENT_COUNT = 'COMMENT_COUNT'

// Defining variables to hold the properties types that actions on a Comment supports
export const LIST_COMMENTS = 'LIST_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'

/*Defing the content of each action. Remember that every action must have 
a type and we already defined these type as constant */
export const listCategories = categories => ({
    type: LIST_CATEGORIES,
    categories
})

/*fetches all the availabale categories and dispatch the listCategories actions*/
export const fetchCategories = () => dispatch => (
    API
        .getCategories()
        .then(categories => dispatch(listCategories(categories)))
)

/*Define listPosts actions */
export const listPosts = posts => ({
    type: LIST_POSTS,
    posts
})

/*fetches all the posts and dispatches the listPosts action*/
export const fetchPosts = () => dispatch => (
    API
        .getAllPosts()
        .then(posts => {
            var postswithcnt = posts.map((p) => Object.assign({}, p, { commentCount: 0 }))
            dispatch(listPosts(postswithcnt))
        })
)

/*Define getPost action*/
export const getPost = postId => ({
    type: GET_POST,
    postId
})

/*fetches a post based on its id and dispatches the getPost action*/
export const fetchPost = (postId) => dispatch => (
    postId === 'new' ? dispatch(getPost(postId)) : API
        .getPost(postId)
        .then(post => dispatch(getPost(post.id)))
)

/*defines addPost action*/
export const addPost = (post) => {
    return {
        type: ADD_POST,
        post
    }
}

/*add a new post and dispatches the addPost actins*/
export const addNewPost = (post) => dispatch => (
    API
        .addPost(post)
        .then(p => dispatch(addPost(Object.assign({}, p, { commentCount: 0 }))))
)
/*
defines the editPost action*/
export const editPost = (post) => {
    return {
        type: EDIT_POST,
        post
    }
}

/*updates a post based on id, title, body and author and dispatchesthe editPost action*/
export const updatePost = (id, title, body, author) => dispatch => (
    API
        .updatePost(id, title, body, author)
        .then(p => dispatch(editPost(p)))
)

/*defines the deletePost action*/ 
export const deletePost = (post) => {
    return {
        type: DELETE_POST,
        post
    }
}
/*deletes a post based on its id and dispatches deletePost action */
export const delPost = (id) => dispatch => (
    API
        .deletePost(id)
        .then(p => dispatch(deletePost(p)))
)

/*defines votePost action*/ 
export const votePost = (id, vote) => {
    return {
        type: VOTE_POST,
        id,
        vote
    }
}

/*update the votes of a post based on the id and vote type and dispatches the votePost action */
export const updatePostVote = (id, vote) => dispatch => (
    API
        .updatePostVote(id, vote)
        .then(dispatch(votePost(id, vote)))
)
/*
defines the listComments action*/
export const listComments = comments => ({
    type: LIST_COMMENTS,
    comments
})
/*
fetches comments for a particular post based onthe post id and dispatches the listComments action*/
export const fetchComments = (postId) => dispatch => (
    API
        .getPostComments(postId)
        .then(comments => dispatch(listComments(comments)))
)
/*defines the updateCommentCount action*/
export const updateCommentCount = (id, commentCount, actionType) => ({
    type: COMMENT_COUNT,
    id,
    commentCount,
    actionType
})

/*fetches all the posts and for each post, it dispatches 
updateCommentCount to update the comments count of that post.*/
export const fetchAllComments = () => dispatch => (
    API
        .getAllPosts()
        .then(posts => {
            posts.forEach((p) => {
                API
                    .getPostComments(p.id)
                    .then(comments => dispatch(updateCommentCount(p.id, comments ? comments.length : 0, 'total')))
            })
        })
)
/*defines the addComment action*/ 
export const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        comment
    }
}

/*adds a new comment and dispatch the addComment action*/ 
export const addNewComment = (comment) => dispatch => (
    API
        .addComment(comment)
        .then(c => dispatch(addComment(c)))
)

/*defines editComment action */
export const editComment = (comment) => {
    return {
        type: EDIT_COMMENT,
        comment
    }
}

/*updates comment based on its id, body and author properties and dispatches editComment action*/
export const updateComment = (id, body, author) => dispatch => (
    API
        .updateComment(id, body, author)
        .then(c => dispatch(editComment(c)))
)

/*defines deleteComment action*/ 
export const deleteComment = (comment) => {
    return {
        type: DELETE_COMMENT,
        comment
    }
}

/*deletes a comment based on its id and dispatches deleteComment action*/ 
export const delComment = (id) => dispatch => (
    API
        .deleteComment(id)
        .then(c => dispatch(deleteComment(c)))
)

/*defines voteComment action*/ 
export const voteComment = (id, vote) => {
    return {
        type: VOTE_COMMENT,
        id,
        vote
    }
}

/*updates the votes of a particular comment based on the comment id and then dispatches the voteComment action*/
export const updateCommentVote = (commentId, vote) => dispatch => (
    API
        .updateCommentVote(commentId, vote)
        .then(dispatch(voteComment(commentId, vote)))
)

